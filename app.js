const express = require('express');
const fileUpload = require('express-fileupload');
require('dotenv').config(); //беремо змінні з дот енв і пишемо їх в змінні середовища
const mongoose = require('mongoose');
const runCronJobs = require('./cron');
const morgan = require('morgan');

const { PORT, MONGO_URL } = require('./сonfigs/config');
const {authRouter,carRouter,userRouter} = require('./routes');
const {mainErrorHandler} = require('./errors');

const app = express();


app.use(morgan('dev'));  

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(fileUpload({}));

app.use('/auth',authRouter);
app.use('/users',userRouter); //при запиті на /users перейде в userRouter
app.use('/cars',carRouter);

app.use('*', (req,res,next) =>{
  next(new Error('Route not found'));
});

app.use(mainErrorHandler);

app.listen(PORT,() => {
  // eslint-disable-next-line no-console
  console.log('App listen', PORT);
  mongoose.connect(MONGO_URL);

  runCronJobs();
});

