import { computed, ref, unref, watch } from 'vue'
import type { SuApiListPageConfigProps } from '../types'
import { cloneDeep } from 'lodash-es'
import defProps from '../../../libs/config/props'
import type { SuApiListProps } from '../props'

/**
 * 自定义 Hook，用于处理分页配置的管理。
 * @param props - 组件的属性。
 * @returns 包含分页配置管理函数的对象。
 */
export function usePagination(props: SuApiListProps) {
  // 使用默认的分页配置创建一个响应式的分页配置对象
  const configRef = ref<SuApiListPageConfigProps>(cloneDeep(defProps.apiList.pagerConfig))
  // 是否还有更多数据
  const hasMoreRef = ref(props.showLoadmore)

  /**
   * 计算属性，返回当前的分页配置信息。
   * @returns 当前的分页配置信息。
   */
  const getPaginationInfo = computed(() => {
    return {
      ...props.pagerConfig,
      ...unref(configRef)
    }
  })

  /**
   * 获取当前的分页配置信息。
   * @returns 当前的分页配置信息。
   */
  function getPagination() {
    return unref(getPaginationInfo)
  }

  /**
   * 设置分页配置信息。
   * @param info - 要设置的分页配置信息。
   */
  function setPagination(info: Partial<SuApiListPageConfigProps>) {
    configRef.value = {
      ...unref(configRef),
      ...info
    }
  }

  /**
   * 监听分页配置的变化，更新 hasMoreRef 的值。
   */
  watch(
    () => configRef.value,
    () => {
      hasMoreRef.value = unref(configRef).currentPage! * unref(configRef).pageSize! < unref(configRef).total!
    },
    { deep: true }
  )

  // 返回包含分页配置管理函数的对象
  return { configRef, hasMoreRef, setPagination, getPaginationInfo, getPagination }
}

