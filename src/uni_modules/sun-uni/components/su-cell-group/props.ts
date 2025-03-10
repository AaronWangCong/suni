import defProps from '../../libs/config/props'
import type { ExtractPropTypes } from 'vue'

export const cellGroupProps = {
  /** 分组标题 */
  title: {
    type: String,
    default: () => defProps.cellGroup.title
  },
  /** 
   * 是否显示外边框
   * @default true
   */
  border: {
    type: Boolean,
    default: () => defProps.cellGroup.border
  }
}

export type SuCellGroupProps = ExtractPropTypes<typeof cellGroupProps>