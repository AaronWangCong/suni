import type { SuUni } from '../../../types/uni'
import { ref } from 'vue'

/**
 * 自定义钩子函数，用于处理页面滚动、到达底部和下拉刷新事件
 * @param onPageScroll - 页面滚动事件的处理函数
 * @param onReachBottom - 到达页面底部事件的处理函数
 * @param onPullDownRefresh - 下拉刷新事件的处理函数
 * @returns 一个包含 mescrollItem 和 getMescroll 方法的对象
 */
function useMescrollComp(onPageScroll: SuUni.onPageScroll, onReachBottom: SuUni.onReachBottom, onPullDownRefresh?: SuUni.onPullDownRefresh) {
  // 因为子组件无onPageScroll和onReachBottom的页面生命周期，需在页面传递进到子组件
  onPageScroll((e) => {
    handlePageScroll(e)
  })

  onReachBottom(() => {
    handleReachBottom()
  })

  // 当down的native: true时, 还需传递此方法进到子组件
  onPullDownRefresh &&
    onPullDownRefresh(() => {
      handlePullDownRefresh()
    })

  // 声明一个名为 mescrollItem 的 ref，用于存储 MeScroll 实例，初始值为 null
  const mescrollItem = ref<{
    getMescroll: () => SuUni.MeScroll
  } | null>(null)

  /**
   * 处理页面滚动事件的函数
   * @param e - 页面滚动事件的参数
   */
  const handlePageScroll = (e: Page.PageScrollOption) => {
    const mescroll = getMescroll()
    mescroll && mescroll.onPageScroll(e)
  }

  /**
   * 处理到达页面底部事件的函数
   */
  const handleReachBottom = () => {
    const mescroll = getMescroll()
    mescroll && mescroll.onReachBottom()
  }

  /**
   * 处理下拉刷新事件的函数
   */
  const handlePullDownRefresh = () => {
    const mescroll = getMescroll()
    mescroll && mescroll.onPullDownRefresh()
  }

  /**
   * 获取 MeScroll 实例的函数
   * @returns MeScroll 实例，如果不存在则返回 null
   */
  const getMescroll = () => {
    if (mescrollItem.value && mescrollItem.value.getMescroll) {
      return mescrollItem.value?.getMescroll()
    }
    return null
  }

  // 返回一个包含 mescrollItem 和 getMescroll 方法的对象
  return {
    mescrollItem,
    getMescroll
  }
}

export default useMescrollComp
