const Mock: MockJS = require('mockjs');
const util: MockUtil = require('./util');

type SetupMiddlewares = Exclude<Configuration['devServer'], undefined>['setupMiddlewares'];

/** devServer 配置：提供执行自定义函数和应用自定义中间件的能力 */
const setupMiddlewares: SetupMiddlewares = function (middlewares, devServer) {
  if (!devServer) {
    throw new Error('webpack-dev-server is not defined');
  }
  if (!devServer.app) {
    return middlewares;
  }
  // 监听http请求
  devServer.app.get('/api/users/list', function (_, res) {
    // 每次响应请求时读取mock data的json文件
    const json = util.getJsonFile('./json/users/userInfo.json');
    // 将json传入 Mock.mock 方法中，生成的数据返回给浏览器
    res.json(Mock.mock(json));
  });
  return middlewares;
};
module.exports = setupMiddlewares;
