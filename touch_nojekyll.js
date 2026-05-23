const shell = require('shelljs');
const path = require('path');

// Create .nojekyll in the build output directory (prevents Jekyll inside docs/)
const buildDir = path.resolve(__dirname, 'docs');
shell.touch(path.join(buildDir, '.nojekyll'));

// Also keep .nojekyll at repo root so GitHub Pages never runs Jekyll
// on the master branch even if source is temporarily set to branch/root
shell.touch(path.join(__dirname, '.nojekyll'));

console.log('.nojekyll created in docs/ and repo root.');
