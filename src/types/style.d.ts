/** 样式模块内容 */
type CssContent = { [className: string]: string };

/** 申明css模块文件 */
declare module '*.css' {
  const content: CssContent;
  export default content;
}

/** 申明pcss模块文件 */
declare module '*.pcss' {
  const content: CssContent;
  export default content;
}
