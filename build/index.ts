const existsSync: NodeFs['existsSync'] = require('fs').existsSync;
const dotenvConfig: DotenvConfig = require('dotenv').config;
const { loader: miniCssLoader } = require('mini-css-extract-plugin') as MiniCssExtractPluginType;

/**
 * 获取环境变量并注入 process.env
 * @param curEnv 当前环境
 */
function injectEnvVriables(curEnv: EnvironmentValue) {
  /** .env 文件列表 */
  const envList = ['.env', `.env.${curEnv}`] as const;
  // 读取环境变量并注入process.env，若不指定文件，如 dotenvConfig() 默认会注入 .env 文件（全局环境变量）
  envList.forEach(doteFile => {
    if (existsSync(doteFile)) {
      // 对应环境的环境变量文件存在则注入，但后者同名变量不会覆盖前者，一旦确定不会被修改
      dotenvConfig({ path: doteFile });
      // console.log({ title: process.env.TITLE, port: process.env.PORT });
    }
  });
}

/**
 * 获取样式处理的loader
 * @param preProcessor 最先处理的 loader
 * @param isLinkStyle 是否使用link标签的方式引入样式
 */
function getStyleLoaders(preProcessor?: string, isLinkStyle = false) {
  const styleLoaders: RuleSetRule['use'] = [
    // MiniCssExtractPlugin.loader 以link标签的方式引入样式，style-loader 以style标签注入样式
    isLinkStyle ? miniCssLoader : 'style-loader',
    {
      loader: 'css-loader',
      options: {
        // 开启 css module
        modules: {
          localIdentName: '[local]_[hash:base64:5]'
        }
        // modules: true
      }
    },
    preProcessor
  ].filter(Boolean);
  return styleLoaders;
}

module.exports = { injectEnvVriables, getStyleLoaders };
