import defProps from '../../libs/config/props'
import type { ExtractPropTypes, PropType } from 'vue'
import type { SuUni } from '../../types/uni'

export const tagProps = {
  /** 
   * 标签类型info、primary、success、warning、error
   * @default 'primary'
   */
  type: {
    type: String as PropType<SuUni.Type>,
    default: () => defProps.tag.type
  },
  /** 
   * 不可用
   * @default false
   */
  disabled: {
    type: [Boolean, String],
    default: () => defProps.tag.disabled
  },
  /** 
   * 标签的大小，large，medium，mini
   * @default 'medium'
   */
  size: {
    type: String as PropType<SuUni.Size>,
    default: () => defProps.tag.size
  },
  /** 
   * tag的形状，circle（两边半圆形）, square（方形，带圆角）
   * @default 'square'
   */
  shape: {
    type: String as PropType<SuUni.Shape>,
    default: () => defProps.tag.shape
  },
  /** 标签文字 */
  text: {
    type: [String, Number],
    default: () => defProps.tag.text
  },
  /** 背景颜色，默认为空字符串，即不处理 */
  bgColor: {
    type: String,
    default: () => defProps.tag.bgColor
  },
  /** 标签字体颜色，默认为空字符串，即不处理 */
  color: {
    type: String,
    default: () => defProps.tag.color
  },
  /** 标签的边框颜色 */
  borderColor: {
    type: String,
    default: () => defProps.tag.borderColor
  },
  /** 
   * 关闭按钮图标的颜色
   * @default '#C6C7CB'
   */
  closeColor: {
    type: String,
    default: () => defProps.tag.closeColor
  },
  /** 点击时返回的索引值，用于区分例遍的数组哪个元素被点击了 */
  name: {
    type: [String, Number],
    default: () => defProps.tag.name
  },
  // // 模式选择，dark|light|plain
  // mode: {
  // 	type: String,
  // 	default: 'light'
  // },
  /**
   * 镂空时是否填充背景色
   * @default false
   */
  plainFill: {
    type: Boolean,
    default: () => defProps.tag.plainFill
  },
  /** 
   * 是否镂空
   * @default false
   */
  plain: {
    type: Boolean,
    default: () => defProps.tag.plain
  },
  /** 
   * 是否可关闭
   * @default false
   */
  closable: {
    type: Boolean,
    default: () => defProps.tag.closable
  },
  /** 
   * 是否显示
   * @default true
   */
  show: {
    type: Boolean,
    default: () => defProps.tag.show
  },
  /** 
   * 内置图标，或绝对路径的图片
   */
  icon: {
    type: String,
    default: () => defProps.tag.icon
  },
  /** icon 的颜色 */
  iconColor: {
    type: String,
    default: () => defProps.tag.iconColor
  }
}


export type SuTagProps = ExtractPropTypes<typeof tagProps>