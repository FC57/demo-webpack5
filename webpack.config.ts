const resolve: PathResolve = require('path').resolve;
const merge: WebpackMerge = require('webpack-merge').merge;
const { injectEnvVriables: injectEnv } = require('./build') as BuildUtils;
const DefinePlugin = require('webpack').DefinePlugin as WebpackDefinePlugin;
const FileListPlugin = require('./src/plugins/file-list-plugin') as CustomFileListPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin') as HtmlWebpackPluginType;
const CopyPlugin = require('copy-webpack-plugin') as CopyPluginType;
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin') as HtmlWebpackTagsPluginType;
const MiniCssExtractPlugin = require('mini-css-extract-plugin') as MiniCssExtractPluginType;

/** 获取的命令行参数键值对 */
const args = require('minimist')(process.argv.slice(2));
console.log(args);

/** 当前环境变量 */
const NODE_ENV = process.env.NODE_ENV;
console.log(NODE_ENV);
if (!NODE_ENV) {
  throw new Error('The NODE_ENV environment variable is required but was not specified.');
}

/** 是否为生成环境 */
const isProduction = NODE_ENV === 'production';

// 注入环境变量
injectEnv(NODE_ENV as EnvironmentValue);

/** 获取插件配置 */
function getPlugins() {
  // 插件
  const plugins: Configuration['plugins'] = [
    // 复制静态资源至指定路径
    new CopyPlugin({
      patterns: [
        {
          from: resolve(__dirname, 'public'), // 源路径
          to: resolve(__dirname, 'dist/app'), // 目标路径
          toType: 'dir',
          globOptions: {
            ignore: ['**/.DS_Store', '**/index.html']
          },
          info: {
            minimized: true
          }
        }
      ]
    }),
    // 根据模板生成页面
    new HtmlWebpackPlugin({
      template: './public/index.html',
      templateParameters: {
        title: process.env.TITLE
      }
    }),
    // 在模板中注入其它资源
    new HtmlWebpackTagsPlugin({
      tags: [
        { path: 'script/index.js', attributes: { defer: true } }, // JS 文件
        {
          path: 'assets/imgs/webpack.svg',
          attributes: { rel: 'shortcut icon', type: 'image/svg+xml' },
          type: 'css'
        } // SVG 图标
      ],
      append: false, // 是否追加到 head
      publicPath: '/' // 处理路径
    }),
    // 抽离css文件
    new MiniCssExtractPlugin({
      filename: 'css/[name]_[contenthash:5].css'
    }),
    // 定义环境变量，会将所有代码中对应的指定变量替换为字符串的值
    new DefinePlugin({
      // 这里并不能真正的设置环境变量，只是打包的过程替换源码值而已
      // 而 package.json 中 scripts 定义的命令 webpack --mode=development 会覆盖配置文件中的 mode配置
      // 打包时，会将其他代码中的 process.env.NODE_ENV 替换为指定的值，但又会被这里定义的全局变量覆盖
      // 优先级：DefinePlutin内置插件 > scripts 命令指定的 --mode > 配置文件中配置的 mode
      // 'process.env.NODE_ENV': "'production'"

      'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL),
      'process.env.API_URL': JSON.stringify(process.env.API_URL)
    })
  ];
  if (args.mode === 'development') {
    // 自定义插件，生成罗列打包文件清单的文件
    plugins.unshift(new FileListPlugin('fileList.md'));
  }
  // if (isProduction) {
  //   // 打包前清空目录，但 webpack@5 内置了不用单独引入
  //   const { CleanWebpackPlugin } = require('clean-webpack-plugin');
  //   plugins.unshift(new CleanWebpackPlugin());
  // }
  return plugins;
}

/** 基础配置 base config */
const webpackBaseConfig: Configuration = {
  // 入口路径
  entry: resolve(__dirname, './src/main.ts'),
  // 出口路径及文件名称
  output: {
    publicPath: '/', // 打包后的资源的访问路径前缀
    path: resolve(__dirname, './dist/app'),
    filename: isProduction ? 'js/[name].[contenthash:6].js' : 'js/index-[hash:5].js', // 打包后的文件名
    chunkFilename: isProduction ? 'js/[name].[contenthash:8].js' : 'js/[name].chunk.js'
  },
  // 构建缓存
  cache: {
    type: 'filesystem', // 缓存在内存中，每次构建缓存均在
    buildDependencies: {
      config: [__filename] // 获取最新配置以及所有依赖项，文件更改，重新构建缓存
    }
  },
  // 模块规则
  module: {
    // loader 配置规则
    rules: [
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
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.([cm]?ts|tsx)$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true // 关闭类型检测，即只进行转译
            }
          }
        ]
      },
      {
        // 模块匹配规则
        test: /index\.css$/,
        use: ['./src/loaders/style-loader.ts']
      },
      {
        test: /(\.jpg|\.png|\.gif)$/,
        use: {
          // 指定 loader
          loader: './src/loaders/img-loader.ts',
          // 传递额外参数
          options: {
            // 超过多少KB使用图片，否则base64格式
            limit: 200
          }
        }
      },
      {
        test: /\.(svg)(\?.*)?$/,
        include: resolve(__dirname, 'src/assets/images'),
        type: 'asset/resource', // webpack@5通用资源处理模块，默认会导出单独的文件
        generator: {
          filename: 'imgs/svg/[name].[contenthash:6][ext]' //文件打包输出目录
        }
      }
    ]
  },
  // 配置插件
  plugins: getPlugins(),
  resolve: {
    // webpack@5 不再内置node模块，需要单独下载并引用对应模块的替代方案包
    // 以便替换业务代码中使用的Node.js内置模块，最终在浏览器中正常运行
    fallback: {
      path: require.resolve('path-browserify')
    },
    // 导入模块路径指定可以省略的后缀名
    extensions: ['.ts', '.d.ts', '.js', '.json'],
    // 模块路径别名
    alias: {
      '@': resolve(__dirname, 'src'),
      '@css': resolve(__dirname, 'src/assets/css'),
      '@mock': resolve(__dirname, 'mock')
    }
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

/** 不同环境合并配置 merge config */
const mergeConfig: Configuration = require(isProduction ? './build/webpack.prod' : './build/webpack.dev');

module.exports = merge(webpackBaseConfig, mergeConfig);
