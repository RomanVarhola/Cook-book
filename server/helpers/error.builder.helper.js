const {validationResult} = require('express-validator/check');

module.exports = function (req, res, next) {
  const errorsList = validationResult(req);
  if (!errorsList.isEmpty()) {
    const errors = errorsList.array().map(err => err.msg);
    return res.status(422).json({errors});
  }
  return next();
};
