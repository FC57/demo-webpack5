/** 开发环境配置 */
const devConfig: Configuration = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map', // 源码地图
  devServer: {
    port: process.env.PORT || 8080, // 监听端口
    open: JSON.parse(process.env.SERVE_OPEN as string), // 开启后默认打开页面,
    // hot: true,// 开启热更新 webpack-dev-server@4+ 默认开启
    historyApiFallback: true, // 所有的404都连接到index.html
    setupMiddlewares: require('../mock'),
    // 代理服务器
    proxy: [
      {
        context: ['/api'],
        target: 'https://github.com'
      }
    ]
  }
};

module.exports = devConfig;
