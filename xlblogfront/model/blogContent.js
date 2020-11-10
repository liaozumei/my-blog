const mongoose = require('../db')

const Schema = mongoose.Schema

var blogContent = new Schema({
    id:{
        type:Number,
        default:function(){
            //  默认为当前的时间戳
            const time = new Date();
            return time.getTime();
        },
        unique:true
    },
    blogContent:{
        type:String,
        require:true
    },
    create_time:{
        type:String,
        default:function(){
            const time = new Date();
            return time.getDate()
        }
    }
})

module.exports = mongoose.model('blogContent',blogContent,'blogContent')