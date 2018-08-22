const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

class Meal {
  static async getMeals(req, res) {
    return await database('meals').select();
  }

  static async getMeal(req, res) {
    database('meals').where('id', req.params.id).select()
      .then((meal) => {
        let singleMeal = meal.map((meal) => {
          return database('foods').select('foods.id', 'foods.name', 'foods.calories')
            .innerJoin('meal_foods', 'foods.id', 'meal_foods.food_id')
            .where('meal_foods.meal_id', meal.id)
            .then((foods) => {
              meal['foods'] = foods;

              return meal;
            })
        })
        return Promise.all(singleMeal)
      })
      .then((meal) => {
        res.status(200).json(meal);
      })
  }
}

module.exports = Meal;