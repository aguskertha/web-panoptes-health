var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var app = express();
const expressLayouts = require('express-ejs-layouts');
const schedule = require('node-schedule')
const axiosLib = require('axios')
require('dotenv').config();
const axios = axiosLib.create({baseURL: process.env.APP_HOST});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/public',express.static(path.join(__dirname, 'public')));

schedule.scheduleJob('*/1 * * * *', async () => {
  try {
    await axios.delete('/sensors');
    console.log('Deleted sensors')
  } catch (error) {
    console.log(error.toString())
  }

})

const router =  require('./src/routes/routes');
app.use('/', router);

app.get('/', async (req, res, nexr) => {
  try {
    res.json('Hay')
  } catch (error) {
    res.send(error)
  }
})

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
