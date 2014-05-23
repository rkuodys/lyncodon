
var calls = [];

module.exports = Registry;

Registry.register = register;
Registry.getResults = getResults;



function Registry() {    
}

function register(toReturn, from, to) {
	calls.push([from, to]);
    return toReturn;
}

function getResults() {
	
    sort(calls);
    var len = calls.length;
    var results = [], count = 0;
    
    for (var i = 0; i < len - 1; i++){
        count++;
        if( calls[i][0] != calls[i+1][0] || calls[i][1] != calls[i+1][1]){
            results.push({
                range : calls[i],
                calls : count
            });
            count = 0;
        }
    }
    
    results.push({
        range : calls[i],
        calls : count+1
    });
    	    
    return results;
    
}

function sort(array) {
	var changed = true;
	var len = array.length;
	while (changed) {
		changed = false;
		for (var i = 0; i < len-1; i++) {
            if (array[i][0] > array[i+1][0] ||(array[i][0] == array[i+1][0] &&  array[i][1] > array[i+1][1])){
                var temp = array[i+1];
                array[i+1] = array[i];
                array[i] = temp;
                changed = true;
            }
		}
	}
}
