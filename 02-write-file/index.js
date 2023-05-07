const fs = require('fs');
const path = require('path');
const { stdout ,exit, stdin} = process;
const dir = path.join(__dirname, 'text.txt'); 
const output = fs.createWriteStream(dir);
stdout.write(`text yours text)\n`);
stdin.on('data', data => {
  if(data.toString().trim() === 'exit'){
    exit();
  }else{
    output.write(data);
  }
})
process.on('SIGINT', ()=>{
  exit();
})
process.on('exit', ()=>{
  stdout.write(`\ngoodbye\n`);
  exit();
})
