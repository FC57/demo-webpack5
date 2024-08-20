module.exports = {
  map: false,
  plugins: {
    'postcss-preset-env': {
      stage: 0, // 哪怕是草案阶段的语法，也需要转换
      preserve: false // 编译后，新语法不可见，比如 color:var(--color) 编译后不可见，仅展示 color:颜色
    }
  }
};
