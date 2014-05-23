'use strict'

// module.exports = walker;

var walker = require('./walker.js');
var fs = require ('fs');

var code = fs.readFileSync('./test.js', 'utf8');
console.log(code);
console.log('-----start-----');

var instrumentedCode = walker(code, 'daFuck');
console.log(instrumentedCode)
var registry = require('./registry');
// var reg = registry.register;

var daFuck = registry.register;
eval(instrumentedCode);



console.log(registry.getResults());
