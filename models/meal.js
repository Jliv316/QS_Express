const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

class Meal {
  static async getMeals(req, res) {
    return await database('meals').select();
  }

  static async getMeal(req, res) {
    const meal_id = req.params.meal_id;
    return await database.raw(`SELECT foods.* from meal_foods
                               INNER JOIN foods on meal_foods.food_id=foods.id
                               WHERE meal_foods.meal_id=?`, [meal_id])
  }
}

module.exports = Meal;