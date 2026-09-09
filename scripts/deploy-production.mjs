import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';import {spawnSync} from 'node:child_process';import {buildProduction,productionEnv} from './build-production.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
try{
 buildProduction();
 const wrangler=path.join(root,'node_modules','wrangler','bin','wrangler.js');
 if(!fs.existsSync(wrangler))throw new Error('Wrangler is not installed. Run npm install before deploying.');
 const result=spawnSync(process.execPath,[wrangler,'pages','deploy','--cwd','cloudflare','--project-name','sidekick-studio','--branch','main'],{cwd:root,env:productionEnv,stdio:'inherit'});
 if(result.error)throw result.error;if(result.status!==0)throw new Error(`Wrangler deploy failed with exit code ${result.status}`);
}catch(error){console.error(error instanceof Error?error.message:error);process.exit(1)}
