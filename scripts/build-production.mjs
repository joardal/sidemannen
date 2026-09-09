import fs from 'node:fs';import {spawnSync} from 'node:child_process';import path from 'node:path';import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export const productionEnv={...process.env,SITE_URL:'https://sidemannen.no',PUBLIC_LAUNCH:'true'};
function run(command,args,env=productionEnv){const result=spawnSync(command,args,{cwd:root,env,stdio:'inherit'});if(result.error)throw result.error;if(result.status!==0)throw new Error(`${command} ${args.join(' ')} failed with exit code ${result.status}`)}
export function buildProduction(){
 const vinext=path.join(root,'node_modules','vinext','dist','cli.js');
 if(!fs.existsSync(vinext))throw new Error('Vinext is not installed. Run npm install before building.');
 run(process.execPath,[path.join(root,'scripts/check-node.mjs')]);
 run(process.execPath,[vinext,'build']);
 run(process.execPath,[path.join(root,'scripts/postbuild.mjs')]);
}
if(path.resolve(process.argv[1]||'')===fileURLToPath(import.meta.url))try{buildProduction()}catch(error){console.error(error instanceof Error?error.message:error);process.exit(1)}
