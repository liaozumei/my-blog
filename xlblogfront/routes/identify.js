var express = require('express');
var router = express.Router();
var db = require('../db');
var users =require('../model/users');

//解决跨域
var cors = require('cors');

//  引入发送邮件的插件:nodemailer
const nodemailer = require('nodemailer');

//引入随机数模块
 var mathCode = require('../utils/mathCode');


//引入redis数据库
var redis = require('redis');
const { NotFound } = require('http-errors');

//连接到本地服务器
var link = redis.createClient(6379,'localhost');
//存储到redis,键值对
// link.set('test','this is a test');
// //输出到控制台
//删除存储的邮箱
// link.del('571581201@qq.com');



/* GET home page. */
router.get('/', cors(),function(req, res) {
  res.render('index');
});



router.post('/code',cors(),function(req,res){
  
  //接收传过来的参数req.body.email
  console.log(req.body.email);
     //  第一步，配置发送信息请求
     let transporter = nodemailer.createTransport({
       //邮箱
       service:'qq',
       //  是否安全的开启发送模式
       secure:true,

       //发送人
       auth:{
         user:'571581201@qq.com',
         pass:'wimgwtpfdfbrbdgg'
       }

     })

     //先查找该邮箱是否存有验证码
     link.get(req.body.email,function(error,data){
       //如果redis里保存有，则不需要生成新的验证码，否则
      if(data != null){
        fasong(data,true)
      }else{
        fasong(mathCode.random(),false)
      }
     })

     //封装一个函数，把验证码当作参数传入
     //第二步设置发送内容
     function fasong(code,save){

      let mailOptionS = {
        from:'571581201@qq.com',
  
        //发送给谁
        to:req.body.email,
  
        //邮箱标题
        subject:'来自于Sakura个人博客的验证码',
  
        //邮箱内容
        text:'验证码是' + code +'，有效时间为5分钟'
      }
  
      //第三步发送
  
      transporter.sendMail(mailOptionS,function(error,data){
        if(error){
          console.log(error);
          res.send({
            status:400,
            msg:'邮件发送失败'
          })
        }else{
         //生成新的验证码之后，保存进redis
          if(!save){
            link.set(req.body.email,code);
          
            //设置保存时间
            link.expire(req.body.email,300);
          }
          res.send({
      
            msg:'ok'
          })
        }
      
   
  })
     }
    });
    router.post('/form', cors(),function(req,res){
      
     console.log(cors());
      //当前输入的验证码与redis里的作对比
      link.get(req.body.email,function(error,data){
  
        if(req.body.code == data){
          

            users.create({
              email:req.body.email,
              phone:req.body.phone,
              code:req.body.code,
              username:req.body.username,
              password:req.body.password,
              avatar:req.body.avatar,
              roles:req.body.roles
            })
            res.render('success',{
              tip:"注册成功，三秒后自动返回登录页面!",
              path:"/"
            });
  
            
     
       

        }
        else{
          
          res.send({
            msg:'验证码错误'
          })
        }
      })
  
    })

    

    router.post('/blog',cors(),function(req,res){
      var blog =[{
        title:'周杰伦',
        author:'me',
        content:'意思努斯奴才奴才不错年孙思想思想司马相思想三'
      },{
        title:'周杰伦',
        author:'me',
        content:'意思努斯奴才奴才不错年孙思想思想司马相思想三'
      },{
        title:'周杰伦',
        author:'me',
        content:'意思努斯奴才奴才不错年孙思想思想司马相思想三'
      }]
      res.send({
        blog:blog
      })
    })
    

module.exports = router;
