import type { UniHttpRequestConfig } from './request'
import type { HttpRequestConfig, HttpResponse, HttpTask } from '@/uni_modules/sun-uni/libs/luch-request/index.d'
import { cloneDeep, isObject } from 'lodash-es'
import { clearCache, isCache, setCache } from './cache'
import {
  handleError,
  handleLogout,
  handleRequestData,
  handleRequestToken,
  handleRequestUrl,
  handleResponseDataField,
  handleSuccess,
  handleUnauthorized,
} from './method'

/** 不需要设置缓存的url */
const isNoCacheUrl = ['/Store/Upload']

export async function requestOnFulfilled(
  config: HttpRequestConfig<HttpTask>,
): Promise<HttpRequestConfig<HttpTask>> {
  handleRequestData(config)
  handleRequestUrl(config)
  handleRequestToken(config)
  // 在config 克隆一份config数据
  const newConfig: UniHttpRequestConfig<HttpTask> = config
  if (!isNoCacheUrl.includes(config.url!)) {
    newConfig.instanceConfig = cloneDeep(config)
    if (isCache(config)) {
      return Promise.reject({
        config,
        errMsg: '请勿重复操作',
      })
    }
    setCache(newConfig)
  }

  return newConfig
}

export function requestOnError(error: any) {
  console.log(error, 'requestOnError')
  if (error.errMsg.includes('request:fail')) {
    uni.showToast({ title: '网络异常，请检查下wifi吧~', icon: 'none' })
  } else {
    uni.showToast({
      title: JSON.stringify(error),
      icon: 'none',
      duration: 3000,
    })
  }
  return Promise.reject(error)
}

export async function responseOnFulfilled(
  response: HttpResponse<any, HttpTask>,
): Promise<HttpResponse<any, HttpTask>> {
  const { config, data } = response
  const newConfig: UniHttpRequestConfig<HttpTask> = config
  clearCache(newConfig.instanceConfig!)
  const statusCodes = [200, 204, 201]
  if (statusCodes.includes(response.statusCode)) {
    handleResponseDataField(response.data)
    const caseHandlers: Record<
      number | 'default',
      (res: HttpResponse) => void
    > = {
      200: handleSuccess,
      20000: handleSuccess,
      401: handleUnauthorized,
      406: handleUnauthorized,
      999: handleLogout,
      0: handleLogout,
      400300: handleLogout,
      default: handleError,
    }

    const caseHandler = caseHandlers[Number(data.code)] || caseHandlers.default

    return caseHandler(response) as unknown as HttpResponse<HttpTask>
  }

  handleError(response)
  return response
}

export function responseOnError(error: any) {
  console.log('responseOnError:', error)
  if (error.errMsg.includes('request:fail')) {
    uni.showToast({
      title: '网络异常，请检查下wifi吧~',
      icon: 'none',
      duration: 3000,
    })
  } else {
    if (error.data) {
      if (isObject(error.data)) {
        const message = error.data?.message || error.data?.Message
        if (message && message.includes('<html>')) {
          uni.showToast({
            title: '服务器错误，请稍后重试~',
            icon: 'none',
            duration: 3000,
          })
        } else {
          uni.showToast({
            title: message,
            icon: 'none',
            duration: 3000,
          })
        }
      } else if (error.data?.includes('<html>')) {
        uni.showToast({
          title: '服务器错误，请稍后重试~',
          icon: 'none',
          duration: 3000,
        })
      }
    }
  }
  const newConfig: UniHttpRequestConfig<HttpTask> = error.config
  if (!isNoCacheUrl.includes(newConfig.url!)) {
    clearCache(newConfig.instanceConfig!)
  }
  return Promise.reject(error)
}
