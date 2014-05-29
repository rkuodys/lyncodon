module.exports = painter;

var colors = {
    green : ['\x1B[42m', '\x1B[49m'],
    red : ['\x1B[41m', '\x1B[49m']
}


function painter(code, entered, instrumented) {
    var i = entered.length;
    var begins = [], ends = [];
    if (! entered) return;
    sortArrays (entered); 
   
    var coloredCode = colorCode2(code, entered);
   
    // while (i--) {
 //        begins.push(entered[i].range[0]);
 //        ends.push(entered[i].range[1]);
 //    }
 //    
 //    _sort(begins);
 //    _sort(ends);

    // var coloredCode = colorCode(code, begins, ends);
    console.log(coloredCode);
}

// function colorCode (code, begins, ends){
//     var currBeg = begins.length ;
//     var currEnd = ends.length;
//     var oldBeg  = -1, oldEnd = -1;
//     var count  = 0;
//     while ( ~currBeg && ~currEnd){
//               
//         var next = getBeginAndEnd (begins, currBeg -1,  ends, currEnd -1 );
//         console.log(next);
//         
//         currBeg = next.newBegIndx;
//         currEnd = next.newEndIndx;
//         var front = next.begin;
//         var end = next.end;
//         code = code.slice(0, front) + colors.green[0] + code.slice(front, end) + colors.green[1] + code.slice(end); 
//      }
//      return code;
// }


function colorCode2( code, entered) {
    var i = entered.length, code;
    var lastBeginIndx = entered[i-1][1];
    while ( i-- ) {
        if (lastBeginIndx >= entered[i][1]) {
            code = insertColor(code, entered[i][0], entered[i][1], 'green');            
            console.log(code);
            lastBeginIndx = entered[i][0];
        }
    }
    
    return code;   
}

function insertColor(code, from, to, color) {
    if ( ! color in colors) {
        console.error('No such color');
        return code;
    }
    return code.slice(0, from) + colors[color][0] + code.slice(from, to) + colors[color][1] + code.slice(to);
}

function getBeginAndEnd(begins, currBeg, ends, currEnd) {
    var next = {
        newBegIndx : -1,
        newEndIndx : -1,
        begin : 0,
        end : 0
    };
    if(currBeg < 0){
        currBeg = 0;
    } 
    if(currEnd < 0){
        return next;
    } 
    console.log(currBeg, currEnd, begins, ends);
    
    if(begins[currBeg] > ends[currEnd] ){
        getBeginAndEnd (begins, currBeg - 1, ends, currEnd);
    }else if (begins[currBeg] == ends[currEnd] ){
        return getBeginAndEnd(begins, currBeg - 1, ends, currEnd);
    }else { // begin[currBeg] < ends[currEnd];
        console.log(currBeg, currEnd);
        if( (currEnd > 0 && begins[currBeg] >= ends[currEnd - 1]) || currEnd == 0) {
            next.begin = begins[currBeg];
            next.end = ends[currEnd];
            next.newBegIndx = currBeg;
            next.newEndIndx = currEnd;
        } else {
            return getBeginAndEnd(begins, currBeg, ends, currEnd - 1);
        }
    }
    return next;
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


function sortArrays(array) {
    var l = array.length -1;
    var swapped = 1;
    while(swapped) {
        swapped = 0;
        for (var i = 0; i < l; i++) {
    
            if (array[i][0] > array[i+1][0]){
                var temp = array[i]; 
                array[i] = array[i+1]
                array[i+1] = temp;
                swapped ++;
            }else if (array[i][0] == array[i+1][0] && (array[i][1] > array[i+1][1])){
                var temp = array[i]; 
                array[i] = array[i+1]
                array[i+1] = temp;
                swapped ++;    
            }
        
        }
    }   
}

sortArrays(array);
// 
var originalCode = "123456789";
var entries = [[1, 4], [4, 5], [1, 9]];
painter(originalCode, entries); 