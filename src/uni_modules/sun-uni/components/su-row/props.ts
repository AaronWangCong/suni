import defProps from '../../libs/config/props'
import type { ExtractPropTypes, InjectionKey, PropType } from 'vue'

export const rowProps = {
  /**
   * 给col添加间距，左右边距各占一半
   * @default 0
   * */
  gutter: {
    type: [String, Number],
    default: () => defProps.row.gutter
  },
  /**
   * 水平排列方式，可选值为`start`(或`flex-start`)、`end`(或`flex-end`)、`center`、`around`(或`space-around`)、`between`(或`space-between`)
   * @default 'start'
   * */
  justify: {
    type: String as PropType<SuRowJustifyType>,
    default: () => defProps.row.justify
  },
  /**
   * 垂直对齐方式，可选值为top、center、bottom
   * @default 'center'
   * */
  align: {
    type: String,
    default: () => defProps.row.align
  }
}

export type SuRowJustifyType = 'start' | 'flex-start' | 'end' | 'flex-end' | 'center' | 'around' | 'space-around' | 'between' | 'space-between'

export type SuRowProps = ExtractPropTypes<typeof rowProps>

export type SuRowProvide = {
  gutter: number
  getComponentWidth: () => Promise<number>
}

export const ROW_KEY: InjectionKey<SuRowProvide> = Symbol('su-row')
