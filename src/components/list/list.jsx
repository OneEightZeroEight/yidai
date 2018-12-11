import React, { Component } from 'react';
import '../../style/list.less';
import { Route} from "react-router-dom";
import XzhitouContent from './zhitou.jsx';
import XhuitouContent from './huitou.jsx';
import XzhuanrangContent from './zhuanrang.jsx';
import Footer from '../../components/common/Footer.jsx';
import { Link } from "react-router-dom";



// router-link-exact-active active

class Xlist extends Component {
    //定义状态
    constructor(props){
        super(props)
        this.state = {
            nav:0,
            navs:[{
                title:"直投项目",
                href:"/List/Zhitou",
                channel:""
            },{
                title:"慧投",
                href:"/List/Huitou",
                channel:""
            },{
                title:"转让项目",
                href:"/List/Zhuanrang",
                channel:""
            },]
        }
    }
    navTo(index,e){
        this.setState({
            nav:index
        })
    }
    render() {
        return (
            <div className="contlist">
                <div className="Net-loan">
                    <ul className="Net-loan-tabs">
                    {
                        (()=>{
                            return this.state.navs.map((item,index)=>{
                                    return (
                                        <li onClick={this.navTo.bind(this,index)} key={index} className={index===this.state.nav?"active":""}>
                                            <Link to={item.href}>{item.title}</Link>
                                        </li>
                                )
                            })
                        })()
                    } 
                    </ul>
                </div>
                <div className="list-content-contianer">
                    <Route path="/List/Zhitou" component={XzhitouContent} />
                    <Route path="/List/Huitou" component={XhuitouContent} />
                    <Route path="/List/Zhuanrang" component={XzhuanrangContent} />
                </div>
                <Footer />
            </div>
        );
    }
}
export default Xlist;
