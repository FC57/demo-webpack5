// 解决 webpack.config.ts 使用 CommonJS 后类型丢失
import type { Configuration as WebpackConfiguration, Compiler as WebpackCompiler } from 'webpack';
import { EnvironmentValue as EnvValue } from '../../build';

declare global {
  /** 环境变量取值 */
  type EnvironmentValue = EnvValue;
  /** 构建辅助工具 */
  type BuildUtils = typeof import('../../build');
  /** webpack 配置文件类型 */
  type Configuration = WebpackConfiguration & { devServer?: import('webpack-dev-server')['options'] };
  /** webpack 插件 compiler 对象 */
  type Compiler = WebpackCompiler;
  /** webpack 内置插件 DefinePlugin，定义变量并在打包编译时替换 */
  type WebpackDefinePlugin = (typeof import('webpack'))['DefinePlugin'];
  /** webpack 配置合并 */
  type WebpackMerge = (typeof import('webpack-merge'))['merge'];
  /** 内置模块path.resolve */
  type PathResolve = (typeof import('path'))['resolve'];
  /** 内置模块fs */
  type NodeFs = typeof import('fs');
  /** 读取 .env 或以 .env开头文件中的变量至 process.env */
  type DotenvConfig = (typeof import('dotenv'))['config'];
  /** 自定义插件-生成打包文件列表 */
  type CustomFileListPlugin = typeof import('@/plugins/file-list-plugin');
  /** 模板插件 */
  type HtmlWebpackPluginType = typeof import('html-webpack-plugin');
  /** 复制静态资源至指定路径 */
  type CopyPluginType = typeof import('copy-webpack-plugin');
  /** 在模板中注入其它资源，如CDN或本地资源 */
  type HtmlWebpackTagsPluginType = typeof import('html-webpack-tags-plugin');
  /** 样式抽离插件与loader */
  type MiniCssExtractPluginType = typeof import('mini-css-extract-plugin');
  /** 打包分析工具 */
  type BundleAnalyzerPluginType = typeof import('webpack-bundle-analyzer');

  /** 自定义Mock工具方法 */
  type MockUtils = typeof import('@mock/utils');
  /** 数据模拟 */
  type MockJS = typeof import('mockjs');
}
