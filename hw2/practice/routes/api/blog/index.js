// 폴더에 접근하려면 반드시 index.js를 생성해야 함.
// import { Router } from 'express'; // express 모듈 불러오기
var express = require('express');
var router = express.Router(); // Router() 미들웨어 불러오기

// get 메소드(주소창에 써지는 것)로 '/'을 받았을 때 실행~
router.get('/', (req, res) => { // get method로 blog/ 요청이 들어온다면
    const result = { // 5~10줄: 해당 로직을 실행
        status: 200, // status에 성공을 의미하는 200 전달
        message: 'api/blog 접근 성공'
    }
    res.status(200).send(result);
});

router.use('/post', require('./post'));

module.exports = router; // 생성한 router 객체를 모듈로 반환