type IsPlainObject<T> = T extends object
  ? true:false

// 深层展开
type DeepExpand<T> = T extends object
  ? {
      [K in keyof T]: IsPlainObject<T[K]> extends true
        ? DeepExpand<T[K]>
        : T[K];
    }
  : T;
//递归全部变为可选
type DeepPartial<T> = {
    // 递归
     [U in keyof T]?: T[U] extends object ? DeepPartial<T[U]> : T[U]
}
// type of 默认值 不定参数 重载
export {DeepExpand}