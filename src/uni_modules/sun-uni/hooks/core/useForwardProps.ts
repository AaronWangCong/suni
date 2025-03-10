// 导入 Vue 提供的工具函数
import { type MaybeRefOrGetter, camelize, computed, getCurrentInstance, toRef } from 'vue'

/**
 * 定义一个接口，用于描述属性的选项。
 * @interface PropOptions
 * @property {any} type - 属性的类型。
 * @property {boolean} required - 该属性是否是必需的。
 * @property {any} default - 属性的默认值。
 */
interface PropOptions {
  type?: any
  required?: boolean
  default?: any
}

/**
 * useForwardProps 函数用于将传入的属性对象转换为响应式对象，并返回一个计算属性。
 * 该计算属性会根据当前组件实例的 props 和默认 props，返回一个包含所有属性的对象。
 *
 * @param {MaybeRefOrGetter<T>} props - 传入的属性对象，可以是响应式的 ref 或 getter 函数。
 * @returns {ComputedRef<T>} - 一个计算属性，返回一个包含所有属性的对象。
 */
export function useForwardProps<T extends Record<string, any>>(props: MaybeRefOrGetter<T>) {
  // 获取当前组件实例
  const vm = getCurrentInstance()

  // 获取组件定义中的 props 选项，它包含了组件声明的所有属性
  const defaultProps = Object.keys(vm?.type.props ?? {}).reduce((prev, curr) => {
    // 获取属性的默认值
    const defaultValue = (vm?.type.props[curr] as PropOptions).default
    // 如果默认值存在，则将其添加到 prev 对象中
    if (defaultValue !== undefined) prev[curr as keyof T] = defaultValue
    return prev
  }, {} as T)

  // 将传入的属性对象转换为响应式的 ref 对象
  const refProps = toRef(props)

  // 返回一个计算属性，该计算属性会根据当前组件实例的 props 和默认 props，返回一个包含所有属性的对象
  return computed(() => {
    // 用于存储最终的属性对象
    const preservedProps = {} as T
    // 获取当前组件实例的 vnode 中的 props
    const assignedProps = vm?.vnode.props ?? {}

    // 遍历 assignedProps 对象，将其属性名转换为驼峰命名，并将属性值添加到 preservedProps 对象中
    Object.keys(assignedProps).forEach((key) => {
      preservedProps[camelize(key) as keyof T] = assignedProps[key]
    })

    // 只返回传入的属性对象中的值
    return Object.keys({ ...defaultProps, ...preservedProps }).reduce((prev, curr) => {
      // 如果传入的属性对象中的值存在，则将其添加到 prev 对象中
      if (refProps.value[curr] !== undefined) prev[curr as keyof T] = refProps.value[curr]
      return prev
    }, {} as T)
  })
}
