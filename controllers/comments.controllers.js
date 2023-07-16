const { selectCommentByArticleId, insertComment, deleteComment, UpdateCommentVote } = require("../models/comments.models");

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

exports.removeComment = (req, res, next) => {
    const { comment_id } = req.params;
    deleteComment(comment_id)
        .then((response) => {
            res.status(204).send({response});
        })
        .catch((err) => {
        next(err)
    })
};

exports.patchCommentByCommentId = (req, res, next) => {
    const { comment_id } = req.params;
    const { vote_count } = req.body;
    UpdateCommentVote(vote_count, comment_id).then((response) => {
        const { votes } = response
        res.status(200).send({ votes })
    }).catch((err) => {
        next(err);
    });
};