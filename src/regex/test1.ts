console.log("11")
// \d数字 \w字母、数字、下划线 \s 空格、Tab *>=0 +>=1 ?<=1 
// ^$ .
// .  匹配除换行符\r \n以外的「任意一个字符」\s匹配空格
// 正则对象方法 test exec 字符串的replace match
//单词边界\b 字符串边界
// i忽略大小写 g全局 m多行 让 ^ 和 $ 变成 “每一行的开头和结尾” 来匹配，而不是默认的“整个字符串的开头和结尾”
const str = "2021-02-23";
const result = str.replace(/(\d{4})-(\d{2})-(\d{2})/, '$2/$3/$1');
console.log(result);