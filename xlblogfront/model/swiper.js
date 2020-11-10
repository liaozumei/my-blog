 const mongoose = require('../db');


 const Schema = mongoose.Schema;

 const swiper = new Schema({
   imgurl:{
       type:String,
       required:true
   } ,
   title:{
       type:String,
       required:true
   },
   content:{
       type:String,
       required:true
   },
   create_time:{
    type:String,
    default:function(){
        //  默认为当前的时间戳
       const time = new Date();
       return time.getDate();
      
   }

   },
   id:{
    type:Number,
    default:function(){
        //  默认为当前的时间戳
        const time = new Date();
        return time.getTime();
    },
    unique:true
},
   show:{
       type:Boolean
   }


 })

 module.exports = mongoose.model('swiper',swiper,'swiper') //起得别名，字段名，表名