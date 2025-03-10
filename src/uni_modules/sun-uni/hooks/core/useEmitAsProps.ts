// 导入 Vue 提供的工具函数
import { camelize, getCurrentInstance, toHandlerKey } from 'vue'

/**
 * useEmitAsProps 函数用于将组件的 emit 事件转换为 props。
 * 这样可以在模板中使用 @event 语法来绑定事件，而不是 $emit。
 *
 * @param emit - 组件的 emit 函数，用于触发事件。
 * @returns 一个对象，其中键是事件名称的 camelCase 形式，值是对应的事件处理函数。
 */
export function useEmitAsProps<Name extends string>(emit: (name: Name, ...args: any[]) => void) {
  // 获取当前组件实例
  const vm = getCurrentInstance()

  // 获取组件定义中的 emits 选项，它包含了组件可以触发的所有事件名称
  const events = vm?.type.emits as Name[]
  // 用于存储转换后的事件处理函数
  const result: Record<string, any> = {}

  // 如果没有定义 emits 选项，则发出警告
  if (!events?.length) {
    console.warn(`No emitted event found. Please check component: ${vm?.type.__name}`)
  }

  // 遍历所有事件名称，将它们转换为 camelCase 形式，并生成对应的事件处理函数
  events?.forEach((ev) => {
    // 将事件名称转换为 camelCase 形式，并生成对应的事件处理函数
    result[toHandlerKey(camelize(ev))] = (...arg: any) => emit(ev, ...arg)
  })

  // 返回转换后的事件处理函数对象
  return result
}
