import fs from 'node:fs';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
// Vinext static export may use out/ instead of dist/client depending on version.
const candidates=['out','dist/client'];const found=candidates.find(p=>fs.existsSync(path.join(root,p,'index.html')));
if(!found)throw new Error('No static index.html was emitted.');
const dest=path.join(root,'dist/client');
if(found!=='dist/client')fs.cpSync(path.join(root,found),dest,{recursive:true});
let headers=fs.readFileSync(path.join(root,'public/_headers'),'utf8');
if(process.env.PUBLIC_LAUNCH==='true')headers=headers.replace('  X-Robots-Tag: noindex, nofollow\n','');
fs.writeFileSync(path.join(dest,'_headers'),headers);
const records=JSON.parse(fs.readFileSync(path.join(root,'lib/demos.json'),'utf8'));const allowed=new Set(records.map(d=>d.id));
const demoRoot=path.join(dest,'demos');if(fs.existsSync(demoRoot))for(const e of fs.readdirSync(demoRoot)){const target=path.resolve(demoRoot,e);if(!allowed.has(e)&&target.startsWith(demoRoot+path.sep))fs.rmSync(target,{recursive:true,force:true});}
const previewRoot=path.join(dest,'previews');if(fs.existsSync(previewRoot))for(const e of fs.readdirSync(previewRoot)){if(e.endsWith('.webp')&&!allowed.has(e.slice(0,-5)))fs.rmSync(path.join(previewRoot,e),{force:true});}
fs.writeFileSync(path.join(dest,'_routes.json'),JSON.stringify({version:1,include:['/api/*'],exclude:[]}));
const origin=process.env.SITE_URL||'https://sidekick-studio.pages.dev';const publicLaunch=process.env.PUBLIC_LAUNCH==='true';
fs.writeFileSync(path.join(dest,'robots.txt'),publicLaunch?`User-agent: *\nAllow: /\nDisallow: /demos/\nDisallow: /api/\nSitemap: ${origin}/sitemap.xml\n`:'User-agent: *\nDisallow: /\n');
const routes=['','portfolio','bransjer','prosjekter','tjenester','kontakt','personvern'];
const industrySource=fs.readFileSync(path.join(root,'lib/industries.ts'),'utf8');const slugs=[...industrySource.matchAll(/\['[^']+','([^']+)'/g)].map(m=>'nettside-'+m[1]);
const urls=[...new Set([...routes,...slugs])].map(p=>`  <url><loc>${origin}/${p}</loc></url>`).join('\n');
fs.writeFileSync(path.join(dest,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
console.log(`Pages output prepared: ${records.length} demos in ${found}.`);
