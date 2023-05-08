'use strict';
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'text.txt'); 
let data ='';
const stream = fs.createReadStream(dir, 'utf-8');
stream.on('data', chunk => data += chunk);
stream.on('end', () => console.log('End', data));
stream.on('error', error => console.log('Error', error.message));

