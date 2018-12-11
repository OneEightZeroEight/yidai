import React, { Component } from 'react';
import {render} from 'react-dom';
import Reg from './regist.jsx';
import { connect } from 'react-redux';
import Footer from '../common/Footer.jsx';
import ReactSwiperExample from '../home/lunbo.jsx';
import "../../style/home.less";




class SHome extends Component {
    constructor(props){
        super(props);
        this.props = props;
        this.state={
            nav:0,
            navlist:[
                {imgurl:'https://m.souyidai.com/static/3a85a4ad364152b7fabecde50b0293ed.png'},
                {imgurl:'https://m.souyidai.com/static/b246755a98d436732199dfe7e66c64c6.png'},
                {imgurl:'https://m.souyidai.com/static/87a4e77eaa4e0c7d2b9ec64ab9e0fae3.png'},
                {imgurl:'https://m.souyidai.com/static/62c422a74ae4992cd34a50c27eeff875.png'}
            ]
        }

    }
    render() {
        return (
            <div>
                <div className="header">
                    <div className="h_left lf">
                        <a href="index.html" className="logo">搜易贷</a>
                    </div>
                    <div className="h_right lr">
                        <div className="login lf">
                           <span className="loginLink" style={{ display: this.props.isShowGallery.bool?'none':'block'}}>
                               <a href="index.html">登录</a>
                               <a href="index.html">/</a>
                               <a href="index.html">注册</a>
                           </span>
                           <span style={{ display: this.props.isShowGallery.bool?'block':'none'}}>
                                <i class="fa fa-sort-desc" aria-hidden="true"></i>
                                <span className="User">{this.props.isShowGallery.Username}</span>
                           </span>
                        </div>
                        <a href="index.html" className="download lf">下载APP</a>
                    </div>
                </div>
                <div class="banner"><ReactSwiperExample /></div>
                <div className="Reg">
                    <Reg />
                    <div class="goDownload" style={{ display: this.props.isShowGallery.bool?'block':'none'}}>
                        <a href="https://events.souyidai.com/static/appGeneralize/index.html" class="download-btn">立即下载</a>
                    </div>
                </div>
                <div>
                <div id="homelist" className="recommand">
                        <h2 className="syd-title">新手专享</h2>
                        <ul className="foxM-info-group">
                            <li className="btLine">
                                <div className="group-lt">
                                    <span className="foxM-home-rate">9.88%</span>
                                    <span className="font-gray">参考年化结算利率</span>
                                </div>
                                <div className="group-md syd-group-md">
                                    <div className="groupL-bt">
                                        <span>专属福利</span>
                                        <span>限量发售</span>
                                    </div>
                                </div>
                                <div className="group-rt syd-group-rt">
                                    <a href="index.html" className="experBtn">立即体验</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="advantage">
                    <h2 className="page-title title">选择搜易贷的3大理由</h2>
                    <ul className="mInfo">
                        <li>
                            <img src="#" alt="" />
                            <div>
                                <h3 className="title">账户安全</h3> 
                                <p>华夏银行北京分行资金存管</p> 
                                <p>国家信息安全等级保护三级认证</p> 
                                <p>iTrust互联网信用评价中心AAA级信用认证</p>
                            </div>
                        </li>
                        <li>
                            <img src="#" alt="" />
                            <div>
                                <h3 className="title">专业风控</h3> 
                                <p>独创智能化“风刃”风控系统</p> 
                                <p>涵盖多维度、基于全生命周期管理</p> 
                                <p>依托Experian风险决策引擎精准授信</p>
                            </div>
                        </li>
                        <li>
                            <img src="#" alt="" />
                            <div>
                                <h3 className="title">平台实力</h3> 
                                <p>搜狐集团旗下公司</p> 
                                <p>中国互联网金融协会理事办单位</p> 
                                <p>iTrust互联网信用评价中心AAA级信用认证</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="syd-about">
                    <ul>
                        <li><i className="icon-infout"></i><span>信息披露</span></li>
                        <li><i className="icon-infout"></i><span>媒体报道</span></li>
                    </ul>
                </div>
                <div className="footer-ICP">
                    <p>出借有风险 选择需谨慎</p> 
                    <p>Copyright©2018 Fox Flintech Group. All Rights Reserved.</p> 
                    <p>狐狸金服公司 版权所有 京ICP备16056530号-2</p>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        );
    }
}



// 该组件如果想跟store进行连接就在导出的时候用
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
})(SHome);
