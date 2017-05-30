var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var chat = require('./routes/chat');
var category = require('./routes/category');
var user = require('./routes/user');
var about = require('./routes/about');
var products = require('./routes/products');
var single = require('./routes/single');
var login = require('./routes/login');
var cart = require('./routes/cart');
var registration = require('./routes/registration');
var loginAdmin = require('./routes/loginAdmin');
var addProdCat = require('./routes/addProdCat');
var imageProduct = require('./routes/image_product');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', function(socket){
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    //io.emit('chat message', msg);
    socket.broadcast.emit('chat message', msg);
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Mongoose
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://vinestoreuser:vinestoreuser@ds123361.mlab.com:23361/vinestoredw", function (err) {
  if (err) {
    console.log("Error de conexion mongodb");
    console.log(err);
  }
});

app.use('/', index);
app.use('/', loginAdmin);
app.use('/', addProdCat);
app.use('/', cart);
app.use('/', category);
app.use('/', about);
app.use('/', products);
app.use('/', single);
app.use('/', login);
app.use('/', registration);
app.use('/', user);
app.use('/', imageProduct);
app.use('/', chat);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = {app: app, server: server};
