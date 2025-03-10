import { ref, watch } from 'vue'
import type { SuApiListProps } from '../props'
import type { SuUni } from '../../../types/uni'
import type { SuApiListPageConfigProps } from '../types'
import { useDebounceFn } from '../../../hooks'

type ActionType = {
  reload: (pramas?: SuApiListProps['params']) => void
  getDataSource: () => SuUni.Recordable[]
  setPagination: (info: Partial<SuApiListPageConfigProps>) => void
}

/**
 * 自定义 Hook，用于处理搜索功能。
 * @param props - 组件的属性。
 * @param {ActionType} actions - 组件的操作函数。
 * @returns 包含搜索功能相关函数和数据的对象。
 */
export function useSeaech(props: SuApiListProps, { reload, getDataSource, setPagination }: ActionType) {
  // 搜索的值
  const keyWord = ref('')
  // 搜索结果数据源
  const searchDataSource = ref<SuUni.Recordable[]>([])

  /**
   * 处理搜索事件。
   */
  function handleSearch() {
    // 如果是远程搜索
    if (props.remoteSearch) {
      // 如果没有提供API，则打印错误信息
      if (!props.api) return console.error('当remoteSearch为true时，需要api')
      // 设置分页信息中的当前页码为1
      setPagination({
        currentPage: 1
      })
      // 重新加载数据
      reload()
    } else {
      // 获取当前数据源
      const dataSource = getDataSource()
      // 过滤数据源，只保留包含搜索关键字的项
      searchDataSource.value = dataSource.filter((item) => item[props.labelField!].includes(keyWord.value))
    }
  }

  /**
   * 监听搜索关键字的变化，执行搜索操作。
   */
  watch(
    () => keyWord.value,
    () => {
      handleSearch()
    }
  )

  // 返回包含搜索功能相关函数和数据的对象
  return {
    keyWord,
    searchDataSource,
    // 使用防抖函数处理搜索事件，延迟时间为300毫秒
    handleSearch: useDebounceFn(handleSearch, 300)
  }
}

