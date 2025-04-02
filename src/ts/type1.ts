

type UserProfile = {
    id: null;
    name?: {
      first: string;
      last: string;
      middle?: string;
    };
    contact: {
      email: string;
      phone: {
        home?: string;
        mobile: string;
        work?: string;
      };
      address: {
        country: string;
        city: string;
        zipCode: string | number;
        coordinates?: {
          lat: number;
          lng: number;
        };
      };
    };
    preferences: {
      theme: 'light' | 'dark';
      notifications: {
        email: boolean;
        sms: boolean;
        push: boolean;
      };
      language: string;
    };
    tags: string[];
    metadata: {
      createdAt: string;
      updatedAt: string;
      deletedAt: string | null;
    };
    isActive: boolean;
    notes?: string[];
  };
  type DeepPartial<T> = {
    // 递归
     [U in keyof T]?: T[U] extends object ? DeepPartial<T[U]> : T[U]
}

type IsPlainObject<T> = T extends object
  ? true:false

type DeepExpand<T> = T extends object
  ? {
      [K in keyof T]: IsPlainObject<T[K]> extends true
        ? DeepExpand<T[K]>
        : T[K];
    }
  : T;
  type b=DeepExpand<DeepPartial<UserProfile>>
  type Person = {
    id: string;
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
  type Debug<T> = T;
type P1 = Debug<keyof Person>;
  

  type t=keyof Person["contact"]["phone"]
  
  type Foo = {
    a: string;
    b: number;
    c:{
        d:number
        p:Person
    }
  };
  
  type Bar = Foo;
  // null undefined number string boolean unknown(要先缩小范围再使用)void any never(while-true throw异常 switch检查)
// 对象 数组 元祖 联合 字面量 type interface 函数 类型断言as 泛型
//   Partial Required Readonly Pick Omit Record
//适用于联合类型  Exclude排除 Extract提取 NonNullable去掉undefined和null
//函数 Parameters ReturnType
// class ConstructorParameters InstanceType
   
  type PartialUser = NonNullable<UserProfile>; 
  



