import { ref, unref, type ComputedRef } from 'vue'
import type { SuApiListProps } from '../props'
import type { SuApiListPageConfigProps } from '../types'
import { cloneDeep } from 'lodash-es'
import { useDebounceFn } from '../../../hooks'

type EmitType = {
  (e: 'scroll', data?: UniHelper.ScrollViewOnScrollEvent): void
  (e: 'scrolltolower'): void
}

type ActionType = {
  setPagination: (info: Partial<SuApiListPageConfigProps>) => void
  getPaginationInfo: ComputedRef<SuApiListPageConfigProps>
  reload: (pramas?: SuApiListProps['params']) => void
}

/**
 * 自定义 Hook，用于处理滚动事件。
 * @param props - 组件的属性。
 * @param {ActionType} actions - 组件的操作函数。
 * @param emit - 组件的事件发射函数。
 * @returns 包含滚动事件处理函数的对象。
 */
export function useScrollEvent(props: SuApiListProps, { getPaginationInfo, setPagination, reload }: ActionType, emit: EmitType) {
  // 使用分页信息的深拷贝创建一个响应式的分页信息对象
  const pagerInfo = ref(cloneDeep(unref(getPaginationInfo)))

  /**
   * 处理滚动事件。
   * @param event - 滚动事件对象。
   */
  function handleScroll(event: UniHelper.ScrollViewOnScrollEvent) {
    // 发射 scroll 事件
    emit('scroll', event)
  }

  /**
   * 处理滚动到底部事件。
   */
  async function handleScrollToLower() {
    // 如果当前页码与分页信息中的当前页码相同，则不处理
    if (unref(pagerInfo).currentPage === unref(getPaginationInfo).currentPage) {
      // 获取分页信息中的当前页码、每页大小和总记录数
      const { currentPage = 1, pageSize = 50, total } = unref(getPaginationInfo)
      // 如果当前页码乘以每页大小大于等于总记录数，则不处理
      if (currentPage * pageSize >= total!) return
      // 设置分页信息中的当前页码为当前页码加一
      setPagination({
        currentPage: currentPage + 1
      })
      // 重新加载数据
      await reload()
      // 更新分页信息
      pagerInfo.value = cloneDeep(unref(getPaginationInfo))
    }
    // 发射 scrolltolower 事件
    emit('scrolltolower')
  }

  // 返回包含滚动事件处理函数的对象
  return {
    handleScroll,
    // 使用防抖函数处理滚动到底部事件，延迟时间为300毫秒
    handleScrollToLower: useDebounceFn(handleScrollToLower, 300)
  }
}
