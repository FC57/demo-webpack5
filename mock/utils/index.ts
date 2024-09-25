const readFileSync: NodeFs['readFileSync'] = require('fs').readFileSync;
const resolve: PathResolve = require('path').resolve;

module.exports = {
  /** 获取json文件数据 */
  getJsonFile(filePath: string) {
    //读取指定json文件
    const json = readFileSync(resolve(__dirname, filePath), 'utf-8');
    //解析并返回
    return JSON.parse(json);
  }
};

export {};
