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

  static async create(req, res) {
    let food = await Food.createFood(req, res);
    res.status(201).json(food);
  }

  static async update(req, res){
    let updatedFood = await Food.updateFood(req, res)
    res.status(200).json(updatedFood);
  }
  
}

module.exports = FoodsController;