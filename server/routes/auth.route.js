const authController = require('../controllers/auth.controller');
const router = require('express').Router();
const customValidator = require('../helpers/custom.validator.helper');
const errorBuilder = require('../helpers/error.builder.helper');
const {requiredAuth} = require('../helpers/required.auth.helper');

module.exports = function () {
  router.get('/me', requiredAuth, authController.getMe);
  router.post('/login', customValidator.login(), errorBuilder, authController.login);
  router.post('/register', customValidator.register(), errorBuilder, authController.register);
  return router;
};
