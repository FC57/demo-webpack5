// 入口文件

import '@/index';
import '@/showImgs';
import '@/cssModule';
import style from '@/assets/index.css';
console.log(style);

// const { resolve, join } = require('path');

// console.log(resolve('./', 'main', '/sub', 'index.js'));
// console.log(join('./', 'main', '../sub', 'index.js'));

// const m = require('./src/index');
// console.log('entry file', m);

if (module.hot) {
  // 接受热更新，这段代码会参与运行，表示模块更新时，浏览器不会调用 location.reload() 刷新页面，重新加载所有资源
  // 而是通过 websocket 直接将更改模块发给浏览器
  module.hot.accept();
}
