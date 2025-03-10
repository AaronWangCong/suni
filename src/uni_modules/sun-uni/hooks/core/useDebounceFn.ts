import type { AnyFn, DebounceFilterOptions, EventFilter, FunctionArgs, MaybeRefOrGetter, PromisifyFn } from './type'
import { noop } from 'lodash-es'
import { createFilterWrapper, toValue } from './filter'

/**
 * 创建一个防抖过滤器
 * @param ms - 防抖延迟时间（毫秒）
 * @param options - 防抖选项
 * @returns 防抖过滤器函数
 */
export function debounceFilter(ms: MaybeRefOrGetter<number>, options: DebounceFilterOptions = {}): EventFilter {
  let timer: ReturnType<typeof setTimeout> | undefined
  let maxTimer: ReturnType<typeof setTimeout> | undefined | null
  let lastRejector: AnyFn = noop

  const _clearTimeout = (timer: ReturnType<typeof setTimeout>) => {
    clearTimeout(timer)
    lastRejector()
    lastRejector = noop
  }

  const filter: EventFilter = (invoke) => {
    const duration = toValue(ms)
    const maxDuration = toValue(options.maxWait)

    if (timer) _clearTimeout(timer)

    if (duration <= 0 || (maxDuration !== undefined && maxDuration <= 0)) {
      if (maxTimer) {
        _clearTimeout(maxTimer)
        maxTimer = null
      }
      return Promise.resolve(invoke())
    }

    return new Promise((resolve, reject) => {
      lastRejector = options.rejectOnCancel ? reject : resolve
      if (maxDuration && !maxTimer) {
        maxTimer = setTimeout(() => {
          if (timer) _clearTimeout(timer)
          maxTimer = null
          resolve(invoke())
        }, maxDuration)
      }

      timer = setTimeout(() => {
        if (maxTimer) _clearTimeout(maxTimer)
        maxTimer = null
        resolve(invoke())
      }, duration)
    })
  }

  return filter
}

/**
 * 根据vue/use useDebounceFn 改版而来
 * @param fn - 要防抖的函数
 * @param ms - 防抖延迟时间（毫秒）
 * @param options - 防抖选项
 * @returns 防抖后的函数
 */
export function useDebounceFn<T extends FunctionArgs>(
  fn: T,
  ms: MaybeRefOrGetter<number> = 200,
  options: DebounceFilterOptions = {}
): PromisifyFn<T> {
  return createFilterWrapper(debounceFilter(ms, options), fn)
}
