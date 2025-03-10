import type { ExtractPropTypes, PropType } from "vue";
import type { SuUni } from "../../types/uni";
import defProps from '../../libs/config/props'
import type { SuCheckboxGroupProps } from "../su-checkbox-group/props";
import type { SuCheckboxProps } from "../su-checkbox/props";

export const formCheckboxProps = {
  /** 配置项 */
  options: {
    type: Array as PropType<Array<SuUni.Options>>,
    default: () => defProps.formCheckbox.options
  },
  /** modelValue */
  modelValue: {
    type: Array,
    default: () => defProps.formCheckbox.modelValue
  },
  /** su-check-group组件的props */
  checkboxGroupProps: {
    type: Object as PropType<SuCheckboxGroupProps>,
    default: () => defProps.formCheckbox.checkboxGroupProps
  },
  /** su-check组件的props */
  checkboxProps: {
    type: Object as PropType<SuCheckboxProps>,
    default: () => defProps.formCheckbox.checkboxProps
  },
  /** 选中前置钩子 */
  beforeChange: {
    type: Function,
    default: null
  }
}


export type SuFormCheckboxProps = ExtractPropTypes<typeof formCheckboxProps>