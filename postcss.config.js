module.exports = {
  map: false,
  plugins: {
    'postcss-preset-env': {
      stage: 0, // 哪怕是草案阶段的语法，也需要转换
      preserve: false
    }
  }
};
