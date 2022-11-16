var _ast = require("@webassemblyjs/ast");
const {print} = require("@webassemblyjs/wast-printer")
console.log('_ast: ', _ast);
console.log(print(_ast));