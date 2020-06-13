const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const AuthMiddleware = require('../middlewares/auth');
const upload = require('../modules/multer');
// multer를 통해 최대 파일 사이즈도 지정 가능 
// const multer = require('multer');
// const upload = multer({
//     dest: 'upload/'
// });
router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);

/* 
    ✔️ update profile
    METHOD : POST
    URI : localhost:3000/user/profile
    REQUEST HEADER : JWT
    REQUEST BODY : ⭐️image file ⭐️
    RESPONSE DATA : user profile
*/
router.post('/profile', AuthMiddleware.checkToken, upload.single('profile'), UserController.updateProfile);

/* 
    ✔️ update profile
    METHOD : POST
    URI : localhost:3000/user/selfies
    REQUEST HEADER : JWT
    REQUEST BODY : ⭐️image file ⭐️ 여러 개?
    RESPONSE DATA : user profile
*/
router.post('/selfies', AuthMiddleware.checkToken, upload.array('selfies', 5), UserController.updateSelfies);
router.get('/selfies/list', AuthMiddleware.checkToken, UserController.showAllSelfies);

module.exports = router;