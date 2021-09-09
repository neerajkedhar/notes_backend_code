const mongoose = require('mongoose');

const TasksSchema =  mongoose.Schema({
   // _id:mongoose.Schema.Types.ObjectId,
   userName:{
        type:String,
        required:true,
        unique:false,
   },
    taskName:{
        type:String,
        required:true,
      //  unique:true,
    },
    body:{
        type:String,
        required:true,
       
    },
    time:{
        type:String,
        required:true,
       // unique:true,
    },

    
})

module.exports = mongoose.model('Tasks',TasksSchema)