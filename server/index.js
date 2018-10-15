const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config');
const path = require('path');
const router = require('./routes');
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: config.secret,
}));

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
if (process.env.NODE_ENV !== 'test') {
  mongoose.set('debug', true);
}

const database = process.env.NODE_ENV === 'test' ?
  'mongodb://localhost/cookbook-test' : config.database;
const port = process.env.NODE_ENV === 'test' ? 3001 : config.port;

mongoose
  .connect(database, {useNewUrlParser: true})
  .then(() => {
      console.log('Connected to mongoDB');
    },
  )
  .catch(err => {
    console.log(`MongoDB connection error. Please make sure MongoDB is running.${err}`);
    process.exit();
  });

require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(router);

module.exports = app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  return console.log(`Server is listening on ${port}`);
});
