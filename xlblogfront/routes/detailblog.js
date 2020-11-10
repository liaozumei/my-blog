var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
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
  }]
 
  res.render('blog',{
    blog:blog
  })
});



module.exports = router;
