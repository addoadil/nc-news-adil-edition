const request = require('supertest');
const app = require('../app');
const seed = require('../db/seeds/seed');
const db = require('../db/connection');
const testData = require('../db/data/test-data/index');
const endpoints = require('../endpoints.json');


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
    })


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

  
afterAll(() => {
    db.end()
})