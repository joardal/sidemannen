import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';import {runSeoSmoke} from './seo-smoke.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
// Vinext static export may use out/ instead of dist/client depending on version.
const candidates=['out','dist/client'];const found=candidates.find(p=>fs.existsSync(path.join(root,p,'index.html')));
if(!found)throw new Error('No static index.html was emitted.');
const dest=path.join(root,'dist/client');
if(found!=='dist/client')fs.cpSync(path.join(root,found),dest,{recursive:true});
let headers=fs.readFileSync(path.join(root,'public/_headers'),'utf8');
if(process.env.PUBLIC_LAUNCH==='true'){
 const lines=headers.replace(/\r\n/g,'\n').split('\n');const rootStart=lines.findIndex(line=>line.trim()==='/*');
 if(rootStart<0)throw new Error('Global /* block is missing from public/_headers.');
 for(let i=rootStart+1;i<lines.length&&(lines[i]===''||/^\s/.test(lines[i]));i++)if(lines[i].trim().toLowerCase()==='x-robots-tag: noindex, nofollow'){lines.splice(i,1);break}
 headers=lines.join('\n');
}
fs.writeFileSync(path.join(dest,'_headers'),headers);
const records=JSON.parse(fs.readFileSync(path.join(root,'lib/demos.json'),'utf8'));const allowed=new Set(records.map(d=>d.id));
const demoRoot=path.join(dest,'demos');if(fs.existsSync(demoRoot))for(const e of fs.readdirSync(demoRoot)){const target=path.resolve(demoRoot,e);if(!allowed.has(e)&&target.startsWith(demoRoot+path.sep))fs.rmSync(target,{recursive:true,force:true});}
const previewRoot=path.join(dest,'previews');if(fs.existsSync(previewRoot))for(const e of fs.readdirSync(previewRoot)){if(e.endsWith('.webp')&&!allowed.has(e.slice(0,-5)))fs.rmSync(path.join(previewRoot,e),{force:true});}
fs.writeFileSync(path.join(dest,'_routes.json'),JSON.stringify({version:1,include:['/api/*'],exclude:[]}));
const origin=(process.env.SITE_URL||'https://dev.sidemannen.pages.dev').replace(/\/$/,'');const publicLaunch=process.env.PUBLIC_LAUNCH==='true';
const htmlRoutes=[];for(const entry of fs.readdirSync(dest,{withFileTypes:true})){if(!entry.isFile()||!entry.name.endsWith('.html')||entry.name==='404.html')continue;const stem=entry.name.slice(0,-5);htmlRoutes.push(stem==='index'?'':stem)}
htmlRoutes.sort((a,b)=>a===''?-1:b===''?1:a.localeCompare(b,'nb'));
fs.writeFileSync(path.join(dest,'robots.txt'),publicLaunch?`User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${origin}/sitemap.xml\n`:'User-agent: *\nDisallow: /\n');
const urls=htmlRoutes.map(route=>`  <url><loc>${origin}/${route}</loc></url>`).join('\n');
fs.writeFileSync(path.join(dest,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
for(const configName of ['wrangler.json','wrangler.jsonc','wrangler.toml']){const target=path.join(dest,configName);if(fs.existsSync(target))fs.rmSync(target,{force:true});}
runSeoSmoke({dest,production:publicLaunch,expectedOrigin:origin});
console.log(`Pages output prepared and SEO-smoked: ${htmlRoutes.length} indexable routes, ${records.length} demos in ${found}.`);

