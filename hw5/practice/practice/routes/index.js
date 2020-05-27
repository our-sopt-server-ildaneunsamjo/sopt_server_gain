var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use('/user', require('./user'));
router.use('/auth', require('./auth'));
router.use('/blog', require('./blog'));
module.exports = router;
