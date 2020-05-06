var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.use()를 사용해서 생성한 폴더의 index.js에 접근
// 참고로 routes/index.js는 모든 uri의 시작점
// https://expressjs.com/ko/guide/routing.html
router.use('/api', require('./api'));
// require 로 api 폴더 가지고 와서 api/index.js에 접근

router.use('/blog', require('./blog'));

// router.use('/post', require('./post'));

module.exports = router;
