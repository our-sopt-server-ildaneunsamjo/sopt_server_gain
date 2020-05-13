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
  //already ID
  if (UserModel.filter(user => user.id == id).length > 0) {
      res.status(statusCode.BAD_REQUEST)
          .send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
      return;
  }
  // password hash해서 salt 값과 함께 저장하기
  const salt = crypto.randomBytes(32).toString('hex'); // randomBytes 메서드 사용해서 salt 생성 
  // 100000 반복하는데 1초 정도 걸림 
  const hashed = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha512').toString();
  UserModel.push({id, name, hashed, salt, email});
  // crypto.pbkdf2(password, salt.toString(), 100000, 32, 'sha512', (err, derivedKey) => {
  //   if (err) throw err;
  //   const hashed = derivedKey.toString('hex');
  //   UserModel.push({id, name, hashed, salt, email});
  // });

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
  const user = UserModel.filter(user => user.id == id);
  if(user.length == 0){
    res.status(statusCode.BAD_REQUEST)
    .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
  }
  // 비밀번호 확인 - 없다면 Miss match password 반환
  // if(user[0].password != password){
  //   res.status(statusCode.BAD_REQUEST)
  //   .send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
  //   return;
  // }

  // 해시값 이용해서 비밀번호 확인
  // ** crypto.pbkdf2/pbkdf2Sync 함수 활용 방법 확실하게 외우기
  const hash = crypto.pbkdf2Sync(password, user[0].salt, 100000, 32, 'sha512').toString();
  if(user[0].hashed != hash){
    res.status(statusCode.BAD_REQUEST)
    .send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
    return;
  }

  // 성공
  res.status(statusCode.OK)
  .send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS,
    {userId: id, password: password, hashedPw: user[0].hashed, saltPw: user[0].salt}));
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
  const user = UserModel.filter(user => user.id == id);
  const user2 = UserModel.filter(user2 => user2.id == id)[0];
  /**
   * proData = {id: user.id, name: user.name};
   */

  // 존재하는 아이디인지 확인 - 없다면 No user 반환
  if (user.length == 0) {
    res.status(statusCode.BAD_REQUEST)
    .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
    return;
  }
  const proData = {
    id: user[0].id,
    name: user[0].name,
    // pw: user[0].password
    email: user[0].email
  }
  // 성공 - login success와 함께 user Id 및 다른 정보 반환
  res.status(statusCode.OK)
  .send(util.success(statusCode.OK, resMessage.READ_PROFILE_SUCCESS, proData)); 
});

module.exports = router;