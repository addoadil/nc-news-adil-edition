const request = require('supertest');
const app = require('../app');
const seed = require('../db/seeds/seed');
const db = require('../db/connection');
const testData = require('../db/data/test-data/index');
const endpoints = require('../endpoints.json');
const sorted = require('jest-sorted');


beforeEach(() => {
    return seed(testData)
});

describe('GET /api/topics', () => {
  test('Should return an array of topic objects, each of which should have a slug & description', () => {
    return request(app).get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        const topics = body.topics;
        expect(Array.isArray(topics)).toBe(true)
        expect(topics).toHaveLength(3)
        topics.forEach(topic => {
          expect(topic).toHaveProperty('slug')
          expect(topic).toHaveProperty('description')
        });                
      });
  });
});


describe('GET /api/topics/notavalidroute', () => {
  test('Should return 404 Not found when given a non-existent route', () => {
    return request(app)
      .get('/api/notavalidroute')
      .expect(404)
      .then(({ body }) => {
            expect(body).toHaveProperty('msg')
        expect(body.msg).toBe('Not found')
      })
    });
});
  
describe('GET /api', () => {
  test("Should return all api endpoints with relevant endpoint descriptions from endpoints.json", () => {
    return request(app)
      .get('/api')
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(endpoints)
      });
  });
});

describe('GET /api/articles/:article_id', () => {
  test("Should return article that corresponds to a given article id", () => {
    return request(app)
      .get('/api/articles/6')
      .expect(200)
      .then(({ body }) => {
          expect(body).toHaveProperty('author');
          expect(body).toHaveProperty('title');
          expect(body).toHaveProperty('article_id');
          expect(body).toHaveProperty('body');
          expect(body).toHaveProperty('topic');
          expect(body).toHaveProperty('created_at');
          expect(body).toHaveProperty('votes');
          expect(body).toHaveProperty('article_img_url');
          expect(body).toHaveProperty('comment_count');
      });
      });
});
  
describe('GET /api/articles/:article_id', () => {
  test("Should respond with 404 Not found for an  article_id that does not exist", () => {
    return request(app)
      .get('/api/articles/76')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Not found')
      });
      });
});

describe('GET /api/articles/:article_id', () => {
  test("Should respond with 400 Bad request for an invalid article_id", () => {
    return request(app)
      .get('/api/articles/bananas')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Bad request')
      });
      });
});

describe('GET /api/articles', () => {
  test('Should return an articles array of all article objects with all properties except the body property sorted by date in DESC order', () => {
    return request(app).get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const articles = body;
        expect(Array.isArray(articles)).toBe(true)
        expect(articles).toHaveLength(13)
        expect(articles).toBeSorted({ descending: true, key: 'created_at' });
        articles.forEach(article => {
          expect(article).toHaveProperty('author');
          expect(article).toHaveProperty('title');
          expect(article).toHaveProperty('article_id');
          expect(article).toHaveProperty('topic');
          expect(article).toHaveProperty('created_at');
          expect(article).toHaveProperty('votes');
          expect(article).toHaveProperty('article_img_url');
          expect(article).toHaveProperty('comment_count')
          expect(article).not.toHaveProperty('body')
        })
      });
  });
});
        
describe('GET /api/articles/:article_id/comments', () => {
  test("Status 200: Should respond with comments for an article filtered by article_id order by latest comments", () => {
    return request(app)
      .get('/api/articles/6/comments')
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveLength(1)
        expect(Array.isArray(body)).toBe(true);
        expect(body).toBeSorted({ descending: true, key: 'created_at' });
        body.forEach((comment) => {
          expect(comment).toHaveProperty('comment_id');
          expect(comment).toHaveProperty('votes');
          expect(comment).toHaveProperty('created_at');
          expect(comment).toHaveProperty('author');
          expect(comment).toHaveProperty('body');
          expect(comment).toHaveProperty('article_id');
        });
      });
  });
});

