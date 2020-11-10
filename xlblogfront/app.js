var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var detailblogRouter = require('./routes/detailblog');
var identifyRouter = require('./routes/identify');
var meRouter = require('./routes/me');
var swiperRouter = require('./routes/swiper');
var blogRouter = require('./routes/blog')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use('/', cors(),indexRouter);
app.use('/users',cors(), usersRouter);
app.use('/identify',identifyRouter);
app.use('/detailblog',detailblogRouter);
app.use('/me',meRouter);
app.use('/swiper',swiperRouter);
app.use('/blog',cors(),blogRouter);

app.use((req, res, next) => {
  /*
    如果你的请求过于复杂，或者跨域，那么就会变成先发送options请求，然后在发送正常请求
*   请求变成options:
*    1. 出现跨域问题
*    2. 请求过于复杂
* */
  res.set({
  // * 是否同意所有请求进入
    'Access-Control-Allow-Credentials': true,
    // * 如果出现重复请求，那么在多久时间能直接同意
    'Access-Control-Max-Age': 1728000,
    'Access-Control-Allow-Origin': req.headers.origin || '*',
    // * 可以同意什么样的头部请求直接进入
    'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type,token',
      //  同意什么类型的请求进入
     'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
    'Content-Type': 'application/json; charset=utf-8'
  })
  req.method === 'OPTIONS' ? res.status(204).end() : next()
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
