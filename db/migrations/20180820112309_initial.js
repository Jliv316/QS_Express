
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('foods', function (table) {
      table.increments('id').primary();
      table.string('name');
      table.integer('calories');
    }),

    knex.schema.createTable('meals', function (table) {
      table.increments('id').primary();
      table.string('name');
    }),

    knex.schema.createTable('meal_foods', function (table) {
      table.increments('id').primary();
      table.integer('food_id').unsigned()
      table.foreign('food_id')
        .references('foods.id');
      table.integer('meal_id').unsigned()
      table.foreign('meal_id')
        .references('meals.id');
    })
  ])
};


exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('foods'),
    knex.schema.dropTable('meals'),
    knex.schema.dropTable('meal_foods')
  ]);

