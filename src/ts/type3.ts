import type {Person} from "./type2"
import type {DeepExpand} from "./method"

// ✅ 用于合并联合类型为一个对象（内建 TS 不自动合并）
type Merge<T> = {
    [K in keyof T]: T[K];
  };
  
  // ✅ 第 1 层
  type ObjectLevel1<T> = {
    [K in keyof T]: string;
  };
  
  // ✅ 第 2 层
  type ObjectLevel2<T> = Merge<{
    [K1 in keyof T]: T[K1] extends object ? {
      [K2 in keyof T[K1]]: string;
    } : {};
  }[keyof T]>;
  
  // ✅ 第 3 层
  type ObjectLevel3<T> = Merge<{
    [K1 in keyof T]: T[K1] extends object ? {
      [K2 in keyof T[K1]]: T[K1][K2] extends object ? {
        [K3 in keyof T[K1][K2]]: string;
      } : {};
    }[keyof T[K1]] : {};
  }[keyof T]>;
  
  // ✅ 第 4 层
  type ObjectLevel4<T> = Merge<{
    [K1 in keyof T]: T[K1] extends object ? {
      [K2 in keyof T[K1]]: T[K1][K2] extends object ? {
        [K3 in keyof T[K1][K2]]: T[K1][K2][K3] extends object ? {
          [K4 in keyof T[K1][K2][K3]]: string;
        } : {};
      }[keyof T[K1][K2]] : {};
    }[keyof T[K1]] : {};
  }[keyof T]>;
  
  // ✅ 第 5 层
  type ObjectLevel5<T> = Merge<{
    [K1 in keyof T]: T[K1] extends object ? {
      [K2 in keyof T[K1]]: T[K1][K2] extends object ? {
        [K3 in keyof T[K1][K2]]: T[K1][K2][K3] extends object ? {
          [K4 in keyof T[K1][K2][K3]]: T[K1][K2][K3][K4] extends object ? {
            [K5 in keyof T[K1][K2][K3][K4]]: string;
          } : {};
        }[keyof T[K1][K2][K3]] : {};
      }[keyof T[K1][K2]] : {};
    }[keyof T[K1]] : {};
  }[keyof T]>;
  
  // ✅ 第 6 层
  type ObjectLevel6<T> = Merge<{
    [K1 in keyof T]: T[K1] extends object ? {
      [K2 in keyof T[K1]]: T[K1][K2] extends object ? {
        [K3 in keyof T[K1][K2]]: T[K1][K2][K3] extends object ? {
          [K4 in keyof T[K1][K2][K3]]: T[K1][K2][K3][K4] extends object ? {
            [K5 in keyof T[K1][K2][K3][K4]]: T[K1][K2][K3][K4][K5] extends object ? {
              [K6 in keyof T[K1][K2][K3][K4][K5]]: string;
            } : {};
          }[keyof T[K1][K2][K3][K4]] : {};
        }[keyof T[K1][K2][K3]] : {};
      }[keyof T[K1][K2]] : {};
    }[keyof T[K1]] : {};
  }[keyof T]>;

  type L1 = ObjectLevel1<Person>;
type L2 = DeepExpand<ObjectLevel2<Person>>;
type L3 = ObjectLevel3<Person>;
type L4 = ObjectLevel4<Person>;
type L5 = ObjectLevel5<Person>;
type L6 = ObjectLevel6<Person>;

// 将 "GH-JJ-LK" 这类 kebab 大写 → camelCase 小写
type KebabToCamel<S extends string> =
  S extends `${infer Head}-${infer Tail}`
    ? `${Lowercase<Head>}${Capitalize<KebabToCamel<Tail>>}`
    : Lowercase<S>;

// 将对象所有 key 转 camelCase
type CamelCaseKeys<T> = {
  [K in keyof T as K extends string ? KebabToCamel<K> : never]: T[K]
};
type MyType = {
    "GH-JJ-LK": string;
    "AB-CD": number;
    "XY-ZY": boolean;
  };
  
  type Result = CamelCaseKeys<MyType>;
  