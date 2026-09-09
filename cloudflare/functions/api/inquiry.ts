import demos from '../../../lib/demos.json';
type InquiryEnv=Env&{RESEND_API_KEY?:string;INQUIRY_TO_EMAIL?:string;INQUIRY_FROM_EMAIL?:string};
const json=(body:unknown,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
const esc=(value:string)=>value.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
async function sendNotification(env:InquiryEnv,data:{id:string;name:string;email:string;company:string;phone:string;message:string;designs:string[]}){
 if(!env.RESEND_API_KEY||!env.INQUIRY_TO_EMAIL)return;
 const from=env.INQUIRY_FROM_EMAIL||'Sidemannen <onboarding@resend.dev>';
 const subject=`Ny forespørsel: ${data.company||data.name}`.slice(0,150);
 const selected=data.designs.length?`<p><strong>Design:</strong> ${data.designs.map(esc).join(', ')}</p>`:'';
 const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({from,to:[env.INQUIRY_TO_EMAIL],reply_to:data.email,subject,html:`<h2>Ny forespørsel til Sidemannen</h2><p><strong>Navn:</strong> ${esc(data.name)}</p><p><strong>E-post:</strong> ${esc(data.email)}</p><p><strong>Bedrift:</strong> ${esc(data.company||'Ikke oppgitt')}</p><p><strong>Telefon:</strong> ${esc(data.phone||'Ikke oppgitt')}</p>${selected}<p><strong>Melding:</strong></p><p>${esc(data.message).replace(/\n/g,'<br>')}</p><p><small>Referanse: ${esc(data.id.slice(0,8).toUpperCase())}</small></p>`})});
 if(!response.ok)throw new Error(`Lead notification failed: ${response.status}`);
}
export const onRequest:PagesFunction<InquiryEnv>=async ctx=>{
 const r=ctx.request;
 if(r.method!=='POST')return json({error:'Bruk kontaktskjemaet for å sende en forespørsel.'},405);
 const origin=r.headers.get('Origin');
 if(!origin||origin!==new URL(r.url).origin)return json({error:'Ugyldig avsender.'},403);
 if(!r.headers.get('Content-Type')?.includes('application/json'))return json({error:'Ugyldig format.'},415);
 try{
  if(Number(r.headers.get('Content-Length')||0)>20000)return json({error:'Meldingen er for lang.'},413);
  const reader=r.body?.getReader();if(!reader)return json({error:'Tom forespørsel.'},400);
  const chunks:Uint8Array[]=[];let size=0;while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>20000){await reader.cancel();return json({error:'Meldingen er for lang.'},413)}chunks.push(value)}
  const bytes=new Uint8Array(size);let offset=0;for(const c of chunks){bytes.set(c,offset);offset+=c.byteLength}
  let b:Record<string,unknown>;try{b=JSON.parse(new TextDecoder().decode(bytes))}catch{return json({error:'Ugyldig forespørsel.'},400)}
  if(!b||typeof b!=='object'||Array.isArray(b))return json({error:'Ugyldig forespørsel.'},400);
  const field=(key:string,max:number)=>typeof b[key]==='string'?(b[key] as string).trim().slice(0,max):'';
  const id=field('requestId',50);const name=field('name',100);const email=field('email',254);const message=field('message',5000);const company=field('company',150);const phone=field('phone',30);
  if(field('website',500))return json({error:'Forespørselen kunne ikke sendes.'},400);
  if(!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)||name.length<2||!/^\S+@[^\s@]+\.[^\s@]+$/.test(email)||message.length<10)return json({error:'Sjekk navn, e-post og at meldingen inneholder minst 10 tegn.'},400);
  if(typeof b.started!=='number'||Date.now()-b.started<2000)return json({error:'Vent et øyeblikk og prøv igjen.'},400);
  const designs=Array.isArray(b.designs)?[...new Set(b.designs.filter((id):id is string=>typeof id==='string'&&demos.some(d=>d.id===id)))].slice(0,12):[];
  const now=Math.floor(Date.now()/1000);const ip=r.headers.get('CF-Connecting-IP')||'local';const day=Math.floor(now/86400);
  const hash=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(ip+':'+day)))).map(b=>b.toString(16).padStart(2,'0')).join('');
  const rateKey=hash+':'+Math.floor(now/3600);
  const allowed=await ctx.env.DB.prepare('INSERT INTO rate_limits(key,count,expires_at) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1 WHERE count<5 RETURNING count').bind(rateKey,now+86400).first();
  if(!allowed)return json({error:'Du har sendt flere forespørsler på kort tid. Prøv igjen senere.'},429);
  await ctx.env.DB.prepare('INSERT INTO inquiries(id,created_at,name,email,company,phone,message,designs) VALUES(?,?,?,?,?,?,?,?) ON CONFLICT(id) DO NOTHING').bind(id,now,name,email,company,phone,message,JSON.stringify(designs)).run();
  ctx.waitUntil(sendNotification(ctx.env,{id,name,email,company,phone,message,designs}).catch(error=>console.error(error)));
  ctx.waitUntil(ctx.env.DB.batch([ctx.env.DB.prepare('DELETE FROM rate_limits WHERE expires_at<?').bind(now),ctx.env.DB.prepare('DELETE FROM inquiries WHERE created_at<?').bind(now-90*86400)]).catch(()=>console.error('Inquiry cleanup failed')));
  return json({ok:true,reference:id.slice(0,8).toUpperCase()});
 }catch{console.error('Inquiry persistence failed');return json({error:'Vi kunne ikke lagre forespørselen nå. Prøv igjen om litt.'},503)}
};
