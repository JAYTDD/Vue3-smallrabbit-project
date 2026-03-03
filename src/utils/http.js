//axios 基础的封装
import axios from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css';
import { useUserStore } from '@/stores/user';
import router from '@/router';

// 创建一个axios实例
const http = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net', // 设置基础URL
  timeout: 5000, // 设置请求超时时间
})

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    // 在请求发送前，将 token 添加到请求头中
    // 延迟获取 store，避免在模块加载时调用 useUserStore 导致 Pinia 未激活错误
    const userStore = useUserStore();
    const token = userStore.userInfo?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (e) => Promise.reject(e)
)

// 响应拦截器
http.interceptors.response.use((response) => response.data, e => {
    // 可以在这里统一处理错误
    ElMessage.error({
      type: 'warning',
      message: e.response.data.msg,
    });
    // 401token失效处理
    if (e.response.status === 401) {
      // 1. 清除用户信息
      const userStore = useUserStore();
      userStore.clearUserInfo();
      // 2. 跳转到登录页
      router.push('/login');
    }
    return Promise.reject(e)
  }
)

export default http
