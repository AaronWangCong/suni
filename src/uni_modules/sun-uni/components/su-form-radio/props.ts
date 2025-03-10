import type { ExtractPropTypes, PropType } from "vue";
import type { SuUni } from "../../types/uni";
import defProps from '../../libs/config/props'
import type { SuRadioGroupProps } from "../su-radio-group/props";
import type { SuRadioProps } from "../su-radio/props";

export const formRadioProps = {
  /** 配置项 */
  options: {
    type: Array as PropType<Array<SuUni.Options>>,
    default: () => defProps.formRadio.options
  },
  /** modelValue */
  modelValue: {
    type: [String, Number, Boolean],
    default: () => defProps.formRadio.modelValue
  },
  /** su-check-group组件的props */
  radioGroupProps: {
    type: Object as PropType<SuRadioGroupProps>,
    default: () => defProps.formRadio.radioGroupProps
  },
  /** su-check组件的props */
  radioProps: {
    type: Object as PropType<SuRadioProps>,
    default: () => defProps.formRadio.radioProps
  },
  /** 选中前置钩子 */
  beforeChange: {
    type: Function,
    default: null
  }
}


export type SuFormRadioProps = ExtractPropTypes<typeof formRadioProps>