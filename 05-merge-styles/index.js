const fs = require('fs').promises;
const path = require('path');

async function mergeStyles() {
  try {
    const stylesDir = '05-merge-styles/styles/';
    const distDir = '05-merge-styles/project-dist/';
    const bundleFile = 'bundle.css';

    const entries = await fs.readdir(stylesDir);
    const styles = [];

    for (const entry of entries) {
      const entryPath = path.join(stylesDir, entry);
      const stats = await fs.stat(entryPath);

      if (stats.isFile() && path.extname(entry) === '.css') {
        const styleContent = await fs.readFile(entryPath, 'utf-8');
        styles.push(styleContent);
      }
    }

    await fs.mkdir(distDir, { recursive: true });
    await fs.writeFile(path.join(distDir, bundleFile), styles.join('\n'));

    console.log('Styles merged successfully!');
  } catch (err) {
    console.error('Error merging styles:', err);
  }
}

mergeStyles();
