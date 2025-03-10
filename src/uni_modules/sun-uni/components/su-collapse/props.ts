import defProps from '../../libs/config/props'
import type { ComponentInternalInstance, ExtractPropTypes, InjectionKey } from 'vue'
export const collapseProps = {
  /**
   * 当前展开面板的name，非手风琴模式：[<string | number>]，手风琴模式：string | number
   * */
  value: {
    type: [String, Number, Array, null],
    default: () => defProps.collapse.value
  },
  /**
   * 是否手风琴模式
   * @default false
   * */
  accordion: {
    type: Boolean,
    default: () => defProps.collapse.accordion
  },
  /**
   * 是否显示外边框
   * @default true
   * */
  border: {
    type: Boolean,
    default: () => defProps.collapse.border
  }
}

export type SuCollapseProps = ExtractPropTypes<typeof collapseProps>

export type SuCollapseProvide = SuCollapseProps & {
  onChange: (instance: ComponentInternalInstance, expanded: boolean) => void
}

export const COLLAPSE_KEY: InjectionKey<SuCollapseProvide> = Symbol('su-collapse')
