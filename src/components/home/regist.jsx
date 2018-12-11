import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from "jquery";

class Reg extends Component {
    YanZheng(){
        let rootpath='http://127.0.0.1:3000';
        //检查邮箱名是否被占用
        let yanzheng = true;
        // let rootpath='http://127.0.0.1:3000';
        // //检查邮箱名是否被占用
        // let yanzheng = true;
        console.log("你在输入邮箱号码");
        let name = $("#username").val().trim();
        var reg = new RegExp("^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$"); 
        if(name == ''){
             // alert("手机不能为空！");
            $("#errorText").text("邮箱不能为空！");
            return false;
        }else if(!reg.test(name)){
            // alert("手机格式不正确，请重新输入！");
            $("#errorText").text("邮箱号码有误，请重填！");
            return false;
        }else{
            let url=rootpath+'/admin/getUserInfo';
            let data={
                name:name
            }
            $.post(url,data,function(res){
                // console.log(res)
                if (res.err!=0) {
                    // alert("邮箱已占用！");
                    yanzheng=false;
                    $("#errorText").text("邮箱已占用！");
                }else{
                    yanzheng=true;
                    $("#errorText").text("");
                }
            })
        }
    }
    sendYZ(){
        let rootpath='http://127.0.0.1:3000';
        //检查邮箱名是否被占用
        let yanzheng = true;
        let name = $("#username").val().trim();
        let url=rootpath+'/admin/getCode';
        let data={
            name:name
        }
        if(yanzheng){
            $.post(url,data,function(res){
                // console.log(res)
                if (res.err==0) {
                    // alert("验证码发送完毕");
                    $("#errorText").text("验证码发送ok");
                }
            })
        }else{
            // alert("请输入有效邮箱！");
            $("#errorText").text("请输入有效邮箱");
        }
    }
    Zhuce(){
        let yanzheng = true;
        let rootpath='http://127.0.0.1:3000';
        let name = $("#username").val().trim();
        let pass = $("#mima").val().trim();
        let code = $("#yanzhengma").val().trim();
        if(pass.length<6){
            // alert("密码长度不小于6！");
            $("#errorText").text("密码长度不小于6！");
        }
        let url=rootpath+'/admin/reg';
        let data={
            name:name,
            pass:pass,
            code:code
        }
        if(yanzheng){
            $.post(url,data,function(res){
                // console.log(res)
                if (res.err==0) {
                    $("#errorText").text("注册成功！");
                    // Cookie.setCookie("admin",name);
                    // location.href="index.html";
                }else{
                    // alert("注册失败！");
                    $("#errorText").text("注册失败！");
                }
            })
        }else{
            // alert("请输入有效邮箱！");
            $("#errorText").text("请输入有效邮箱！");
        }
        return false;
    }
    render() {
        return (
            <div className="regist-white-bac" style={{ display: this.props.isShowGallery.bool?'none':'block'}}>
                <div className="overflow-hidden">
                    <div className="regist-center-contain">
                          <div className="regist-input-box">
                                <p className="regist-input-title">立即注册</p>
                                <div className="input-contain">
                                    <input type="text" placeholder="请输入您的邮箱账号" id="username" onChange={this.YanZheng} />
                                    <input type="password" placeholder="请输入您的密码" id="mima" />
                                </div>
                                <p className="error-text" id="errorText"></p>
                                <div className="input-contain image-code">
                                    <input type="text" placeholder="请输入邮箱验证码" id="yanzhengma" className="YanZhengMa"/>
                                    <input type="button" onClick={this.sendYZ} value="发送验证码"/>
                                </div> 
                                <input type="button" value="注册立享专属福利" className="regist-btn regist-stept1" onClick={this.Zhuce}/>
                          </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default connect((state) => {
    // 第一个函数把store里面的值注入到Wnav组件的`props`上面
    // 第一个函数是获取store的值

    // 和store的state产生关系
    console.log(state)
    return state
}, (dispatch) => {
    // 第二个函数是触发store的值改变
    // 相当于vue（action，commit->mutation）
    // 你可以在此处定义多个函数，来去触发store里面的`dispatch`,从而改变`store`里面的值

    // 和store的action产生关系
    return {
        onIncreaseClick() {
            dispatch("increaseAction")
        }
    }
})(Reg);








