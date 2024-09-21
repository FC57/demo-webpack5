// 解决 webpack.config.ts 使用 CommonJS 后类型丢失

import type { DevServerOptions } from 'webpack-dev-server';
import type { Configuration as WebpackConfiguration } from 'webpack';

declare global {
  /** webpack 配置文件类型 */
  type Configuration = WebpackConfiguration & { devServer?: DevServerOptions };
  /** webpack 内置插件 DefinePlugin，定义变量并在打包编译时替换 */
  type WebpackDefinePlugin = (typeof import('webpack'))['DefinePlugin'];
  /** 内置模块path.resolve */
  type PathResolve = (typeof import('path'))['resolve'];
  /** 内置模块fs.existsSync */
  type FsExistsSync = (typeof import('fs'))['existsSync'];
  /** 读取 .env 或以 .env开头文件中的变量至 process.env */
  type DotenvConfig = (typeof import('dotenv'))['config'];
  /** 自定义插件-生成打包文件列表 */
  type CustomFileListPlugin = typeof import('@/plugins/file-list-plugin');
  /** 模板插件 */
  type HtmlWebpackPluginType = typeof import('html-webpack-plugin');
  /** 样式抽离插件与loader */
  type MiniCssExtractPluginType = typeof import('mini-css-extract-plugin');
}
