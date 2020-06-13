const UserModel = require('../models/user');
const util = require('../modules/util');
const CODE = require('../modules/statusCode');
const MSG = require('../modules/responseMessage');
const encrypt = require('../modules/crypto');
const jwt = require('../modules/jwt');

module.exports = {
    signup: async (req, res) => {
        const {
            id,
            name,
            password,
            email
        } = req.body;
        if (!id || !name || !password || !email) {
            res.status(CODE.BAD_REQUEST)
                .send(util.fail(CODE.BAD_REQUEST, MSG.NULL_VALUE));
            return;
        }
        // 사용자 중인 아이디가 있는지 확인
        if (await UserModel.checkUser(id)) {
            res.status(CODE.BAD_REQUEST)
                .send(util.fail(CODE.BAD_REQUEST, MSG.ALREADY_ID));
            return;
        }
        const {
            salt,
            hashed
        } = await encrypt.encrypt(password);
        const idx = await UserModel.signup(id, name, hashed, salt, email);
        if (idx === -1) {
            return res.status(CODE.DB_ERROR)
                .send(util.fail(CODE.DB_ERROR, MSG.DB_ERROR));
        }
        res.status(CODE.OK)
            .send(util.success(CODE.OK, MSG.CREATED_USER, {
                userId: idx
            }));
    },
    signin: async (req, res) => {
        const {
            id,
            password
        } = req.body;
        if (!id || !password) {
            res.status(CODE.BAD_REQUEST)
                .send(util.fail(CODE.BAD_REQUEST, MSG.NULL_VALUE));
            return;
        }

        // User의 아이디가 있는지 확인 - 없다면 NO_USER 반납
        const user = await UserModel.getUserById(id);
        if (user[0] === undefined) {
            return res.status(CODE.BAD_REQUEST)
                .send(util.fail(CODE.BAD_REQUEST, MSG.NO_USER));
        }
        // req의 Password 확인 - 틀렸다면 MISS_MATCH_PW 반납
        const hashed = await encrypt.encryptWithSalt(password, user[0].salt);
        if (hashed !== user[0].password) {
            return res.status(CODE.BAD_REQUEST)
                .send(util.fail(CODE.BAD_REQUEST, MSG.MISS_MATCH_PW));
        }

        const {
            token,
            _
        } = await jwt.sign(user[0]);

        // 로그인이 성공적으로 마쳤다면 - LOGIN_SUCCESS 전달
        res.status(CODE.OK)
            .send(util.success(CODE.OK, MSG.LOGIN_SUCCESS, {
                accessToken: token
                //, refreshToken: refreshToken
            }));
    },
    updateProfile: async (req, res) => {
        // 데이터 받아오기
        const userIdx = req.decoded.userIdx;
        // jwt 토큰을 가져와서 디코드 시켜줌
        // 체크토큰은 decoded된 정보를 담아줌
        console.log(req.file);
        const profileImg = req.file.location;
        // s3는 path를 location으로 
        // 최종 업로드되는 파일의 이름이 path에 저장됨
        // 이름이 저장될 때 중복되면 안되므로 multer가 알아서 키값을 어렵고 복잡하게 만들어서 저장?
        // +) ms 단위의 시간으로 파일이름 저장해줘도 좋음!
        // data check - undefined
        if (profileImg === undefined || !userIdx) {
            return res.status(CODE.OK).send(util.fail(CODE.BAD_REQUEST, MSG.NULL_VALUE));
        }
        // image type check
        const type = req.file.mimetype.split('/')[1];
        if (type !== 'jpeg' && type !== 'jpg' && type !== 'png') {
            return res.status(CODE.OK).send(util.fail(CODE.BAD_REQUEST, MSG.UNSUPPORTED_TYPE));
        }
        // call model - database
        // 결과값은 프로필에 대한 이미지 전달
        const result = await UserModel.updateProfile(userIdx, profileImg);
        res.status(CODE.OK).send(util.success(CODE.OK, MSG.UPDATE_PROFILE_SUCCESS, result));
    },
    updateSelfies : async (req, res) => {
        const userIdx = req.decoded.userIdx;
        const selfies = req.files; // 이미지가 여러개라면 files에 저장됨 
        // console.log(selfies);
        // console.log(selfies[0].location);
        // console.log(req.files[0].location);
        if (selfies === undefined) {
            return res.status(CODE.OK).send(util.fail(CODE.BAD_REQUEST, "이미지를 첨부해주세요"));
        }

        // image type check
        for (var i in selfies) {
            const type = selfies[i].mimetype.split('/')[1];
            if (type !== 'jpeg' && type !== 'jpg' && type !== 'png') {
                return res.status(CODE.OK).send(util.fail(CODE.BAD_REQUEST, MSG.UNSUPOORTED_TYPE));
            }
        }

        for (var i in selfies) {
            var result = await UserModel.updateSelfies(userIdx, selfies[i].location);
            console.log(selfies[i].location);
        }

        const location = selfies.map(sf => sf.location); //?
        res.status(CODE.OK).send(util.success(CODE.OK, selfies.length + "개의 이미지 저장 성공", {
            selfies: location
        }));
    },
    showAllSelfies : async (req, res) => {
        const userIdx = req.decoded.userIdx;

        const result = await UserModel.showAllSelfies(userIdx);

        if (result[0] === undefined) {
            return res.status(CODE.OK).send(util.fail(CODE.BAD_REQUEST, "이미지가 존재하지 않습니다."));
        }

        res.status(CODE.OK).send(util.success(CODE.OK, "이미지 모아보기 성공", {
            selfies: result
        }));
    }
}