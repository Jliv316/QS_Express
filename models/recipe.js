const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
var express = require('express');
var request = require('request');
var app = express(); 

class Recipe {

  static async getFood(req, res) {
    let result = await database('foods').where('id', req.params.id).select();
    let food = result[0].name;
    request(`http://api.yummly.com/v1/api/recipes?_app_id=58de4c61&_app_key=49c29c78d808d440d16df6b0182eeab3&q=${food}`, { json: true }, (err, res, body) => {
      if (err) { return console.log(err); }
      
      let recipes = {};
      let matches = res.body.matches;
     recipes["recipes"] = matches.map((match) => {
        let recipe = {name: match.recipeName, url: match.imageUrlsBySize}
        return recipes
      })
      console.log(recipes[0].name)
    });
    return recipes;
  }
}


module.exports = Recipe;