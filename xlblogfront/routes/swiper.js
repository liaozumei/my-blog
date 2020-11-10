var express = require('express');

var router = express.Router();
var cors = require('cors');
const swiper = require('../model/swiper');
const { create } = require('../model/swiper');

/* GET users listing. */
//轮播图，增
router.post('/addSwipers', cors(),function(req, res, next) {

    var swiperList = new swiper(req.body);
   
    swiperList.save({},function(error,data){
        if(error) throw error;
        else{
            res.send({
                status:200,
                data:{
                    msg:'ok'
                }
            });
        }
    })
    
});


//查
router.post('/getSwipers',cors(),function(req,res){
    var query = {};
    if(req.body.title){
        query.title = new RegExp(req.body.title);
    }
    
    swiper.find(query,function(error,data){
        if(error) throw error;
        else{
            res.send({
                status:200,
                swiper:data
            })
        }
    })
})

//删,把show的状态改为false
router.post('/delSwipers',cors(),function(req,res){
    var del = req.body;
    console.log(del);
    swiper.update({
    id:del.id},
    {
        show:del.show
    
       
    },function(error,data){
        if(error){
            console.error(error)
        }else{
            console.log(data)
          res.send({
              status:200,
              data:{
                msg:'ok'
              }
          })
        }
    })
})

//改

router.post('/changeSwipers',cors(),function(req,res){
    var modify = req.body;
   
    swiper.update({
        id:modify.id
    },{
        title:modify.title,
        content:modify.content,
        imgurl:modify.imgurl,
        show:modify.show
    },function(error,data){
        if(error) console.log(error);
        else{
            console.log(data);
            res.send({
                status:200,
                data:{
                    msg:'ok'
                }
            })
        }
    })
})





module.exports = router;
