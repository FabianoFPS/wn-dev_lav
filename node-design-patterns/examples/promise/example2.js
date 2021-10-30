const NPromise = require('./NewPromise.js');

setTimeout(() => console.log('setTimeout'), 0);

// new Promise(resolve => resolve('Promise 1')).then((res) => console.log(res))
new Promise(resolve => resolve()).then(() => console.log('Prmise 1'));

new NPromise(resolve => resolve('Promise 2')).then(res => console.log(res));

console.log('sync part');
