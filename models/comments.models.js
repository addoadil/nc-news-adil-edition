const db = require('../db/connection');

exports.selectCommentByArticleId = (article_id) => {
    return db.query('SELECT * FROM articles WHERE article_id = $1', [article_id])
      .then((articles) => {
        if (articles.rows.length === 0) {
          return Promise.reject({ status: 404, msg: 'Not found' });
        }
        return db.query('SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC', [article_id]);
      })
      .then((comments) => {
        return comments.rows;
      });
  };
  