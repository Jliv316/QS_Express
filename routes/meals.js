var express = require('express');
var router = express.Router();

// foods
app.get('/api/v1/meals', (req, res) => {
  MealsController.index(req, res);
});

module.exports = router;
