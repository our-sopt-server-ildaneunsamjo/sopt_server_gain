// 자신의 조원들을 정보로 하는 JSON 배열 만들어 출력

var members = [
    {name: '김대현', age: 25, part: 'server', printInfo : function () {
        console.log('이름: ', this.name, ', 나이: ', this.age, ', 파트: ', this.part);
    }},
    {name: '이준호', age: 25, part: 'server', printInfo : function () {
        console.log('이름: ', this.name, ', 나이: ', this.age, ', 파트: ', this.part);
    }},
    {name: '이현주', age: 24, part: 'server', printInfo : function () {
        console.log('이름: ', this.name, ', 나이: ', this.age, ', 파트: ', this.part);
    }},
    {name: '조현아', age: 23, part: 'server', printInfo : function () {
        console.log('이름: ', this.name, ', 나이: ', this.age, ', 파트: ', this.part);
    }},
    {name: '김가인', age: 25, part: 'server', printInfo : function () {
        console.log('이름: ', this.name, ', 나이: ', this.age, ', 파트: ', this.part);
    }}
];

for (var item of members){
    item.printInfo();
}