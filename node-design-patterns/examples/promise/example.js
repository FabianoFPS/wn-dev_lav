const fs = require('fs');
const util = require('util');

const fileContent = fs.readFileSync(__filename);
console.log('fileContent', fileContent);
console.log('test 1');

// fs.readFile(__filename, (err, data) => console.log('async fileContent', data));

const readFilePromise = util.promisify(fs.readFile);
readFilePromise(__filename).then(fileData => console.log(fileData));

console.log('test 2');
