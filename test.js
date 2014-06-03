var a = {
    b : {
        c : function () {
            return 5;
        }
    }
}
var d = undefined;


d && a.b && (d=5);

console.log(d);    
