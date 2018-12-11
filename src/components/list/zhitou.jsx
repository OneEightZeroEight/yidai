import React, { Component } from 'react';
class XzhitouContent extends Component {
    render() {
        return (
            <div className="content-tabs">
                <ul className="pro-tabs">
                    <li className="active">
                        <a>默认</a></li> 
                    <li className="sort">
                        <a>协议约定年化利率</a>
                    </li> 
                    <li className="sort">
                        <a>期限</a>
                    </li>
                </ul>
                <ul className="content-group">
                    <li></li>
                </ul>
            </div>
        );
    }
}
export default XzhitouContent;