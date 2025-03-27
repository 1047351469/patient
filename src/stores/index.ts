// 1. 创建pinia实例
// 2. 使用pinia插件
import persist from 'pinia-plugin-persistedstate'
import { createPinia } from 'pinia'


const pinia = createPinia().use(persist)


export default pinia

export * from './modules/user'

