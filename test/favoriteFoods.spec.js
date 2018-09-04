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
          database('meal_foods').insert({ meal_id: 2, food_id: 4 }, 'id'),
          database('meal_foods').insert({ meal_id: 2, food_id: 3 }, 'id'),
          database('meal_foods').insert({ meal_id: 3, food_id: 1 }, 'id'),
          database('meal_foods').insert({ meal_id: 4, food_id: 1 }, 'id'),
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

  describe('GET /api/v1/favorite_foods', () => {
    it('should return the top five favorite foods', done => {
      chai.request(server)
        .get('/api/v1/favorite_foods')
        .end((err, response) => {
          console.log(response.body)
          response.should.have.status(200);
          expect(response.body[0].timesEaten).to.eq(3)
          expect(response.body[0].foods[0].name).to.eq("Chicken and Waffles")
          expect(response.body[0].foods[1].name).to.eq("chicken")
          expect(response.body[1].timesEaten).to.eq(2)
          expect(response.body[1].foods[0].name).to.eq("Cheetos")
          done();
        });
    });
  });


});
