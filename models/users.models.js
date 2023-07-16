const db = require('../db/connection');

exports.selectAllUsers = () => {
    return db.query(`SELECT * FROM users`)
        .then((usersData) => {
            return usersData.rows;
    })

};

exports.selectUserByUsername = (username) => {
    if (!isNaN(Number(username))) {
        return Promise.reject({ status: 400, msg: 'Bad request' });
    };

    return db.query(`SELECT * FROM users WHERE username = $1`, [username])
        .then((userObj) => {
            if (!userObj.rows.length) return Promise.reject({ status: 404, msg: 'Not found' });
            
            return userObj.rows[0];
        });
};