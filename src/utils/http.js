//axios 基础的封装
import axios from 'axios'

// 创建一个axios实例
const http = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net', // 设置基础URL
  timeout: 5000, // 设置请求超时时间
})

// 请求拦截器
http.interceptors.request.use(
  (config) => config,
  (e) => Promise.reject(e)
)

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    return response.data
  },
  (e) => Promise.reject(e)
)

export default http
