const Meal = require('../models/meal')
const Food = require('../models/food')

class MealsController {
  static async index(req, res) {
    let meals = await Meal.getMeals(req, res);
    res.status(200).json(meals);
  }

  static async show(req, res) {
    let meal = await Meal.getMeal(req, res);
    res.status(200).json(meal);
  }

  static async create(req, res) {
    let meal = await Meal.singleMeal(req, res);

    let meal_food = await Meal.createMealFood(req, res);
    res.status(201).json({message: `successfully added ${food.name} to ${meal.name}`});
  }

  static async delete(req, res) {
    let meal = await Meal.singleMeal(req, res);
    let food = await Food.getFood(req, res);
    await Meal.deleteMealFood(req, res);
    res.status(204).json({ message: `successfully deleted ${food.name} from ${meal.name}` });
  }

}

module.exports = MealsController;