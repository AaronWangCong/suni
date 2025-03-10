import type { ExtractPropTypes } from 'vue'
import defProps from '../../libs/config/props'

export const listItemProps = {
  /**
   * 用于滚动到指定item
   * @default ''
   * */
  anchor: {
    type: [String, Number],
    default: () => defProps.listItem.anchor
  }
}


export type SuListItemProps = ExtractPropTypes<typeof listItemProps>