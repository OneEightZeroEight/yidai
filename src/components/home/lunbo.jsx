import React, {Component} from 'react';
import {render} from 'react-dom';
import ReactSwiper from 'reactjs-swiper';
import '../../style/lunbo.less';//样式文件

// 图片位置
import img1 from'./../../imgs/lunbo1.png';
import img2 from'./../../imgs/lunbo2.png';
import img3 from'./../../imgs/lunbo3.png';
import img4 from'./../../imgs/lunbo4.png';

const ReactSwiperExample = () => {
  const items = [{
    image: img1,
    title: '图片1',
    link: 'http://jd.com'
  }, {
    image: img2,
    title: '图片2',
  }, {
    image: img3,
    title: '图片3',
    link: 'http://jd.com'
  }, {
    image: img4,
    title: '图片4',
  }];
 
  const swiperOptions = {
    preloadImages: true,
    autoplay: 4000,
    autoplayDisableOnInteraction: false
  };
  return (
    <ReactSwiper swiperOptions={swiperOptions} showPagination items={items}
                 className="swiper-example" />
  );
};
 
// render(
//   <ReactSwiperExample />, document.getElementById('banner')
// );


// class lunbo extends Component {
//     render() {
//         return (
//             <ReactSwiperExample />
//         );
//     }
// }
export default ReactSwiperExample;