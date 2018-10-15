const recipeController = require('../controllers/recipe.controller');
const router = require('express').Router();
const customValidator = require('../helpers/custom.validator.helper');
const errorBuilder = require('../helpers/error.builder.helper');

module.exports = function () {
  router.get('/', recipeController.getSome);
  router.get('/:id', recipeController.getOne);
  router.post('/', customValidator.recipe(), errorBuilder, recipeController.create);
  router.put('/:id', recipeController.update);
  router.delete('/:id', recipeController.delete);
  return router;
};
