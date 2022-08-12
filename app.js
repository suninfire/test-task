const express = require('express');
const users = require('./dataBase/users');
const fileServices = require('./services/file.services');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res) => {
res.json('Hello')
})

app.get('/users',async (req,res) => {
    let usersFromService = await fileServices.getUsers();
    res.json(usersFromService)
})

app.get('/users/:userId',(req,res) => {
     const {userId} = req.params

    if (Number.isNaN(+userId) || +userId <= 0){
        res.status(400).json('wrong user id');
        return;
    }

    const user = users[userId];

    if (!user){
        res.status(404).json('user not found');
        return;
    }

     res.json(user)
})

app.post('/users',(req,res) =>{
    const {name,age,gender} = req.body;
    console.log(name,age,gender)

    if (Number.isNaN(+age) || age <= 0){
        res.status(400).json('wrong user age');
        return;
    }

    users.push({name,age,gender});

    res.status(201).json('ok');
})

app.listen(5000,() => {})

//hw: delete user by is, update user by id