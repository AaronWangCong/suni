import defProps from '../../libs/config/props'
import type { ExtractPropTypes, PropType } from 'vue'

export const badgeProps = {
  /** 
   * 是否显示圆点
   * @default false
   */
  isDot: {
    type: Boolean,
    default: () => defProps.badge.isDot
  },
  /** 显示的内容 */
  value: {
    type: [Number, String],
    default: () => defProps.badge.value
  },
  /** 显示的内容 */
  modelValue: {
    type: [Number, String],
    default: () => defProps.badge.modelValue
  },
  /** 
   * 是否显示, 默认显示
   * @default true
   */
  show: {
    type: Boolean,
    default: () => defProps.badge.show
  },
  /** 
   * 最大值，超过最大值会显示 '{max}+'
   * @default 999
   */
  max: {
    type: [Number, String],
    default: () => defProps.badge.max
  },
  /** 
   * 主题类型，error|warning|success|primary
   * @default error
   */
  type: {
    type: String as PropType<'error' | 'warning' | 'success' | 'primary'>,
    default: () => defProps.badge.type
  },
  /** 
   * 当数值为 0 时，是否展示 Badge
   * @default false
   */
  showZero: {
    type: Boolean,
    default: () => defProps.badge.showZero
  },
  /** 
   * 背景颜色，优先级比type高，如设置，type参数会失效
   * @default null
   */
  bgColor: {
    type: String,
    default: () => defProps.badge.bgColor
  },
  /** 
   * 字体颜色
   * @default null
   */
  color: {
    type: String,
    default: () => defProps.badge.color
  },
  /** 
   * 徽标形状，circle-四角均为圆角，horn-左下角为直角
   * @default circle
   */
  shape: {
    type: String as PropType<'circle' | 'horn'>,
    default: () => defProps.badge.shape
  },
  /**
   * 设置数字的显示方式，overflow|ellipsis|limit
   * overflow会根据max字段判断，超出显示`${max}+`
   * ellipsis会根据max判断，超出显示`${max}...`
   * limit会依据1000作为判断条件，超出1000，显示`${value/1000}K`，比如2.2k、3.34w，最多保留2位小数
   * @default overflow
   */
  numberType: {
    type: String as PropType<'overflow' | 'ellipsis' | 'limit'>,
    default: () => defProps.badge.numberType
  },
  /** 
   * 设置badge的位置偏移，格式为 [x, y]，也即设置的为top和right的值，absolute为true时有效
   * @default []
   */
  offset: {
    type: Array as PropType<Array<number>>,
    default: () => defProps.badge.offset
  },
  /** 
   * 是否反转背景和字体颜色
   * @default false
   */
  inverted: {
    type: Boolean,
    default: () => defProps.badge.inverted
  },
  /** 
   * 是否绝对定位
   * @default false
   */
  absolute: {
    type: Boolean,
    default: () => defProps.badge.absolute
  }
}


export type SuBadgeProps = ExtractPropTypes<typeof badgeProps>