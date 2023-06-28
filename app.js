const express = require('express');
const { getAllTopics, getAllEndpoints } = require('./controllers/topics.controllers');
const { getAllArticles } = require('./controllers/articles.controllers');
const { handleCustomErrors, handlePsqlErrors } = require('./error-handling');
const { getArticleCommentById } = require('./controllers/comments.controllers');
const app = express();

app.get('/api/topics', getAllTopics);


app.get('/api', getAllEndpoints)

app.get('/api/articles/:article_id', getAllArticles)

app.get('/api/articles/:article_id/comments', getArticleCommentById)







app.use(handleCustomErrors);

app.use(handlePsqlErrors);

app.all('*', (req, res) => {
    res.status(404).send({msg: 'Not found'})
})

module.exports = app;