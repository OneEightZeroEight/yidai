import React, { Component } from 'react';
import '../../style/Mylogin.less';
import $ from "jquery";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import {
  createBrowserHistory,
  createHashHistory,
  createMemoryHistory
} from 'history';

import createHistory from 'history/createBrowserHistory'

const history = createHistory(); //创建历史对象
const location = history.location; //获取location对象
const unlisten = history.listen( (location, action) => {
    console.log(location,action)
    // location是location对象
    // action是动作名称，比如 "PUSH"
} )
// history.push('/a', { some: 'state' }) // 强制跳转
// unlisten() // 监听解绑

class Login extends Component {
    //写构造函数将props继承过来才能使用redux
    constructor(props){
        super(props);
        this.props = props;
        this.state={
            username:""
        }

    }

    Denglu(e){
        let rootpath='http://127.0.0.1:3000';
        let name = $("#youxiang").val().trim();
        let pass = $("#mima").val().trim();
        // let code = $("#yanzhengma").val().trim();
        let url=rootpath+'/admin/dengluu';
        let data={
            name:name,
            pass:pass
        }
        if(name!=""){
            $.post(url,data,function(res){
                // console.log(res)
                if (res.err==0) {
                    // if($(":checked").length == 0){
                    //     // Cookie.setCookie("admin",name);
                    //     console.log("登录成功");
                    // }else{
                    //     // var data = new Date();
                    //     // data.setDate(data.getDate()+7);
                    //     // Cookie.setCookie("admin",name,data.toUTCString());
                    //     console.log("登录失败！");
                    // }
                    $("#errorText").text("登录成功");
                    // location.href="index.html";
                    return true;
                }else{
                    return false;
                }
            })
        }else{
            $("#errorText").text("请输入有效的邮箱");
        }
        return false; 
    }
    regError(){
         $("#errorText").text("登录失败，密码或者邮箱错误");
    }



    render() {
        return (
            <div className="My-login-wrap">
                <div className="My-login">
                    <Link to="/Home/" ><i  className="fa fa-close" aria-hidden="true"></i></Link>
                </div>
                <div className="section-login">
                    <div className="login-img">
                       
                    </div>
                    <div className="login-info">
                        <li className="btLine userName">
                            <input type="text" placeholder="邮箱" id="youxiang" />
                        </li>
                         <li className="btLine userPwd">
                            <input type="password" placeholder="登录密码" id="mima" /> 
                            <i  className="icon-clear"></i> <i className="icon-close-eye"></i>
                        </li>
                    </div>
                    <p className="error-text" id="errorText"></p>
                    <div className="btn-sure">
                        <a onClick = {this.Denglu?this.props.toggleGallery.bind(this,$("#youxiang").val()):this.regError} >登录</a>
                    </div>
                </div>
                <footer className="login-footer" >
                    <a>找回密码／激活账户</a> 
                    <a>快速注册</a>
                </footer>
            </div>
        );
    }

}

export default connect((state) => {
    console.log(state)
    return state
}, (dispatch) => {
    return {
        toggleGallery(Username){
            dispatch({
                type:"toggleGallery",
                isShowGallery:{
                    bool: !this.props.isShowGallery.bool,
                    src:"",
                    Username
                }
            })
        }
    }
})(Login);