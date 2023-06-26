const express = require('express');
const { getAllTopics } = require('./controllers/topics.controllers');
const app = express();
app.use(express.json())

app.get('/api/topics', getAllTopics);









app.use((err, req, res, next) => {
    console.log(err)
    res.status(404).send({msg:'Bad request'})
})

module.exports = app;