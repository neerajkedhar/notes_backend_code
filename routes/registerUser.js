const express = require('express');
const Users = require('../models/userDataModel');
const router = express.Router();
const {registerValidation} =require('../validation');
//const bcrypt = require('bcryptjs');


//Validation///




router.post('/',async(req,res)=>{

//Validating the user input data before uploading to the database

   const {error} = registerValidation(req.body);
   if(error) return res.status(400).send(error.details[0].message)

//Checking if user name and password already exist
    const emailExist = await Users.findOne({email:req.body.email});
    const userExist = await Users.findOne({userName:req.body.userName});
    if(emailExist) return res.status(400).json({msg:"email exist"})
    if(userExist) return res.status(400).json({msg:"User Name already exist"})
//HASH password

// const salt = await bcrypt.genSalt(10);
// const hashPassword =  await bcrypt.hash(req.body.password,salt);

    const newUser = new Users({
         userName : req.body.userName,
         password :req.body.password,
         email :req.body.email,
         })
         newUser.save().then(result=>{
            console.log(result);
            res.status(200).json({
                msg:"New User Added in the database",
                results:result
            })
        }).catch(err=>{
            console.log(err);
            res.status(500).json({
                msg:"newuser not added bcos error"+err
            })
        })
    })
    
    module.exports = router;