const { resolve } = require('path');
const FileListPlugin = require('./src/plugins/file-list-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 入口路径
  entry: './main.js',
  // 出口路径及文件名称
  output: {
    path: resolve(__dirname, './dist/app'),
    filename: 'index-[hash:5].js'
  },
  // 源码地图
  devtool: 'source-map',
  // 模块规则
  module: {
    // loader 配置规则
    rules: [
      {
        // 模块匹配规则
        test: /\.css$/,
        use: ['./src/loaders/style-loader.js']
      },
      {
        test: /(\.jpg|\.png\.gif)$/,
        use: {
          // 指定 loader
          loader: './src/loaders/img-loader.js',
          // 传递额外参数
          options: {
            // 超过多少KB使用图片，否者base64格式
            limit: 200
          }
        }
      }
    ]
  },
  // 配置插件
  plugins: [
    new FileListPlugin('fileList.md'),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
  resolve: {
    // webpack@5 不再内置node模块，需要单独下载并引用对应模块的包
    fallback: {
      path: require.resolve('path-browserify')
    }
  },
  devServer: {
    port: 8080, // 监听端口
    open: true, // 开启后默认打开页面,
    // 代理服务器
    proxy: {
      // 代理规则
      '/api': {
        target: 'http://open.duyiedu.com',
        changeOrigin: true // 更改请求头中的 host 和 origin
      }
    }
  }
};
