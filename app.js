const express = require('express');
const { getAllTopics, getAllEndpoints } = require('./controllers/topics.controllers');
const { getArticlesById, getAllArticles } = require('./controllers/articles.controllers');
const { handleCustomErrors, handlePsqlErrors } = require('./error-handling');
const app = express();

app.get('/api/topics', getAllTopics);


app.get('/api', getAllEndpoints)

app.get('/api/articles/:article_id', getArticlesById)

app.get('/api/articles', getAllArticles)






app.use(handleCustomErrors);

app.use(handlePsqlErrors);

app.all('*', (req, res) => {
    res.status(404).send({msg: 'Not found'})
})

module.exports = app;