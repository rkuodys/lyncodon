module.exports = painter;

var colors = {
    green : ['\x1B[42m', '\x1B[49m'],
    red : ['\x1B[41m', '\x1B[49m']
}


function painter(code, entered, instrumented) {
    var i = entered.length;
    
    while (i--) {
        begins.push(entered[i].range[0]);
        ends.push(entered[i].range[1]);
    }
    
    _sort(begins);
    _sort(ends);

    colorCode(code, begin, end);
    console.log(begins);  
    
}

function (code, begins, ends){
    var lenBeg = begins.length;
    var lenEnd = ends.length;
    while ( lenBeg || lenEnd){
        
    }
    
}

function _sort(array) {
    var l = array.length -1;
    var swapped = 1;
    while(swapped) {
        swapped = 0;
        for (var i = 0; i < l; i++) {
            if (array[i] > array[i+1]){
                var temp = array[i]; 
                array[i] = array[i+1]
                array[i+1] = temp;
                swapped ++;
            }else if (array[i] == array[i+1]){
                array.splice(i, i+1);
                swapped ++;    
            }
        
        }
    }   
    
}