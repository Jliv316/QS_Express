const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

class Meal {
  static async getMeals(req, res) {
    return await database('meals').select();
  }

  static async getMeal(req, res) {
    let meal = await database('meals').where('id', req.params.id).select()
        let foods = await meal.map( async (meal) => {
          return await database('foods').select('foods.id', 'foods.name', 'foods.calories')
            .innerJoin('meal_foods', 'foods.id', 'meal_foods.food_id')
            .where('meal_foods.meal_id', meal.id)
          })
        console.log(foods)
        meal['foods'] = await foods;

    return meal;
  }
}

module.exports = Meal;