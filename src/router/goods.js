const express=require('express');
const Router=express.Router();
//数据模型引入
const Goods=require('../mongo/model/goods.js')
//增加商品
//添加商品信息

/**
 * @api {post} /goods/addGoods addGoods
 * @apiName addGoods
 * @apiGroup goods
 *
 * @apiParam {String} name  英雄名字
 * @apiParam {String} control 性别
 * @apiParam {String} force 物理攻击
 * @apiParam {String} intelligence 魔法攻击
 * @apiParam {String} Politics 防御能力
 * @apiParam {String} charm 上手难度
 * @apiParam {String} imgpath 图片地址
 *
 * @apiSuccess {Number} err 错误码 0：ok -1 失败
 * @apiSuccess {String} msg  结果信息
 * @apiSuccess {String} data  返回数据
 */
Router.post('/addGoods',(req,res)=>{
// 1.接受数据
  let {name,control,force,intelligence,Politics,charm,imgpath}=req.body
 Goods.insertMany({name,control,force,intelligence,Politics,charm,imgpath})
 .then((data)=>{
 	res.send({err:0,msg:'插入成功',data:null})
 })
 .catch((err)=>{

 	console.log(err)
    res.send({err:-1,msg:'插入失败',data:null})
 })

})
//分页查询商品

/**
 * @api {post} /goods/getGoods/ getGoods
 * @apiName getGoods
 * @apiGroup goods
 *
 * @apiParam {Number} pagesize  每页数量
 * @apiParam {Number} page 当前页数
 *
 * @apiSuccess {Number} err 错误码 0：ok -1 失败
 * @apiSuccess {String} msg  结果信息
 * @apiSuccess {String} data  返回数据
 */
Router.post('/getGoods',(req,res)=>{
	//返回总条数
  // Goods.find()查询所有
  // Goods.find({tyle:‘音乐’})//分类查询
  // Goods.find().limit(5).skip(5)//分页查询
  // 1页2条
  // 2   0
  // 2   2
  // 2   4
  // let pagesize=2//每页的条数
  // let page=1//页数o
  let  {pagesize,page}=req.body
  let obj={}
  Goods.find()
  .then((data)=>{
  	// 获取总条数
  	obj.total=data.length
  	  return Goods.find().limit(Number(pagesize)).skip((Number(page)-1)*Number(pagesize))
  })
  .then((data)=>{
  	//处理的是第几页的几条数据
  	obj.goodslist=data
  	res.send({err:0,msg:'查询成功',data:obj})
  })
  .catch((err)=>{
  	console.log(err)
  	res.send({err:-1,msg:'查询错误',data:null})
  })

})
//根据id查询
Router.post('/getIdGoods',(req,res)=>{
  let {id} = req.body;
  Goods.find({_id:id})
  .then((data)=>{
    res.send({err:0,msg:'查询成功',data:data})
  })
  .catch((err)=>{
    console.log(err)
    res.send({err:-1,msg:'查询错误',data:null})
  })

})
//修改商品

/**
 * @api {post} /goods/updateGoods/ updateGoods
 * @apiName updateGoods
 * @apiGroup goods
 *
 * @apiParam {String} id  主键id
 * @apiParam {String} name  英雄名字
 * @apiParam {String} control 性别
 * @apiParam {String} force 物理攻击
 * @apiParam {String} intelligence 魔法攻击
 * @apiParam {String} Politics 防御能力
 * @apiParam {String} charm 上手难度
 * @apiParam {String} imgpath 图片地址
 *
 * @apiSuccess {Number} err 错误码 0：ok -1 失败
 * @apiSuccess {String} msg  结果信息
 * @apiSuccess {String} data  返回数据
 */

 // 
Router.post('/updateGoods',(req,res)=>{
  //获取商品的唯一索引 主键（_id）
  // 获取修改的值
  // 执行修改

  let id=req.body.id;
  let {name,control,force,intelligence,Politics,charm,imgpath}=req.body
  Goods.updateMany({_id:id},{name,control,force,intelligence,Politics,charm,imgpath})
  .then((data)=>{
  	res.send({err:0,msg:'修改成功',data:null})

  })
  .catch((err)=>{
  	console.log(err)
  	res.send({err:-1,msg:'修改no成功',data:null})
  })

})
//删除商品

