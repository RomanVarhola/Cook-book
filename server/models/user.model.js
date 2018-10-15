const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uniqueValidator = require('mongoose-unique-validator');
const config = require('../config');

const UserSchema = new Schema({
  email: {
    type: String, lowercase: true, unique: true, required: true,
    match: [/\S+@\S+\.\S+/, 'is invalid'], sparse: true
  },

  first_name: {type: String, required: true},
  last_name: {type: String, required: true},

  password: {type: String}
}, {timestamps: true});

UserSchema.pre('save', function (next) {
  const user = this;
  user.password = bcrypt.hashSync(user.password, 10);
  return next();
});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJWT = function () {
  const today = new Date();
  const exp = new Date(today);

  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this.id,
    email: this.email,
    exp: Number(exp.getTime() / 1000),
  }, config.secret);
};

UserSchema.methods.toJSON = function () {
  return {
    _id: this._id,
    email: this.email,
    first_name: this.first_name,
    last_name: this.last_name,
    created_at: this.createdAt,
    updated_at: this.updatedAt
  };
};

UserSchema.methods.fullName = function () {
  return `${this.first_name.trim()} ${this.last_name.trim()}`;
};

module.exports = mongoose.model('User', UserSchema);
