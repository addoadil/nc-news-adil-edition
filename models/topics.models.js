const db = require('../db/connection');
const fs = require('fs/promises')

exports.selectAllTopics = () => {
    return db.query('SELECT * FROM topics;').then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg : 'Not found'})
        }
        return rows;
    })
}

exports.selectAllEndpoints = () => {
    return fs.readFile('endpoints.json', 'utf-8')
        .then((data) => {
            const allEndpoints = JSON.parse(data);
            return allEndpoints;
    })

}