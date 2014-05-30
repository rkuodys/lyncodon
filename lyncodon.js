
var registry = require('./registry');
var painter = require('./painter');
var originalSource, instrumentedRanges;
var walker = require('./walker.js');

function lyncodon(source) {
    originalSource = source;
    
    
    var walkResults = walker(source, '______');
    var instrumentedCode = walkResults.code;
    instrumentedRanges = walkResults.ranges;
    
    return instrumentedCode;    
}

function paint() {
    return painter.paint(originalSource, registry.getResults(), instrumentedRanges);
}

lyncodon.getResults = registry.getResults;
lyncodon.paint = paint; 
lyncodon.register = registry.register;


module.exports = lyncodon;
