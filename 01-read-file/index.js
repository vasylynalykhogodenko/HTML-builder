const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(filePath, 'utf-8');

let data = '';

readStream.on('data', (chunk) => (data = data + chunk));
readStream.on('end', () => console.log(data));
readStream.on('error', (error) => console.error('Error reading file:', error));
