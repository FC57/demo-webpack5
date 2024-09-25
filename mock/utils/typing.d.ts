declare interface MockUtils {
  /** 获取 json 数据 */
  getJsonFile(filePath: string): any;
}

declare global {
  /** 自定义mockjs工具 */
  type MockUtil = MockUtils;
}

declare const mockUtils: MockUtils;

export = mockUtils;
