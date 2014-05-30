var assert = require('assert');

describe ('Walker', function (){
  var walker = require('../walker');
  
  it('should return correctly instrumented calls of function', function(){
      var code = 'function a(){ console.log("test")}; a();';
      var walked = walker(code, '***');
      assert.equal(walked.code, "function a() {\n    ***(***(console.log, 14, 25)('test'), 14, 33);\n}\n;\n***(a(), 36, 39);");
      var ranges = [[14, 33], [14, 25], [36,39]];
      assert.deepEqual(walked.ranges, ranges);
  });  
  
  it('should instrument unary expressions', function () {
      var code = 'typeof a';
      var walkedCode = walker(code, '***')
      assert.equal(walkedCode.code, '***(typeof a, 0, 8);');
      assert.deepEqual(walkedCode.ranges, [[0, 8]]);
  })
  
})