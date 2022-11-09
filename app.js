const http = require('http');
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

const { PORT, MONGO_URL } = require('./сonfigs/config');
const {positionRouter,applicantRouter} = require('./routes');
const {mainErrorHandler} = require('./errors');


const app = express();
const server = http.createServer(app);


app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/positions',positionRouter);
app.use('/applicants',applicantRouter);

app.use('*', (req,res,next) =>{
  next(new Error('Route not found'));
});

app.use(mainErrorHandler);

server.listen(PORT,() => {
  // eslint-disable-next-line no-console
  console.log('App listen', PORT);
  mongoose.connect(MONGO_URL);

});

