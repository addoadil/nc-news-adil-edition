const db = require('../db/connection');

exports.selectArticleById = (article_id) => {
  return db.query(`SELECT * FROM articles INNER JOIN (SELECT article_id, COUNT(*) AS comment_count FROM comments WHERE article_id = $1 GROUP BY article_id) comment_counts ON articles.article_id = comment_counts.article_id WHERE articles.article_id = $1;`, [article_id])
    .then((rows) => {
      if (!rows.rows.length) {
        return Promise.reject({ status: 404, msg: 'Not found' });
      }
      return rows.rows[0];
    });
};

exports.selectAllArticles = (topic, sort_by, order) => {
  const validSorts = ['author_id', 'title', 'topic', 'author', 'created_at', 'votes'];

  let query = `SELECT * FROM articles `;
 
  if (typeof topic === 'string' && !isNaN(Number(topic))) {
    return Promise.reject({ status: 400, msg: 'Bad request' });
  }

  else if (topic !== undefined) {
    const queryTopic = `WHERE topic = $1`
    return db.query(query + queryTopic, [topic])
      .then((articles) => {
        if (!articles.rows.length) return Promise.reject({ status: 404, msg: 'Not found' });
        return articles.rows
      });
  };

  if (sort_by && !validSorts.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: 'Bad request' });
  };

  if (order && order !== 'asc' && order !== 'desc') {
    return Promise.reject({ status: 400, msg: 'Bad request' });
  }  


  else if (validSorts.includes(sort_by)) {
    const querySortBy = `ORDER BY ${sort_by}`
    return db.query(query + querySortBy)
      .then((articles) => {
        return articles.rows;
      });
  }
    
  else if (order) {
    const queryOrderBy = `ORDER BY $1`
    return db.query(query + queryOrderBy, [order])
      .then((articles) => {
        return articles.rows;
      });
  }
  else {
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
      });
  };
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

exports.insertArticle = (newArticle) => {
  const { author, title, body, topic, article_img_url, description } = newArticle;
  return db.query(`INSERT INTO topics (slug, description) VALUES ($1, $2) RETURNING *`, [topic, description])
    .then((res) => {
      return db.query(`INSERT INTO articles (title, topic, author, body) VALUES ($1, $2, $3, $4) RETURNING *`, [title, topic, author, body])
  })
    .then((article) => {
      return article.rows;
    });
};

