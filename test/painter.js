var assert = require('assert');


describe('First test', function(){
   it('should return correctly merged arrays', function(){
        var merge = require('../painter').merge;
        var green = [{range:[1, 5]}, {range:[1, 9]}, {range:[5, 7]}, {range:[10, 20]}, {range:[19, 20]}];
        var red = [[1,5], [1,9], [5,7], [7,9], [10,15], [10, 20], [15, 19], [19,20]];
        
        var merged = [{range : [1,5], color:"green"}
                    , {range : [1,9], color:"green"}
                    , {range : [5,7], color:"green"}
                    , {range : [7,9], color:"red"}
                    , {range : [10,15], color:"red"} 
                    , {range : [10,20], color: "green"} 
                    , {range : [15,19], color:"red"}  
                    , {range : [19,20], color:"green"}  
                        ];          
        assert.deepEqual(merge(green, red), merged);
   });
   it('should return correctly colored code', function() {
       var paint = require('../painter').paint;
       var code = 'function a(){ console.log("test")}; a();';
       var all = [[14, 33], [14, 25], [25, 30],  [36,39]];
       var entered = [{range: [14, 25], count : 1}, {range:[14, 33], count : 1}];
       var coloredCode = paint(code, entered, all);
       var answerCode = 'function a(){ \x1B[42mconsole.log\x1B[49m\x1B[41m("tes\x1B[49mt")}; \x1B[41ma()\x1B[49m;'
       assert.equal(coloredCode, answerCode);
       
   }) 
});