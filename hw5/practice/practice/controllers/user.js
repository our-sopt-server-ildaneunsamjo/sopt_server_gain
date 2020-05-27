/* 콜백함수를 컨트롤러 폴더에 작성을 해줌으로써 라우팅 폴더는 라우팅만 담당하게 하고 
그 기능은 컨트롤러에서 담당 -> 계층을 분리 
*/

const UserModel = require('../models/user');
const encrypt = require('../modules/crypto');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const util = require('../modules/util');
const jwt = require('../modules/jwt');

const user = {
    signup : async (req, res) => {
        const {
            id,
            name,
            password,
            email
        } = req.body;
        if (!id || !name || !password || !email) {
            res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }
        // 사용중인 아이디가 있는지 확인
        if (await UserModel.checkUser(id)) {
            res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
            return;
        }
        const {
            salt,
            hashed
        } = await encrypt.encrypt(password);
        const idx = await UserModel.signup(id, name, hashed, salt, email);
        if (idx === -1) {
            return res.status(statusCode.DB_ERROR)
                .send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }
        res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.CREATED_USER, {
                userId: idx
            }));
    },
    signin : async (req, res) => {
        const {
            id,
            password
        } = req.body;
        if (!id || !password) {
            res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }
    
        // User의 아이디가 있는지 확인 - 없다면 NO_USER 반납
        const user = await UserModel.getUserById(id);
        if (user[0] === undefined) {
            return res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
        }
        // req의 Password 확인 - 틀렸다면 MISS_MATCH_PW 반납
        // encrypt 모듈 만들어놓은 거 잘 활용하기!
        const hashed = await encrypt.encryptWithSalt(password, user[0].salt);
        if (hashed !== user[0].password) {
            return res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
        }
    
        // console.log(user[0]);
        // 로그인이 성공적으로 마쳤다면 - LOGIN_SUCCESS 전달
        
        const {token, _} = await jwt.sign(user[0]);
        
        res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, {accessToken: token}));
    }
}

module.exports = user;