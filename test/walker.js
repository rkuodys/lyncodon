var assert = require('assert');

describe ('first test', function (){
  var code = 'function a(){ console.log("test")}; a();';
  var walker = require('../walker');
  it('should return correctly instrumented code with ranges array', function(){
      var walked = walker(code, '***');
      assert.equal(walked.code, "function a() {\n    ***(***(console.log, 14, 25)('test'), 14, 33);\n}\n;\n***(a(), 36, 39);");
      var ranges = [[14, 33], [14, 25], [36,39]];
      assert.deepEqual(walked.ranges, ranges);
  });  
})