import sheet1 from '@css/one.module.css';
import sheet2 from '@css/two.module.css';
import sheet3 from '@css/index.pcss';

// 没使用 style-loader 时，调用 toString 方法，可以获得转义后的 css 字符串
// console.log(sheet1.toString());
console.log({ sheet1, sheet2, sheet3 });
console.log(process.env.NODE_ENV);
