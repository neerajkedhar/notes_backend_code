const express = require('express');
const Tasks = require('../models/tasksModel');
const router = express.Router();
const verify  = require("./verifyToken");

router.post('/',verify,(req,res)=>{
    const newTask = new Tasks({
         userName : req.body.userName,
         taskName :req.body.taskName,
         body :req.body.body,
         time :req.body.time,
         })
         newTask.save().then(result=>{
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