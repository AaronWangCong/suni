import defProps from '../../libs/config/props'
import type { ComponentInternalInstance, ExtractPropTypes, InjectionKey, PropType } from 'vue'
import type { SuValidator } from '../../libs/util/validator/type'
import type { SuUni } from '../../types/uni'

/** form props */
export const formProps = {
  /** 当前form的需要验证字段的集合 */
  model: {
    type: Object,
    default: () => defProps.form.model
  },
  /** 验证规则 */
  rules: {
    type: [Object, Array] as PropType<SuValidator.Rules>,
    default: () => defProps.form.rules
  },
  /**
   * 有错误时的提示方式，message-提示信息，toast-进行toast提示
   * border-bottom-下边框呈现红色，none-无提示
   * @default message
   */
  errorType: {
    type: String,
    default: () => defProps.form.errorType
  },
  /**
   * 是否显示表单域的下划线边框
   * @default true
   */
  borderBottom: {
    type: Boolean,
    default: () => defProps.form.borderBottom
  },
  /**
   * label的位置，left-左边，top-上边
   * @default 'left'
   */
  labelPosition: {
    type: String as PropType<'left' | 'top'>,
    default: () => defProps.form.labelPosition
  },
  /**
   * label的宽度，单位px
   * @default 45
   */
  labelWidth: {
    type: [String, Number],
    default: () => defProps.form.labelWidth
  },
  /**
   * label字体的对齐方式
   * @default 'left'
   */
  labelAlign: {
    type: String as PropType<SuUni.Align>,
    default: () => defProps.form.labelAlign
  },
  /** label的样式，对象形式 */
  labelStyle: {
    type: Object,
    default: () => defProps.form.labelStyle
  }
}

export type SuFormProps = ExtractPropTypes<typeof formProps>

export type SuFormProvide = {
  props: {
    model: SuFormProps['model']
    rules?: SuFormProps['rules']
    labelPosition?: SuFormProps['labelPosition']
    labelAlign?: SuFormProps['labelAlign']
    labelStyle?: SuFormProps['labelStyle']
    labelWidth?: SuFormProps['labelWidth']
    errorType?: SuFormProps['errorType']
  }
  /** 原数据 */
  originalModel: Record<string, any>
}

export type SuFormEventProvide = {
  form?: ComponentInternalInstance
  setRules: (rules: SuValidator.Rules) => void
  validate: () => Promise<SuValidator.ValidateResult> | boolean
  validateField: (fields: string | string[], callback: SuValidator.Callback, event?: SuValidator.TriggerType) => void
  clearValidate: (fields?: string | string[]) => void
  resetFields: () => void
}

export const FORM_KEY: InjectionKey<SuFormProvide> = Symbol('su-form')
