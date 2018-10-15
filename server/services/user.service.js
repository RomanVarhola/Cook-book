const User = require('../models/user.model');

module.exports = {
  findByEmail(email) {
    return User.findOne({email});
  },
  findById(id) {
    return User.findById(id);
  },
  create(data) {
    const user = new User(data);
    return user.save();
  }
};
