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
        name,
        content,
        createdAt
    } = req.body;
    
    // 정보가 불충분하면 NULL_VALUE 반환
    if(!name || !content || !createdAt){
        res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE)); // or NULL_VALUE 사용
        return;
    }

    const idx = await postModel.newPost(name, content, createdAt);
    if (idx === -1){
        return res.status(statusCode.DB_ERROR)
        .send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
    }

    const data = {
        id: idx,
        name: name,
        content: content,
        createdAt: createdAt
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
    const postidx = req.params.id;

    if (await postModel.checkId(postidx)) {
        res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_ID));
        return;
    }

    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.GET_ID_SUCCESS, await postModel.getPostById(postidx)));
});

/**게시글 고유 id 값을 가진 게시글을 수정
 * Method: PUT
 * URI: /post/:id
 */
router.put('/:id', async (req, res) => {
    const {content} = req.body; // body 내용 중 'post' key의 value 값만 가져오고 싶으면 중괄호 사용할 것 
    const postidx = req.params.id;

    // id 값 없으면 NO_ID 반환 
    if(await postModel.checkId(postidx)){
        res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_ID));
        return;
    }

    const result = await postModel.updatePost(postidx, content);

    const pData = {
        postidx: postidx,
        content: content
    }

    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.UPDATE_SUCCESS, pData));
});

/**게시글 고유 id값을 가진 게시글을 삭제
 * Method: DELETE
 * URI: /post/:id
 *  */ 
router.delete('/:id', async (req, res) => {
    const postidx = req.params.id;

    // id값 없으면 NO_ID 반환
    if(await postModel.checkId(postidx)){
        res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_ID));
        return;
    }

    // 게시글 삭제하는 코드
    await postModel.deletePost(postidx);

    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.DELETE_SUCCESS));
});

module.exports = router;