import React, { Component } from 'react';
//配置路由跳转链接link
import { Link } from "react-router-dom";
import "../../style/footer.less"


class Footer extends Component {
    constructor(props){
        super(props)
        this.state = {
            fnav:0,
            fnavs:[{
                title:"首页",
                href:"/Home/",
                channel:"",
                icon:"fa fa-home"
            },{
                title:"网贷项目",
                href:"/List/Zhitou",
                channel:"",
                icon:"fa fa-line-chart"
            },{
                title:"我的账户",
                href:"/Login/",
                channel:"",
                icon:"fa fa-user-o"
            },]
        }
    }
    fnavTo(index,e){
        this.setState({
            fnav:index
        })
        console.log(index);
    }
    render() {
        return (
                <div className="btn_nav">
                    <ul>
                    {
                        (()=>{
                            return this.state.fnavs.map((item,index)=>{
                                    return (
                                        <li onClick={this.fnavTo.bind(this,index)} key={index} className={index===this.state.fnav?"router-link-exact-active factives":""}>
                                            <Link to={item.href}>
                                            <i className={item.icon} aria-hidden="true"></i>
                                            <span >{item.title}</span>
                                            </Link>
                                        </li>
                                )
                            })
                        })()
                    } 
                    </ul> 
                </div>
        );
    }
}
export default Footer;








