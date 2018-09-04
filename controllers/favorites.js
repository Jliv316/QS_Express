const Food = require('../models/food')

class FavoritesController {
  static async index(req, res) {
    let foods = await Food.favoriteFoods(req, res);
    res.status(200).json(foods);
  }

  static async show(req, res) {
    let favFoods = await Food.favoriteFoods(req, res);
    let favFoodsMeals = await Food.favoriteFoodsMeals(favFoods);
    res.status(200).json(favFoodsMeals);
  }

}

module.exports = FavoritesController;