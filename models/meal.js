const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

class Meal {
  

  // static async getFood(req, res) {
  //   return await database('foods').where('id', req.params.id).select()
  // }

  // static async createFood(req, res) {
  //   const food = req.body.food;

  //   for (let requiredParameter of ['name', 'calories']) {
  //     if (!food[requiredParameter]) {
  //       return res
  //         .status(422)
  //         .send({ error: `Expected format: { name: <String>, calories: <Integer> }. You're missing a "${requiredParameter}" property.` });
  //     }
  //   }

  //   try {
  //     const result = await database('foods').insert(food)
  //     const newFood = await database('foods').where('id', result[0])
  //     return { status: 200, data: newFood };
  //   } catch (error) {
  //     return { status: 400, data: { error: error } };
  //   }

  // }
}

module.exports = Meal;