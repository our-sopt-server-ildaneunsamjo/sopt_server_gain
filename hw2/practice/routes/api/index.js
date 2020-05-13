// 폴더에 접근하려면 반드시 index.js를 생성해야 함.
// import { Router } from 'express'; // express 모듈 불러오기
var express = require('express');
var router = express.Router(); // Router() 미들웨어 불러오기
/*
express.Router 클래스를 사용하면 모듈식 마운팅 가능한 핸들러 작성 가능
Router 인스턴스는 완전한 미들웨어이자 라우팅 시스템이며, 따라서 'mini-app'이라 불리는 경우 많음

+) routes 폴더에 있는 js 파일들은 따로 설정된 모듈이 아니라,
express 모듈 중에서 Router 기능을 하는 파일들을 모아둔 것
파일을 하나로 해도 무관하지만, 페이지가 많아지고 /로 구분되는 칸이 많아질수록 
라우터 파일을 분산시키는 것이 효율적
*/


// const path = require('path');

// get 메소드(주소창에 써지는 것)로 '/'을 받았을 때 실행~
router.get('/', (req, res) => { // get method로 api/ 요청이 들어온다면
    const result = { // 5~10줄: 해당 로직을 실행
        status: 200, // status에 성공을 의미하는 200 전달
        message: 'api 접근 성공'
    }
    res.status(200).send(result);
    // res.sendFile(path.resolve(__dirname, 'api', 'index.js'));
});

router.use('/blog', require('./blog'));
router.use('/blog2', require('./blog2'));
router.use('/users', require('./users'));
router.use('/users2', require('./users2'));
// 저장 꼭 해주기~~~

module.exports = router; // 생성한 router 객체를 모듈로 반환