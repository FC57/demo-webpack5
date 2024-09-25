declare namespace buildUtils {
  /** 环境变量取值 */
  type EnvironmentValue = 'development' | 'production';
  /** 获取环境变量并注入 process.env */
  function injectEnvVriables(curEnv: EnvironmentValue): void;
}

export = buildUtils;
