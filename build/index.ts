const existsSync: NodeFs['existsSync'] = require('fs').existsSync;
const dotenvConfig: DotenvConfig = require('dotenv').config;

/** 获取环境变量并注入 process.env */
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

module.exports = { injectEnvVriables };