describe('GET /api/articles/:article_id/comments', () => {
  test("Should respond with 404 Not found for an article_id that does not exist", () => {
    return request(app)
      .get('/api/articles/76/comments')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Not found')
      });
      });
});

describe('GET /api/articles/:article_id/comments', () => {
  test("Should respond with 200 with an empty array for an article_id that exists but does not have any comments", () => {
    return request(app)
      .get('/api/articles/10/comments')
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual([])
      });
      });
});

describe('GET /api/articles/:article_id/comments', () => {
  test("Should respond with 400 Bad request for an invalid article id", () => {
    return request(app)
      .get('/api/articles/banana/comments')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Bad request')
      });
      });
});

describe('POST /api/articles/:article_id/comments', () => {
  test("Should respond with status 201, responds with new comment after being added to db", () => {
    const newComment = {
      username: 'rogersop',
      body: 'I absolutely love this article. Written with such thought!',
    };
    return request(app)
      .post("/api/articles/6/comments")
      .send(newComment)
      .expect(201)
      .then(({ body }) => {    
        expect(body.comment).toBe("I absolutely love this article. Written with such thought!");
      });
  });
});

describe('POST /api/articles/:article_id/comments', () => {
  test("Should respond with status 400, when a user is trying to comment but leaves comment blank", () => {
    const newComment = {
      username: 'rogersop',
      body: '',
    };
    return request(app)
      .post("/api/articles/6/comments")
      .send(newComment)
      .expect(400)
      .then(({ body }) => {    
        expect(body.msg).toBe("Bad request");
      });
  });
});

describe('POST /api/articles/:article_id/comments', () => {
  test("Should respond with 400 Bad request for an invalid article id", () => {
    const newComment = {
      username: 'rogersop',
      body: 'I love this article',
    };
    return request(app)
      .post("/api/articles/banas/comments")
      .send(newComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Bad request')
      });
    });
});

describe('POST /api/articles/:article_id/comments', () => {
  test("Should respond with 404 Not found for an article_id that does not exist", () => {
    const newComment = {
      username: 'rogersop',
      body: 'I love this article',
    };
    return request(app)
      .post('/api/articles/76/comments')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Not found')
      });
      });
});

describe('POST /api/articles/:article_id/comments', () => {
  test("Should respond with 404 username not found for a user that does not exist or when username field is blank when commenting", () => {
    const newComment = {
      username: 'daffyduck',
      body: 'I hate this article, very poor fact finding here',
    };
    return request(app)
      .post('/api/articles/6/comments')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Username not found')
      });
      });
});

describe('PATCH /api/articles/:article_id', () => {
  test("Should respond with status 200 and update article votes to specified amount (incremented)", () => {
    const votesBody = {
      inc_votes: 1
    }
    return request(app)
      .patch('/api/articles/6')
      .send(votesBody)
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty('author');
        expect(body).toHaveProperty('title');
        expect(body).toHaveProperty('article_id');
        expect(body).toHaveProperty('body');
        expect(body).toHaveProperty('topic');
        expect(body).toHaveProperty('created_at');
        expect(body).toHaveProperty('votes');
        expect(body.votes).toEqual(1);
        expect(body).toHaveProperty('article_img_url');
      });
  });
});

describe('PATCH /api/articles/:article_id', () => {
  test("Should respond with status 200 and update article votes to specified amount (decremented)", () => {
    const votesBody = {
      inc_votes: -1
    }
    return request(app)
      .patch('/api/articles/6')
      .send(votesBody)
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty('author');
        expect(body).toHaveProperty('title');
        expect(body).toHaveProperty('article_id');
        expect(body).toHaveProperty('body');
        expect(body).toHaveProperty('topic');
        expect(body).toHaveProperty('created_at');
        expect(body).toHaveProperty('votes');
        expect(body.votes).toEqual(-1);
        expect(body).toHaveProperty('article_img_url');
      });
  });
});

