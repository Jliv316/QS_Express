const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

class Food {
  static async getFoods(req, res) {
    return await database('foods').select();
  }

  static async getFood(req, res) {
    return await database('foods').where('id', req.params.id).select()
  }

  static async createFood(req, res) {
    let newFood = req.body.food;
   let createdFood = await database('foods').insert(newFood)
      .returning(['id', 'name', 'calories'])
      return createdFood[0];
  }

  static async updateFood(req, res) {
    let foodChanges = req.body.food;
    let food = await database('foods')
      .where('id', req.params.id)
      .update({
        'name': foodChanges.name,
        'calories': foodChanges.calories
      })
      .returning(['id', 'name', 'calories'])
    return food
  }

  static async deleteFood(req, res){
    await database('foods').where('id', req.params.id).delete()
  }

  static async favoriteFoods(req, res){
    let result = await database.raw('SELECT foods.name, foods.calories, count(*) FROM foods INNER JOIN meal_foods ON foods.id = meal_foods.food_id GROUP BY foods.name, foods.calories');
    let allFoods = result.rows;
    let currentCount = 0;
    let favFoods = [];
    allFoods.map((food) => {
      if (currentCount == parseInt(food.count)){
        let lastElement = favFoods[favFoods.length - 1];
        lastElement.foods.push( {"name": food.name, "calories": food.calories} )
      } else {
        let newFood = {
          "timesEaten": parseInt(food.count),
          "foods": [ {"name": food.name, "calories": food.calories} ]
        }
        favFoods.push(newFood);
        currentCount = food.count;
      }
    })
    return favFoods;
  }

  static async favoriteFoodsMeals(favFoods){
    let favFoodsMeals = await Promise.all(favFoods.map(async (object) => {
      let foods = object.foods;
      await Promise.all(foods.map(async (food) => {
        let result = await database('meals').select('meals.name')
        .where('foods.name', food.name)
          .join('meal_foods', 'meals.id', '=', 'meal_foods.meal_id')
          .join('foods', 'foods.id', '=', 'meal_foods.food_id')
        let meals = await Promise.all(result.map(async (meal) => {
          return meal.name;
        }))
        food['mealsWhenEaten'] = meals;
      }))
    }))
    return favFoods;
  }
}


module.exports = Food;