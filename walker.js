'use strict'
module.exports = walker;

var esprima = require('esprima');
var escodege = require('escodegen');

var NAME = '__&&&&__';
var wrapTypes = ['CallExpression', 'LogicalExpression', 'AssignmentExpression', 'Identifier', 'UnaryExpression', 'BinaryExpression', 'MemberExpression'];


function walk(node, parent, property) {
    if (typeof node != 'object' || node == null) return;
    var props = Object.keys(node);
    for (var i in props) {
        if (props[i] == 'type'){
            wrapNode(node, parent, property);
        } else {
            walk(node[props[i]], pointer, props[i]);
        }
    }
}

function wrapNode(node, parent, prop) {
    if( ~ wrapTypes.indexOf(node.type) && ! specialConditions(node, parent, prop)) {            
        parent[prop] = returnReg(node, parent);
    }
}


// 'use strict'
// 
// // module.exports = walker;
// 
// var esprima = require('esprima');
// var escodegen = require ('escodegen');
// 
// var NAME = '______&&&&&&&&&';
// 
// var validProperties = ['expression', 'expressions', 'arguments', 'body'];
// var wrapTypes = ['CallExpression', 'LogicalExpression', 'AssignmentExpression', 'Identifier', 'UnaryExpression', 'BinaryExpression',  'MemberExpression'];
// var specialTypes = ['ReturnStatement'];
// var noWrapParentTypes = ['FunctionDeclaration'];
// 
// 
// module.exports = instrumentCode;
// var ranges = []
// 
// function instrumentCode(code, name) {
//     NAME = name;
//     
//     ranges = [];
//     var ast = esprima.parse(code, { range: true });
//     // console.log(require('util').inspect(ast, {colors:true}, 1000));
//     walk(ast);
//     
//     var instrumentedCode = escodegen.generate(ast);
//     require('fs').writeFileSync('./res.js', instrumentedCode);
//     return {
//         code : instrumentedCode,
//         ranges : ranges
//     }
//     
// }    
// 
// 

// 
// function specialConditions(node, parent, prop) {
//     if (parent && ~noWrapParentTypes.indexOf(parent.type)) {
//         return true;
//     }
//     if (node.type == 'Identifier') {
//         if (parent && parent.type == 'AssignmentExpression' && prop == 'right'){
//             return false;        
//         } 
//         if (parent && parent.type == 'LogicalExpression'){
//             return false;        
//         }          
//         return true;
//     }
//     if (node.type == 'MemberExpression') {
//         if (parent 
//             && (parent.type == 'AssignmentExpression') 
//             && prop == 'right'){
//             return false;       
//         }    
//         if (parent 
//             && (parent.type == 'ReturnStatement' || parent.type == 'LogicalExpression')){
//             return false;       
//         }       
//         return true;        
//     }
//         
//     return false;
// }
// 
// function walk(pointer, parent, prop) {
//     if(typeof pointer != 'object' ||  pointer === null) return false;
//     var props  = Object.keys(pointer); 
//     for (var i in props) {
//         if (props[i] == 'type'){ 
//             iterate(pointer, parent, prop);
//         }else {
//             walk(pointer[props[i]], pointer, props[i]);
//         }
//     }
// }
// 
// function returnReg(node, parent) {
//     if(!node.range){
//         return node;
//     }    
//     ranges.push(node.range);
//     return (
//      { type: 'CallExpression',
//        callee: { type: 'Identifier', name: NAME },
//        arguments: 
//         [ node,
//           { type: 'Literal',
//             value: node.range[0],
//             raw: node.range[0] },
//           { type: 'Literal',
//             value: node.range[1],
//             raw: node.range[1] } ] }
//     );
// }
// 
//                                     
