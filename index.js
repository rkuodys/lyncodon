'use strict'

// module.exports = walker;

var walker = require('./walker.js');
var fs = require ('fs');

var code = fs.readFileSync('./test.js', 'utf8');
console.log(code);
console.log('-----start-----');

var instrumentedCode = walker(code, '________');
console.log(instrumentedCode)
var registry = require('./registry');

var ________ = registry.register;
eval(instrumentedCode);



console.log(registry.getResults());
