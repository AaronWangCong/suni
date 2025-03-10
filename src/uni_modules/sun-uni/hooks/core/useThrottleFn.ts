import { isRef } from 'vue'
import { createFilterWrapper, noop, toValue } from './filter'
import type { AnyFn, EventFilter, FunctionArgs, MaybeRefOrGetter, PromisifyFn } from './type'

export interface ThrottleFilterOptions {
  /**
   * 在调用之前允许延迟的最长时间。
   */
  delay: MaybeRefOrGetter<number>
  /**
   * 是否在超时的后沿调用。
   */
  trailing?: boolean
  /**
   * 是否在超时的前沿调用。
   * @default true
   */
  leading?: boolean
  /**
   * 如果上次通话被取消，是否拒绝。
   */
  rejectOnCancel?: boolean
}

export function throttleFilter(ms: MaybeRefOrGetter<number>, trailing?: boolean, leading?: boolean, rejectOnCancel?: boolean): EventFilter
export function throttleFilter(options: ThrottleFilterOptions): EventFilter

export function throttleFilter(...args: any[]) {
  let lastExec = 0
  let timer: ReturnType<typeof setTimeout> | undefined
  let isLeading = true
  let lastRejector: AnyFn = noop
  let lastValue: any
  let ms: MaybeRefOrGetter<number>
  let trailing: boolean
  let leading: boolean
  let rejectOnCancel: boolean
  if (!isRef(args[0]) && typeof args[0] === 'object') ({ delay: ms, trailing = true, leading = true, rejectOnCancel = false } = args[0])
  else[ms, trailing = true, leading = true, rejectOnCancel = false] = args
  const clear = () => {
    if (timer) {
      clearTimeout(timer)
      timer = undefined
      lastRejector()
      lastRejector = noop
    }
  }

  const filter: EventFilter = (_invoke) => {
    const duration = toValue(ms)
    const elapsed = Date.now() - lastExec
    const invoke = () => {
      return (lastValue = _invoke())
    }

    clear()

    if (duration <= 0) {
      lastExec = Date.now()
      return invoke()
    }

    if (elapsed > duration && (leading || !isLeading)) {
      lastExec = Date.now()
      invoke()
    } else if (trailing) {
      lastValue = new Promise((resolve, reject) => {
        lastRejector = rejectOnCancel ? reject : resolve
        timer = setTimeout(
          () => {
            lastExec = Date.now()
            isLeading = true
            resolve(invoke())
            clear()
          },
          Math.max(0, duration - elapsed)
        )
      })
    }

    if (!leading && !timer) timer = setTimeout(() => (isLeading = true), duration)

    isLeading = false
    return lastValue
  }

  return filter
}

/**
 * 创建一个节流函数，该函数会在指定的时间间隔内限制传入函数的执行次数
 * @param fn 要节流的函数
 * @param ms 节流的时间间隔，单位是毫秒，默认值是 200
 * @param trailing 是否在节流时间间隔的末尾执行函数，默认值是 false
 * @param leading 是否在节流时间间隔的开始执行函数，默认值是 true
 * @param rejectOnCancel 如果节流被取消，是否拒绝 Promise，默认值是 false
 * @returns 一个新的函数，该函数会在满足节流条件时执行传入的函数
 */
export function useThrottleFn<T extends FunctionArgs>(
  fn: T,
  ms: MaybeRefOrGetter<number> = 200,
  trailing = false,
  leading = true,
  rejectOnCancel = false
): PromisifyFn<T> {
  return createFilterWrapper(throttleFilter(ms, trailing, leading, rejectOnCancel), fn)
}
