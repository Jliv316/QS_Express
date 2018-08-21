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

  static create(req, res) {
    let food = Food.createFood(req, res);
    res.status(201).json(food);
  }

  static update(req, res){
    let attributes = req.body.food
    database('foods')
      .where('id', req.params.id)
      .update({
        'name': attributes.name,
        'calories': attributes.calories
      })
      .then(food => {
        res.status(201).json({ id: food[0], name: attributes.name, calories: attributes.calories })
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  
}

module.exports = FoodsController;