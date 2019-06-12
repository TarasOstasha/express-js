const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const cors = require('cors');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const db = require('./db');
const mongoose = require('mongoose');
const User = require('./models/user')
const session = require('express-session');

// connect to the database
mongoose.connect('mongodb+srv://user:1111@cluster0-olmgj.mongodb.net/test?retryWrites=true&w=majority')

// connect to the database
//mongoose.connect('mongodb://localhost/' + process.env.DBNAME)

// const Cat = mongoose.model('Cat', { name: String });
// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();



require('./_app/passport.js'); //... passport




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use((req, res, next)=> {
  req.a = 'Hello';
  next();
});

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'new-front/dist/new-front')));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(session({ 
  secret: 'my_precious',
  name: 'cookie_name',
  //store: sessionStore, // connect-mongo session store
  proxy: true,
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());



app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
