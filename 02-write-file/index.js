const fs = require('fs');
const path = require('path');
const { stdout ,exit, stdin} = process;
const dir = path.join(__dirname, 'text.txt'); 
const output = fs.createWriteStream(dir);
stdout.write(`text yours text)\n`);
stdin.on('data', data => {
  if(data.toString().trim() === 'exit'){
    stdout.write(`goodbye\n`);
    exit();
  }else{
    output.write(data);
  }
})
process.on('SIGINT', ()=>{
  stdout.write(`\ngoodbye\n`);
  exit();
})
// input.on('data', chunk => output.write(chunk));
// input.on('error', error => console.log('Error', error.message));