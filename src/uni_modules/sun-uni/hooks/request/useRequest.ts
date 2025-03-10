import { onMounted, ref, watch, watchEffect } from 'vue'
import type { SuRequest } from './index.d'
import { isFunction, isEqual } from 'lodash-es'
import { useDebounceFn } from '../core/useDebounceFn'
import { useThrottleFn } from '../core/useThrottleFn'

/**
 * 自定义 Hook 用于处理请求
 * @param handler 请求处理函数
 * @param option 配置选项
 * @returns 包含请求状态和数据的結果对象
 */
export function useRequest(handler: SuRequest.Handler, option: SuRequest.Options): SuRequest.Result {
  /** 接口返回的数据 */
  const data = ref<SuRequest.AnyObject>({})
  /** 接口返回的错误信息 */
  const error = ref()
  /** 是否正在请求中 */
  const loading = ref(false)
  /** 当次执行的 service 的参数数组。比如你触发了 run(1, 2, 3)，则 params 等于 [1, 2, 3] */
  const params = ref<SuRequest.AnyObject[]>([])

  // 执行请求的函数，接受可变参数
  let run = (...runParams: SuRequest.AnyObject[]) => {
    // 请求前的回调函数，如果有的话
    if (option.onBefore) option.onBefore(runParams)
    params.value = runParams
    loading.value = true
    handler(...params.value)
      .then((res: SuRequest.AnyObject) => {
        // 结果格式化函数，如果有的话
        if (option.formatResult) res = option.formatResult(res)
        data.value = res
        // 请求成功的回调函数，如果有的话
        if (option.onSuccess) option.onSuccess(res, data.value)
      })
      .catch((err: Error) => {
        error.value = err
        // 请求失败的回调函数，如果有的话
        if (option.onError) option.onError(err, data.value!)
      })
      .finally(() => {
        loading.value = false
        // 无论请求成功或失败都会执行的回调函数，如果有的话
        if (option.onFinally) option.onFinally(params.value, data.value!)
      })
  }

  // 异步执行请求的函数，接受可变参数
  let runAsync = (...runParams: SuRequest.AnyObject[]) => {
    return new Promise<SuRequest.AnyObject>((resolve, reject) => {
      run(...runParams)
      resolve(data.value!)
      reject(error.value)
    })
  }

  // 更新数据的方法，接受一个函数或新的数据对象
  function mutate(newData: Parameters<SuRequest.Result['mutate']>['0']) {
    if (isFunction(newData)) data.value = newData(data.value)
    else data.value = newData!
  }

  // 如果配置了防抖动时间，则应用防抖动处理
  if (option.debounceWait) {
    const opt = { maxWait: option.debounceMaxWait, rejectOnCancel: option.rejectOnCancel }
    run = useDebounceFn(run, option.debounceWait || 200, opt)
    runAsync = useDebounceFn(runAsync, option.debounceWait || 200, opt)
  }

  // 如果配置了节流时间，则应用节流处理
  if (option.throttleWait) {
    const opt = [option.throttleTrailing, option.throttleLeading, option.rejectOnCancel]
    run = useThrottleFn(run, option.throttleWait || 200, ...opt)
    runAsync = useThrottleFn(runAsync, option.debounceWait || 200, ...opt)
  }

  /** 监听参数数据是否改变 若配置 refreshDeps: true 刷新数据 */
  watch(
    () => params.value,
    (val, oVal) => {
      if (!isEqual(val, oVal) && option.refreshDeps) {
        run(val)
      }
    },
    { deep: true }
  )

  // 监视配置的初始数据变化，并更新数据
  watchEffect(() => {
    data.value = option.initialData || {}
  })

  onMounted(() => {
    // 在组件挂载时自动执行请求，如果配置了手动模式
    if (!option.manual) run()
  })

  // 返回请求相关的函数和状态
  return { run, runAsync, data, error, loading, params, mutate, refresh: run, refreshAsync: runAsync }
}
