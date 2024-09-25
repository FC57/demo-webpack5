export = FileListPlugin;

/** 生成打包文件列表 */
declare class FileListPlugin {
  private fileName: string;
  constructor(fileName: string);

  apply(compiler: Compiler): void;
}
