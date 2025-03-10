import defProps from '../../libs/config/props'
import type { ExtractPropTypes, PropType } from 'vue'
import type { SuUni } from '../../types/uni'
import type { SuRowJustifyType } from '../su-row/props'

export const colProps = {
  /**
   * 占父容器宽度的多少等分，总分为12份
   * @default 12
   * */
  span: {
    type: [String, Number],
    default: () => defProps.col.span
  },
  /**
   * 指定栅格左侧的间隔数(总12栏)
   * @default 0
   * */
  offset: {
    type: [String, Number],
    default: () => defProps.col.offset
  },
  /**
   * 水平排列方式，可选值为`start`(或`flex-start`)、`end`(或`flex-end`)、`center`、`around`(或`space-around`)、`between`(或`space-between`)
   * @default 'start'
   * */
  justify: {
    type: String as PropType<SuRowJustifyType>,
    default: () => defProps.col.justify
  },
  /**
   * 垂直对齐方式，可选值为top、center、bottom、stretch
   * @default 'stretch'
   * */
  align: {
    type: String as PropType<'top' | 'center' | 'bottom' | 'stretch'>,
    default: () => defProps.col.align
  },
  /**
   * 文字对齐方式
   * @default 'left'
   * */
  textAlign: {
    type: String as PropType<SuUni.Align>,
    default: () => defProps.col.textAlign
  }
}

export type SuColProps = ExtractPropTypes<typeof colProps>
