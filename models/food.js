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

  static async createFood(req, res) {
    let newFood = req.body.food;
   return await database('foods').insert(newFood)
      .returning(['id', 'name', 'calories'])
    return 
  }

  static async updateFood(req, res) {
    let foodChanges = req.body.food;
    let food = await database('foods')
      .where('id', req.params.id)
      .update({
        'name': foodChanges.name,
        'calories': foodChanges.calories
      })
      .returning(['id', 'name', 'calories'])
    return food
  }
}


module.exports = Food;