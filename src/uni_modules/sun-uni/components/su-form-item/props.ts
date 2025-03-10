import defProps from '../../libs/config/props'
import type { ExtractPropTypes, PropType } from 'vue'
import type { SuValidator } from '../../libs/util/validator/type'

export const formItemProps = {
  /** input的label提示语 */
  label: {
    type: String,
    default: () => defProps.formItem.label
  },
  /** 绑定的值 */
  prop: {
    type: String,
    default: () => defProps.formItem.prop
  },
  /** 绑定的规则 */
  rules: {
    type: Array as PropType<SuValidator.RuleItem[]>,
    default: () => defProps.formItem.rules
  },
  /** 是否显示表单域的下划线边框 */
  borderBottom: {
    type: Boolean,
    default: () => defProps.formItem.borderBottom
  },
  /** label的位置，left-左边，top-上边 */
  labelPosition: {
    type: String,
    default: () => defProps.formItem.labelPosition
  },
  /** label的宽度，单位px */
  labelWidth: {
    type: [String, Number],
    default: () => defProps.formItem.labelWidth
  },
  /** 右侧图标 */
  rightIcon: {
    type: String,
    default: () => defProps.formItem.rightIcon
  },
  /** 左侧图标 */
  leftIcon: {
    type: String,
    default: () => defProps.formItem.leftIcon
  },
  /**
   * 是否显示左边的必填星号，只作显示用，具体校验必填的逻辑，请在rules中配置
   * @default false
   */
  required: {
    type: Boolean,
    default: () => defProps.formItem.required
  },
  /** 左边 icon 样式 */
  leftIconStyle: {
    type: [String, Object],
    default: () => defProps.formItem.leftIconStyle
  },
  /** 是否显示label后面冒号 */
  colon: {
    type: Boolean,
    default: () => defProps.formItem.colon
  },
  /**
   * 隐藏表单项label
   * @default false
   */
  hideLabel: {
    type: Boolean,
    default: () => defProps.formItem.hideLabel
  },
  /**
   * 是否隐藏必填标记
   * @default false
   */
  hideRequiredMark: {
    type: Boolean,
    default: () => defProps.formItem.hideRequiredMark
  }
}


export type SuFormItemProps = ExtractPropTypes<typeof formItemProps>