describe('PATCH /api/articles/:article_id', () => {
  test("Should respond with status 400 Bad request when the vote value is not a number", () => {
    const votesBody = {
      inc_votes: 'abc'
    }
    return request(app)
      .patch('/api/articles/6')
      .send(votesBody)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Bad request');
      });
  });
});

describe('PATCH /api/articles/:article_id', () => {
  test("Should respond with 404 Not found for an article_id that does not exist", () => {
    const votesBody = {
      inc_votes: 5
    };
    return request(app)
      .patch('/api/articles/76')
      .send(votesBody)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Not found')
      });
      });
});

describe('PATCH /api/articles/:article_id', () => {
  test("Should respond with 400 Bad request for an invalid article id", () => {
    const votesBody = {
      inc_votes: 3
    };
    return request(app)
      .patch("/api/articles/bananas")
      .send(votesBody)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Bad request')
      });
    });
});

describe('DELETE /api/comments/:comment_id', () => {
  test("Should delete a comment by comment_id", () => {
    return request(app)
      .delete('/api/comments/1')
      .expect(204)
      .then((response) => {
        expect(response.body).toEqual({})
      });
  });
});

describe('DELETE /api/comments/:comment_id', () => {
  test("Should respond with 404 Not found for a comment_id that does not exist", () => {

    return request(app)
      .delete('/api/comments/76')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Not found')
      });
      });
});

describe('DELETE /api/comments/:comments_id', () => {
  test("Should respond with 400 Bad request for an invalid comment_id", () => {
    return request(app)
      .delete("/api/comments/bananas")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Bad request')
      });
    });
});


describe('GET /api/users', () => {
  test("Should respond with status 200 and return array of objects for all users", () => {
    return request(app)
      .get('/api/users')
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.users)).toBe(true)
        expect(body.users).toHaveLength(4);
        body.users.forEach((user) => {
          expect(user).toHaveProperty('username');
          expect(user).toHaveProperty('name');
          expect(user).toHaveProperty('avatar_url');
        });
      });
  });
});
  

describe('GET /api/articles (queries)', () => {
  test("Should respond with status 200 and return articles based on topic query specified", () => {
    return request(app)
      .get('/api/articles?topic=mitch')
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveLength(12);
        body.forEach((article) => {
          expect(article.topic).toBe('mitch');
        });
      });
  });
});

describe('GET /api/articles (queries)', () => {
  test("Should respond with status 200 and return articles sorted_by a specified column", () => {
    return request(app)
      .get('/api/articles?sort_by=author')
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveLength(13);
        expect(body).toBeSorted({ key: 'author' });
      });
  });
});  

describe('GET /api/articles (queries)', () => {
  test("Should respond with status 200 and return articles sorted by date in ascending order when order=asc is specified", () => {
    return request(app)
      .get('/api/articles?order=asc')
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveLength(13);
        expect(body).toBeSorted({ ascending: true });
      });
  });

  test("Should respond with status 200 and return articles sorted by date in descending order when order=desc is specified", () => {
    return request(app)
      .get('/api/articles?order=desc')
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveLength(13);
        expect(body).toBeSorted({ descending: true});
      });
  });
});

describe('GET /api/articles (queries)', () => {
  test("Should respond with status 400 and return Bad request for an invalid topic", () => {
    return request(app)
      .get('/api/articles?topic=908')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Bad request');
      });
  });
});

describe('GET /api/articles (queries)', () => {
  test("Should respond with status 400 and return Bad request for invalid order when not desc or asc", () => {
    return request(app)
      .get('/api/articles?order=down')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Bad request')
      });
  });
});  

describe('GET /api/articles (queries)', () => {
  test("Should respond with status 404 and return not found for a non-existent topic", () => {
    return request(app)
      .get('/api/articles?topic=mickeymouseclubhouse')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Not found')
      });
  });
});

describe('GET /api/articles (queries)', () => {
  test("Should respond with status 400 and return Bad request for invalid sort_bys", () => {
    return request(app)
      .get('/api/articles?sort_by=pizza')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Bad request')
      });
  });
});

afterAll(() => {
    db.end()
});
