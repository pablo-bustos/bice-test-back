var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const listEndpoints = require('express-list-endpoints')

var indexRouter = require('./app/routes/index');
const { env } = require('process');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use(require('./app/middlewares/finish-middleware'));

if(env.NODE_ENV == 'dev'){
  app.use('/crypto-utils', require('./app/routes/crypto-utils'))
}

// catch 404 and forward to error handler
app.use(function(req, res) {
  res.status(404).send("Page not found");
});

console.log(listEndpoints(app))

module.exports = app;
