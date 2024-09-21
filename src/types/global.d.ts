// .d.ts 文件中，只要没有使用 export import 等语句，declare 申明、其它等类型全局可用
// 若有 export import 语句，则将文件视为模块，若要定义全局类型，使用 declare global{ // 定义类型 }

export {}; // 将该文件视作模块

declare global {
  /** 扩展 Window  */
  interface Window {
    /** 环境变量 */
    custom_env: 'local' | 'dev' | 'st' | 'uat';
  }
  /** 扩展 NodeModule */
  interface NodeModule {
    /** 热更新选项 */
    hot: {
      /** 接受热更新，不会刷新页面 */
      accept: () => void;
    };
  }
}
