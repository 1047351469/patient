/* 
  定义 Person 类型
  包含姓名、年龄、性别和地址信息
*/
type Person = {
    /* 姓名，例如："张三" */
    name: string;
  
    /* 年龄，例如：25 */
    age: number;
  
    /* 性别，仅支持 "male" 或 "female" */
    gender: 'male' | 'female';
  
    /* 
      地址信息
      可以为空（可选）
    */
    address?: string;
  
    /* 
      标记是否为管理员
      默认值为 false（如果使用类或默认对象可设定）
    */
    isAdmin?: boolean;
  };
  