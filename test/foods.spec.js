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
      .then(() => {
        return Promise.all([
          database('foods').del()
        ])
      })
      .then(() => {
        return Promise.all([
          database('foods').insert({ name: "chicken", calories: 100, id: 1 }),
          database('foods').insert({ name: "spicy chicken", calories: 120, id: 2 }),
          database('foods').insert({ name: "Chicken and Waffles", calories: 750, id: 3 })
        ])
      })
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
            "name": "Chicken and Waffles",
            "calories": 750
          }
        })
        .end((err, response) => {
          response.should.have.status(201);
          expect(response.body.name).to.eq('Chicken and Waffles')
          expect(response.body.calories).to.eq(750)
          done();
        });
    });
  });

  describe('GET /api/v1/foods', () => {
    it('should return all foods', done => {
      chai.request(server)
        .get('/api/v1/foods')
        .end((err, response) => {
          console.log(response.body)
          response.should.have.status(200);
          expect(response.body[0].name).to.eq('chicken')
          expect(response.body[0].calories).to.eq(100)
          expect(response.body[1].name).to.eq('Chicken and Waffles')
          expect(response.body[1].calories).to.eq(750)
          expect(response.body[2].name).to.eq('spicy chicken')
          expect(response.body[2].calories).to.eq(120)
          done();
        });
    });
  });

  describe('GET /api/v1/foods/:id', () => {
    it('should return all foods', done => {
      chai.request(server)
        .get('/api/v1/foods/1')
        .end((err, response) => {
          response.should.have.status(200);
          expect(response.body[0].name).to.eq('chicken')
          expect(response.body[0].calories).to.eq(100)
          done();
        });
    });
  });

  describe('PATCH /api/v1/foods/:id', () => {
    it('should updated and return that food', done => {
      chai.request(server)
        .patch('/api/v1/foods/1')
        .send({
          food: {
            name: "French Toast Sticks",
            calories: 350
          }
        })
        .end((err, response) => {
          response.should.have.status(200);
          expect(response.body[0].name).to.eq('French Toast Sticks')
          expect(response.body[0].calories).to.eq(350)
          done();
        });
    });
  });

  describe('DELETE /api/v1/foods/:id', () => {
    it('should delete specific food', done => {
      chai.request(server)
        .delete('/api/v1/foods/1')
        .end((err, response) => {
          response.should.have.status(204);
          done();
        });
    });
  });
});