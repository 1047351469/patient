type UserProfile = {
    // 用户 ID
    id: number;
  
    // 姓名
    name: string;
  
    // 性别（true 表示男性，false 表示女性）
    gender: boolean;
  
    // 年龄
    age: number;
  
    // 邮箱地址
    email: string;
  
    // 手机号
    phone: string;
  
    // 注册时间（ISO 字符串）
    createdAt: string;
  
    // 个人简介
    bio?: string;
  
    // 是否已验证邮箱
    isEmailVerified: boolean;
  
    // 用户角色（如 admin、user、guest）
    role: "admin" | "user" | "guest";
  
    // 地址信息
    address: {
      // 国家
      country: string;
      
      // 省/州
      state: string;
  
      // 城市
      city: string;
  
      // 详细地址
      detail: string;
  
      // 邮编
      zipCode: string;
    };
  
    // 兴趣爱好
    hobbies: string[];
  
    // 紧急联系人（可选）
    emergencyContact?: {
      // 联系人姓名
      name: string;
  
      // 与本人关系
      relation: string;
  
      // 联系方式
      phone: string;
    };
  };

  export {}
  //改注释 ^\s*//\s?(.*)   /**\n * $1\n */
//   在量词原字符后加上?取消贪婪
  