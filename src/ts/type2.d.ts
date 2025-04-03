import type {DeepExpand } from "./method"

// ✅ 1. 定义 Person 类型
type Person = {
    id: number;
    name: {
      first: string;
      last: string;
      middle?: string;
    };
    age: number;
    gender: "male" | "female" | "other";
    contact: {
      email: string;
      phone?: {
        mobile?: string;
        home?: string;
        work?: string;
      };
      address?: {
        country: string;
        city: string;
        postalCode: string | number;
      };
    };
    hobbies?: string[];
    isActive: boolean;
    createdAt: string;
    updatedAt?: string;
  };

  type KeysLevel1<T> = keyof T;

// 第 2 层：取第 1 层所有字段，对每个字段判断是否是 object，再取它的 key，合并
type KeysLevel2<T> = {
  [K in keyof T]: T[K] extends object ? keyof T[K] : never;
}[keyof T];

// 第 3 层：对每个第 2 层的字段继续往下拿
type KeysLevel3<T> = {
  [K1 in keyof T]:
    T[K1] extends object ? {
      [K2 in keyof T[K1]]: T[K1][K2] extends object ? keyof T[K1][K2] : never;
    }[keyof T[K1]] : never;
}[keyof T];

// 第 4 层
type KeysLevel4<T> = {
  [K1 in keyof T]:
    T[K1] extends object ? {
      [K2 in keyof T[K1]]: T[K1][K2] extends object ? {
        [K3 in keyof T[K1][K2]]: T[K1][K2][K3] extends object ? keyof T[K1][K2][K3] : never;
      }[keyof T[K1][K2]] : never;
    }[keyof T[K1]] : never;
}[keyof T];

// 第 5 层
type KeysLevel5<T> = {
  [K1 in keyof T]:
    T[K1] extends object ? {
      [K2 in keyof T[K1]]: T[K1][K2] extends object ? {
        [K3 in keyof T[K1][K2]]: T[K1][K2][K3] extends object ? {
          [K4 in keyof T[K1][K2][K3]]: T[K1][K2][K3][K4] extends object ? keyof T[K1][K2][K3][K4] : never;
        }[keyof T[K1][K2][K3]] : never;
      }[keyof T[K1][K2]] : never;
    }[keyof T[K1]] : never;
}[keyof T];

// 第 6 层（同理往下套一层）
type KeysLevel6<T> = {
  [K1 in keyof T]:
    T[K1] extends object ? {
      [K2 in keyof T[K1]]: T[K1][K2] extends object ? {
        [K3 in keyof T[K1][K2]]: T[K1][K2][K3] extends object ? {
          [K4 in keyof T[K1][K2][K3]]: T[K1][K2][K3][K4] extends object ? {
            [K5 in keyof T[K1][K2][K3][K4]]: T[K1][K2][K3][K4][K5] extends object ? keyof T[K1][K2][K3][K4][K5] : never;
          }[keyof T[K1][K2][K3][K4]] : never;
        }[keyof T[K1][K2][K3]] : never;
      }[keyof T[K1][K2]] : never;
    }[keyof T[K1]] : never;
}[keyof T];
  
      type L1 = KeysLevel1<Person>; // "id" | "name" | ...
type L2 = KeysLevel2<Person>; // "first" | "last" | ...
type L3 = KeysLevel3<Person>; // "mobile" | "home" | ...
type L4 = KeysLevel4<Person>; // 视结构可能有
type L5 = KeysLevel5<Person>; // 若结构支持
type L6 = KeysLevel6<Person>; // 若结构支持

  type PersonBasicInfo = Pick<Person, "name" | "contact">;

  type FirstAndLastName = Pick<Person["name"], "first" | "last">;

  type KeysOf<T, K extends keyof T> = {
    [P in K]: keyof T[P];
  }[K];
type b1=(keyof Person["name"] )|(keyof Person["contact"] )
type b2=KeysOf<Person,"name" | "contact">

type B2StringObject = {
  [K in b2]: string;
};
  