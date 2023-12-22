var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//index routing
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var logedinRouter = require('./routes/logedin');

//sessions
const session = require('express-session');
const sharedSession = require('express-socket.io-session');

var app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const sessionMiddleware = session({
  secret: '123',
  resave: false,
  saveUninitialized: true,
});

app.use(sessionMiddleware);

// Share session with io sockets
io.use(sharedSession(sessionMiddleware, {
  autoSave: true
}));

let messageHistory = [];
io.on('connection', (socket) => {
  console.log('a user connected');
  if (socket.handshake.session.user) {
    socket.on('chat message', (msg) => {
      console.log('a user connected');
      const messageData = { user: socket.handshake.session.user, message: msg };
      messageHistory.push(messageData);
      messageHistory = messageHistory.slice(-10); // Store last 10 messages
      io.emit('chat message', messageData);
    });

    socket.emit('load history', messageHistory);
  }
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/logedin', logedinRouter);


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

server.listen(3000, () => {
  console.log('Server started on port 3000');
});

module.exports = app;
