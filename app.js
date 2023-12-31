const express = require('express');
const cors = require('cors');
const { getAllTopics, getAllEndpoints } = require('./controllers/topics.controllers');
const { getArticlesById, getAllArticles, incrementArticleVote, postArticle } = require('./controllers/articles.controllers');
const { handleCustomErrors, handlePsqlErrors } = require('./error-handling');
const { getArticleCommentById, postComment, removeComment, patchCommentByCommentId } = require('./controllers/comments.controllers');
const { getAllUsers, getUserByUsername } = require('./controllers/users.controllers');
const app = express();
app.use(cors());


app.use(express.json());

app.get('/api/topics', getAllTopics);

app.get('/api', getAllEndpoints);

app.get('/api/articles/:article_id', getArticlesById);

app.get('/api/articles', getAllArticles);

app.get('/api/articles/:article_id/comments', getArticleCommentById);

app.get('/api/users', getAllUsers)

app.get('/api/users/:username', getUserByUsername);

app.post("/api/articles/:article_id/comments", postComment)

app.post('/api/articles', postArticle)

app.patch('/api/articles/:article_id', incrementArticleVote);

app.patch('/api/comments/:comment_id', patchCommentByCommentId)

app.delete('/api/comments/:comment_id', removeComment)

app.use(handleCustomErrors);

app.use(handlePsqlErrors);

app.all('*', (req, res) => {
    res.status(404).send({ msg: 'Not found' });
});
    
module.exports = app;