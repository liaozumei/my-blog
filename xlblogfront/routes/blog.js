var express = require('express');
const blog = require('../model/blog')
const blogContent = require('../model/blogContent')
var router = express.Router();
var cors = require('cors')

/* GET users listing. */
router.get('/', cors(),function(req, res, next) {
  
});

// 增
// router.post('/addBlog',cors(),function(req,res){
//     var blogList = new blog(req.body);

// //博客其他内容
// blogList.save({},function(error,data){
//     if(error){
//         console.error(error)
//     }else{
//         res.send({
//             blog:data
//         })
//     }
// }
// );


// })

//两表连增
//增博客内容
router.post('/addBlogs',cors(),function(req,res){
   
    var blogContentList = new blogContent(req.body)
    var blogList = new blog(req.body);
   
    //博客内容表
blogContentList.save({},function(error,data){
    if(error){
        console.error(error)
    }else{
        blog.create({
            id:data._id,
            title:blogList.title,
            contentintro:blogList.contentintro,
            create_time:data.create_time,
            tag:blogList.tag,
            keywords:blogList.keywords,
            visitor:blogList.visitor,
            display:blogList.display

        },function(error,data){
                if(error){
                    console.error(error)
                }else{
                
                 res.send({
                    status:200,
                     blog:{
                         msg:'ok'
                     }
                 })
                }
            })
    }
}
)

})
//两表连查
// 查blog
router.post('/findBlogs',cors(),function(req,res){
    //  主表，查询关联表，populate里面填写关联的键
    //模糊查询
    var query = {};
    if(req.body.title){
        query.title = new RegExp(req.body.title);
    }
    
    blog.find(query).populate('id').exec(function(error,data){
        if(error){
            console.log(error)
        }else{
           
          res.send({
              status:200,
              blog:data
          })
        }
    })
})

//删除，逻辑删除，将display的状态改为false
//更新数据库
router.post('/delBlogs',cors(),function(req,res){
  
   console.log(req.body);
    // 然后把数据库更新
    blog.update({
        id:req.body.id
    },
    req.body,function(error,data){
        if(error) throw error;
        console.log(data);
        res.send({
            status:200,
            blog:{
                msg:'ok'
            }
        })
    })
})

//修改
router.post('/changeBlogs',cors(),function(req,res){
    var change = req.body
   console.log(change);
   blog.update({
       id:change.id
   },{
       title:change.title,
       contentintro:change.contentintro,
       create_time:change.create_time,
       tag:change.tag,
       visitor:change.visitor,
       keywords:change.keywords,
       display:change.display
   },function(error,data){
       if(error) throw error
       else{
        blogContent.update({
               _id:change.id
           },{
               blogContent:change.blogContent,
               create_time:change.create_time
           },function(err,doc){
               if(err) throw err
               else{
                   res.send({
                       status:200,
                       blog:{
                           msg:'ok'
                       }
                   })
               }
           })
       }
   })
})








module.exports = router;