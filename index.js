'use strict'

// module.exports = walker;

var esprima = require('esprima'),
	fs = require ('fs');
var escodegen = require ('escodegen');

var NAME = 'reg'

var validProperties = ['expression', 'expressions', 'arguments', 'body']
var wrapTypes = ['CallExpression', 'LogicalExpression', 'UnaryExpression'];
var specialTypes = ['ReturnStatement'];

var registry = require('./registry');
var reg = registry.register;


function walker(code) {


	var ast = esprima.parse(code, { range: true });


	console.log('----------------------new --------------------------------');
	console.log(require('util').inspect(ast, { colors: true }, 1000));
	console.log('----------------------WALKS --------------------------------');

	walk(ast);
	var instrumentedCode = escodegen.generate(ast);
	// instrumentedCode = 'var entered = [];'+instrumentedCode+'function ' + NAME + '(toReturn, from, to){entered.push([from, to]); console.log(entered)}'

	console.log(instrumentedCode);
	eval(instrumentedCode);
	
}


function iterate(node, parent, prop) {
	for (var i in wrapTypes) {
		if(node.type == wrapTypes[i]) {			
			parent[prop] = returnReg(node, parent);
			return;
		}
	}
}

function walk(pointer, parent, prop) {
	if(typeof pointer != 'object' ||  pointer === null) return false;
	var props  = Object.keys(pointer); 
	for (var i in props) {
		if (props[i] == 'type'){ 
			iterate(pointer, parent, prop);
		}else {
			walk(pointer[props[i]], pointer, props[i]);
		}
	}
}

function returnReg(node, parent) {
	if(!node.range){
		return node;
	}	

	return (
     { type: 'CallExpression',
       callee: { type: 'Identifier', name: NAME },
       arguments: 
        [ node,
          { type: 'Literal',
            value: node.range[0],
            raw: node.range[0] },
          { type: 'Literal',
            value: node.range[1],
            raw: node.range[1] } ] }
    );
}


var code = 'function a (){console.log("hello")}; a();';

walker(code);

console.log(registry.getResult());