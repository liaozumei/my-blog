//引入mongoose
var mongoose = require('mongoose');

//连接数据库
mongoose.connect('mongodb://localhost:27017/xiaolvblog',{ useNewUrlParser: true });

mongoose.connection.once('open',function(){
    console.log('数据库连接成功');
})

module.exports = mongoose;