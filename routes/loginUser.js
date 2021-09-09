const express = require('express');
const Users = require('../models/userDataModel');
const jwt = require('jsonwebtoken')
const router = express.Router();
const config = require("../config")


router.post('/', (req,res)=>{
    try{
        Users.findOne({userName: req.body.userName},(err, result)=>{
            if(err) res.status(500).json({msg:err})
            if(result===null){
                res.status(403).json({msg:"no data"})
            }else{
                if(result.userName === req.body.userName){
                    if(result.password === req.body.password){
                        const token = jwt.sign({userName: req.body.userName},config.key)
                        res.header('auth-token',token)
                        res.status(200).json({
                            token:token,
                            msg:"Login Successful"})
                    }else{
                        res.status(200).json({msg:"Password is Incorrect"})
                    }
                    
                }else{
                    res.status(200).json({
                        msg:"UserName is Incorrect"
                    })
                }
            }
           
        })}catch(e){
             res.status(403).json({msg:e})
        }})

    module.exports = router;