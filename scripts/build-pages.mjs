import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export function pagesEnvironment(env = process.env) {
  const production = env.CF_PAGES_BRANCH === 'main';
  return {
    ...env,
    SITE_URL: production ? 'https://sidemannen.no' : 'https://dev.sidemannen.pages.dev',
    PUBLIC_LAUNCH: production ? 'true' : 'false',
  };
}

export function buildPages() {
  const env = pagesEnvironment();
  console.log(`Building ${env.CF_PAGES_BRANCH || 'local preview'} for ${env.SITE_URL}`);
  for (const target of ['scripts/check-node.mjs', 'node_modules/vinext/dist/cli.js', 'scripts/postbuild.mjs']) {
    const args = target.includes('/vinext/') ? [path.join(root, target), 'build'] : [path.join(root, target)];
    const result = spawnSync(process.execPath, args, {cwd: root, env, stdio: 'inherit'});
    if (result.error) throw result.error;
    if (result.status !== 0) throw new Error(`${target} failed (${result.status})`);
  }
}

if (path.resolve(process.argv[1] || '') === fileURLToPath(import.meta.url)) {
  try { buildPages(); } catch (error) { console.error(error.message); process.exit(1); }
}
