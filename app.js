const express = require('express');
const { getAllTopics } = require('./controllers/topics.controllers');
const app = express();

app.get('/api/topics', getAllTopics);











app.all('*', (req, res) => {
    res.status(404).send({msg: 'Route not found'})
})

module.exports = app;