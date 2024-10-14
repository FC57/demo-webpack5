const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer') as BundleAnalyzerPluginType;
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin') as CssMinimizerPluginType;
const TerserPlugin = require('terser-webpack-plugin') as TerserPluginType;

console.log(process.env.NOANALYZE);

/** 生产环境配置 */
const prodConfig: Configuration = {
  mode: 'production',
  output: {
    clean: true // 清除上一次打包结果,webpack@5已支持，可不用 clean-webpack-plugin
  },
  plugins: [
    // 打包分析工具
    !process.env.NOANALYZE ? new BundleAnalyzerPlugin() : null
  ].filter(Boolean),
  // 打包优化
  optimization: {
    minimize: true, // 启用代码最小化
    minimizer: [
      new CssMinimizerPlugin(), // 压缩样式代码
      new TerserPlugin({
        parallel: true, // 开启多进程并行压缩
        terserOptions: {
          format: {
            comments: false // 去除注释
          },
          compress: {
            drop_console: true, // 去除console.log
            drop_debugger: true, // 去除debugger
            pure_funcs: ['console.log', 'console.info', 'console.error'] // 配置发布时，不被打包的函数
          }
        },
        extractComments: false // 不将注释提取到单独的文件中
      })
    ],
    chunkIds: 'named',
    runtimeChunk: 'single' // 将运行时代码提取到一个单独的 chunk 中

    // 自动分包
    // splitChunks: {
    //   chunks: 'all', // 需要应用分包策略的 chunk，all-所有、async-默认，异步chunk、initial-普通chunk
    //   maxSize: 60000, // 限制包的最大字节数，但可能超过预设值，因为包的基础单位是模块，模块本身超了也没办法
    //   automaticNameDelimiter: '.', // 新chunk名称分隔符，默认 ~
    //   minSize: 40000, // 当分包达到最低多少字节才被真正拆分，默认 30000
    //   minChunks: 1, // 在分割之前，这个代码块最小应该被引用的次数

    //   // 上述是全局配置，但分包基于缓存组
    //   cacheGroups: {
    //     vendors: {
    //       test: /[\\/]node_modules[\\/]/,
    //       name: 'vendors',
    //       priority: 10, // 优先级，值越大，优先级越高
    //       reuseExistingChunk: true
    //     },
    //     echarts: {
    //       test: /[\\/]node_modules[\\/]echarts|zrender(.*)/,
    //       name: 'chunk-echarts',
    //       priority: 25,
    //       reuseExistingChunk: true
    //     },
    //     element: {
    //       test: /[\\/]node_modules[\\/]element(.*)/,
    //       name: 'chunk-element',
    //       priority: 25,
    //       reuseExistingChunk: true
    //     },
    //     commons: {
    //       name: 'chunk-commons',
    //       minChunks: 2,
    //       priority: 5,
    //       minSize: 0,
    //       reuseExistingChunk: true
    //     },
    //     lib: {
    //       test(module: any) {
    //         return module.size() > 160000 && module.nameForCondition() && module.nameForCondition().includes('node_modules');
    //       },
    //       name: 'chunk-lib',
    //       priority: 20,
    //       minChunks: 1,
    //       reuseExistingChunk: true
    //     }
    //   }
    // }
  }
};

module.exports = prodConfig;
