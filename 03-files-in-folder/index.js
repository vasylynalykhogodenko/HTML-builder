const fs = require('fs').promises;

async function readFiles() {
  try {
    const files = await fs.readdir('../HTML-builder/03-files-in-folder/secret-folder/', 'utf-8');

    for (const file of files) {
      const filePath = `../HTML-builder/03-files-in-folder/secret-folder/${file}`;
      const stats = await fs.stat(filePath);

      if (stats.isFile()) {
        const fileSizeInKb = stats.size / 1024;
        console.log(`${file} - ${getFilesInfo(file)} - ${fileSizeInKb}kb`);
      }
    }
  } catch (error) {
    console.error('Error reading files: ', error);
  }
}

function getFilesInfo(fileName) {
  const parts = fileName.split('.');

  return parts.length > 1 ? parts[parts.length - 1] : '';
}

readFiles();
