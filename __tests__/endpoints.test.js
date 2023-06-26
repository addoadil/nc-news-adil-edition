const request = require('supertest');
const app = require('../app');
const seed = require('../db/seeds/seed');
const db = require('../db/connection');
const testData = require('../db/data/test-data/index');


beforeEach(() => {
    return seed(testData)
});

describe('GET /api/topics', () => {
    test('Should return an array of topic objects, each of which should have a slug & description', () => {
        return request(app).get("/api/topics")
            .expect(200)
            .then(({body}) => {
                    expect(body.topics).toMatchObject(
                        [{
                              description: 'The man, the Mitch, the legend',
                              slug: 'mitch'
                            },
                            {
                              description: 'Not dogs',
                              slug: 'cats'
                            },
                            {
                              description: 'what books are made of',
                              slug: 'paper'
                            }
                          ]
                    );
                });
    })
});

describe('GET /api/notavalidroute', () => {
    test('Should return 404 bad request when given an invalid route', () => {
        return request(app)
            .get('/api/notavalidroute')
            .expect(404);
    });
  });
  


afterAll(() => {
    db.end()
})