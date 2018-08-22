var express = require('express');
var router = express.Router();
const app = express();

// imports
const MealsController = require('../controllers/meals')

// meals
app.get('/api/v1/meals', (req, res) => {
  MealsController.index(req, res);
});

app.get('/api/v1/meals/:meal_id/foods', (req, res) => {
  // MealsController.show(req, res);
  database('meals').where('id', req.params.id).select()
    .then((meal) => {
      let singleMeal = meal.map((meal) => {
        return database('foods').select('foods.id', 'foods.name', 'foods.calories')
          .innerJoin('meal_foods', 'foods.id', 'meal_foods.food_id')
          .where('meal_foods.meal_id', meal.id)
          .then((foods) => {
            meal['foods'] = foods;

            return meal;
          })
      })
      return Promise.all(singleMeal)
    })
    .then((meal) => {
      res.status(200).json(meal);
    })
});

// // server
// app.set('port', process.env.PORT || 3000);

// app.listen(app.get('port'), () => {
//   console.log(`Listening on port... ${app.get('port')}`)
// });

module.exports = app;