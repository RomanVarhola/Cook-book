const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResipeSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true}
}, {timestamps: true});

module.exports = mongoose.model('Recipe', ResipeSchema);
