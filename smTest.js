var sm = require('sandboxed-module');
var lyncodon = require('./lyncodon');


var originSource, instrumentedRanges= [];

function b(argument) {
    return false;
    
};
function c() {
    return false;
}




sm.require('./test.js',{ 
    globals : {
        '______' : lyncodon.register,
                b: b,
                c: c
    },
    sourceTransformers : {
        lyncodon : lyncodon 
    }
});

b = function () {return true};

sm.require('./test.js',{ 
    globals : {
        '______' : lyncodon.register,
            b    : b,
            c    : c
    },
    sourceTransformers : {
        lyncodon : lyncodon 
    }
});






// var results = registry.getResults()// ;
// console.log(results);
// console.log(instrumentedRanges);
console.log(lyncodon.paint());  
