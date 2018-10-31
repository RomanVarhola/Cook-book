const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userService = require('../services/user.service');

passport.serializeUser((user, done) => {
  done(undefined, user.id);
});

passport.deserializeUser((id, done) => {
  userService.findById(id).then((err, user) => {
    done(err, user);
  });
});

passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function (email, password, done) {
  userService.findByEmail(email).then((user) => {
    if (!user || !user.validPassword(password)) {
      return done(null, false, {errors: ['email or password is invalid']});
    }
    return done(null, user);
  }).catch(done);
}));
