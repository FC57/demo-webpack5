/** 获取数据值类型 */
type getValueType<T, K extends keyof T = keyof T> = T[K] extends infer I ? I : never;
