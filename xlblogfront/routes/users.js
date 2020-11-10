var express = require('express');
const users = require('../model/users');
var router = express.Router();
var cors = require('cors')
//  token自动生成一个工具  jwt-simple
var jwt = require('jwt-simple');
const { PayloadTooLarge } = require('http-errors');
const { update } = require('../model/users');

const tokenExpirestime = 1000 * 60 * 60 * 24;



//密钥
var secrit = 'xiaolv'
/* GET users listing. */
router.post('/', cors(),function(req, res, next) {
 
});

router.post('/getUsers', cors(),function(req,res){
    users.find({},function(error,data){
      if(error) throw error
      else{
        
        res.send({
          status:200,
          users:data
        })
      }
    })
  })


router.post('/changeUsers',cors(),function(req,res){
  console.log(req.body);
  users.update({
    username:req.body.username
  },{
    roles:req.body.roles
  },function(error,data){
    console.log(data);
    if(error) throw error;
    else{
      res.send({
        status:200,
        data:{
          msg:'ok'
        }
      })
    }
  })
})

router.post('/login',cors(),function(req,res){
    //  req到前台的参数
    //  用户名或者密码错误,查询数据库data.length = 0
    //  如果data.length > 1 返回错误:出现未知错误，请联系管理员  错误代码xxx d
  
  users.find({
    username:req.body.username,
    password:req.body.password
  },function(error,data){
    if(error) throw error;
    else{
      if(data.length == 1){
        //加密
        var payload = {
          username:req.body.username,
          password:req.body.password,
          expires:Date.now() + tokenExpirestime
        };
        
        var token = jwt.encode(payload,secrit);
       
        users.update({username:data[0].username},{
          token:token
        },function(error,data){
         
        res.send({
          status:200,
          data:token
        })
        }
        
        )
      }else if(data.length == 0){
        res.send({
          status:50016,
          msg:'用户名或密码错误'
        })
      }else{
        res.send({
          status:50018,
          msg:'出现未知错误，请联系管理员,错误代码50018'
        })
      }
      }
     
  })
})

router.post('/info',cors(),function(req,res){
    //  获取到携带的参数是token = admin-token
    //  然后返回一系列信息
    //  拿到带过来的token
    //  通过token解析，查询数据库获取数据库里面的token
    //  如果携带过来的token和数据库里面的token不符合，说明:你的账号有人登陆了 : 50012
    //  如果token过期了需要返回:50014
    //  其他情况需要返回:50008
  var payload = jwt.decode(req.query.token,secrit);
  if(Date.now() > payload.expires){
    res.send({
      statue:50014,
      msg:'登录时间过期'
    })
  }else{
    users.find({username:payload.username},function(error,data){
      if(error) throw error
      // 如果携带过来的token和数据库里面的token不符合，说明:你的账号有人登陆了 : 50012
      else if (data.length == 0){
        res.send({
          status:50012,
          msg:'你的账号有人登陆了'
        })
      }
      else{
        
        res.send({
          status:200,
          data:data[0]
        })
      }
    })
  }
 
})

router.post('/logout',function(req,res){
  res.send({
      status:200,
      data:'success'
  })
})


module.exports = router;
