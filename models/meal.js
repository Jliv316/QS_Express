const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

class Meal {

  static async singleMeal(req, res) {
    return await database('meals').where('id', req.params.meal_id).select();
  }

  static async getMeals(req, res) {
    let meals = await database('meals').select();
    let allMeals = await Promise.all(meals.map( async (meal) => {
      let foods = await database('foods').select('foods.id', 'foods.name', 'foods.calories')
        .innerJoin('meal_foods', 'foods.id', 'meal_foods.food_id')
        .where('meal_foods.meal_id', meal.id)
      meal['foods'] = foods;
      return meal
    }))
    return allMeals;
  }

  static async getMeal(req, res) {
    let meal_id = req.params.meal_id
    let meal = await database('meals').where('id', meal_id).select()
    let foods = await database('meals').select()
      .where('meals.id', meal_id)
      .join('meal_foods', 'meals.id', '=', 'meal_foods.meal_id')
      .join('foods', 'foods.id', '=', 'meal_foods.food_id')
    let meal_foods = await {
      id: meal[0].id,
      name: meal[0].name,
      foods: [
        {id: foods[0].id, name: foods[0].name, calories: foods[0].calories}
      ]
    }
    return meal_foods;
  }

  static async createMealFood(req, res) {
    let meal_id = req.params.meal_id;
    let food_id = req.params.id;
    console.log(meal_id);
    await database('meal_foods').insert({meal_id: meal_id, food_id: food_id}, 'id');
  }

  static async deleteMealFood(req, res) {
    let meal_id = req.params.meal_id;
    let food_id = req.params.id;
    let meal = await database('meals').where({ id: meal_id }).select();
    let food = await database('foods').where({ id: food_id }).select();
    await database('meal_foods').where({ meal_id: meal[0].id, food_id: food[0].id }).del();
  }
}

module.exports = Meal;