const chai = require('chai');
const should = chai.should();
const expect = chai.expect
const chaiHttp = require('chai-http');
const server = require('../app');
const util = require('util')

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);


chai.use(chaiHttp);

describe('Client Routes', () => {

});

describe('API Routes', () => {
  before((done) => {
    database.migrate.latest()
      .then(() => done())
      .catch(error => {
        throw error;
      });
  });

  beforeEach((done) => {
    database.seed.run()
      .then(() => done())
      .catch(error => {
        throw error;
      });
  });

  describe('POST /api/v1/foods', () => {
    it('creates a new food', done => {
      chai.request(server)
        .post('/api/v1/foods')
        .send({
          "food": {
            "name": "Spaghett",
            "calories": 500
          }
        })
        .end((err, response) => {
          response.should.have.status(201);
          expect(response.body.name).to.eq('Spaghett')
          expect(response.body.calories).to.eq(500)
          done();
        });
    });
  });
});