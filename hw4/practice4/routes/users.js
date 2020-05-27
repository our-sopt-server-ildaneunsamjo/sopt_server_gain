var express = require('express');
var router = express.Router();
let UserModel = require('../models/users');
let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');
const crypto = require('crypto');
// 변수명 수정할 때는 f2

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('User 페이지 입니다.');
});

router.post('/signup', async (req, res) => {
  const {
      id,
      name,
      password,
      email
  } = req.body;
  // request data 확인 - 없다면 Null Value 반환
  if (!id || !name || !password || !email) {
      res.status(statusCode.BAD_REQUEST)
          .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
      return;
  }

  if (await UserModel.checkUser(id)) {
    res.status(statusCode.BAD_REQUEST)
    .send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
    return;
  }

  // password hash해서 salt 값과 함께 저장하기
  const salt = crypto.randomBytes(32).toString('hex'); // randomBytes 메서드 사용해서 salt 생성 
  // 100000 반복하는데 1초 정도 걸림 
  const hashed = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha512').toString();
  
  // DB에 데이터 저장
  const idx = await UserModel.signup(id, name, hashed, salt, email);
  if (idx === -1) {
    return res.status(statusCode.DB_ERROR)
    .send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
  }

  const data2 = {
    userId: id,
    hashedPw: hashed,
    saltPw: salt
  }

  res.status(statusCode.OK)
      .send(util.success(statusCode.OK, resMessage.CREATED_USER, data2));
});

router.post('/signin', async (req, res) => {
  //request body에서 데이터 가져오기
  const {
    id, 
    password
  } = req.body;
  // request data 확인 - 없다면 NULL Value 반환
  if (!id || !password){
    res.status(statusCode.BAD_REQUEST)
    .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE))
    return;
  }
  // 존재하는 아이디인지 확인 - 없다면 No user 반환
  if (await UserModel.checkUser(id) === false) {
    res.status(statusCode.BAD_REQUEST)
    .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
    return;
  }

  // 비밀번호 확인 - 없다면 Miss match password 반환
  if (await UserModel.signin(id, password)) {
    res.status(statusCode.BAD_REQUEST)
    .send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
    return;
  }

  // 성공
  res.status(statusCode.OK)
  .send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS,
    {userId: id, password: password}));
});

/**
 * get profile
 * METHOD : GET
 * URI : localhost:3000/users/profile/:id
 * 호출 시: localhost:3000/users/profile/gngsn
 * RESPONSE STATUS : 200 (OK)
 * RESPONSE DATA : User Id, name, email
 */

// 프로필 조회 - get Method
router.get('/profile/:id', async (req, res) => {
  // request params 에서 데이터 가져오기
  const id = req.params.id;

  const result = await UserModel.getUserById(id);

  // 존재하는 아이디인지 확인 - 없다면 No user 반환
  if (result.length === 0) {
    console.log(result.length)
    res.status(statusCode.BAD_REQUEST)
    .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
    return;
  }
  // 성공 - login success와 함께 user Id 및 다른 정보 반환
  const proData = {
    id: result[0].id,
    name: result[0].name,
    email: result[0].email
  }

  res.status(statusCode.OK)
  .send(util.success(statusCode.OK, resMessage.READ_PROFILE_SUCCESS, proData)); 
});

module.exports = router;