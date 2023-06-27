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
  test('Should return 404 bad request when given an invalid route', () => {
    return request(app)
      .get('/api/notavalidroute')
      .expect(404)
      .then(({body}) => {
            expect(body).toHaveProperty('msg')
        expect(body.msg).toBe('Route not found')
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
  

afterAll(() => {
    db.end()
})