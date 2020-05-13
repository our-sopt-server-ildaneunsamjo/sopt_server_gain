var express = require('express');
var router = express.Router();
let resMessage = require('../modules/responseMessage');
let statusCode = require('../modules/statusCode');
let util = require('../modules/util');
let postModel = require('../models/post');
// var fs = require('fs');


// 게시글 생성
router.post('/', async (req, res) => {
    const {
        id,
        name,
        post
    } = req.body;
    
    // 정보가 불충분하면 NULL_VALUE 반환
    if(!id || !name || !post){
        res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE)); // or NULL_VALUE 사용
        return;
    }

    // id 값이 이미 존재하면 ALREAYD_ID 반환 
    if(postModel.filter(pm => pm.id == id).length > 0){
        res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
        return;
    }

    postModel.push({id, name, post});

    const data = {
        id: id,
        name: name,
        post: post
    }

    // const file = fs.writeFileSync('post.txt', data);

    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.POST_SUCCESS, data));
});

/**게시글 고유 id 값 조회
 * Method: GET
 * URI: /post/:id
 */

router.get('/:id', async (req, res) => {
    const getId = req.params.id;
    const pid = postModel.filter(pm => pm.id == getId)[0];

    if(pid === undefined){
        res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_ID));
        return;
    }

    const pData = {
        id: getId,
        name: pid.name,
        post: pid.post
    }

    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.GET_ID_SUCCESS, pData));
});

/**게시글 고유 id 값을 가진 게시글을 수정
 * Method: PUT
 * URI: /post/:id
 */
router.put('/:id', async (req, res) => {
    const {post} = req.body; // body 내용 중 'post' key의 value 값만 가져오고 싶으면 중괄호 사용할 것 
    const id = req.params.id;
    const pid = postModel.filter(pm => pm.id == id);

    // id 값 없으면 NO_ID 반환 
    if(pid.length == 0){
        res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_ID));
        return;
    }

    const pData = {
        id: id,
        name: pid[0].name,
        post: post
    }

    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.UPDATE_SUCCESS, pData));
});

/**게시글 고유 id값을 가진 게시글을 삭제
 * Method: DELETE
 * URI: /post/:id
 *  */ 
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const pid = postModel.filter(pm => pm.id == id);

    // id값 없으면 NO_ID 반환
    if(pid.length == 0){
        res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_ID));
        return;
    }

    // 게시글 삭제하는 코드
    delete postModel[id];

    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.DELETE_SUCCESS, {}));
});

module.exports = router;