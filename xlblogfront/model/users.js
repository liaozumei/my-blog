var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var users = new Schema({
    email:{
        type:String
    },
   
    phone:{
        type:Number
    },
    username:{
        type:String   
    },
    password:{
        type:String
    },
    avatar:{
        type:String
    },
    token:{
        type:String
    },
    roles:{
        type:String
    }
})

module.exports = mongoose.model('users',users,'users')