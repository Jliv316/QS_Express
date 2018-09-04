const Recipe = require('../models/recipe')

class RecipesController {

  static async show(req, res) {
    let food = await Recipe.getFood(req, res);
    res.status(200).json(food);
  }
}

module.exports = RecipesController;