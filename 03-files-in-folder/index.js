const fs = require('fs');
const path = require('path');


const dirSecretFolder = path.join(__dirname, 'secret-folder'); 
console.log(dirSecretFolder);
fs.readdir(dirSecretFolder, { withFileTypes: true },function (error, array){
  if (error) {
    throw error;
  } else {
    console.log(array)
  }
})


