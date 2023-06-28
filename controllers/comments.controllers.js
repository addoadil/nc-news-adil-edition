const { selectCommentByArticleId } = require("../models/comments.models");

exports.getArticleCommentById = (req, res, next) => {
    const { article_id } = req.params;
    selectCommentByArticleId(article_id).then((comments) => {
        
    })
}