import React, { Component } from 'react';
import './style/home.less';
//路由配置参数
import { Route} from "react-router-dom";

import Home from './components/home/home.jsx';
import List from './components/list/list.jsx';
import Login from './components/my/login.jsx';
class App extends Component {
    render() {
        return (
            <div className="App">
            <Route path="/Home/" exact component={Home} />
            <Route path="/List/" component={List} />
            <Route path="/Login/" component={Login} />
            </div>
        );
    }
}

export default App;
//app做为父组件，在这里引入其他的子组件