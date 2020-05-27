const pool = require('../modules/pool');
const table = 'post';

const post = {
    getPostById : async (postidx) => {
        const query = `SELECT * FROM ${table} WHERE postidx = '${postidx}'`;
        try {
            const result = await pool.queryParam(query);
            const postData = {
                postidx: result[0].postidx,
                name: result[0].name,
                content: result[0].content,
                createdAt: result[0].createdAt
            }
            return postData;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('getPostById ERROR: ', err.errno, err.code);
                return -1;
            }
            console.log('getPostById ERROR: ', err);
            throw err;
        }
    },
    checkId : async (postidx) => {
        const query = `SELECT * FROM ${table} WHERE postidx = '${postidx}'`;
        try {
            const result = await pool.queryParam(query);
            console.log(result.length);
            if (result.length === 0){
                return true;
            } else return false;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('checkId ERROR: ', err.errno, err.code);
                return -1;
            }
            console.log('checkId ERROR: ', err);
            throw err;
        }
    },
    newPost : async (name, content, createdAt) => {
        const fields = 'name, content, createdAt';
        const questions = '?, ?, ?'
        const values = [name, content, createdAt];
        const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
        try {
            const result = await pool.queryParamArr(query, values);
            // INSERT 문이 실행되었을 때 삽입된 데이터의 id 얻는 방법
            const insertId = result.insertId;
            return insertId;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('newPost ERROR: ', err.errno, err.code);
                return -1;
            }
            console.log('newPost ERROR: ', err);
            throw err;
        }
    },
    updatePost : async (postidx, content) => {
        //UPDATE post set content = 'This content has been changed' where postidx = 2; 
        const value = [content];
        const query = `UPDATE ${table} SET content = ? WHERE postidx = '${postidx}'`;
        try {
            await pool.queryParamArr(query, value);          
        } catch (err) {
            if (err.errno == 1062) {
                console.log('updatePost ERROR: ', err.errno, err.code);
                return -1;
            }
            console.log('updatePost ERROR: ', err);
            throw err;
        }
    },
    deletePost : async (postidx) => {
        const query = `DELETE FROM ${table} WHERE postidx = '${postidx}'`;
        try {
            await pool.queryParam(query);
        } catch (err) {
            if (err.errno == 1062) {
                console.log('deletePost ERROR: ', err.errno, err.code);
                return -1;
            }
            console.log('deletePost ERROR: ', err);
            throw err;
        }
    }
}

module.exports = post;