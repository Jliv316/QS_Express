
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('foods').del()
    .then(function () {
      // Inserts foods
      return knex('foods').insert([
        {id: 1, name: 'Cinnamon Roll', calories: 254},
        {id: 2, name: 'Broccoli Cheddar Soup Bread Bowl', calories: 300},
        {id: 3, name: 'Cheese Cake', calories: 400},
        {id: 4, name: 'Baked Mostacioli', calories: 325},
        {id: 5, name: 'Half Baked (B&J ice cream)', calories: 270},
        {id: 6, name: 'French Baguette', calories: 150}
      ]);
    });

  return knex('meals').del()
    .then(function () {
      // Inserts meals
      return knex('meals').insert([
        {id: 1, name: 'Breakfast'},
        {id: 2, name: 'Lunch'},
        {id: 3, name: 'Dinner'},
        {id: 4, name: 'Snacks'}
      ]);
    });

  return knex('meal_foods').del()
    .then(function () {
      // Inserts meal_foods relationships
      return knex('meal_foods').insert([
        {id: 1, food_id: 1, meal_id: 1},
        {id: 2, food_id: 2, meal_id: 2},
        {id: 3, food_id: 3, meal_id: 4},
        {id: 4, food_id: 4, meal_id: 3},
        {id: 5, food_id: 5, meal_id: 4},
        {id: 6, food_id: 6, meal_id: 4}
      ]);
    });
};
