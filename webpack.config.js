const { resolve } = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const FileListPlugin = require('./src/plugins/file-list-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 当前环境变量
const NODE_ENV = process.env.NODE_ENV;
// 读取环境变量并注入，默认会注入 .env 文件（全局环境变量），其他的环境变量文件会覆盖该文件中的同名变量
dotenv.config({ path: resolve(__dirname, `.env.${NODE_ENV}`) });

module.exports = function (env) {
  // console.log({ env, arguments, curEnv: process.env.NODE_ENV, nodeEnv: process.env });

  // 插件
  const plugins = [
    // 自定义插件
    new FileListPlugin('fileList.md'),
    // 根据模板生成页面
    new HtmlWebpackPlugin({
      template: './public/index.html',
      templateParameters: {
        title: process.env.TITLE
      }
    }),
    // 抽离css文件
    new MiniCssExtractPlugin({
      filename: 'css/[name]_[contenthash:5].css'
    }),
    // 定义环境变量，会将所有代码中对应的指定变量替换为字符串的值
    new webpack.DefinePlugin({
      // 这里并不能真正的设置环境变量，只是打包的过程替换源码值而已
      // 而 package.json 中 scripts 定义的命令 webpack --mode=development 会覆盖配置文件中的 mode配置
      // 打包时，会将其他代码中的 process.env.NODE_ENV 替换为指定的值，但又会被这里定义的全局变量覆盖
      // 优先级：DefinePlutin内置插件 > scripts 命令指定的 --mode > 配置文件中配置的 mode
      // 'process.env.NODE_ENV': "'production'"
      PI: 'Math.PI'
    })
  ];
  // 非开发环境
  // if (!env.dev) {
  //   const { CleanWebpackPlugin } = require('clean-webpack-plugin');
  //   // 打包前清空目录
  //   plugins.unshift(new CleanWebpackPlugin());
  // }
  return {
    // 入口路径
    entry: './main.js',
    // 出口路径及文件名称
    output: {
      publicPath: '/',
      path: resolve(__dirname, './dist/app'),
      filename: 'js/index-[hash:5].js',
      clean: !env.dev ? true : void 0 // 清除上一次打包结果,webpack@5已支持，可不用 clean-webpack-plugin，除非需要排除指定文件
    },
    // 源码地图
    devtool: env.dev ? 'source-map' : void 0,
    // 模块规则
    module: {
      // loader 配置规则
      rules: [
        {
          // 模块匹配规则
          test: /index\.css$/,
          use: ['./src/loaders/style-loader.js']
        },
        {
          test: /(\.jpg|\.png|\.gif)$/,
          use: {
            // 指定 loader
            loader: './src/loaders/img-loader.js',
            // 传递额外参数
            options: {
              // 超过多少KB使用图片，否则base64格式
              limit: 200
            }
          }
        },
        {
          test: /module\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[local]_[hash:base64:5]'
                }
                // modules: true
              }
            }
          ]
        },
        {
          test: /\.pcss$/,
          use: [
            // 'style-loader',
            MiniCssExtractPlugin.loader, // 替换 style-loader，以link标签的方式引入样式
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[local]_[hash:base64:5]'
                }
              }
            },
            'postcss-loader'
          ]
        },
        {
          test: /\d+\.js$/,
          use: 'babel-loader'
        }
      ]
    },
    // 配置插件
    plugins,
    resolve: {
      // webpack@5 不再内置node模块，需要单独下载并引用对应模块的包
      fallback: {
        path: require.resolve('path-browserify')
      },
      // 导入模块路径指定可以省略的后缀名
      extensions: ['.js', '.css'],
      // 模块路径别名
      alias: {
        '@': resolve(__dirname, 'src'),
        '@css': resolve(__dirname, 'src/assets/css')
      }
    },
    devServer: {
      port: process.env.PORT || 8080, // 监听端口
      open: true, // 开启后默认打开页面,
      // hot: true,// 开启热更新 webpack-dev-server@4+ 默认开启
      // 代理服务器
      // proxy: {
      //   // 代理规则
      //   '/api': {
      //     target: 'https://github.com',
      //     changeOrigin: true, // 更改请求头中的 host 和 origin,
      //   }
      // }
      proxy: [
        {
          context: ['/api'],
          target: 'https://github.com'
        }
      ]
    }
    // optimization: {
    //   // 分包
    //   splitChunks: {
    //     // chunks: 'all',
    //     chunks(chunk) {
    //       return chunk.name !== 'main';
    //     }
    //   }
    // }
  };
};
