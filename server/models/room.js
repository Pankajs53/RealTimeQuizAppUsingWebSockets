const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    roomId:{
        type:String,
        required:true,
        unique:true,
    },
    members:[{
        socketId:{
            type:String,
            // required:true,
        },
        name:{
            type:String,
            // required:true,
        }
    }],
    creator:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    creatorsocketId:{
        type:String
    }
})

module.exports = mongoose.model('Room',roomSchema);