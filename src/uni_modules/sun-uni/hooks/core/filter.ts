import { unref } from 'vue'
import type { AnyFn, EventFilter, PromisifyFn, ArgumentsType, MaybeRefOrGetter } from './type'

/**
 * 创建一个过滤函数包装器
 * @param filter - 过滤函数
 * @param fn - 要包装的函数
 * @returns 包装后的函数
 */
export function createFilterWrapper<T extends AnyFn>(filter: EventFilter, fn: T): PromisifyFn<T> {
  function wrapper(this: any, ...args: ArgumentsType<T>): Promise<Awaited<ReturnType<T>>> {
    return new Promise((resolve, reject) => {
      Promise.resolve(filter(() => fn.apply(this, args), { fn, thisArg: this, args }))
        .then(resolve)
        .catch(reject)
    })
  }

  return wrapper
}

/**
 * 空函数，不执行任何操作
 */
export const noop = () => {}

/**
 * 将可能是响应式对象的值转换为普通值
 * @param r - 可能是响应式对象的值
 * @returns 普通值
 */
export function toValue<T>(r: MaybeRefOrGetter<T>): T {
  return typeof r === 'function' ? (r as AnyFn)() : unref(r)
}
