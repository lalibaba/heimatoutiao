import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
  // timeout: 5000
})

// 给每个请求添加拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const token = store.state.tokenObj.token
    if (token) {
      //给每个已经登录的用户请求头加上token,注意Bearer后要加空格
      config.headers.Authorization = 'Bearer ' + store.state.tokenObj.token
    }
    // cofig一定要返回
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

export default request
