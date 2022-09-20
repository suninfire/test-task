const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const fileUpload = require('express-fileupload');
require('dotenv').config(); //беремо змінні з дот енв і пишемо їх в змінні середовища
const mongoose = require('mongoose');
const runCronJobs = require('./cron');
const morgan = require('morgan');

const { PORT, MONGO_URL } = require('./сonfigs/config');
const {authRouter,carRouter,userRouter} = require('./routes');
const {mainErrorHandler} = require('./errors');
const {userJoinRoom} = require('./controllers/socket.controller');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {cors: 'http://localhost:63342'});

io.on('connection', (socket) => {
  console.log('connected');
  console.log(socket.handshake);

  socket.on('message:create', (data) => {
    console.log(data);

    // EMIT EVENT TO SENDER
    // socket.emit('user:create', {name: 'Socket', hard: 10});

    // EMIT EVENT ALL USERS INCLUDE SENDER
    // io.emit('user:create', { name: 'Socket', hard: 10 });

    // EMIT EVENT ALL USERS EXCLUDE SENDER
    socket.broadcast.emit('user:create', { name: 'Socket', hard: 10 });


  });

  socket.on('room:join', (data) => {
    userJoinRoom(io, socket, data);
  });
});


app.use(morgan('dev'));  

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(fileUpload({}));

app.use('/auth',authRouter);
app.use('/users',userRouter); //при запиті на /users перейде в userRouter
app.use('/cars',carRouter);

app.get('/health', (req, res ) => res.json('OKAY'));

app.use('*', (req,res,next) =>{
  next(new Error('Route not found'));
});

app.use(mainErrorHandler);

server.listen(PORT,() => {
  // eslint-disable-next-line no-console
  console.log('App listen', PORT);
  mongoose.connect(MONGO_URL);

  runCronJobs();
});

