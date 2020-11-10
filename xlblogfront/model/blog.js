const mongoose = require('../db')

const Schema = mongoose.Schema;

const blog = new Schema({
    id:{
        type: Schema.ObjectId,
        ref:'blogContent',
        unique:true
    },
    title:{
        type:String,
        required:true

    },
   
    contentintro:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        required:true
    },
    keywords:{
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
    visitor:{
        type:Number
    },
    comment:{
        type:Number
    },
    display:{
        type:Boolean
    }

})

module.exports = mongoose.model('blog',blog,'blog')


// tag:'tags',
//   title:'周杰伦，my love',
//   contentintro:'周杰伦（Jay Chou），1979年1月18日出生于台湾省新北市，祖籍福建省泉州市永春县，中国台湾流行乐男歌手、原创音乐人、演员、导演、编剧，毕业于淡江中学。',
//   keywords:'歌手,导演，演员',
//   create_time:'2020-10-21 21:30',
//   visitor:0,
//   comment:0,
//   content: