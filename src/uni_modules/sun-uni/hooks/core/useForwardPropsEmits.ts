// 导入 MaybeRefOrGetter 类型和 computed 函数
import { type MaybeRefOrGetter, computed } from 'vue'
// 导入 useEmitAsProps 函数
import { useEmitAsProps } from './useEmitAsProps'
// 导入 useForwardProps 函数
import { useForwardProps } from './useForwardProps'

/**
 * useForwardPropsEmits 函数用于将传入的属性和事件转换为响应式对象，并返回一个计算属性。
 * 该计算属性会根据当前组件实例的 props 和默认 props，返回一个包含所有属性和事件的对象。
 *
 * @param {MaybeRefOrGetter<T>} props - 传入的属性对象，可以是响应式的 ref 或 getter 函数。
 * @param {Function} [emit] - 组件的 emit 函数，用于触发事件。
 * @returns {ComputedRef<T & Record<string, any>>} - 一个计算属性，返回一个包含所有属性和事件的对象。
 */
export function useForwardPropsEmits<T extends Record<string, any>, Name extends string>(
  props: MaybeRefOrGetter<T>,
  emit?: (name: Name, ...args: any[]) => void
) {
  // 使用 useForwardProps 函数将传入的属性对象转换为响应式对象
  const parsedProps = useForwardProps(props)
  // 如果传入了 emit 函数，则使用 useEmitAsProps 函数将事件转换为响应式对象
  const emitsAsProps = emit ? useEmitAsProps(emit) : {}

  // 返回一个计算属性，该计算属性会根据当前组件实例的 props 和默认 props，返回一个包含所有属性和事件的对象
  return computed(() => ({
    // 展开 parsedProps.value 对象，将其属性添加到返回的对象中
    ...parsedProps.value,
    // 展开 emitsAsProps 对象，将其属性添加到返回的对象中
    ...emitsAsProps
  }))
}
