//app.js
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');

var indexRouter = require('./routes/index');
var aboutRouter = require('./routes/about');
var signupRouter = require('./routes/signup');
var signinRouter = require('./routes/signin');
var contactRouter = require('./routes/contact');

var app = express();
var db = require('./routes/db');
db.connectToDB();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(session({
  secret: 'Amandabela5',
  resave: false,
  saveUninitialized: false,
}));



app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/signup', signupRouter);
app.use('/signin', signinRouter);
app.use('/contact', contactRouter);

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
