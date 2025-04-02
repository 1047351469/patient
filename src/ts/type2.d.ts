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
  