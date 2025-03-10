// 看到此报错，是因为没有配置vite.config.js的【transpileDependencies】
// const pleaseSetTranspileDependencies = {}, babelTest = pleaseSetTranspileDependencies?.test

// 引入全局mixin
import { mixin } from './libs/mixin/mixin'
// 小程序特有的mixin
import { mpMixin } from './libs/mixin/mpMixin'
// 全局挂载引入http相关请求拦截插件
import Request from './libs/luch-request'

// 路由封装
import route from './libs/util/route'
// 颜色渐变相关,colorGradient-颜色渐变,hexToRgb-十六进制颜色转rgb颜色,rgbToHex-rgb转十六进制
import colorGradient from './libs/function/colorGradient'

// 规则检验
import test from './libs/function/test'
// 防抖方法
import debounce from './libs/function/debounce'
// 节流方法
import throttle from './libs/function/throttle'
// 公共文件写入的方法
import index from './libs/function/index'

// 配置信息
import config from './libs/config/config'
// props配置信息
import props from './libs/config/props'
// 各个需要fixed的地方的z-index配置文件
import zIndex from './libs/config/zIndex'
// 关于颜色的配置，特殊场景使用
import color from './libs/config/color'
// 平台
import platform from './libs/function/platform'

// 导出
const http = new Request()
let themeType = ['primary', 'success', 'error', 'warning', 'info']
export { route, http, debounce, throttle, platform, themeType, mixin, mpMixin, props, color, test, zIndex }
export * from './libs/function/index'
export * from './libs/function/colorGradient.js'

/**
 * @description 修改uView内置属性值
 * @param {object} props 修改内置props属性
 * @param {object} config 修改内置config属性
 * @param {object} color 修改内置color属性
 * @param {object} zIndex 修改内置zIndex属性
 */
export function setConfig(configs:any) {
  index.shallowMerge(config, configs.config || {})
  index.shallowMerge(props, configs.props || {})
  index.shallowMerge(color, configs.color || {})
  index.shallowMerge(zIndex, configs.zIndex || {})
}
index.setConfig = setConfig

const $u = {
  route,
  date: index.timeFormat, // 另名date
  colorGradient: colorGradient.colorGradient,
  hexToRgb: colorGradient.hexToRgb,
  rgbToHex: colorGradient.rgbToHex,
  colorToRgba: colorGradient.colorToRgba,
  test,
  type: themeType,
  http,
  config, // uview-plus配置信息相关，比如版本号
  zIndex,
  debounce,
  throttle,
  mixin,
  mpMixin,
  props,
  ...index,
  color,
  platform
}

export const mount$u = function () {
  uni.$u = $u as any
}

// #ifdef H5
const importFn:any = import.meta.glob('./components/su-*/su-*.vue', { eager: true })
let components:any[] = []

// 批量注册全局组件
for (const key in importFn) {
  let component = importFn[key].default
  if (component.name && component.name.indexOf('su-') !== 0) {
    const name = component.name.replace(/su-([a-zA-Z0-9-_]+)/g, 'su-$1')
    component.install = function (Vue:any) {
      Vue.component(name, component)
    }

    // 导入组件
    components.push(component)
  }
}
// #endif

const install = (Vue:any) => {
  // #ifdef H5
  components.forEach(function (component) {
    Vue.component(component.name, component)
  })
  // #endif

  // 同时挂载到uni和Vue.prototype中
  // $u挂载到uni对象上
  uni.$u = $u as any

  // #ifndef APP-NVUE
  // 只有vue，挂载到Vue.prototype才有意义，因为nvue中全局Vue.prototype和Vue.mixin是无效的
  Vue.config.globalProperties.$u = $u
  Vue.mixin(mixin)
  // #endif
}

export default {
  install
}
