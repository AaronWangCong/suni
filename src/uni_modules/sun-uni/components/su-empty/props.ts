import defProps from '../../libs/config/props'
import type { ExtractPropTypes, PropType } from 'vue'

export const emptyProps = {
  /**
   * 内置图标名称，或图片路径，建议绝对路径
   * */
  icon: {
    type: String,
    default: () => defProps.empty.icon
  },
  /**
   * 提示文字
   * */
  text: {
    type: String,
    default: () => defProps.empty.text
  },
  /**
   * 文字颜色
   * @default '#c0c4cc'
   * */
  textColor: {
    type: String,
    default: () => defProps.empty.textColor
  },
  /**
   * 文字大小
   * @default 14
   * */
  textSize: {
    type: [String, Number],
    default: () => defProps.empty.textSize
  },
  /**
   * 图标的颜色
   * @default '#c0c4cc'
   * */
  iconColor: {
    type: String,
    default: () => defProps.empty.iconColor
  },
  /**
   * 图标的大小
   * @default 90
   * */
  iconSize: {
    type: [String, Number],
    default: () => defProps.empty.iconSize
  },
  /**
   * 选择预置的图标类型
   * @default 'data'
   * */
  mode: {
    type: String as PropType<'car' | 'page' | 'search' | 'address' | 'wifi' | 'order' | 'coupon' | 'favor' | 'permission' | 'history' | 'news' | 'message' | 'list' | 'data' | 'comment'>,
    default: () => defProps.empty.mode
  },
  /**
   * 图标宽度，单位px
   * @default 160
   * */
  width: {
    type: [String, Number],
    default: () => defProps.empty.width
  },
  /**
   * 图标高度，单位px
   * @default 160
   * */
  height: {
    type: [String, Number],
    default: () => defProps.empty.height
  },
  /**
   * 是否显示组件
   * @default true
   * */
  show: {
    type: Boolean,
    default: () => defProps.empty.show
  },
  /**
   * 组件距离上一个元素之间的距离，默认px单位
   * @default 0
   * */
  marginTop: {
    type: [String, Number],
    default: () => defProps.empty.marginTop
  }
}

export type SuDropdownProps = ExtractPropTypes<typeof emptyProps>
