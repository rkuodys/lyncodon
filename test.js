

var reg = require('./registry');


reg.register([4, 3]);

reg.register([1, 3]);

reg.register([2, 3]);

reg.register([4, 3]);

reg.register([5, 1]);
reg.register([4, 2]);

console.log(reg.getResult());