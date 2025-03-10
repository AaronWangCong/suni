import type { SuUni } from '../../../types/uni'

/**
 * 自定义钩子函数，用于处理页面滚动、到达底部和下拉刷新事件
 * @param onPageScroll - 页面滚动事件的处理函数
 * @param onReachBottom - 到达页面底部事件的处理函数
 * @param onPullDownRefresh - 下拉刷新事件的处理函数
 * @returns 一个包含 mescrollInit、getMescroll、downCallback 和 upCallback 方法的对象
 */
export default function useMescroll(
  onPageScroll?: SuUni.onPageScroll,
  onReachBottom?: SuUni.onReachBottom,
  onPullDownRefresh?: SuUni.onPullDownRefresh
) {
  // 声明一个名为 mescroll 的变量，用于存储 MeScroll 实例，初始值为 null
  let mescroll: SuUni.MeScroll | null = null

  /**
   * 初始化 MeScroll 实例的函数
   * @param e - MeScroll 实例
   */
  const mescrollInit = (e: SuUni.MeScroll) => {
    // 将传入的 MeScroll 实例赋值给 mescroll 变量
    mescroll = e
  }

  /**
   * 获取 MeScroll 实例的函数
   * @returns MeScroll 实例，如果不存在则返回 null
   */
  const getMescroll = () => mescroll

  /**
   * 处理下拉刷新的回调函数
   * 如果 MeScroll 实例的 optUp.use 属性为 true，则重置上拉加载
   * 否则，延迟 500ms 后结束下拉刷新
   */
  const downCallback = () => {
    if (mescroll!.optUp.use) {
      mescroll!.resetUpScroll()
    } else {
      setTimeout(() => {
        mescroll!.endSuccess()
      }, 500)
    }
  }

  /**
   * 处理上拉加载的回调函数
   * 延迟 500ms 后结束上拉加载，并标记为错误状态
   */
  const upCallback = () => {
    // mixin 默认延时 500 自动结束加载
    setTimeout(() => {
      mescroll!.endErr()
    }, 500)
  }

  // 注册系统自带的下拉刷新 (配置 down.native 为 true 时生效, 还需在 pages 配置 enablePullDownRefresh:true;详请参考 mescroll-native 的案例)
  onPullDownRefresh &&
    onPullDownRefresh(() => {
      mescroll && mescroll.onPullDownRefresh()
    })

  // 注册列表滚动事件,用于判定在顶部可下拉刷新,在指定位置可显示隐藏回到顶部按钮 (此方法为页面生命周期,无法在子组件中触发, 仅在 mescroll-body 生效)
  onPageScroll &&
    onPageScroll((e) => {
      mescroll && mescroll.onPageScroll(e)
    })


  // 注册滚动到底部的事件,用于上拉加载 (此方法为页面生命周期,无法在子组件中触发, 仅在 mescroll-body 生效)
  onReachBottom &&
    onReachBottom(() => {
      mescroll && mescroll.onReachBottom()
    })

  // 返回一个包含 mescrollInit、getMescroll、downCallback 和 upCallback 方法的对象
  return {
    mescrollInit,
    getMescroll,
    downCallback,
    upCallback
  }
}
