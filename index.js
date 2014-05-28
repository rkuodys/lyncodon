'use strict'

// module.exports = walker;
var esprima = require('esprima');

function b() {
    return false;    
}
function c() {
    return false;
}



var walker = require('./walker.js');
var fs = require ('fs');

var code = fs.readFileSync('./test.js', 'utf8');
var originalCode = code;

var instrumentedCode = walker(code, '________');

var registry = require('./registry');

var ________ = registry.register;

// console.log(instrumentedCode);

var _suq = {define : function(){}}
fs.writeFileSync('./res.js', instrumentedCode);
console.log(instrumentedCode);
eval(instrumentedCode);
var results = registry.getResults();
  

console.log(registry.getResults());
// var coloredCode = doColors(originalCode, results)

