const express=require('express');
const Router=express.Router();
//数据模型引入
const User=require('../mongo/model/user.js')
const Goods=require('../mongo/model/goods.js')
const email=require('./sendmail.js')
/**
 * @api {get} /admin/login/ login
 * @apiName login
 * @apiGroup admin
 *
 * @apiParam {string} name  邮箱
 * @apiParam {string} pass 密码
 * @apiSuccess {Number} err 错误码 0：ok -1 失败
 * @apiSuccess {String} msg  结果信息
 * @apiSuccess {String} data  返回数据
 */
//查询有没有这个邮箱名
Router.post('/getUserInfo',(req,res)=>{
    let name=req.body.name;
     User.find()
     .then((data)=>{
        let zhanghao=[];
        for(let i=0;i<data.length;i++){
            zhanghao.push(data[i].name);
        }
        if(zhanghao.indexOf(name) != -1){
            res.send({err:-1,msg:'查询错误',data:data})
        }else{
            res.send({err:0,msg:'查询成功',data:data})
        }
     })
	 .catch((err)=>{
	 	console.log(err);
	 	res.send('失败')
	 })
})
 let check={}
  //获取验证码
  var hh;
  Router.post("/getCode",(req,res)=>{
    // console.log(req.body)
    let name=req.body.name
    if (!name) {return res.send('参数错误')}
    let code=parseInt(Math.random(0,1)*1000)
    check[name]=code
    //发送邮件是异步操作
     email.sendMail(name,code,(state)=>{
            if (state) {
               res.send({err:-1,msg:'验证码发送nook',data:null});
            }else{
               res.send({err:0,msg:'验证码发送ok',data:null});
               //设置时间
               var d = new Date();
               hh = d.toUTCString(d.setMinutes(d.getMinutes() + 5));

            }
            
      })
        // d.setDate(d.getDate()-1);
  })
 // 验证码注册
 Router.post("/reg",(req,res)=>{
    //五分钟内没有注册则验证码过期
    let d = new Date();
    let kk = d.toUTCString(d.getMinutes());
    console.log(kk,hh);
    if(kk>hh){
        res.send('验证码已过期');
        return;
    }

   let {name,pass,code}=req.body
   // console.log({name,pass,code})
   // console.log(check)
   if (check[name]==code) {
       //插入数据库
       User.insertMany({name,pass})
         .then((data)=>{
            res.send({err:0,msg:'插入成功',data:null})
         })
         .catch((err)=>{
            console.log(err)
            res.send({err:-1,msg:'插入失败',data:null})
         })
       // res.send('注册ok')
   }else{
      res.send('验证码错误')
   }

 })


 //登录
  Router.post("/denglu",(req,res)=>{
    //五分钟内没有登录则验证码过期
    let d = new Date();
    let kk = d.toUTCString(d.getMinutes());
    console.log(kk,hh);
    if(kk>hh){
        res.send('验证码已过期');
        return;
    }

   let {name,pass,code}=req.body
   // console.log({name,pass,code})
   // console.log(check)
   if (check[name]==code) {
       //查询mongodb里有没有这个用户，并且密码正确
       
       User.find({"name": name})
         .then((data)=>{
            if(data[0].pass == pass){
                res.send({err:0,msg:'登录成功',data:null})
            }else{
                res.send({err:-1,msg:'登录失败',data:null})
            }
         })
         .catch((err)=>{
            console.log(err)
            res.send({err:-1,msg:'登录失败',data:null})
         })
       // res.send('注册ok')
   }else{
      res.send('验证码错误')
   }

 })

  Router.post("/dengluu",(req,res)=>{
    //五分钟内没有登录则验证码过期
    // let d = new Date();
    // let kk = d.toUTCString(d.getMinutes());
    // console.log(kk,hh);
    // if(kk>hh){
    //     res.send('验证码已过期');
    //     return;
    // }

   let {name,pass}=req.body
   // console.log({name,pass,code})
   // console.log(check)
       //查询mongodb里有没有这个用户，并且密码正确
       
   User.find({"name": name})
     .then((data)=>{
        if(data[0].pass == pass){
            res.send({err:0,msg:'登录成功',data:null})
        }else{
            res.send({err:-1,msg:'登录失败',data:null})
        }
     })
     .catch((err)=>{
        console.log(err)
        res.send({err:-1,msg:'登录失败',data:null})
     })
   // res.send('注册ok')

 })



//api接口  1. 接受数据 2.处理数据  3.返回结构
module.exports=Router;