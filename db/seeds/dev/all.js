exports.seed = function (knex, Promise) {
  return knex('meal_foods').del()
    .then(() => knex('meals').del())
    .then(() => knex('foods').del())
    .then(() => {
      return Promise.all([
        knex('foods').insert([
          { id: 1, name: 'Cinnamon Roll', calories: 254 },
          { id: 2, name: 'Broccoli Cheddar Soup Bread Bowl', calories: 300 },
          { id: 3, name: 'Cheese Cake', calories: 400 },
          { id: 4, name: 'Baked Mostacioli', calories: 325 },
          { id: 5, name: 'Half Baked (B&J ice cream)', calories: 270 },
          { id: 6, name: 'French Baguette', calories: 150 }
        ])
          .then(() => {
            return knex('meals').insert([
              { id: 1, name: 'Breakfast' },
              { id: 2, name: 'Lunch' },
              { id: 3, name: 'Dinner' },
              { id: 4, name: 'Snacks' }
            ])
          })
          .then(() => {
            return knex('meal_foods').insert([
              { id: 1, food_id: 1, meal_id: 1 },
              { id: 2, food_id: 2, meal_id: 2 },
              { id: 3, food_id: 3, meal_id: 4 },
              { id: 4, food_id: 4, meal_id: 3 },
              { id: 5, food_id: 5, meal_id: 4 },
              { id: 6, food_id: 6, meal_id: 4 }
            ]);
          })
      ])
    })
}