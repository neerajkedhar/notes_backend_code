const mongoose = require('mongoose');

const UserRegisterSchema =  mongoose.Schema({
   // _id:mongoose.Schema.Types.ObjectId,
    userName:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
       
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },

    
})

module.exports = mongoose.model('Users',UserRegisterSchema)