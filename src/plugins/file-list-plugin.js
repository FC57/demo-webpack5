module.exports = class FileListPlugin {
  constructor(fileName) {
    this._fileName = fileName;
  }

  // 插件方法
  apply(compiler) {
    console.log('插件运行');
    // 注册生成打包文件前的事件
    compiler.hooks.emit.tap('fileListPlugin', compilation => {
      const fileContent = [];
      for (const fileName in compilation.assets) {
        // js文件源码字符串或文件二进制数据
        const source = compilation.assets[fileName].source();
        // 文件字节数
        const size = compilation.assets[fileName].size();
        fileContent.push(`--【${fileName}】\n文件大小：${size / 1024}KB\n`);
      }
      console.log(`生成文件${this._fileName}`);
      const _size = fileContent.join('\n\n');
      compilation.assets[this._fileName] = {
        source() {
          return _size;
        },
        size() {
          return _size.length;
        }
      };
    });
  }
};
