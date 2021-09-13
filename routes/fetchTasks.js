const express = require('express');
const Tasks = require('../models/tasksModel');
const router = express.Router();
const verify  = require("./verifyToken");

//////////////get a perticular user data////////////////////
router.get('/:userName',verify,(req,res)=>{
    Tasks.find({userName:req.params.userName}).then(result=>{
        res.status(200).json({msg:result,})
    
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:err})
    })
})

//////////////////////// update tasks' data//////////////// 
router.put('/:id',verify,async(req,res)=>{
    try{
        const task = await Tasks.findById(req.params.id);
        task.taskName = req.body.taskName,
        task.time = req.body.time
        task.body = req.body.body
        const saved = await task.save();
        res.json({msg:saved});
    }catch(e){
        res.json({msg:"error"+e,})
    }
})

/////////////////////// delete task ///////////////////////
router.delete('/:id',verify,async(req,res)=>{
    try{
        const task = await Tasks.findById(req.params.id);
        const removed = await task.remove();
        res.json({msg:"Removed Successfully"})
    }catch(e){
        res.json({msg:"error" + e})
    }
})

module.exports = router;