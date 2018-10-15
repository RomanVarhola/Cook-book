const recipeService = require('../services/recipe.service');

module.exports = {
  getSome(req, res) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    Promise.all([
      recipeService.findSome(page, limit),
      recipeService.count()
    ]).then(results => {
      const [recipes, total] = results;
      res.status(200).json({data: {recipes, total, page, limit}});
    })
  },
  getOne(req, res, next) {
    recipeService.findOne(req.params.id).then(recipe => {
      if (recipe) {
        return res.status(200).json({data: {recipe}});
      }
      res.status(404).json({data: null, error: 'Recipe doesn\'t found'});
    }).catch(err => next(err));
  },
  create(req, res, next) {
    recipeService.create(req.body).then(recipe => {
      if (recipe) {
        return res.status(201).json({message: 'Recipe was created!', data: {recipe}});
      }
    }).catch(err => next(err));
  },
  update(req, res, next) {
    recipeService.update(req.params.id, req.body).then(recipe => {
      if (recipe) {
        return res.status(200).json({message: 'Recipe was updated!', data: {recipe}});
      }
      res.status(404).json({data: null, error: 'Recipe doesn\'t found'});
    }).catch(err => next(err));
  },
  delete(req, res, next) {
    recipeService.destroy(req.params.id).then(recipe => {
      if (recipe) {
        return res.status(200).json({message: 'Recipe was destroyed!', data: {recipe}});
      }
      res.status(404).json({data: null, error: 'Recipe doesn\'t found'})
    }).catch(err => next(err));
  }
};
