
//声明一个对象，向外暴露

var mathCode ={};


//封装一个随机函数
mathCode.random = function(){

    //定义一个空字符串，用来接收0-9之间的随机数

    var ranCode ='';
    for(let i = 0; i < 6; i++){
        var a = Math.floor((Math.random()*10000000)%10);
        ranCode += a;
    }
    return ranCode;
   

}


module.exports =mathCode;


