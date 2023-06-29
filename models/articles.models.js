const { getAllArticles } = require('../controllers/articles.controllers');
const db = require('../db/connection');
const { filter, includes } = require('../db/data/test-data/articles');

exports.selectArticleById = (article_id) => {
    return db.query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id]).then((rows) => {
        if (!rows.rows.length) {
            return Promise.reject({ status: 404, msg : 'Not found'})
        }
        return rows.rows[0]
    })


};

exports.selectAllArticles = () => {
    

    return db.query(`SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id) AS comment_count
    FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC;`)
        .then((articles) => {
            let filteredArticles = articles.rows;
            filteredArticles = filteredArticles.map((article) => {
                return article;
            });
            return filteredArticles;
        })
};
  
exports.insertVotes = (inc_votes, article_id) => {
  if (inc_votes > 0) {
    return db.query(`UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;`, [inc_votes, article_id])
      .then((response) => {
        if (!response.rows.length) {
          return Promise.reject({ status: 404, msg: 'Not found' })
        }
        return response.rows;
      });
  } else {
    return db.query(`UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;`, [inc_votes, article_id])
      .then((response) => {
        if (!response.rows.length) {
          return Promise.reject({ status: 404, msg: 'Not found' })
        }
        return response.rows;
      });
  }
};

  