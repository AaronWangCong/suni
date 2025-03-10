import { computed, ref, unref, watch } from "vue"
import type { SuApiListProps } from "../props"

/**
 * 自定义 Hook，用于处理加载状态的管理。
 * @param props - 组件的属性。
 * @returns 包含加载状态管理函数的对象。
 */
export function useLoading(props: SuApiListProps) {
  // 定义一个响应式的加载状态变量
  const loadingRef = ref(false)

  /**
   * 监听组件的 loading 属性，更新本地的加载状态。
   * @param loading - 组件的 loading 属性值。
   */
  watch(
    () => unref(props).loading,
    (loading) => {
      // 更新加载状态，默认值为 false
      loadingRef.value = loading || false
    },
    { immediate: true }
  )

  /**
   * 计算属性，返回当前的加载状态。
   * @returns 当前的加载状态。
   */
  const getLoading = computed(() => unref(loadingRef))

  /**
   * 设置加载状态。
   * @param loading - 要设置的加载状态。
   */
  function setLoading(loading: boolean) {
    // 更新加载状态
    loadingRef.value = loading
  }

  // 返回包含加载状态管理函数的对象
  return { getLoading, setLoading }
}
