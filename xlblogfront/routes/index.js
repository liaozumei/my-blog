var express = require('express');
const swiper = require('../model/swiper');
var router = express.Router();
const blog = require('../model/blog')
/* GET home page. */
router.get('/', function(req, res, next) {
  //轮播图假数据
//   var swiper =[{
//     title:'小绿',
//     content:'this is me',
//     imgurl:'https://i.loli.net/2020/10/22/AC1HGbdSyWmLcw2.jpg'
//   },
// {
//   title:'蜜桃小分队',
//     content:'this is us',
//     imgurl:'https://i.loli.net/2020/10/22/Wem2vTzbUCH38PR.jpg'
// },
// {
//   title:'国庆游玩小分队',
//     content:'this is our',
//     imgurl:'https://i.loli.net/2020/10/22/IwvE8WC9c3BmU5Q.jpg'
// }];

//标签
var tags =['HTML','CSS','JS','Vue','Bootstrap'];

//帖子内容
var blog =[{
  tag:'tags',
  title:'周杰伦，my love',
  contentintro:'周杰伦（Jay Chou），1979年1月18日出生于台湾省新北市，祖籍福建省泉州市永春县，中国台湾流行乐男歌手、原创音乐人、演员、导演、编剧，毕业于淡江中学。',
  keywords:'歌手,导演，演员',
  create_time:'2020-10-21 21:30',
  visitor:0,
  comment:0,
  content:`有谁能比我知道
  你的温柔像羽毛
  秘密躺在我怀抱
  只有你能听得到
  还有没有人知道
  你的微笑像拥抱
  多想藏着你的好
  只有我看得到
  站在屋顶只对风说
  不想被左右`
},{
  tag:'tags',
  title:'周杰伦，my love',
  contentintro:'周杰伦（Jay Chou），1979年1月18日出生于台湾省新北市，祖籍福建省泉州市永春县，中国台湾流行乐男歌手、原创音乐人、演员、导演、编剧，毕业于淡江中学。',
  keywords:'歌手,导演，演员',
  create_time:'2020-10-21 21:30',
  visitor:0,
  comment:0,
  content:`有谁能比我知道
  你的温柔像羽毛
  秘密躺在我怀抱
  只有你能听得到
  还有没有人知道
  你的微笑像拥抱
  多想藏着你的好
  只有我看得到
  站在屋顶只对风说
  不想被左右`
},{
  tag:'tags',
  title:'周杰伦，my love',
  contentintro:'周杰伦（Jay Chou），1979年1月18日出生于台湾省新北市，祖籍福建省泉州市永春县，中国台湾流行乐男歌手、原创音乐人、演员、导演、编剧，毕业于淡江中学。',
  keywords:'歌手,导演，演员',
  create_time:'2020-10-21 21:30',
  visitor:0,
  comment:0,
  content:`有谁能比我知道
  你的温柔像羽毛
  秘密躺在我怀抱
  只有你能听得到
  还有没有人知道
  你的微笑像拥抱
  多想藏着你的好
  只有我看得到
  站在屋顶只对风说
  不想被左右`
},{
  tag:'tags',
  title:'周杰伦，my love',
  contentintro:'周杰伦（Jay Chou），1979年1月18日出生于台湾省新北市，祖籍福建省泉州市永春县，中国台湾流行乐男歌手、原创音乐人、演员、导演、编剧，毕业于淡江中学。',
  keywords:'歌手,导演，演员',
  create_time:'2020-10-21 21:30',
  visitor:0,
  comment:0,
  content:`有谁能比我知道
  你的温柔像羽毛
  秘密躺在我怀抱
  只有你能听得到
  还有没有人知道
  你的微笑像拥抱
  多想藏着你的好
  只有我看得到
  站在屋顶只对风说
  不想被左右`
},{
  tag:'tags',
  title:'周杰伦，my love',
  contentintro:'周杰伦（Jay Chou），1979年1月18日出生于台湾省新北市，祖籍福建省泉州市永春县，中国台湾流行乐男歌手、原创音乐人、演员、导演、编剧，毕业于淡江中学。',
  keywords:'歌手,导演，演员',
  create_time:'2020-10-21 21:30',
  visitor:0,
  comment:0,
  content:`有谁能比我知道
  你的温柔像羽毛
  秘密躺在我怀抱
  只有你能听得到
  还有没有人知道
  你的微笑像拥抱
  多想藏着你的好
  只有我看得到
  站在屋顶只对风说
  不想被左右`
},{
  tag:'tags',
  title:'周杰伦，my love',
  contentintro:'周杰伦（Jay Chou），1979年1月18日出生于台湾省新北市，祖籍福建省泉州市永春县，中国台湾流行乐男歌手、原创音乐人、演员、导演、编剧，毕业于淡江中学。',
  keywords:'歌手,导演，演员',
  create_time:'2020-10-21 21:30',
  visitor:0,
  comment:0,
  content:`有谁能比我知道
  你的温柔像羽毛
  秘密躺在我怀抱
  只有你能听得到
  还有没有人知道
  你的微笑像拥抱
  多想藏着你的好
  只有我看得到
  站在屋顶只对风说
  不想被左右`
},]
swiper.find({show:true},function(error,data){
  if(error){
    console.error(error);
  }else{
    res.render('index',{
      swiper:data,
      tags:tags,
    });
    blog.find({},function(err,doc){
      if(err) throw err
      else{
        res.render('index',{
          blog:doc
        })
      }
    })
  }
})

// blog.find({},function(error,data){
//   if(error){
//     console.error(error);
//   }else{
//     console.log(data);
//     res.render('index',{
//       blog:data,
//       tags:tags,
    
//     })
//   }
// })

})

module.exports = router;


