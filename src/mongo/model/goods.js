 //创建数据模型
 const mongoose = require('mongoose');
 let Schema = mongoose.Schema;
 let goodsSchema=new Schema({
 	name:{type:String,required:true},
 	control:{type:String,required:true},//统御
 	force:{type:Number,required:true},//武力
 	intelligence:{type:Number,required:true},//智力
    Politics:{type:Number,required:true},//政治
    charm:{type:Number,required:true},//魅力
 	imgpath:{type:String,required:true},//图片路径
 	grounding:{type:Boolean,default:false}

 })
 // 将schema 对象转化为数据模型  model
 //var Blog = mongoose.model('Blog', blogSchema);
 //var Blog = mongoose.model('数据模型的名字（集合名字）', 要转化schema 对象);
 let goods=mongoose.model('character',goodsSchema);

module.exports=goods
//抛出数据模型