// 자신의 조원들을 정보로 하는 JSON 배열 만들어 출력

var members2 = [
    {name: '김대현', age: 25, part: 'server'},
    {name: '이준호', age: 25, part: 'server'},
    {name: '이현주', age: 24, part: 'server'},
    {name: '조현아', age: 23, part: 'server'},
    {name: '김가인', age: 25, part: 'server'}
];

members2.forEach(mem => console.log("이름: ", mem.name, ", 나이: ", mem.age, ", 파트: ", mem.part));