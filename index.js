'use strict'

// module.exports = walker;
var esprima = require('esprima');
var painter = require('./painter');
var walker = require('./walker.js');
var fs = require ('fs');

function b() {
    return false;    
}
function c() {
    return false;
}




var code = fs.readFileSync('./test.js', 'utf8');
var originalCode = code;

var walkResults = walker(code, 'bybys');

var instrumentedCode = walkResults.code;
var instrumentedRanges = walkResults.ranges;

var registry = require('./registry');

// var ________ = registry.register;

global.bybys = registry.register;

// console.log(instrumentedCode);

var _suq = {define : function(){}}
fs.writeFileSync('./res.js', instrumentedCode);
// console.log(instrumentedCode);

eval(instrumentedCode);
var results = registry.getResults();

console.log(painter.paint(originalCode, results, instrumentedRanges));  

console.log(registry.getResults());
// var coloredCode = doColors(originalCode, results)

