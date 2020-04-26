// module 사용
const fs = require('fs');
const crypto = require('crypto');

const password ='qwerty';

fs.writeFileSync('password.txt', password);
    // if(err) throw err;
console.log("파일이 생성되었습니다.");

// readFileSync 반환값 파일의 내용
var data = fs.readFileSync("./password.txt");
    
    // if(err) throw err;
console.log("파일 읽기 성공");

const salt = crypto.randomBytes(32).toString('hex');


crypto.pbkdf2(data, salt.toString(), 1, 32, 'sha512', (err, key) => {
    if(err) throw err;
    fs.writeFileSync('hashed.txt', key.toString('hex'), (err, data) => {
        if(err) throw err;
        console.log("파일 생성 완료");
    });
});