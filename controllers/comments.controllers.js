const { selectCommentByArticleId, insertComment } = require("../models/comments.models");

exports.getArticleCommentById = (req, res, next) => {
    const { article_id } = req.params;
    selectCommentByArticleId(article_id)
        .then((comments) => {
            res.status(200).send(comments);
        })
        .catch((err) => {
            next(err)
        });
};

exports.postComment = (req, res, next) => {
    const newComment = req.body;
    const { article_id } = req.params;
    insertComment(newComment, article_id)
        .then((data) => {
            const comment = data.body;
            res.status(201).send({ comment });
        })
        .catch((err) => {
            next(err);
        });
};