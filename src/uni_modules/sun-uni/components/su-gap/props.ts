import type { ExtractPropTypes } from 'vue'
import defProps from '../../libs/config/props'

export const gapProps = {
  /**
   * 背景颜色（默认transparent） 
   * @default transparent
   */
  bgColor: {
    type: String,
    default: () => defProps.gap.bgColor
  },
  /**
   * 分割槽高度，单位px（默认30）
   * @default 20
   */
  height: {
    type: [String, Number],
    default: () => defProps.gap.height
  },
  /**
   * 与上一个组件的距离 
   * @default 0
   */ 
  marginTop: {
    type: [String, Number],
    default: () => defProps.gap.marginTop
  },
  /**
   * 与下一个组件的距离
   * @default 0
   */ 
  marginBottom: {
    type: [String, Number],
    default: () => defProps.gap.marginBottom
  }
}

export type SuGapProps = ExtractPropTypes<typeof gapProps>
