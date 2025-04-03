// 工具类型：对象类型的并集（优先保留 B 的值）
type ObjectUnion<A, B> = {
    [K in keyof A | keyof B]: K extends keyof B
      ? B[K]
      : K extends keyof A
      ? A[K]
      : never;
  };
  
  // 工具类型：对象类型的交集（字段同时存在于 A 和 B）
  type ObjectIntersection<A, B> = {
    [K in Extract<keyof A, keyof B>]: A[K];
  };
  
  // 工具类型：对象类型的差集（只在 A 中存在的字段）
  type ObjectDifference<A, B> = {
    [K in Exclude<keyof A, keyof B>]: A[K];
  };
  
  // 示例类型 A 和 B
  type A = {
    id: number;
    name: string;
    age: number;
  };
  
  type B = {
    name: string;
    email: string;
  };
  
  // 使用示例
  type UnionResult = ObjectUnion<A, B>;
  type IntersectionResult = ObjectIntersection<A, B>;
  type DifferenceResult = ObjectDifference< B,A>;
  
  // 测试结果（你可以在 VSCode 悬停查看类型推导结果）
  
  const unionResult: UnionResult = {
    id: 1,
    name: "Tom",      // 来自 B
    age: 30,
    email: "a@b.com",
  };
  
  const intersectionResult: IntersectionResult = {
    name: "Shared name", // name 是两边都有的字段
  };
  
  const differenceResult: DifferenceResult = {
    id: 101,
    age: 20,
  };
  