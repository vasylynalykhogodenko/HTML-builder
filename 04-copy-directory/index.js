const fs = require('fs').promises;

async function copyDir(sourceDir, destDir) {
  try {
    await fs.mkdir(destDir, { recursive: true });

    const entries = await fs.readdir(sourceDir);

    for (const entry of entries) {
      const sourcePath = `${sourceDir}/${entry}`;
      const destPath = `${destDir}/${entry}`;

      const stats = await fs.stat(sourcePath);

      if (stats.isDirectory()) {
        await copyDir(sourcePath, destPath);
      } else {
        await fs.copyFile(sourcePath, destPath);
      }
    }
  } catch (err) {
    console.error(`Error copying directory: ${err}`);
  }
}

const sourceDir = '04-copy-directory/files';
const destDir = '04-copy-directory/files-copy';

copyDir(sourceDir, destDir)
  .then(() => console.log('Directory copied successfully!'))
  .catch((err) => console.error('Error:', err));
