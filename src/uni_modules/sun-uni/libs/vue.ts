import { isFunction } from 'lodash-es'
import { computed, type CSSProperties, type PropType } from 'vue'

export const defineMixin = (options: any) => {
  return options
}

export const unknownProp = null as unknown as PropType<unknown>

export const numericProp = [Number, String]

export const truthProp = {
  type: Boolean,
  default: true as const
}

export const makeRequiredProp = <T>(type: T) => ({
  type,
  required: true as const
})

export const makeArrayProp = <T>(defaultVal?: () => T) => ({
  type: Array as PropType<T[]>,
  default: defaultVal || (() => [])
})

export const makeObjectProp = <T>(obj: T | (() => T)) => {
  if (isFunction(obj)) {
    return {
      type: Object as PropType<T>,
      default: obj
    }
  }

  return {
    type: Object as PropType<T>,
    default: () => obj
  }
}

export const makeBooleanProp = <T>(defaultVal: T | (() => T)) => ({
  type: Boolean,
  default: defaultVal
})

export const makeNumberProp = <T>(defaultVal: T | (() => T)) => ({
  type: Number,
  default: defaultVal
})

export const makeNumericProp = <T>(defaultVal: T | (() => T)) => ({
  type: numericProp,
  default: defaultVal as T
})

export const makeStringProp = <T>(defaultVal: T | (() => T)) => ({
  type: String as unknown as PropType<T>,
  default: defaultVal
})

export const baseProps = {
  /**
   * 自定义根节点样式
   */
  customStyle: {
    type: [Object, String] as PropType<CSSProperties | string>,
    default: () => ({})
  },
  /**
   * 自定义根节点样式类
   */
  customClass: makeStringProp(''),
  url: makeStringProp(''),
  linkType: makeStringProp('navigateTo')
}

export const bem = function (name: any, fixed: any[], change: any[], props: any) {
  // 类名前缀
  const prefix = `su-${name}--`
  const classes: Record<string, any> = {}
  if (fixed.length) {
    fixed.map((item) => {
      // 这里的类名，会一直存在
      classes[prefix + props[item]] = true
    })
  }
  if (change.length) {
    change.map((item) => {
      // 这里的类名，会根据this[item]的值为true或者false，而进行添加或者移除某一个类
      props[item] ? (classes[prefix + item] = item) : delete classes[prefix + item]
    })
  }
  return (
    Object.keys(classes)
      // 支付宝，头条小程序无法动态绑定一个数组类名，否则解析出来的结果会带有","，而导致失效
      // #ifdef MP-ALIPAY || MP-TOUTIAO || MP-LARK
      .join(' ')
    // #endif
  )
}

/** 阻止事件冒泡 */
export function stopPropagationFunc(e: any) {
  e && typeof e.stopPropagation === 'function' && e.stopPropagation()
}
