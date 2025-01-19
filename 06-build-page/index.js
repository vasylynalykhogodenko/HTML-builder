const fs = require('fs');
const path = require('path');

async function buildPage() {
  try {
    const templatePath = '06-build-page/template.html';
    const distDir = '06-build-page/project-dist/';
    const componentsDir = '06-build-page/components/';
    const assetsDir = '06-build-page/assets/';

    await fs.promises.mkdir(distDir, { recursive: true });

    const templateContent = await fs.promises.readFile(templatePath, 'utf-8');
    const templateTags = getAllTags(templateContent);
    const replacedContent = await replaceTags(templateContent, templateTags, componentsDir);

    await fs.promises.writeFile(path.join(distDir, 'index.html'), replacedContent);

    console.log('Building styles...');
    const mergeStylesModule = require('../05-merge-styles/index');
    await mergeStylesModule.mergeStyles();

    console.log('Copying assets...');
    const copyDirModule = require('../04-copy-directory/index');
    await copyDirModule.copyDir(assetsDir, path.join(distDir, assetsDir));

    console.log('Build completed successfully!');
  } catch (err) {
    console.error('Error building page:', err);
  }
}

function getAllTags(content) {
  const regex = /\{\{([^\}]+)\}\}/g;
  const tags = [];
  let match;

  while ((match = regex.exec(content)) !== null) {
    tags.push(match[1].trim());
  }

  return tags;
}

async function replaceTags(content, tags, componentsDir) {
  let replacedContent = content;

  for (const tag of tags) {
    const componentPath = path.join(componentsDir, `${tag}.html`);
    const componentContent = await fs.promises.readFile(componentPath, 'utf-8');

    replacedContent = replacedContent.replace(new RegExp(`\{\{${tag}\}\}`, 'g'), componentContent);
  }

  return replacedContent;
}

buildPage();
