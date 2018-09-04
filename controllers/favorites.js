const Food = require('../models/food')

class FavoritesController {
  static async index(req, res) {
    let foods = await Food.favoriteFoods(req, res);
    res.status(200).json(foods);
  }

}

module.exports = FavoritesController;