const calcModule = require('./calc');

var a = 6;
var b = 4;

var addResult = calcModule.add(a, b);
console.log("add result: ", addResult);

var subResult = calcModule.sub(a, b);
console.log("sub result: ", subResult);

var mulResult = calcModule.mul(a, b);
console.log("mul result: ", mulResult);

var divResult = calcModule.div(a, b);
console.log("div result: ", divResult);

console.log("add result: ", calcModule.add(a,b));

// foreach문에서 배열요소에 함수만 있다면 이 함수를 차례대로 호출하게 못하나?

// calculator = [calcModule.add(a,b), calcModule.sub(a,b), calcModule.mul(a, b), calcModule.div(a,b)];
// calculator.foreach(f => console.log("result: ", f));


// var calcArray = [
//     {num: "0", func: function() {
//         calcModule.add(a, b)
//     }},
//     {num: "1", func: function() {
//         calcModule.sub(a, b)
//     }},
//     {num: "2", func: function() {
//         calcModule.mul(a, b)
//     }},
//     {num: "3", func: function() {
//         calcModule.div(a, b)
//     }},
// ]