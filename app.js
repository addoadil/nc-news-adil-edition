const express = require('express');
const { getAllTopics, getAllEndpoints } = require('./controllers/topics.controllers');
const app = express();

app.get('/api/topics', getAllTopics);


app.get('/api', getAllEndpoints)







app.all('*', (req, res) => {
    res.status(404).send({msg: 'Route not found'})
})

module.exports = app;