const {check} = require('express-validator/check');

module.exports = {
  login() {
    return [
      check('email').isEmail().withMessage('Email is missing'),
      check('password').isLength({min: 4}).withMessage('Password is missing or it is too short')
    ]
  },
  register() {
    return [
      check('email').isEmail().withMessage('Email is missing'),
      check('password').isLength({min: 4}).withMessage('Password is missing or it is too short'),
      check('first_name').not().isEmpty().withMessage('First name is missing'),
      check('last_name').not().isEmpty().withMessage('Last name is missing')
    ]
  },
  recipe() {
    return [
      check('title').not().isEmpty().withMessage('Title is missing'),
      check('description').not().isEmpty().withMessage('Description is missing')
    ];
  }
};
