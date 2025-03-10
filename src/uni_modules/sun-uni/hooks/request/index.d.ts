import type { HttpRequestAbstract } from '../../libs/luch-request'
import type { Ref } from 'vue'

namespace SuRequest {
  type AnyObject = Record<string, any>
  export type Handler = HttpRequestAbstract['request']
  export type Options = {
    /** 初始化数据 */
    initialData?: AnyObject
    /**
     * 默认 false。 即在初始化时自动执行 service。
     * 如果设置为 true，则需要手动调用 run 或 runAsync 触发执行。
     */
    manual?: boolean
    /** 首次默认执行时，传递给 service 的参数 */
    defaultParams?: AnyObject
    /** 格式化请求结果 */
    formatResult?: (res: AnyObject) => AnyObject
    /** service 执行前触发 */
    onBefore?: (params?: AnyObject) => void
    /** service resolve 时触发 */
    onSuccess?: (data: AnyObject, params: AnyObject) => void
    /** service reject 时触发 */
    onError?: (err: Error, params: AnyObject) => void
    /** service 执行完成时触发 */
    onFinally?: (params: AnyObject, data: AnyObject) => void
    /** 防抖等待时间, 单位为毫秒，设置后，进入防抖模式 默认值：200ms */
    debounceWait?: number
    /** 允许被延迟的最大值 useDebounceFn有效 */
    debounceMaxWait?: number | Ref<number>
    /** 如果上次调用被取消，是否拒绝。默认false */
    rejectOnCancel?: boolean
    /** 防抖等待时间, 单位为毫秒，设置后，进入防抖模式 */
    throttleWait?: number
    /** 在延迟开始前执行调用 useThrottleFn有效 */
    throttleLeading?: boolean
    /** 在延迟结束后执行调用 useThrottleFn有效 */
    throttleTrailing?: boolean
    /** 收集依赖并刷新请求 */
    refreshDeps?: boolean
  }

  export type Result = Readonly<{
    /** service 返回的数据 */
    data: Ref<AnyObject> | undefined
    /** service 抛出的异常 */
    error: Ref<any> | undefined
    /** service 是否正在执行 */
    loading: Ref<boolean>
    /** 当次执行的 service 的参数数组。比如你触发了 run(1, 2, 3)，则 params 等于 [1, 2, 3] */
    params: Ref<AnyObject>
    /** 执行 service，参数会传递给 service */
    run: (...args: AnyObject[]) => void
    /** 执行 service，参数会传递给 service */
    runAsync: (...args: AnyObject[]) => Promise<AnyObject>
    /** 重新执行 service，参数会传递给 service */
    refresh: () => void
    /** 重新执行 service，参数会传递给 service */
    refreshAsync: () => Promise<AnyObject>
    /** 直接修改 data */
    mutate: (data?: AnyObject | ((oldData?: AnyObject) => AnyObject)) => void
  }>
}
