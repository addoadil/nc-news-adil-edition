const { selectArticleById, selectAllArticles, insertVotes } = require("../models/articles.models");

exports.getArticlesById = (req, res, next) => {
    const { article_id } = req.params;
    selectArticleById(article_id).then((article) => {
        res.status(200).send(article);
    })
        .catch((err) => {
        next(err)
    })
};

exports.getAllArticles = (req, res, next) => {
    const { topic, sort_by, order } = req.query;
    selectAllArticles(topic, sort_by, order)
        .then((articles) => {
            res.status(200).send(articles)
        })
        .catch((err) => {
            next(err)
        });
};

exports.incrementArticleVote = (req, res, next) => {
    const { inc_votes } = req.body;
    const { article_id } = req.params;
    insertVotes(inc_votes, article_id)
        .then((article) => {
            const returnedArticle = article[0];
            res.status(200).send(returnedArticle);
        })
        .catch((err) => {
            next(err);
        });
};

