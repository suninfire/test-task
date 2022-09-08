const express = require('express');
require('dotenv').config();   //беремо змінні з дот енв і пишемо їх в змінні середовища

const { PORT } = require('./сonfigs/config');
const {userRouter} = require('./routes');
const {mainErrorHandler} = require("./errors");


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/users',userRouter);
//при запиті на /users перейде в userRouter

app.use('*', (req,res,next) =>{
    next(new Error('Route not found'));
});

app.use(mainErrorHandler);

app.listen(PORT,() => {
    console.log('App listen', PORT);
});

