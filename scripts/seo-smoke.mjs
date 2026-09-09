import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
const productionOrigin='https://sidemannen.no';
const defaultDest=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist/client');
const fail=message=>{throw new Error(`SEO smoke failed: ${message}`)};
const read=(dest,file)=>{const target=path.join(dest,file);if(!fs.existsSync(target))fail(`${file} is missing`);return fs.readFileSync(target,'utf8')};
const block=(headers,pattern)=>{const lines=headers.replace(/\r/g,'').split('\n');const start=lines.findIndex(line=>line.trim()===pattern);if(start<0)return '';const out=[];for(let i=start+1;i<lines.length;i++){if(lines[i]&&!/^\s/.test(lines[i]))break;out.push(lines[i])}return out.join('\n')};
const htmlFiles=dest=>{const out=[];const walk=dir=>{for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const full=path.join(dir,entry.name);const rel=path.relative(dest,full).replaceAll('\\','/');if(entry.isDirectory()){if(rel==='demos'||rel.startsWith('demos/'))continue;walk(full)}else if(entry.name.endsWith('.html')&&!/(^|\/)(404|_not-found)\.html$/.test(rel))out.push(full)}};walk(dest);return out};
const demoFiles=dest=>{const root=path.join(dest,'demos');if(!fs.existsSync(root))return [];return fs.readdirSync(root,{withFileTypes:true}).filter(e=>e.isDirectory()).map(e=>path.join(root,e.name,'index.html')).filter(fs.existsSync)};
const canonicalFromHtml=html=>{const tag=html.match(/<link\b[^>]*\brel=["']canonical["'][^>]*>/i)?.[0];return tag?.match(/\bhref=["']([^"']+)/i)?.[1]};
export function runSeoSmoke({dest=defaultDest,production,expectedOrigin}={}){
 const index=read(dest,'index.html');const sitemap=read(dest,'sitemap.xml');const robots=read(dest,'robots.txt');const headers=read(dest,'_headers');
 if(production===undefined){production=index.includes(`href="${productionOrigin}`)||sitemap.includes(`<loc>${productionOrigin}`)}
 expectedOrigin=(expectedOrigin|| (production?productionOrigin:'https://dev.sidemannen.pages.dev')).replace(/\/$/,'');
 const rootHeaders=block(headers,'/*');const demoHeaders=block(headers,'/demos/*');
 if(!demoHeaders.toLowerCase().includes('x-robots-tag: noindex'))fail('/demos/* must retain X-Robots-Tag: noindex');
 for(const file of demoFiles(dest)){if(!fs.readFileSync(file,'utf8').toLowerCase().includes('noindex'))fail(`${path.relative(dest,file)} lost its noindex meta`)}
 if(production){
  if(expectedOrigin!==productionOrigin)fail(`production origin must be ${productionOrigin}, received ${expectedOrigin}`);
  if(rootHeaders.toLowerCase().includes('x-robots-tag: noindex'))fail('global _headers rule still applies noindex in production');
  if(!block(headers,'https://sidekick-studio.pages.dev/*').toLowerCase().includes('x-robots-tag: noindex'))fail('production _headers must noindex the primary pages.dev host');
  if(!block(headers,'https://:version.sidekick-studio.pages.dev/*').toLowerCase().includes('x-robots-tag: noindex'))fail('production _headers must noindex version pages.dev hosts');
  for(const host of ['https://sidemannen.pages.dev/*','https://:version.sidemannen.pages.dev/*'])if(!block(headers,host).toLowerCase().includes('x-robots-tag: noindex'))fail(`production _headers must noindex ${host}`);
  if(/disallow:\s*\/demos\//i.test(robots))fail('robots.txt must allow crawlers to reach demo noindex directives');
  if(!/disallow:\s*\/api\//i.test(robots))fail('robots.txt must disallow /api/');
  if(!robots.includes(`Sitemap: ${productionOrigin}/sitemap.xml`))fail('robots.txt sitemap URL is not production canonical');
  if(sitemap.includes('pages.dev')||!sitemap.includes(`<loc>${productionOrigin}/`))fail('sitemap contains a non-production origin');
  if(sitemap.includes('/demos/'))fail('demo URLs must not appear in sitemap');
  const pages=htmlFiles(dest);for(const file of pages){const html=fs.readFileSync(file,'utf8');const rel=path.relative(dest,file);if(html.includes('pages.dev'))fail(`${rel} contains pages.dev`);if(/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html))fail(`${rel} is noindex in production`);const canonical=canonicalFromHtml(html);if(!canonical)fail(`${rel} has no canonical`);if(!canonical.startsWith(productionOrigin))fail(`${rel} canonical is ${canonical}`)}
  const sitemapLocs=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match=>match[1]);if(sitemapLocs.length!==pages.length)fail(`sitemap has ${sitemapLocs.length} URLs but ${pages.length} static HTML pages are indexable`);
 }else{
  if(!rootHeaders.toLowerCase().includes('x-robots-tag: noindex'))fail('preview _headers must apply global noindex');
  if(!/disallow:\s*\/\s*$/im.test(robots))fail('preview robots.txt must disallow all crawling');
  if(!index.toLowerCase().includes('noindex'))fail('preview index.html must contain noindex');
 }
 if(!block(headers,'/_next/static/*').toLowerCase().includes('immutable'))fail('/_next/static/* must use immutable browser caching');
 console.log(`SEO smoke passed (${production?'production':'preview'}): ${expectedOrigin}`);
}
if(path.resolve(process.argv[1]||'')===fileURLToPath(import.meta.url)){
 try{const auto=process.argv.includes('--auto');const production=process.argv.includes('--production')?true:process.argv.includes('--preview')?false:auto?undefined:process.env.PUBLIC_LAUNCH==='true';runSeoSmoke({production,expectedOrigin:process.env.SITE_URL})}catch(error){console.error(error instanceof Error?error.message:error);process.exit(1)}
}
