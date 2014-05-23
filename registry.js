

var calls = [];
module.exports = Registry;

Registry.register = register;
Registry.getResult = getResult;



function Registry() {

}

function register(toReturn, from, to) {
    console.log(from, to);
	calls.push([from, to]);
    return toReturn;
}

function getResult() {
	sort(calls);
	return calls;
    
}

function sort(array) {
	var changed = true;
	var len = array.length;
	while (changed) {
		changed = false;
		for (var i = 0; i < len-1; i++) {
			// if (array[i][0] > array[i+1][0] ||(array[i][0] == array[i+1][0] &&  array[i][1] > array[i+1][1])){
//                 var temp = array[i+1];
//                 array[i+1] = array[i];
//                 array[i] = temp;
//                 changed = true;
//             }
		}
	}
}
