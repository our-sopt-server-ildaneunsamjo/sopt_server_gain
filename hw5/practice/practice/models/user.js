const pool = require('../modules/pool');
const table = 'user';

const user = {
    signup: async (id, name, password, salt, email) => {
        const fields = 'id, name, password, salt, email';
        const questions = `?, ?, ?, ?, ?`;
        const values = [id, name, password, salt, email];
        const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
        try {
            const result = await pool.queryParamArr(query, values);
            const insertId = result.insertId;
            return insertId;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('signup ERROR : ', err.errno, err.code);
                throw err;
            }
            console.log('signup ERROR : ', err);
            throw err;
        }
    },
    checkUser: async (id) => {
        const query = `SELECT * FROM ${table} WHERE id = '${id}'`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('checkUser ERROR : ', err.errno, err.code);
                throw err;
            }
            console.log('checkUser ERROR : ', err);
            throw err;
        }
    },
    getUserByIdx: async (useridx) => {
        const query = `SELECT * FROM ${table} WHERE useridx = ${useridx}`;
        // query문 작성
        // pool module로 전달해서 결과값 받기
        // return await pool.queryParamArr(query, [id]);
        // try - catch로 ERROR 받기
        try {
            return await pool.queryParam(query);
        } catch (err) {
            if (err.errno == 1062) {
                console.log('getUserByIdx ERROR : ', err.errno, err.code);
                throw err;
            }
            console.log('getUserByIdx ERROR : ', err);
            throw err;
        }
    }
}

module.exports = user;