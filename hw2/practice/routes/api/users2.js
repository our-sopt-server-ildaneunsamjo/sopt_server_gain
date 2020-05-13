var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    const result = {
        status: 200,
        message: "api/users2에 접근합니다."
    };
    res.status(200).send(result);
});

// 폴더 따로 생성 않고 다시 만듦~
router.get('/login', (req, res) => {
    const result = {
        status: 200,
        message: "api/users2/login에 접근합니다."
    };
    res.status(200).send(result);
});

router.get('/signup', (req, res) => {
    const result = {
        status: 200,
        message: "api/users2/signup에 접근합니다."
    };
    res.status(200).send(result);
});

module.exports = router;