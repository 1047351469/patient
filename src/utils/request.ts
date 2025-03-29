import axios, { AxiosError, type Method } from 'axios'
import { showToast } from 'vant'

import { useUserStore } from '@/stores'
import router from '@/router'
const instance = axios.create({
  // 1. 基础地址，超时时间
  baseURL: 'https://consult-api.itheima.net/',
  timeout: 10000
})

instance.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    const store = useUserStore()
    if (store.user?.token && config.headers) {
      config.headers['Authorization'] = `Bearer ${store.user?.token}`
    }
    return config
  },
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (res) => {
    // TODO 3. 处理业务失败
    // TODO 4. 摘取核心响应数据
    if (res.data?.code !== 10000) {
        showToast(res.data?.message || '业务失败')
        return Promise.reject(res.data)
      }
    
    
    return res.data
  },
  (err:AxiosError) => {
   
    // TODO 5. 处理401错误
    if (err.response.status === 401) {
        // 删除用户信息
        const store = useUserStore()
        store.delUser()
        // 跳转登录，带上接口失效所在页面的地址，登录完成后回跳使用
        router.push({
          path: '/login',
          query: { returnUrl: router.currentRoute.value.fullPath }
        })
      }
    return Promise.reject(err)
  }
)

// 4. 请求工具函数

export  const request = <T>(url: string, method: Method = 'GET', submitData?: object) => {
    // instance.request<T,Data<T>> T成功 Data<T>原始
    return instance.request<T,Data<T>>({
      url,
      method,
      [method.toUpperCase() === 'GET' ? 'params' : 'data']: submitData
    })
  }
  type Data<T> = {
    code: number
    message: string
    data: T
  }
