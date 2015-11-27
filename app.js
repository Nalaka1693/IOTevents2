var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var eventsIOT = require('./eventsIOT');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var hubArray = [];

app.use('/', routes);
app.use('/users', users);

app.use('/events/:hubid', function(req, res) {
    var hubid = req.params.hubid;
    console.log("events");

    var found = 0;
    for (var i = 0; i < hubArray.length; i++) {
        if (hubArray[i].hubID == hubid) {
            found = 1;
            break;
        }
    }
    if (found == 1) {
        return hubArray[i].getRouter();

    } else {
        res.send('Error');
    }
});

app.get('/newhub/:hubid', function(req, res) {
    var hubid = req.params.hubid;

    var hub = new eventsIOT.Hub(hubid);
    hubArray.push(hub);
    res.send("new hub");
    console.log("hubArray", hubArray.length);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
