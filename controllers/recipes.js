const Recipe = require('../models/recipe')
const Food = require('../models/food')

class RecipesController {

  static async show(req, res) {
    let food = await Food.getFood(req, res);
    let recipes = await Recipe.yummlyCall(food);
    res.status(200).json(recipes);
  }
}

module.exports = RecipesController;