/**
 * @api {post} /goods/delGood/ delGood
 * @apiName delGood
 * @apiGroup goods
 *
 * @apiParam {String} id  要删除的商品的主键id
 *
 * @apiSuccess {Number} err 错误码 0：ok -1 失败
 * @apiSuccess {String} msg  结果信息
 * @apiSuccess {String} data  返回数据
 */
Router.post('/delGood',(req,res)=>{
  //获取商品的唯一索引 主键（_id）
  // 获取修改的值
  // 执行修改

  let id=req.body.id;
  // Goods.remove({_id:id})//正常的删除
  //let array=['5bdfe8b6b907c6a31b5aac37','5bdfe10748ecfa1380d368f0']
  //Goods.remove({_id:{$in:array}})//批量删除
  Goods.deleteMany({_id:id})
  .then((data)=>{
  	res.send({err:0,msg:'删除功',data:null})
  })
  .catch((err)=>{
  	console.log(err)
  	res.send({err:-1,msg:'删除no成功',data:null})
  })

})
//批量删除
Router.post('/delAllGood',(req,res)=>{
  //获取商品的唯一索引 主键（_id）数组
  // 获取修改的值
  // 执行修改

  let id=req.body;
  // Goods.remove({_id:id})//正常的删除
  //let array=['5bdfe8b6b907c6a31b5aac37','5bdfe10748ecfa1380d368f0']
  Goods.deleteMany({_id:{$in:id["id[]"]}})//批量删除
  // Goods.deleteMany({_id:id})
  .then((data)=>{
    res.send({err:0,msg:'删除功',data:null})
  })
  .catch((err)=>{
    console.log(err)
    res.send({err:-1,msg:'删除no成功',data:null})
  })

})

// m模糊查询 关键字查询
Router.post('/findGoodsByKw',(req,res)=>{

  // let zhi = req.body.zhi;
  // // let id=req.body.keyword;
  //   // Goods.find({name:{$regex:'肉'}})
  //  Goods.find({$or:[{name:{$regex:zhi}}]})
  //  // Goods.find({$or:[{name:{$regex:zhi}},{control:{$regex:(zhi-0)}},{force:{$regex:(zhi-0)}},{intelligence:{$regex:(zhi-0)}},{Politics:{$regex:(zhi-0)}},{charm:{$regex:(zhi-0)}}]})//不支持Number类型？？？？？
  // .then((data)=>{
  // 	res.send({err:0,msg:'查询成功',data:data})
  // })
  // .catch((err)=>{
  // 	console.log(err)
  // 	res.send({err:-1,msg:'查询no成功',data:null})
  // })
  let  {zhi,pagesize,page}=req.body
  let obj={}
  Goods.find()
  .then((data)=>{
    
      return Goods.find({$or:[{name:{$regex:zhi}}]}).limit(Number(pagesize)).skip((Number(page)-1)*Number(pagesize))
  })
  .then((data)=>{
    // 获取总条数
    obj.total=data.length
    //处理的是第几页的几条数据
    obj.goodslist=data

    res.send({err:0,msg:'查询成功',data:obj})
  })
  .catch((err)=>{
    console.log(err)
    res.send({err:-1,msg:'查询错误',data:null})
  })

})


//排序
Router.post('/getAscGoods',(req,res)=>{
  let  {pagesize,page,asc,xiao}=req.body
  let obj={}
  Goods.find()
  .then((data)=>{
    // 获取总条数
    obj.total=data.length
      return Goods.find().sort({[asc]:[xiao]}).limit(Number(pagesize)).skip((Number(page)-1)*Number(pagesize))
  })
  .then((data)=>{
    //处理的是第几页的几条数据
    obj.goodslist=data
    res.send({err:0,msg:'查询成功',data:obj})
  })
  .catch((err)=>{
    console.log(err)
    res.send({err:-1,msg:'查询错误',data:null})
  })

})

module.exports=Router;//暴露接口