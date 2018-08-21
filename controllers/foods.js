const Food = require('../models/food')

class FoodsController {
  static async index(req, res) {
    let foods = await Food.getFoods(req, res);
    res.status(200).json(foods);
  }

  static async show(req, res) {
    let foods = await Food.getFood(req, res);
    res.status(200).json(foods);
  }
}

module.exports = FoodsController;