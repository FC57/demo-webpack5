const loaderUtils = require('loader-utils');
console.log(loaderUtils);

/**
 * 图片loader
 * @param {Buffer} buffer 图片二进制数据
 */
function imgLoader(buffer) {
  // 文件大小 KB
  const size = buffer.byteLength / 1024;
  console.log(`文件大小:${Math.floor(size)}KB`);
  console.log(this.query);
  const { limit = 1024, name = '[contenthash:5].[ext]' } = this.query;
  let content = '';
  const { fileName, ext } = getFilePath.call(this, buffer, name);
  if (size < limit) {
    content = getBase64(buffer, ext);
  } else {
    content = fileName;
    // 打包文件到最终目录
    this.emitFile(fileName, buffer);
  }
  return `module.exports=\`${content}\``;
}
imgLoader.raw = true;

/**
 * 获取文件名称
 * @param {Buffer} buffer 图片二进制数据
 * @param {string} name 打包后名称格式
 */
function getFilePath(buffer, name) {
  const fileName = `imgs/${loaderUtils.interpolateName(this, name, {
    content: buffer
  })}`;
  return { fileName, ext: fileName.replace(/.*\./g, '') };
}

/**
 * 获取图片base64格式
 * @param {Buffer} buffer 图片二进制数据
 * @param {string} ext 图片后缀
 */
function getBase64(buffer, ext) {
  const fileExt = ext === 'jpg' ? 'jpeg' : ext;
  return `data:img/${fileExt};base64,${buffer.toString('base64')}`;
}

module.exports = imgLoader;
