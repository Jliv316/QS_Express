var express = require('express');
var cors = require('cors');
// thrid party imports
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// imports
const FoodsController = require('./controllers/foods');
const MealsController = require('./controllers/meals');
const FavoritesController = require('./controllers/favorites');
const RecipesController = require('./controllers/recipes');


// foods routes
app.get('/api/v1/foods', (req, res) => {
  FoodsController.index(req, res);
});

app.get('/api/v1/foods/:id', (req, res) => {
  FoodsController.show(req, res);
});

app.post('/api/v1/foods', (req, res) => {
  FoodsController.create(req, res);
});

app.patch('/api/v1/foods/:id', (req, res) => {
  FoodsController.update(req, res);
});

app.delete('/api/v1/foods/:id', (req, res) => {
  FoodsController.delete(req, res);
});

app.get('/', (req, res) => {
  res.send('hello world!');
});


// meals routes
app.get('/api/v1/meals', (req, res) => {
  MealsController.index(req, res);
});

app.get('/api/v1/meals/:meal_id/foods', (req, res) => {
  MealsController.show(req, res);
});

app.post('/api/v1/meals/:meal_id/foods/:id', (req, res) => {
  MealsController.create(req, res);
});

app.delete('/api/v1/meals/:meal_id/foods/:id', (req, res) => {
  MealsController.delete(req, res);
});

// favorite foods route
app.get('/api/v1/favorite_foods', (req, res) => {
  FavoritesController.index(req, res);
});

app.get('/api/v1/favorite_foods/meals', (req, res) => {
  FavoritesController.show(req, res);
});

// yumly api recipe route
app.get('/api/v1/foods/:id/recipes', (req, res) => {
  RecipesController.show(req, res);
});



// server
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log(`Listening on port... ${app.get('port')}`)
});

module.exports = app;


