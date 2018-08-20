var express = require('express');
var router = express.Router();
const app = express();

// imports
import FoodsController from './controllers/foods_controller';

app.set('port', process.env.PORT || 8000);

app.get('/api/v1/foods', (req, res) => {
  FoodsController.index(req, res);
});


// server spin and listen
const port = process.env.PORT || 8000;

app.listen(app.get('port'), () => {
  console.log(`Listening on port... ${port}`)
});

// module.exports = router;
