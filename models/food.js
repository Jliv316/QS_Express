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
   let createdFood = await database('foods').insert(newFood)
      .returning(['id', 'name', 'calories'])
      return createdFood[0];
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

  static async deleteFood(req, res){
    await database('foods').where('id', req.params.id).delete()
  }

  static async favoriteFoods(req, res){
    let foods = await database('meal_foods').select("food_id").groupBy('count')
    console.log(foods);
    return foods;
  }
}


module.exports = Food;