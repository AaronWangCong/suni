import type { ExtractPropTypes, InjectionKey, PropType, Ref } from 'vue'
import defProps from '../../libs/config/props'

export const listProps = {
  /**
   * 控制是否出现滚动条，仅nvue有效
   * @default false
   **/
  showScrollbar: {
    type: Boolean,
    default: () => defProps.list.showScrollbar
  },
  /**
   * 距底部多少时触发scrolltolower事件
   * @default 50
   *  */
  lowerThreshold: {
    type: [String, Number],
    default: () => defProps.list.lowerThreshold
  },
  /**
   * 距顶部多少时触发scrolltoupper事件，非nvue有效
   * @default 0
   *
   * */
  upperThreshold: {
    type: [String, Number],
    default: () => defProps.list.upperThreshold
  },
  /**
   * 设置竖向滚动条位置
   * @default 0
   * */
  scrollTop: {
    type: [String, Number],
    default: () => defProps.list.scrollTop
  },
  /**
   * 控制 onscroll 事件触发的频率，仅nvue有效
   * @default 10
   * */
  offsetAccuracy: {
    type: [String, Number],
    default: () => defProps.list.offsetAccuracy
  },
  /**
   * 启用 flexbox 布局。开启后，当前节点声明了display: flex就会成为flex container，并作用于其孩子节点，仅微信小程序有效
   * @default false
   * */
  enableFlex: {
    type: Boolean,
    default: () => defProps.list.enableFlex
  },
  /**
   * 是否按分页模式显示List，默认值false
   * @default false
   * */
  pagingEnabled: {
    type: Boolean,
    default: () => defProps.list.pagingEnabled
  },
  /**
   * 是否允许List滚动
   * @default true
   * */
  scrollable: {
    type: Boolean,
    default: () => defProps.list.scrollable
  },
  /**
   * 值应为某子元素id（id不能以数字开头）
   * */
  scrollIntoView: {
    type: String,
    default: () => defProps.list.scrollIntoView
  },
  /**
   * 在设置滚动条位置时使用动画过渡
   * @default false
   * */
  scrollWithAnimation: {
    type: Boolean,
    default: () => defProps.list.scrollWithAnimation
  },
  /**
   * iOS点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只对微信小程序有效
   * @default false
   * */
  enableBackToTop: {
    type: Boolean,
    default: () => defProps.list.enableBackToTop
  },
  /**
   * 列表的高度
   * @default 0
   * */
  height: {
    type: [String, Number],
    default: () => defProps.list.height
  },
  /**
   * 列表宽度
   * @default false
   *  */
  width: {
    type: [String, Number],
    default: () => defProps.list.width
  },
  /**
   * 列表前后预渲染的屏数，1代表一个屏幕的高度，1.5代表1个半屏幕高度
   * @default 1
   * */
  preLoadScreen: {
    type: [String, Number],
    default: () => defProps.list.preLoadScreen
  },
  /**
   * 开启自定义下拉刷新
   * @default false
   * */
  refresherEnabled: {
    type: Boolean,
    default: () => defProps.list.refresherEnabled
  },
  /**
   * 设置自定义下拉刷新阈值
   * @default 45
   * */
  refresherThreshold: {
    type: Number,
    default: () => defProps.list.refresherThreshold
  },
  /**
   * 设置自定义下拉刷新默认样式，支持设置 black，white，none，none 表示不使用默认样式
   * @default 'black'
   * */
  refresherDefaultStyle: {
    type: String as PropType<UniHelper.ScrollViewRefresherDefaultStyle>,
    default: () => defProps.list.refresherDefaultStyle
  },
  /**
   * 设置自定义下拉刷新区域背景颜色
   * @default '#fff'
   * */
  refresherBackground: {
    type: String,
    default: () => defProps.list.refresherBackground
  },
  /**
   * 设置当前下拉刷新状态，true 表示下拉刷新已经被触发，false 表示下拉刷新未被触发
   * @default false
   * */
  refresherTriggered: {
    type: Boolean,
    default: () => defProps.list.refresherTriggered
  }
}

export type SuListProps = ExtractPropTypes<typeof listProps>

export type SuListProvide = {
  updateOffsetFromChild: (top: number) => void
  innerScrollTop: Ref<number>
  preLoadScreen?: string | number
}

export const LIST_KEY: InjectionKey<SuListProvide> = Symbol('su-list')
