const express = require('express');

const fileServices = require('./services/file.services');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res) => {
  res.json('Hello')
})

app.get('/users',async (req,res) => {
    const usersFromService = await fileServices.getUsers();
    res.json(usersFromService);
});

app.post('/users',async (req,res) =>{
    const {name,age} = req.body;

    if (Number.isNaN(+age) || age <= 0){
        res.status(400).json('wrong user age');
        return;
    }

    const user = await fileServices.insertUser({name,age})

    res.status(201).json(user);
})

app.get('/users/:userId',async (req,res) => {
     const {userId} = req.params

    if (Number.isNaN(+userId) || +userId < 0){
        res.status(400).json('wrong user id');
        return;
    }

    const user = await fileServices.getOneUser(+userId);

    if (!user){
        res.status(404).json('user not found');
        return;
    }

     res.json(user)
})

app.put('/users/:userId',async (req,res) => {
    const {userId} = req.params;
    const {name,age} = req.body;

    if (Number.isNaN(+userId) || +userId < 0) {
        res.status(400).json('wrong user id');
    }

    const userObject = {};
    if (age) userObject.age = age;
    if (name) userObject.name = name;

    const user = await fileServices.updateUser(+userId,userObject);

    if (!user){
        res.status(404).json('user not found');
    }

       res.status(201).json(user);
});

app.delete('/users/:userId', async (req, res) => {
    const { userId } = req.params;

    if (Number.isNaN(+userId) || +userId < 0) {
        res.status(400).json('wrong user id');
    }

    const user = await fileServices.deleteOneUser(+userId);

    if (!user) {
        res.status(404).json('user not found');
    }

    res.sendStatus(204);
});


app.listen(5000,() => {})

//hw: delete user by id, update user by id