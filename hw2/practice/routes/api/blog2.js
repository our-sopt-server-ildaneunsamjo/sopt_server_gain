var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    const post = {
        title: 'express, blog',
        author: 'gain',
        content: 'express 사용법에 대해 알아보고 있습니다.'
    }
    const result = {
        status: 200,
        message: 'blog에 접근합니다.',
        data: post
    };
    res.status(200).send(result);
});

// 폴더 따로 생성 않고 다시 만듦~
router.get('/post', (req, res) => {
    const result = {
        status: 200,
        message: 'api/blog/post에 접근합니다.'
    };
    res.status(200).send(result);
});

module.exports = router;