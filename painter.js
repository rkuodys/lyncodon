module.exports = painter;

var colors = {
    green : ['\x1B[42m', '\x1B[49m'],
    red : ['\x1B[41m', '\x1B[49m']
}

painter.merge = merge;
painter.paint = paint;

function painter () {
    
};


function paint(code, entered, all) {
    
    
    var i = entered.length;
    var begins = [], ends = [];
    if (! entered) return;
    sortArrays (entered); 
    if (! all) return;
    sortArrays (all);
    
    var steps = merge (entered, all);
       
    var coloredCode = colorCode(code, steps);
    return coloredCode;
}

function colorCode( code, steps) {
    if (steps.length == 0) return code;
    
    var i = steps.length, code;
    var lastBeginIndx = steps[i-1].range[1];
    while ( i-- ) {
        if (lastBeginIndx >= steps[i].range[1]) {
            code = insertColor(code, steps[i].range[0], steps[i].range[1], steps[i].color);            
            
            lastBeginIndx = steps[i].range[0];
        }
    }
    
    return code;   
}

function merge(green, red) {
    var i = j = 0, isIn,
        gL = green.length,
        rL = red.length;
    var merged = []; 
    while (i < gL || j < rL){
        
        if (i == gL){
            pushRemainingArray(merged, red, j);
            break;
        }// if (j == rL) pushRemainingArray(merged, green, i);
        
        if ( equalRanges(green[i].range, red[j])){
            
            merged.push({
                range : green[i].range,
                color : 'green'
            });
            i++;
            j++;
        } else if (isIn = isInside(green[i].range, red[j])) { // 1 - 1st is inside 2nd; 2 - 2nd is inside 1st, 0 - not inside each other
            
            if (isIn == 1){
                merged.push({
                    range : green[i].range,
                    color : 'green'
                });
                i++;
            } else {
                merged.push({
                    range : red[j],
                    color : 'red'
                });
                j++;
            }
        } else if (green[i].range[1] <= red[j][0]){
            merged.push({
                range : green[i].range,
                color : 'green'
            });
            i++;
        } else if (green[i].range[0] >= red[j][1]){
            merged.push({
                range : red[j],
                color : 'red'
            });
            j++;
        }
    } 
    return merged;
}

function equalRanges(range1, range2) {
    return range1 && range2 ?    
             (range1[0] == range2[0] && range1[1] == range2[1]) : false;
}

function isInside(range1, range2) { 
    if (range1[0] <= range2[0] && range1[1] >= range2[1]){
        return 2;
    } else if (range1[0] >= range2[0] && range1[1] <= range2[1]) {
        return 1;
    }
    return 0;
}

function pushRemainingArray(toArr, fromArr, i) {
    if (toArr.length == 0){
        toArr = fromArr;
        return;
    }
    
    var last = toArr[toArr.length -1 ].range;
    for (; i < fromArr.length; i++){
        if (! equalRanges(last, fromArr[i])){
            toArr.push({
                range : fromArr[i], 
                color : 'red'
            });
        }   
    }
}

function insertColor(code, from, to, color) {
    if ( ! (color in colors)) {
        console.error('No such color: ', color);
        return code;
    }
    return code.slice(0, from) + colors[color][0] + code.slice(from, to) + colors[color][1] + code.slice(to);
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

