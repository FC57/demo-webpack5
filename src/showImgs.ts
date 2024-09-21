const imgsSrc = [require('./assets/images/preview.png'), require('./assets/images/note.jpg')];

/**
 * 设置图片样式
 * @param img 图片元素
 * @param style 设置样式
 */
function setImgStyle(img: HTMLImageElement, style: Partial<CSSStyleDeclaration>) {
  for (const k in style) {
    img.style[k] = style[k] as string;
  }
}

imgsSrc.forEach(src => {
  console.log(src);
  const img = document.createElement('img');
  img.src = src;
  img.style.height = '100%';
  img.style.margin = '0 auto';
  setImgStyle(img, {
    height: '100vh',
    margin: '20px auto',
    display: 'block',
    borderRadius: '20px',
    boxShadow: '4px 6px 4px rgba(0,0,0,0.5)'
  });
  document.body.appendChild(img);
});

if (module.hot) {
  // 接受热更新，这段代码会参与运行，表示模块更新时，浏览器不会调用 location.reload() 刷新页面，重新加载所有资源
  // 而是通过 websocket 直接将更改模块发给浏览器
  module.hot.accept();
}
