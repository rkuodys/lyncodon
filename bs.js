function a () {
    c();
    return 6;
}

function c() {return (function (){return 2})()}


console.log(a());