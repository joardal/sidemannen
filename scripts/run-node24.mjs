import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

function compatible(version){
 const [major,minor]=version.replace(/^v/,'').split('.').map(Number);
 return major>22||(major===22&&minor>=13);
}

function runtime(){
 if(compatible(process.version))return process.execPath;
 const candidates=[];
 if(process.env.SIDEMANNEN_NODE)candidates.push(process.env.SIDEMANNEN_NODE);
 if(process.platform==='win32'&&process.env.USERPROFILE)candidates.push(path.join(process.env.USERPROFILE,'scoop','apps','nodejs-lts','current','node.exe'));
 for(const candidate of candidates){
  if(!candidate||!fs.existsSync(candidate))continue;
  const check=spawnSync(candidate,['--version'],{encoding:'utf8'});
  if(check.status===0&&compatible((check.stdout||'').trim()))return candidate;
 }
 throw new Error(`Node >=22.13.0 is required. Default runtime is ${process.version}, and no compatible fallback was found.`);
}

const [, , target, ...args]=process.argv;
if(!target)throw new Error('Usage: node scripts/run-node24.mjs <script> [...args]');
const result=spawnSync(runtime(),[path.resolve(target),...args],{cwd:process.cwd(),env:process.env,stdio:'inherit'});
if(result.error)throw result.error;
process.exit(result.status??1);
