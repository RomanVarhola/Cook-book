const passport = require('passport');
const userService = require('../services/user.service');

module.exports = {
  getMe(req, res) {
    const user = req.user;
    res.status(200).json({data: {user}});
  },
  login(req, res, next) {
    passport.authenticate('local', {session: true}, (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (user) {
        req.login(user, {session: false}, function (err) {
          if (err) return next(err);

          return res.status(200)
            .json({code: 200, message: 'You are signed in!', data: {user, token: user.generateJWT()}});
        });
      } else {
        return res.status(422).json(info);
      }
    })
    (req, res, next);
  },
  register(req, res) {
    userService.create(req.body)
      .then(user => {
        res.status(201)
          .json({message: 'You are registered', data: {user, token: user.generateJWT()}});
      })
      .catch(err => {
        res.status(422).json({data: null, errors: ['Email is already taken!']})
      })
  }
};
