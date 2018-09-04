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
