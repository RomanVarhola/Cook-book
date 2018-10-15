const Recipe = require('../models/recipe.model');

module.exports = {
  findSome(page, limit) {
    return Recipe.find().limit(limit).skip(limit * (page - 1));
  },
  findOne(id) {
    return Recipe.findById(id);
  },
  create(data) {
    const newRecipe = new Recipe(data);
    return newRecipe.save();
  },
  update(id, data) {
    return Recipe.findByIdAndUpdate(id, data, {new: true, runValidators: true});
  },
  destroy(id) {
    return Recipe.findByIdAndRemove(id);
  },
  count() {
    return Recipe.estimatedDocumentCount();
  }
};
