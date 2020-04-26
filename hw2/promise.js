const func1 = (param) => {
    return new Promise((resolved, rejected) => {
        setTimeout(() => {
            console.log('func1 return resolved');
            resolved(`func1 success: ${param}`);
        }, 500); // 0.5초
    });
}

const func2 = (param) => {
    return new Promise((resolved, rejected) => {
        setTimeout(() => {
            console.log('func2 return rejected');
            rejected(new Error (`func2 error: ${param}\n`));
        }, 500);
    });
}

const func3 = (param) => {
    return new Promise((resolved, rejected) => {
        setTimeout (() => {
                console.log('func3 return resolved');
                resolved(`func 3 success: ${param}\n`);
            }, 500);
    });
}

const func4 = (param) => {
    return new Promise((resolved, rejected) => {
        setTimeout(() => {
                console.log('func4 return rejected');
                rejected(Error(`func 4 error: ${param}\n`));
            }, 500);
    });
}

const func5 = (param) => {
    return new Promise((resolved, rejected) => {
        setTimeout(() => {
                console.log('func5 return resolved');
                resolved(`func 5 success: ${param}\n`);
            }, 500);
    });
}

const promise = func1('sopt');

promise
    .then((result) => func2(result))
    .then((result) => func3(result))
    .catch((result) => console.error(result))
    // .then((result) => func4(result))
    .then((result) => func5(result))
    .catch((result) => console.error(result)) // 인증 결과 값
    .then((result) => console.log(result));

/* 주석 빼고 런하면 처리되는 함수가 func1, func2, func4이고
undefined 뜸, 에러 발생하면서 넘어오는 인자 없어짐
*/
