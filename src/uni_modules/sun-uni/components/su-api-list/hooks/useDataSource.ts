import type { SuUni } from '@/uni_modules/sun-uni/types/uni'
import type { SuApiListProps } from '../props'
import type { SuApiListPageConfigProps } from '../types'
import { onMounted, ref, unref, watch, type ComputedRef, type Ref } from 'vue'
import { cloneDeep, get, isFunction, isUndefined } from 'lodash-es'

/**
 * 定义一个类型 EmitType，用于描述组件的事件发射函数。
 * 该类型包含两个事件：
 * - 'fetch-success'：当数据获取成功时触发，可选地携带一个 SuUni.Recordable 类型的数据。
 * - 'fetch-error'：当数据获取失败时触发，可选地携带一个 SuUni.Recordable 类型的错误对象。
 */
type EmitType = {
  // 当数据获取成功时触发的事件
  (e: 'fetch-success', data?: SuUni.Recordable): void
  // 当数据获取失败时触发的事件
  (e: 'fetch-error', error?: SuUni.Recordable): void
}

/**
 * 定义一个类型 ActionType，用于描述组件的操作函数。
 * 该类型包含以下操作：
 * - setLoading：设置加载状态的函数。
 * - setPagination：设置分页信息的函数。
 * - getPaginationInfo：获取分页信息的计算属性。
 * - keyWord：关键字的引用。
 */
type ActionType = {
  // 设置加载状态的函数
  setLoading: (loading: boolean) => void
  // 设置分页信息的函数
  setPagination: (info: Partial<SuApiListPageConfigProps>) => void
  // 获取分页信息的计算属性
  getPaginationInfo: ComputedRef<SuApiListPageConfigProps>
  // 关键字的引用
  keyWord: Ref<string>
}

/**
 * 处理结果数据。
 * @param res - 从 API 获取的原始结果数据。
 * @param dataField - 结果数据中实际数据所在的字段名。
 * @param totalField - 结果数据中总记录数所在的字段名。
 * @returns 处理后的结果数据，包括结果代码、结果数据和总记录数。
 */
function processResult(res: SuUni.Recordable, dataField: string | undefined, totalField: string | undefined) {
  // 判断结果是否为数组
  const isArrayResult = Array.isArray(res)
  // 获取结果代码，如果结果是数组则直接使用结果，否则从结果中获取 code 字段
  const resultCode = isArrayResult ? res : get(res, 'code')
  // 获取结果数据，如果结果是数组则直接使用结果，否则从结果中获取 dataField 字段
  const resultData = isArrayResult ? res : get(res, dataField!)
  // 获取总记录数，如果结果是数组则默认为 0，否则从结果中获取 totalField 字段
  const resultTotal: number = isArrayResult ? 0 : get(res, totalField!)
  // 返回处理后的结果数据
  return {
    resultCode,
    resultData,
    resultTotal: isUndefined(resultTotal) ? 0 : Number(resultTotal)
  }
}

/**
 * 在结果前处理结果参数。
 * @param beforeFetch - 在获取数据前执行的函数。
 * @param params - 请求参数。
 * @returns 处理后的请求参数。
 */
async function processBeforeFetch(beforeFetch: SuUni.Fn | undefined, params: SuUni.Recordable) {
  // 如果 beforeFetch 是一个函数，则执行它并更新 params
  if (beforeFetch && isFunction(beforeFetch)) params = (await beforeFetch(params)) || params
  // 返回处理后的请求参数
  return params
}

/**
 * 在结果后处理结果数据。
 * @param afterFetch - 在获取数据后执行的函数。
 * @param resultData - 从 API 获取的结果数据。
 * @returns 处理后的结果数据。
 */
async function processAfterFetch(afterFetch: SuUni.Fn | undefined, resultData: SuUni.Recordable) {
  // 如果 afterFetch 是一个函数，则执行它并更新 resultData
  if (afterFetch && isFunction(afterFetch)) resultData = (await afterFetch(resultData)) || resultData
  // 返回处理后的结果数据
  return resultData
}

/**
 * 自定义 Hook，用于处理数据源的获取和管理。
 * @param props - 组件的属性。
 * @param {ActionType} actions - 组件的操作函数。
 * @param emit - 组件的事件发射函数。
 * @returns 包含数据源管理函数的对象。
 */

