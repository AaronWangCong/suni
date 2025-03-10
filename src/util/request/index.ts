// 引入配置
import config from '@/common/config'
// 引入拦截器配置
import { requestInterceptors, responseInterceptors } from './interceptors'
// 引入luch-request
import { http } from '@/uni_modules/sun-uni'
import Request from '@/uni_modules/sun-uni/libs/luch-request'
import type { HttpRequestAbstract, HttpRequestConfig, HttpRequestTask, HttpResponse, HttpTask } from '@/uni_modules/sun-uni/libs/luch-request/index.d'
//  初始化请求配置
const initRequest = (_vm: any) => {
  http.setConfig((defaultConfig: any) => {
    /* defaultConfig 为默认全局配置 */
    defaultConfig.baseURL = config.baseUrl /* 根域名 */
    return defaultConfig
  })
  requestInterceptors()
  responseInterceptors()
}

export interface HttpRequest extends HttpRequestAbstract {
  request<T = any, R = HttpResponse<T>, D = HttpRequestTask>(
    config: HttpRequestConfig<D>,
  ): Promise<R>;
}


const request: HttpRequest = new Request({
  baseURL: config.baseUrl,
  timeout: 300000, // 超时时长5分钟,
  header: {
    'Content-Type': 'application/json',
    'Accept-Language': 'zh-CN',
  },
})


export { initRequest, request }