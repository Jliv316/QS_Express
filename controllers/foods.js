const Food = require('../models/food')

class FoodsController {
  static async index(req, res) {
    let foods = await Food.getFoods(req, res);
    res.status(200).json(foods);
  }
}

module.exports = FoodsController;