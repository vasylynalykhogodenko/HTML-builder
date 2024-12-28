const fs = require('fs').promises;
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Welcome! Please enter your message. Type exit to quit the program.');

rl.on('line', async (input) => {
  if (input.toLowerCase() === 'exit') {
    console.log('Farewell!');
    rl.close();
    return;
  }

  try {
    await fs.appendFile('./02-write-file/output.txt', input + '\n', { flag: 'a+' });
    console.log('Text was added to the file.');
  } catch (error) {
    console.error('Error writing to file: ', error);
  }
});
