import type { Compiler } from 'webpack';

declare global {
  /** webpack 插件 compiler 对象 */
  type WebpackCompiler = Compiler;
}

export = FileListPlugin;

/** 生成打包文件列表 */
declare class FileListPlugin {
  #fileName: string;
  constructor(fileName: string);

  apply(compiler: Compiler): void;
}
