const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name:{
        required:true,
        type:String,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    roles:{
        type:String,
        required:true,
        enum:["student","instructor","admin"]
    }
})

module.exports = mongoose.model('User',userSchema);