export function useDataSource(props: SuApiListProps, { setLoading, getPaginationInfo, setPagination, keyWord }: ActionType, emit: EmitType) {
  // 定义一个响应式的数据源
  const dataSource = ref<SuUni.Recordable>([])
  // 定义一个响应式的原始数据源
  const rawDataSource = ref<SuUni.Recordable>([])
  // 定义一个响应式的分页信息对象
  const pageInfoRef = ref<SuUni.Recordable>({})

  /**
   * 从 API 获取数据。
   * @param opt - 可选的请求参数。
   */
  async function fetch(opt: SuApiListProps['params']) {
    // 解构 props 中的属性
    const { api, showSearch, searchField, params, showPager, currentPageField, pageSizeField, dataField, totalField, afterFetch, beforeFetch } = props
    // 获取分页信息
    const pagerInfo = unref(getPaginationInfo)
    // 如果没有提供 API 或者 API 不是一个函数，则直接返回
    if (!api || !isFunction(api)) return
    try {
      // 设置加载状态为 true
      setLoading(true)
      // 获取当前页码，如果没有则默认为 1
      let currentPage = pagerInfo.currentPage || 1

      // 构建请求体
      let body = {
        ...opt,
        ...params,
        ...(showPager
          ? {
              // 如果启用了分页，则添加当前页码和每页大小
              [currentPageField!]: currentPage,
              [pageSizeField!]: pagerInfo.pageSize
            }
          : {}),
        ...(showSearch ? { [searchField!]: keyWord.value } : {})
      }

      // 前置处理方法
      body = await processBeforeFetch(beforeFetch, body)

      // 调用 API 获取数据
      const res = await api(body)
      // 设置原始数据
      rawDataSource.value = res
      // 处理接口结果
      const { resultData, resultTotal } = processResult(res, dataField, totalField)
      let _resultData = resultData || []

      // 后置处理方法
      _resultData = await processAfterFetch(afterFetch, _resultData)
      // 如果是分页，则合并数据
      if (showPager && currentPage > 1) {
        _resultData = unref(dataSource).concat(_resultData)
      }
      dataSource.value = _resultData

      // 设置currentPage 当 resultTotal/pageSize 小于当前页，设置currentPage为1
      // let currentPage = tablePage.currentPage
      const total = resultTotal || _resultData.length || 0
      // 和1对比取最大值，pageIndex为0重复请求问题
      const pageIndex = Math.max(1, Math.ceil(total / pagerInfo.pageSize!))

      if (currentPage > pageIndex) {
        currentPage = 1
        // 当前选择的页数大于返回的最大的页数时，重新加载数据
        reload()
      }

      setPagination({
        total,
        currentPage
      })
      pageInfoRef.value = cloneDeep(unref(getPaginationInfo)!)

      emit('fetch-success', {
        items: _resultData,
        total: resultTotal
      })
    } catch (error) {
      emit('fetch-error', error!)
      // 添加log错误
      console.error(error, 'res')
      dataSource.value = []
    } finally {
      setLoading(false)
    }
  }

  /**
   * 重新加载数据。
   * @param params - 可选的请求参数，默认为组件的默认参数。
   */
  function reload(params: SuApiListProps['params'] = props.params) {
    // 调用 fetch 函数获取数据
    fetch(params)
  }

  /**
   * 获取当前的数据源。
   * @returns 当前数据源的副本，类型为 SuUni.Recordable 数组。
   */
  function getDataSource<T = SuUni.Recordable>() {
    // 返回当前数据源的副本
    return dataSource.value as T[]
  }

  /**
   * 设置当前的数据源。
   * @param data - 要设置的数据源，类型为 SuUni.Recordable 数组。
   */
  function setDataSource<T = SuUni.Recordable>(data: T[]) {
    // 使用 cloneDeep 函数创建数据的深拷贝，以避免副作用
    dataSource.value = cloneDeep(data)
  }

  onMounted(() => {
    setTimeout(() => {
      props.immediate && fetch(props.params)
    }, 16)
  })

  watch(
    () => props.list,
    (val) => {
      !props.api && val.length && setDataSource(val)
    },
    { deep: true, immediate: true }
  )

  return {
    reload,
    dataSource,
    getDataSource,
    setDataSource
  }
}
