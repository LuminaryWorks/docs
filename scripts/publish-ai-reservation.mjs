import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const outDir = path.join(root, 'doc_build');
if (!fs.existsSync(outDir)) {
  console.error('doc_build is missing; rspress build did not produce output');
  process.exit(1);
}

const publicDir = fs.existsSync(path.join(root, 'docs/public/robots.txt'))
  ? path.join(root, 'docs/public')
  : path.join(root, 'public');

fs.copyFileSync(path.join(publicDir, 'robots.txt'), path.join(outDir, 'robots.txt'));
fs.cpSync(path.join(publicDir, '.well-known'), path.join(outDir, '.well-known'), {
  recursive: true,
});
