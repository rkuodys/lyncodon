function a (f, g) {
    console.log(9);
    
    for (var i =1; i< 5; i++)
        if(b() || c()){
            if (i == 4) return 5;
        };
    return d();
}


function d () {
    return 8;
}

console.log(a());