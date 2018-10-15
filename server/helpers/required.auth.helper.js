const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');
const userService = require('../services/user.service');

exports.requiredAuth = function (req, res, next) {
  const token = fromAuthHeaderAsBearerToken(req) || null;
  jwt.verify(token, config.secret, function(err, decoded) {
    if(!decoded) {
      return res.status(401).json({message: 'UnAuthorized'});
    }
    userService.findById(decoded.id).then(user => {
      if(!user) {
        return res.status(401).json({message: 'UnAuthorized'});
      }
      req.user = user;
      return next();
    })
  });
};

function fromAuthHeaderAsBearerToken(req){
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
}