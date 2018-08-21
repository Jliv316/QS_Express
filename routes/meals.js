var express = require('express');
var router = express.Router();
const app = express();

// foods
app.get('/api/v1/meals', (req, res) => {
  MealsController.index(req, res);
});

// server
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log(`Listening on port... ${app.get('port')}`)
});

module.exports = router;
