var crypto = require('crypto');
const pool = require('../modules/pool');
const table = 'user';

const user = {
    signup : async (id, name, password, salt, email) => {
        // 회원 가입을 위한 접근 로직
        const fields = 'id, name, password, salt, email';
        // 내가 입력한 값들이 들어감
        const questions = '?, ?, ?, ?, ?';
        const values = [id, name, password, salt, email];
        const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
        try {
            const result = await pool.queryParamArr(query, values);
            // 이 부분(insertId) 잘 이해 안감. 
            const insertId = result.insertId;
            return insertId;
        } catch (err){
            if (err.errno == 1062) {
                console.log('signup ERROR: ', err.errno, err.code);
                return -1;
            }
            console.log('signup ERROR: ', err);
            throw err;
        }
    },
    checkUser : async (id) => {
        const query = `SELECT * FROM ${table} WHERE id = '${id}'`;
        try{
            const result = await pool.queryParam(query);
            if (result[0] === undefined) {
                return false;
            }
            else {
                return true;
            } 
        } catch (err) {
            if (err.errno == 1062) {
                console.log('checkUser ERROR: ', err.errno, err.code);
                return -1;
            }
            console.log('checkUser ERROR: ', err);
            throw err;
        }
    },
    signin : async (id, password) => {
        // 로그인을 위한 데이터베이스 접근 로직
        const fields = 'id, password, salt';
        const query = `SELECT ${fields} FROM ${table} WHERE id = '${id}'`;
        try {
            const result = await pool.queryParam(query);
            // console.log(result[0].password);
            const hashed = crypto.pbkdf2Sync(password, result[0].salt, 100000, 32, 'sha512').toString();
            if (result[0].password != hashed) {
                return true;
            }
            return false;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('signin ERROR: ', err.errno, err.code);
                return -1;
            }
            console.log('signin ERROR: ', err);
            throw err;
        }
    },
    getUserById : async (id) => {
        const query = `SELECT * FROM ${table} WHERE useridx = ${id}`;
        try {
            return await pool.queryParam(query);
        } catch (err) {
            if (err.errno == 1062) {
                console.log('getUserById ERROR: ', err.errno, err.code);
                return -1;
            }
            console.log('getUserById ERROR: ', err);
            throw err;
        }
    }
}

module.exports = user;