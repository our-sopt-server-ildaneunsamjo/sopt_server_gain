const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const util = require('../modules/util');
const blogModel = require('../models/blog');

/* await 꼭 사용해줄 것 */

const blog = {
    newPost : async (req, res) => {
        const {useridx, content, createdAt} = req.body;

        if (!useridx || !content || !createdAt) {
            res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        }

        const idx = await blogModel.newPost(useridx, content, createdAt);
        if (idx === -1) {
            return res.status(statusCode.DB_ERROR)
                .send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }

        res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.CREATE_BLOG, {BlogIdx: idx}));

    }, 
    getBlogById : async (req, res) => {
        const blogidx = req.params.blogidx;

        
        if (await blogModel.checkBlogIdx(blogidx)) {
            return res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_BLOG));
        }
        const result = await blogModel.getBlogById(blogidx);
        // console.log(result);

        const data = {
            BlogIdx: blogidx,
            UserId: result[0].id,
            UserName: result[0].name,
            Content: result[0].content,
            CreatedAt: result[0].createdAt
        }

        res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.BLOG_SUCCESS, data));
    },
    updateBlog : async (req, res) => {
        const blogidx = req.params.blogidx;
        const {content} = req.body;

        if(await blogModel.checkBlogIdx(blogidx)) {
            return res.status(statusCode.BAD_REQUEST)
                    .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_BLOG));
        }
        
        await blogModel.updateBlog(blogidx, content);
        const info = await blogModel.getBlogById(blogidx);

        const data = {
            BlogIdx: blogidx,
            UserId: info[0].id,
            UserName: info[0].name,
            UpdatedContent: info[0].content,
        }
        
        res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.UPDATE_BLOG, data));
    },
    deleteBlog: async (req, res) => {
        const blogidx = req.params.blogidx;

        if (await blogModel.checkBlogIdx(blogidx)) {
            return res.status(statusCode.BAD_REQUEST)
                    .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_BLOG));
        }

        await blogModel.deleteBlog(blogidx);

        res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.DELETE_BLOG));
        // 인자 3개지만 2개만 써도 됨? ㅇㅇ 가능
    }
}

module.exports = blog;