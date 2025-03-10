import defProps from '../../libs/config/props'
import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import type { SuUni } from '../../types/uni'

export const tabsProps = {
  /** 
   * 滑块的移动过渡时间，单位ms
   * @default 300
   */
  duration: {
    type: Number,
    default: () => defProps.tabs.duration
  },
  // tabs标签数组
  list: {
    type: Array as PropType<SuUni.Recordable[]>,
    default: () => defProps.tabs.list
  },
  /**
   * 滑块颜色
   * @default '#3c9cff'
   */
  lineColor: {
    type: String,
    default: () => defProps.tabs.lineColor
  },
  /**
   * 菜单选择中时的样式 
   * @default { color: '#303133' }
   */
  activeStyle: {
    type: [String, Object] as PropType<CSSProperties | string>,
    default: () => defProps.tabs.activeStyle
  },
  /** 
   * 菜单非选中时的样式
   * @default { color: '#606266' }
   */
  inactiveStyle: {
    type: [String, Object] as PropType<CSSProperties | string>,
    default: () => defProps.tabs.inactiveStyle
  },
  /** 
   * 滑块长度 
   * @default 20
   */
  lineWidth: {
    type: [String, Number],
    default: () => defProps.tabs.lineWidth
  },
  /** 
   * 滑块高度
   * @default 3
   */
  lineHeight: {
    type: [String, Number],
    default: () => defProps.tabs.lineHeight
  },
  /** 
   * 滑块背景显示大小，当滑块背景设置为图片时使用
   * @default  'cover'
   */
  lineBgSize: {
    type: String,
    default: () => defProps.tabs.lineBgSize
  },
  /** 
   * 菜单item的样式
   * @default  { height: '44px' }
   */
  itemStyle: {
    type: [String, Object] as PropType<CSSProperties | string>,
    default: () => defProps.tabs.itemStyle
  },
  /** 
   * 菜单是否可滚动
   * @default true  
   */
  scrollable: {
    type: Boolean,
    default: () => defProps.tabs.scrollable
  },
  /**
   * 当前选中标签的索引 
   * @default 0
   */
  current: {
    type: [Number, String],
    default: () => defProps.tabs.current
  },
  /**
   * 默认读取的键名
   * @default 'name'
   */
  keyName: {
    type: String,
    default: () => defProps.tabs.keyName
  }
}

export type SuTabsProps = ExtractPropTypes<typeof tabsProps>