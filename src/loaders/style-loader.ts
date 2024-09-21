// loader 本质是个函数，配置里 use 的路径，会通过 require('./src/loaders/style-loader.js') 引入的同时执行函数

module.exports = function (sourceStr: string) {
  // 这里的 this 是个对象，包含很多loader上下文
  console.log('style-loader');
  return `const styleNode = document.createElement('style');
  styleNode.innerHTML=\`${sourceStr}\`;
  document.head.appendChild(styleNode);
  module.exports=\`${sourceStr}\`;`;
};
