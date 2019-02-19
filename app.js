var express      = require('express');
var path         = require('path');
var logger       = require('morgan');
var createError  = require('http-errors');

var home  = require('./routes/index');

var app   = express();

var appMode = process.env.DEPLOYMENT_MODE || "development";
app.set('env', appMode);
app.set('logger-mode', appMode==="development" ? "dev" : "combined");
app.use(logger(app.get('logger-mode') || 'dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', home);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// catch 404 and forward to error handler.
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  if(err) {
    console.error(res.locals.message);
    console.error(res.locals.error);  
  }

  // render the error page
  res.status(err.status || 500);
  res.sendFile(path.join(__dirname+"/views/error.html"));
});

module.exports = app;
