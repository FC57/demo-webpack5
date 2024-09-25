const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer') as BundleAnalyzerPluginType;

/** 生产环境配置 */
const prodConfig: Configuration = {
  mode: 'production',
  output: {
    clean: true // 清除上一次打包结果,webpack@5已支持，可不用 clean-webpack-plugin
  },
  plugins: [
    // 打包分析工具
    new BundleAnalyzerPlugin()
  ]
};

module.exports = prodConfig;
