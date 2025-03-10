import type { SuUni } from '../../../types/uni'
import { ref, type Ref } from 'vue'

/**
 * 定义一个类型，用于表示包含 getMescroll 方法的对象
 */
type MescrollItems = {
  getMescroll: () => SuUni.MeScroll
}

/**
 * 自定义钩子函数，用于处理多个 MeScroll 实例的滚动、到达底部和下拉刷新事件
 * @param mescrollItems - MeScroll 实例数组
 * @param onPageScroll - 页面滚动事件的处理函数
 * @param onReachBottom - 到达页面底部事件的处理函数
 * @param onPullDownRefresh - 下拉刷新事件的处理函数
 * @returns 一个包含当前 tab 下标、获取 MeScroll 实例的方法和恢复滚动条位置方法的对象
 */
function useMescrollMore(
  mescrollItems: Array<Ref<MescrollItems>>,
  onPageScroll?: SuUni.onPageScroll,
  onReachBottom?: SuUni.onReachBottom,
  onPullDownRefresh?: SuUni.onPullDownRefresh
) {
  // 当前tab下标
  const tabIndex = ref(0)

  // 因为子组件无onPageScroll和onReachBottom的页面生命周期，需在页面传递进到子组件
  onPageScroll &&
    onPageScroll((e) => {
      handlePageScroll(e)
    })

  onReachBottom &&
    onReachBottom(() => {
      handleReachBottom()
    })

  // 当down的native: true时, 还需传递此方法进到子组件
  onPullDownRefresh &&
    onPullDownRefresh(() => {
      handlePullDownRefresh()
    })

  /**
   * 处理页面滚动事件的函数
   * @param e - 页面滚动事件的参数
   */
  const handlePageScroll = (e: any) => {
    let mescroll = getMescroll(tabIndex.value)
    mescroll && mescroll.onPageScroll(e)
  }

  /**
   * 处理到达页面底部事件的函数
   */
  const handleReachBottom = () => {
    let mescroll = getMescroll(tabIndex.value)
    mescroll && mescroll.onReachBottom()
  }

  /**
   * 处理下拉刷新事件的函数
   */
  const handlePullDownRefresh = () => {
    let mescroll = getMescroll(tabIndex.value)
    mescroll && mescroll.onPullDownRefresh()
  }

  /**
   * 根据下标获取对应子组件的mescroll
   * @param i - 子组件的下标
   * @returns MeScroll 实例，如果不存在则返回 null
   */
  const getMescroll = (i: number) => {
    if (mescrollItems && mescrollItems[i]) {
      return mescrollItems[i].value.getMescroll()
    } else {
      return null
    }
  }

  /**
   * 切换tab,恢复滚动条位置
   */
  const scrollToLastY = () => {
    let mescroll = getMescroll(tabIndex.value)
    if (mescroll) {
      // 恢复上次滚动条的位置
      let y = mescroll.getScrollTop()
      mescroll.scrollTo(y, 0)
      // 再次恢复上次滚动条的位置, 确保元素已渲染
      setTimeout(() => {
        mescroll.scrollTo(y, 0)
      }, 20)
    }
  }

  // 返回一个包含 tabIndex、getMescroll 和 scrollToLastY 方法的对象
  return {
    tabIndex,
    getMescroll,
    scrollToLastY
  }
}

export default useMescrollMore
