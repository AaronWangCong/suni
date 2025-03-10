import type { HttpRequest } from './request'
import Request from '@/uni_modules/sun-uni/libs/luch-request'
import {
  requestOnError,
  requestOnFulfilled,
  responseOnError,
  responseOnFulfilled,
} from './interceptors'

const http: HttpRequest = new Request({
  baseURL: `https://apigateway.dev.shijizhongyun.com`,
  timeout: 300000, // 超时时长5分钟,
  header: {
    'Content-Type': 'application/json',
    'Accept-Language': 'zh-CN'
  }
})

http.interceptors.request.use(requestOnFulfilled, requestOnError)

http.interceptors.response.use(responseOnFulfilled, responseOnError)

export default http
