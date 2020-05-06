var express = require('express');
var router = express.Router();

router.get('/', (req, res) => { // get method로 / 요청이 들어온다면
    const result = { // 5~10줄: 해당 로직을 실행
        status: 200, // status에 성공을 의미하는 200 전달
        message: 'blog 접근 성공'
    }
    res.status(200).send(result);
    // res.sendFile(path.resolve(__dirname, 'api', 'index.js'));
});

module.exports = router;