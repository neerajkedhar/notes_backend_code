const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Users = require('./models/userDataModel');
const bodyparser = require('body-parser');

////////////MonogodbInitialization/////////////////
mongoose.connect('mongodb+srv://neeraj:putidhere@cluster0.thrwg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
mongoose.connection.on('error',err=>{
    console.log('connection faild'+ err)
})
mongoose.connection.on('connected',connected=>{
    console.log('connection succesfull')
})
const userRegister = require('./routes/registerUser');
const userLogin = require('./routes/loginUser');
const writeData = require('./routes/writeData');
const fetchtasks = require('./routes/fetchTasks');

////////////routes//////////////////////
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json());
app.use('/user/register', userRegister)
app.use('/user/login', userLogin)
app.use('/user/writedata', writeData)
app.use('/user/fetchdata', fetchtasks)
app.use((req,res,next)=>{
    Users.find().then(result=>{
        res.status(200).json({
            tasks:result
        })
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

module.exports = app;