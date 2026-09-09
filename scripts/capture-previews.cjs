const fs=require('fs');const path=require('path');
const runtime=process.env.SIDEKICK_NODE_MODULES||'C:/Users/ASUS-PC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const {chromium}=require(path.join(runtime,'playwright'));const sharp=require(path.join(runtime,'sharp'));
(async()=>{const root=path.resolve(__dirname,'..');fs.mkdirSync(path.join(root,'public/previews'),{recursive:true});
const all=JSON.parse(fs.readFileSync(path.join(root,'lib/demos.json'),'utf8'));
const priority=['fotograf-fotograf1','arkitekter-arkitek1','tannlege-lumina-smile-studio'];
let items=[...priority.map(id=>all.find(d=>d.id===id)).filter(Boolean),...all.filter(d=>!priority.includes(d.id))];
if(process.argv.includes('--featured'))items=items.slice(0,3);
const browser=await chromium.launch({headless:true,channel:"chrome"});let count=0;const failures=[];
await Promise.all(Array.from({length:4},async()=>{const context=await browser.newContext({viewport:{width:1440,height:1020},deviceScaleFactor:1,reducedMotion:'reduce'});const page=await context.newPage();page.on('dialog',d=>d.dismiss());
while(items.length){const d=items.shift();const file=path.join(root,'public',d.image);if(fs.existsSync(file)&&!process.argv.includes('--refresh'))continue;try{
await page.goto('http://127.0.0.1:4311'+d.url,{waitUntil:'load',timeout:25000});
await page.evaluate(async()=>{await Promise.race([document.fonts.ready,new Promise(r=>setTimeout(r,2500))]);});
await page.waitForTimeout(4500);
const buffer=await page.screenshot({fullPage:false});await sharp(buffer).resize(1200,850).webp({quality:79}).toFile(file);count++;if(count%15===0)console.log('Generated '+count+' previews');
}catch(e){failures.push({id:d.id,error:e.message});}}await context.close();}));
await browser.close();fs.writeFileSync(path.join(root,'work/preview-report.json'),JSON.stringify({generated:count,failures},null,2));console.log(JSON.stringify({generated:count,failures}));})().catch(e=>{console.error(e);process.exit(1)});

