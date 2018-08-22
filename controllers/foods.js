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
    return res.status(201).json(food);
  }

  static async update(req, res){
    let updatedFood = await Food.updateFood(req, res)
    res.status(200).json(updatedFood);
  }

  static async delete(req, res){
    let result = await Food.deleteFood(req, res)
    res.status(204).json({status: "food has successfully been deleted"})
  }
  
}

module.exports = FoodsController;