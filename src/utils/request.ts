import { useUserStore } from '@/stores'
import axios, { AxiosError, type Method } from 'axios'
import router from '@/router'
import { showToast } from 'vant'

// 1. 新axios实例，基础配置
const instance = axios.create({
  baseURL: 'https://consult-api.itheima.net/',
  timeout: 10000
})

//2、请求拦截器，携带token
instance.interceptors.request.use(
  (config: any) => {
    const store = useUserStore()
    if (store.user?.token && config.headers) {
      config.headers.Authorization = `Bearer ${store.user.token}`
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

//3、响应拦截器，剥离无数数据，401拦截
instance.interceptors.response.use(
  (res: any) => {
    if (res.data.code === 10000) {
      return res.data
    } else {
      showToast(res.data?.message || '业务失败')
      return Promise.reject(res.data)
    }
  },
  (err: AxiosError) => {
    if (err.response?.status === 401) {
      // 清除token
      const store = useUserStore()
      store.delUser()
      // 跳转登录页
      router.push('/login')
      return Promise.reject(err)
    }
  }
)

type Data<T> = {
  code: number
  message: string
  data: T
}
// 4. 请求工具函数
/* 
  interface User {
    id: number;
    name: string;
  }

  request<User>('/api/users/1');

  type Data<T> = {
  code: number
  message: string
  data: User
}
*/
const request = <T>(
  url: string,
  method: Method = 'get',
  submitData?: object
) => {
  return instance.request<T, Data<T>>({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
export { request, instance }
