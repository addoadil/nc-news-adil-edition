const express = require('express');
const { getAllTopics, getAllEndpoints } = require('./controllers/topics.controllers');
const { getArticlesById, getAllArticles, incrementArticleVote } = require('./controllers/articles.controllers');
const { handleCustomErrors, handlePsqlErrors } = require('./error-handling');
const { getArticleCommentById, postComment, removeComment } = require('./controllers/comments.controllers');
const app = express();

app.use(express.json());

app.get('/api/topics', getAllTopics);

app.get('/api', getAllEndpoints);

app.get('/api/articles/:article_id', getArticlesById);

app.get('/api/articles', getAllArticles);

app.get('/api/articles/:article_id/comments', getArticleCommentById);

app.post("/api/articles/:article_id/comments", postComment);

app.patch('/api/articles/:article_id', incrementArticleVote);

app.delete('/api/comments/:comment_id', removeComment)








app.use(handleCustomErrors);

app.use(handlePsqlErrors);

app.all('*', (req, res) => {
    res.status(404).send({ msg: 'Not found' });
});
    
module.exports = app;