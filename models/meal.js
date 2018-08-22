const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

class Meal {
  static async getMeals(req, res) {
    let meals = await database('meals').select();
    let allMeals = await meals.map((meal) => {
      let foods = await database('foods').select('foods.id', 'foods.name', 'foods.calories')
        .innerJoin('meal_foods', 'foods.id', 'meal_foods.food_id')
        .where('meal_foods.meal_id', meal.id)
      meal['foods'] = foods;

      return meal
    })
    console.log(allMeals);
  }

  static async getMeal(req, res) {
    let meal_id = req.params.meal_id
    let meal = await database('meals').where('id', req.params.meal_id).select()
    let foods = await database('meals').select()
      .where('meals.id', meal_id)
      .join('meal_foods', 'meals.id', '=', 'meal_foods.meal_id')
      .join('foods', 'foods.id', '=', 'meal_foods.food_id')
    let meal_foods = await {
      id: meal[0].id,
      name: meal[0].name,
      foods: [
        {id: foods[0].id, name: foods[0].name, calories: foods[0].calories},
        {id: foods[1].id, name: foods[1].name, calories: foods[1].calories}
      ]
    }
    return meal_foods;
    
  }
}

module.exports = Meal;