// function a () {
//     
//     // var l = {
// //         o : 10
// //     };
// //     l.o = 11;
// //     console.log(l.o);
// //     
// //     for (var i =1; i< 5; i++)
// //         if(b() || c()){
// //             if (i == 4) return 5;
// //         };
// //     return d();
// }

// 
// 
// function d () {
//     return 8;
// }


var a = [1, 2, 3, 4];
a[1] = a[2];
function c(){return a[1]}

console.log(c());