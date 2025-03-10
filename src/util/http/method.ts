import type { HttpRequestConfig, HttpResponse, HttpTask } from '@/uni_modules/sun-uni/libs/luch-request/index.d'
import urlConfig from '@/config/proxy.config'
import { CODE_MESSAGE } from '../enum'
import qs from 'qs'
import { ref } from 'vue'
import { logout } from './logout'

type RequestConfig = HttpRequestConfig<HttpTask> & {
  noApiPrefix?: boolean;
  paramsSerializer?: (params: any) => void;
}

const formUrlencoded = 'application/x-www-form-urlencoded;charset=UTF-8'
// const formData = 'multipart/form-data'
// const { isToken, getToken } = useToken()
const isVisit = ref(false)
// 不需要前缀的请求前缀数组 */
const noApiPrefixArray = ['visitApi']

/** 设置Index和Size */
function copyPageProperties(
  source: { pageIndex?: number; pageSize?: number },
  target: any,
) {
  if (source && source.pageIndex && source.pageSize) {
    target.PageRequest = {
      Index: source.pageIndex,
      Size: source.pageSize,
    }
    target.Page = {
      Index: source.pageIndex,
      Size: source.pageSize,
    }
  }
}

/** 处理url地址 */
export function handleRequestUrl(config: RequestConfig) {
  const apiPrefix = config.url?.split('/')[1] as string
  config.baseURL = (urlConfig[apiPrefix] as string) || config.baseURL
  isVisit.value = ['visitApi'].includes(apiPrefix)
  // 不需要前缀
  if (config.noApiPrefix || noApiPrefixArray.includes(apiPrefix))
    config.url = config.url?.replace(`${apiPrefix}/`, '')

  // if (buildEnv === 'uat') {
  //   if (apiPrefix === 'sdms') {
  //     config.url = config.url?.replace(`sdms/`, 'sdmsin/')
  //   }
  // }
}

/** 处理token */
export function handleRequestToken(config: RequestConfig) {
  // console.log(config)
  const Authorization = uni.getStorageSync('Authorization')
  if (Authorization) {
    config.header!.Authorization = Authorization
  }
}

/** 格式化请求数据 */
export function handleRequestData(config: RequestConfig) {
  if (config.data) copyPageProperties(config.data, config.data)

  if (config.params) copyPageProperties(config.params, config.params)

  if (config.data && config.header!['Content-Type'] === formUrlencoded) {
    config.params = config.data
  }

  if (config.method === 'GET') {
    config.paramsSerializer = (params: AnyObject) => {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    }
  }
}

/** 接口返回的字段处理 字段映射 */
export function handleResponseDataField(res: HttpResponse['data']) {
  if (res.data?.Items) {
    res.data.pagination = { total: res.data.Total || 0 }
    res.data?.Total
      ? (res.data.list = res.data.Items)
      : (res.data = res.data.Items)
  }

  const { Value, Message, Status } = res
  res.data = Value || res.data
  res.message = Message || res.message || ''
  res.code = (Status || res.code).toString()

  // 删除多余的参数
  delete res.Value
  delete res.Code
  delete res.Status
  delete res.Message

  // 处理分页
  const { Pagination } = res.data || {}
  if (Pagination) {
    const fieldsMap: { [key: string]: string[] } = {
      index: ['Index', 'PageIndex'],
      size: ['Size', 'PageSize'],
      total: ['Total'],
    }
    res.data.pagination = {}
    Object.keys(fieldsMap).forEach((ele) => {
      res.data.pagination[ele] = getFieldItem(fieldsMap[ele], Pagination)
    })
    function getFieldItem(fields: string[], obj: any = {}) {
      const field = fields.find((i) => obj[i] !== undefined)
      return field ? obj[field] : undefined
    }
  }
}

/** 请求成功200 */
export function handleSuccess(res: HttpResponse) {
  const { header, config } = res
  if (header && (header['x-authorization'] || header['X-Authorization'])) {
    uni.setStorageSync(
      'Authorization',
      header.Authorization || header.authorization,
    )
    uni.setStorageSync(
      'x-Authorization',
      header['X-Authorization'] || header['x-authorization'],
    )
  }
  return (config as any).isFetch ? res : res.data
}

/** 401 406 */
export async function handleUnauthorized(res: HttpResponse) {
  const { header, config } = res
  if (!header['x-authorization'] && config.url === '/OAuth/RefreshToken')
    return
  uni.showToast({
    title: '登录已过期，请重新登录',
    icon: 'none',
    duration: 3000,
  })
  return await handleLogout(res)
}

/** 999 */
export async function handleLogout(res: HttpResponse) {
  await logout()
  return handleError(res)
}

/** 错误 */
export function handleError(res: HttpResponse) {
  const { config, errMsg } = res
  console.log(res, 'res')
  let statusText = ''
  if (res.data && res.data.message) statusText = res.data.message
  else if (CODE_MESSAGE[res.data.code])
    statusText = CODE_MESSAGE[+res.data.code]
  else statusText = errMsg
  // 弹窗
  uni.showToast({ title: statusText, icon: 'none', duration: 3000 })
  return Promise.reject((config as any).isFetch ? res : res.data)
}
