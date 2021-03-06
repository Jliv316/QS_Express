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
          database('foods').insert({ name: "Chicken and Waffles", calories: 750, id: 3 }),
          database('foods').insert({ name: "Cheetos", calories: 300, id: 4 })
        ])
      })
      .then(() => {
        return Promise.all([
          database('meal_foods').insert({ meal_id: 1, food_id: 1 }, 'id'),
          database('meal_foods').insert({ meal_id: 2, food_id: 2 }, 'id'),
          database('meal_foods').insert({ meal_id: 2, food_id: 3 }, 'id'),
          database('meal_foods').insert({ meal_id: 3, food_id: 1 }, 'id'),
          database('meal_foods').insert({ meal_id: 3, food_id: 3 }, 'id'),
          database('meal_foods').insert({ meal_id: 4, food_id: 3 }, 'id'),
          database('meal_foods').insert({ meal_id: 4, food_id: 4 }, 'id')
        ])
      })
      .then(() => done())
      .catch(error => {
        throw error;
      });
  });

  describe('POST /api/v1/meals/:meal_id/foods/:id', () => {
    it('creates a new meal food', done => {
      chai.request(server)
        .post('/api/v1/meals/1/foods/1')
        .end((err, response) => {
          response.should.have.status(201);
          done();
        });
    });
  });


  describe('GET /api/v1/meals/:meal_id/foods', () => {
    it('should return specific meal and all food corresponding to that meal', done => {
      chai.request(server)
        .get('/api/v1/meals/1/foods')
        .end((err, response) => {
          response.should.have.status(200);
          expect(response.body.id).to.eq(1)
          expect(response.body.name).to.eq('Breakfast')
          expect(response.body.foods[0].name).to.eq('chicken')
          expect(response.body.foods[0].calories).to.eq(100)
          done();
        });
    });
  });
  
  describe('GET /api/v1/meals', () => {
    it('should return all foods for each meal', done => {
      chai.request(server)
        .get('/api/v1/meals')
        .end((err, response) => {
          response.should.have.status(200);
          expect(response.body[0].name).to.eq('Breakfast')
          expect(response.body[0].foods[0].name).to.eq('chicken')
          expect(response.body[0].foods[0].calories).to.eq(100)
          
          done();
        });
    });
  });


  describe('DELETE /api/v1/meals/:meal_id/foods/:id', () => {
    it('should delete a specific food from a meal', done => {
      chai.request(server)
        .delete('/api/v1/meals/1/foods/1')
        .end((err, response) => {
          response.should.have.status(204);
          done();
        });
    });
  });
});