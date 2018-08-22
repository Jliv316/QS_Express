var express = require('express');
var cors = require('cors');

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

// foods
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



// meals
app.get('/api/v1/meals', (req, res) => {
  MealsController.index(req, res);
});

app.get('/api/v1/meals/:meal_id/foods', (req, res) => {
  MealsController.show(req, res);
});



// server
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log(`Listening on port... ${app.get('port')}`)
});

module.exports = app;


