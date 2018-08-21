var express = require('express');
var router = express.Router();
const app = express();

// imports
const FoodsController = require('../controllers/foods')

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

app.get('/', (req, res) => {
  res.send('hello world!');
});



// server
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log(`Listening on port... ${app.get('port')}`)
});

// module.exports = router;
