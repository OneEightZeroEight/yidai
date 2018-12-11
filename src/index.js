import React from 'react';
import ReactDOM from 'react-dom';
// 路由
import { HashRouter as Router} from "react-router-dom";
import App from './App';
//引入全局配置样式
import './style/reset.less';
// import './style/home.less';
import * as serviceWorker from './libs/serviceWorker.js';


import {
  createBrowserHistory,
  createHashHistory,
  createMemoryHistory
} from 'history';

import axios from 'axios';
// 状态管理 配置store的
import { createStore } from 'redux'
// 把上面配置好的store和react进行关联
import { Provider } from 'react-redux';

React.axios = axios;

const store = createStore((state = {
    title:"微博",
    isShowNav: false,//登录状态
    isShowGallery: {
        bool: false,
        src: "",
        Username:""
    },

}, action) => {
    switch (action.type) {
        case 'toggleNav':
            return {
                ...state,
                isShowNav:action.isShowNav
            }
        case 'toggleGallery':
            return {
                ...state,
                isShowGallery:action.isShowGallery
            }
        default:
            return state
    }
})

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PW
serviceWorker.unregister();
