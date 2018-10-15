const router = require('express').Router();
const recipeRouter = require('./recipe.route');
const authRouter = require('./auth.route');
const {requiredAuth} = require('../helpers/required.auth.helper');

router.use('/api/', authRouter());
router.use('/api/recipes/', requiredAuth, recipeRouter());

module.exports = router;
