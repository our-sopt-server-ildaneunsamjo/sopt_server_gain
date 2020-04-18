// 4.18 세미나 실습 자료
// 1. 변수 재선언 실습
var vv = 123;
var vv = 321;
console.log("vv : ", vv);

// let ll = 123;
// let ll = 321; // let 타입은 변수 재선언 불가능
// console.log("ll : ", ll);

// const cc = 123;
// const cc = 321; // const 타입 재선언 불가능
// console.log("cc : ", cc);


// 2. 변수 재할당 실습
var vv = 'abc';
vv = 'def';
console.log("vv : ", vv);

let ll = 'abc';
ll = 'def'; // let 타입 변수 값 재할당 가능
console.log("ll : ", ll);

// const cc = 'abc';
// cc = 'def'; // cannot assign to constant variable
// console.log("cc : ", cc);

// 3. 변수 초기화 실습
var vv, v; // 초기화 값 설정 안해도 에러 x
console.log("vv : ", vv, ", v : ", v);

let l;
console.log("l : ", l);

const c = 10;
console.log("c : ", c);

// 4. function 범위 실습
function funcScope(){
    var v1 = 123;
    if(true){
        var v2 = 123;
        let ll = 'abc';
        console.log('let은 Block Scope, 11 : ', 11);
    }
    console.log('let은 Block Scope, 11 : ', ll); // def 값
    console.log('var은 function Scope, v2 : ', v2);
}

funcScope();

// 1. 배열의 선언 실습
var server1 = ['김혜리', '손예지', 43, null, true]; //배열 리터럴 이용
var server2 = Array('신윤재', '유가희', 13); // Array 객체의 생성자를 이용
var server3 = new Array("이현주", "조충범", false, undefined); // new 연산자를 이용한 Array 객체 생성

console.log('server1: ', server1);
console.log('server2: ', server2);
console.log('server3: ', server3);

// 2. 배열의 추가 실습
server1.push(123); // 배열 요소 추가
server2[server2.length] = "456"; // length 프로퍼티 이용
server3[99] = "server3"; // 특정 인덱스를 지정하여 추가

console.log('server1: ', server1);
console.log('server2: ', server2);
console.log('server3: ', server3);

// 3. 배열의 순회 실습
// for-of
let str1 = 'server1에는 "';
for(var item of server1){
    str1 += item + ', ';
}
str1 += '"이 들어있네요';
console.log(str1);

// for-in
let str2 = 'server2에는 "';
for(var item in server2){
    str2 += server2[item] + ', ';
}
str2 += '"이 들어있습니다';
console.log(str2);

// forEach
let str3 = 'server3에는 "';
server3.forEach(item => str3 += item + ', ');
str3 += '"이 들어있습니다';
console.log(str3);

// 함수 선언식 실습
function addNum(x, y){
    console.log(x + y);
}
addNum(3, 5);

// 함수 표현식 실습
var addStr = function(x, y){
    console.log(x + y);
}
addStr('함수', '표현식');

// 화살표 함수
var addBool = (x, y) => console.log(x + y);
// 중괄호 없이도 가능 
addBool(true, false);

// 1. json 객체 실습
var sopt = {
    name : 'our sopt',
    slogan : 'we lead our sopt',
    part : ['plan', 'design', 'android', 'ios', 'server'],
    number : 180,
    printName : function() {
        console.log('name : ', this.name);
    },
    printNum : function() {
        console.log('number : ', this.number)
    },
    printPart : function() {
        var str4 = 'part : ';
        for(var item of this.part){
            str4 += item + ', ';
        }
        console.log(str4);
    }
};

console.log('typeof sopt : ', typeof sopt);

console.log('sopt : ' + sopt); // sopt 객체의 타입을 개수 별로 출력
console.log('sopt : ', sopt); //sopt 자체 출력
console.log('sopt : ' + JSON.stringify(sopt)); // 포맷에 맞춰 출력

sopt.printName();
sopt.printNum();
sopt.number = 190;
sopt.printNum();
sopt.printPart();

// json 배열 실습
var dogs = [
    {name: '식빵', family: '웰시코기', age: 1, weight:2.14},
    {name: '콩콩', family: '포메라니안', age: 3, weight: 2.5},
    {name: '두팔', family: '푸들', age: 7, weight: 3.1}
];

console.log('dogs : ' + dogs);
console.log('dogs : ', dogs);
console.log('dogs : '+ JSON.stringify(dogs));

dogs.forEach(
    dog => console.log(dog.name + '이는 종이 ' + dog.family + '이고, 나이가 ' + dog.age + '세입니다.')
);