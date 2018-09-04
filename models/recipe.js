const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
var express = require('express');
var request = require('request');
var app = express(); 

require("isomorphic-fetch")

class Recipe {

  static async yummlyCall(food){
    let response = await fetch(`http://api.yummly.com/v1/api/recipes?_app_id=58de4c61&_app_key=49c29c78d808d440d16df6b0182eeab3&q=${food}`);
    let data = await response.json();
    let matches = await data.matches.map((match) => {
      return { name: match.recipeName, url: `http://www.yummly.com/recipe/${match.id}`};
    })
    let recipes = {};
    recipes["recipes"] = matches;
    return recipes;
  } 
}

module.exports = Recipe;