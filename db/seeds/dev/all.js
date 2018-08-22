exports.seed = function (knex, Promise) {
  return knex('meal_foods').del()
    .then(() => knex('meals').del())
    .then(() => knex('foods').del())
    .then(() => {
      return Promise.all([
        knex('meals').insert([
          { id: 1, name: 'Breakfast' },
          { id: 2, name: 'Snacks' },
          { id: 3, name: 'Lunch' },
          { id: 4, name: 'Dinner' }
        ])
      ])
    })
}