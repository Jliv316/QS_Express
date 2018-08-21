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
  MealsController.show(req, res);
});

// server
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log(`Listening on port... ${app.get('port')}`)
});

module.exports = router;
