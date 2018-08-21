const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

class Food {
  static async getFoods(req, res) {
    return await database('foods').select();
  }

  static async getFood(req, res) {
    return await database('foods').where('id', req.params.id).select()
  }
}

module.exports = Food;