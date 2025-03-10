/** 静态枚举数据 */
// import { translateTitle as t } from '@/locale'

export const enumLocal = {
  /** 是/否 */
  booleanMap: [
    { label: '是', value: true },
    { label: '否', value: false }
  ],
  /** 是/否 */
  enableMap: [
    { label: '启用', value: true },
    { label: '禁用', value: false }
  ]
}

export const languageEnum: { [key: string]: string } = {
  'zh-Hans': 'zh-CN',
  en: 'en-US'
}

export const CODE_MESSAGE: { [key: string]: string } = {
  200: '服务器成功返回请求数据',
  201: '新增或修改数据成功',
  202: '一个请求已经进入后台排队(异步任务)',
  204: '删除数据成功',
  400: '发出信息有误',
  401: '用户没有权限(令牌失效、用户名、密码错误、登录过期)',
  402: '令牌过期',
  403: '用户得到授权，但是访问是被禁止的',
  404: '访问资源不存在',
  406: '请求格式不可得',
  410: '请求资源被永久删除，且不会被看到',
  500: '服务器发生错误',
  501: '服务器发生错误',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时'
}
