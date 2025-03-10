import defProps from '../../libs/config/props'
import type { ExtractPropTypes } from 'vue'

export const gridItemProps = {
  /**
   * 宫格的name
   * @default null
   * */
  name: {
    type: [String, Number, null],
    default: () => defProps.gridItem.name
  },
  /**
   * 背景颜色
   * @default 'transparent'
   * */
  bgColor: {
    type: String,
    default: () => defProps.gridItem.bgColor
  }
}

export type SuGridItemProps = ExtractPropTypes<typeof gridItemProps>