import type { Component, HtmlHTMLAttributes, Ref } from 'vue'
import type { SuFormItemProps } from '../../../su-form-item/props'
import type { SuValidator } from '../../../../libs/util/validator/type'
import type { SuUni } from '../../../../types/uni'
import type { SuButtonProps } from '../../../su-button/props'
import type { SuUseFormApi } from '../form-api'

import SuSelect from '../../../su-select/su-select.vue'
import SuInput from '../../../su-input/su-input.vue'
import SuReadonlyWrapper from '../../../su-readonly-wrapper/su-readonly-wrapper.vue'
import type { SuColProps } from '../../../su-col/props'
import type { SuRowProps } from '../../../su-row/props'

/**
 * 表单组件类型
 */
export type SuUseFormComponentType = 'SuFormInput' | 'SuFormSelect' | 'SuApiList' | 'SuFormRadio' | 'SuFormCheckbox'

/**
 * 表单操作的接口定义
 * @template T - 表单数据的类型，默认为 SuUni.Recordable
 */
export type SuUseFormActions<T = SuUni.Recordable> = {
  /**
   * 提交表单
   * @param {unknown} [e] - 事件对象
   * @returns {Promise<void>} - 提交完成后的 Promise
   */
  submitForm: (e?: unknown) => Promise<void>
  /**
   * 重置表单
   * @param {Partial<SuUni.Recordable>} [state] - 重置的状态
   * @param {Partial<SuUni.Recordable>} [opt] - 重置的选项
   * @returns {Promise<void>} - 重置完成后的 Promise
   */
  resetForm: (state?: Partial<SuUni.Recordable>, opt?: Partial<SuUni.Recordable>) => Promise<void>
  /**
   * 设置表单字段的值
   * @param {string} field - 字段名
   * @param {any} [value] - 字段值
   * @returns {void}
   */
  setFieldValue: (field: string, value?: any) => void
  /**
   * 设置表单字段的值
   * @param {Recordable} values - 要设置的值
   * @param {boolean} [isClearValidate=false] - 是否清除验证
   * @returns {Promise<void>} 当字段值设置完成时解决的 Promise
   */
  setFieldsValue: (values: T, isClearValidate?: boolean) => Promise<void>
  /**
   * 重置表单字段
   * @param {string | string[]} [nameList] - 要重置的字段列表
   * @returns {Promise<void>} 当字段重置完成时解决的 Promise
   */
  resetFields: (nameList?: string | string[]) => Promise<void>
  /**
   * 获取表单字段的值
   * @returns {T} 获取到的表单字段值
   */
  getFieldsValue: () => T
  /**
   * 清除指定字段的验证
   * @param {string | string[]} [name] - 要清除验证的字段
   * @returns {Promise<void>} 当验证清除完成时解决的 Promise
   */
  clearValidate: (name?: string | string[]) => Promise<void>
  /**
   * 更新表单模式
   * @param {Partial<FormSchema>[]} data - 要更新的表单模式数据
   * @returns {Promise<void>} 当表单模式更新完成时解决的 Promise
   */
  updateSchema: (data: Partial<SuUseFormSchema>[]) => Promise<void>
  /**
   * 重置表单模式
   * @param {Partial<FormSchema> | Partial<FormSchema>[]} data - 要重置的表单模式数据
   * @returns {Promise<void>} 当表单模式重置完成时解决的 Promise
   */
  resetSchema: (data: SuUseFormSchema | SuUseFormSchema[]) => Promise<void>
  /**
   * 根据字段名移除表单模式
   * @param {string | string[]} field - 要移除的字段名
   * @returns {Promise<void>} 当表单模式移除完成时解决的 Promise
   */
  removeSchemaByField: (field: string | string[]) => Promise<void>
  /**
   * 根据字段名追加表单模式
   * @param {SuUseFormSchema} schema - 要追加的表单模式
   * @param {string | undefined} prefixField - 前缀字段
   * @param {boolean | undefined} first - 是否追加到第一个位置
   * @returns {Promise<void>} 当表单模式追加完成时解决的 Promise
   */
  appendSchemaByField: (schema: SuUseFormSchema, prefixField: string | undefined, first?: boolean | undefined) => Promise<void>
  /**
   * 验证指定字段
   * @param {SuUni.Arrayable<string>} [nameList] - 要验证的字段列表
   * @returns {Promise<any>} 当字段验证完成时解决的 Promise
   */
  validateField: (nameList?: SuUni.Arrayable<string>) => Promise<any>
  /**
   * 验证整个表单
   * @param {Arrayable<string>} [nameList] - 要验证的字段列表
   * @returns {Promise<any>} 当表单验证完成时解决的 Promise
   */
  validate: (nameList?: SuUni.Arrayable<string>) => Promise<any>
  /**
   * 获取表单模式
   * @returns {FormSchema[]} 获取到的表单模式
   */
  getFormSchema: () => SuUseFormSchema[]
}

/**
 * 表单布局类型
 */
export type SuUseFormLayout = 'horizontal' | 'vertical'

/** 组件的props集合 */
export type MaybeComponentProps = InstanceType<typeof SuInput> | InstanceType<typeof SuReadonlyWrapper> | SuUni.Recordable

/**
 * 可能的组件属性
 */
export type SuUseFormComponentProps = Partial<MaybeComponentProps> & {
  options?: any
  placeholder?: string
  title?: string
}

export type MaybeComponentPopupProps = InstanceType<typeof SuSelect>

/**
 * 可能的弹窗组件属性
 */
export type SuUseFormComponentPopupProps = Partial<MaybeComponentPopupProps> & {
  /**
   * 确认事件处理函数
   * */
  handleConfirmData?: (data: SuUni.Recordable) => {
    text: string
    value: any
    defaultValue: number
    [key: string]: any
  }
}

/**
 * 自定义渲染类型
 */
export type CustomRenderType = string

/**
 * 表单项依赖条件与属性
 * @template T - 返回值类型，默认为 boolean 或 PromiseLike<boolean>
 */
type FormItemDependenciesConditionWithProps = (
  value: Partial<Record<string, any>>,
  actions?: SuUseFormContext
) => SuUseFormComponentProps | PromiseLike<SuUseFormComponentProps>

/**
 * 表单项依赖条件
 * @template T - 返回值类型，默认为 boolean 或 PromiseLike<boolean>
 */
type FormItemDependenciesCondition<T = boolean | PromiseLike<boolean>> = (value: Partial<Record<string, any>>, actions?: SuUseFormContext) => T

/**
 * 表单模式规则类型
 */
export type SuUseFormSchemaRuleType = SuValidator.Rule

/**
 * 表单项依赖条件与规则
 */
type FormItemDependenciesConditionWithRules = (
  value: Partial<Record<string, any>>,
  actions?: SuUseFormContext
) => SuUseFormSchemaRuleType | PromiseLike<SuUseFormSchemaRuleType>

/**
 * 表单提交处理函数类型
 */
export type SuUseFormHandleSubmitFn = (values: Record<string, any>) => Promise<void> | void

/**
 * 表单重置处理函数类型
 */
export type SuUseFormHandleResetFn = (values: Record<string, any>) => Promise<void> | void

/**
 * 表单字段映射时间类型
 */
export type SuUseFormFieldMappingTime = [string, [string, string], ([string, string] | SuUni.Nullable<string>)?][]

/**
 * 表单操作按钮选项接口
 */
export interface SuUseFormActionButtonOptions extends Partial<SuButtonProps> {
  [key: string]: any
  content?: SuUni.MaybeComputedRef<string>
  show?: boolean
}

export type SuUseFormItemDependencies = {
  /**
   * 组件参数
   * @returns 组件参数
   */
  componentProps?: FormItemDependenciesConditionWithProps
  /**
   * 是否禁用
   * @returns 是否禁用
   */
  disabled?: boolean | FormItemDependenciesCondition
  /**
   * 是否渲染（删除dom）
   * @returns 是否渲染
   */
  ifShow?: boolean | FormItemDependenciesCondition
  /**
   * 是否只读
   * @returns 是否只读
   */
  readonly?: boolean | FormItemDependenciesCondition
  /**
   * 是否必填
   * @returns 是否必填
   */
  required?: boolean | FormItemDependenciesCondition
  /**
   * 字段规则
   */
  rules?: FormItemDependenciesConditionWithRules | SuUseFormSchemaRuleType
  /**
   * 是否隐藏(Css)
   * @returns 是否隐藏
   */
  show?: boolean | FormItemDependenciesCondition
  /**
   * 任意触发都会执行
   */
  trigger?: FormItemDependenciesCondition<void>
  /**
   * 触发字段
   */
  triggerField?: SuValidator.TriggerType | SuValidator.TriggerType[]
}

/**
 * 组件属性类型定义
 * @description 定义了组件属性的类型，可以是一个函数，也可以是一个对象
 * @param {Partial<Record<string, any>>} value - 表单值
 * @returns {SuUseFormComponentProps} - 返回的组件属性
 */
export type SuComponentProps = ((value: Partial<Record<string, any>>) => SuUseFormComponentProps) | SuUseFormComponentProps

/**
 * 表单上下文接口定义
 * @description 定义了表单上下文的接口，包含表单操作和表单值
 * @template T - 表单值的类型，默认为 SuUni.Recordable
 * @extends {SuUseFormActions<T>} - 继承自 SuUseFormActions 接口
 * @property {T} values - 表单值
 */
export interface SuUseFormContext<T extends SuUni.Recordable = SuUni.Recordable> extends SuUseFormActions<T> {
  values: T
}

/**
 * 带有插槽的表单模式接口定义
 * @description 定义了带有插槽的表单模式接口，继承自 SuUseBaseFormSchema 和 SuUseFormCommonConfig
 * @extends {SuUseBaseFormSchema} - 继承自 SuUseBaseFormSchema 接口
 * @extends {SuUseFormCommonConfig} - 继承自 SuUseFormCommonConfig 接口
 */
export interface SlotSuUseFormSchema extends SuUseBaseFormSchema, SuUseFormCommonConfig {
}

export type SuUseBaseFormSchema<T extends SuUseFormComponentType = SuUseFormComponentType> = {
  /** 组件 */
  component: T
  /** 组件参数 */
  componentProps?: SuComponentProps
  /** 默认值 */
  defaultValue?: any
  /** 表单项 */
  label?: string
  /** 字段名 */
  field: string
  /**
   * 显示文本字段，一般使用于多组件，回显使用
   * 默认值为field值加Text
   */
  textField?: string

  /** 依赖 */
  dependencies?: SuUseFormItemDependencies
  /** 后缀 */
  suffix?: CustomRenderType
  /** 列属性 */
  colProps?: Partial<SuColProps>
  /** 组件change的名称 */
  changeEvent?: string
  /** 弹窗组件参数 */
  popupProps?: SuUseFormComponentPopupProps
}

/**
 * 表单模式类型定义
 * @description 定义了表单模式的类型，继承自 SlotSuUseFormSchema、SuUseFormCommonConfig 和 SuUseBaseFormSchema
 * @template T - 表单组件类型，默认为 SuUseFormComponentType
 * @extends {Partial<SlotSuUseFormSchema>} - 继承自 Partial<SlotSuUseFormSchema>
 * @extends {Partial<SuUseFormCommonConfig>} - 继承自 Partial<SuUseFormCommonConfig>
 * @extends {SuUseBaseFormSchema<T>} - 继承自 SuUseBaseFormSchema<T>
 */
export type SuUseFormSchema<T extends SuUseFormComponentType = SuUseFormComponentType> = Partial<SlotSuUseFormSchema> &
  Partial<SuUseFormCommonConfig> &
  SuUseBaseFormSchema<T>

export type SuUseFormCommonConfig = {
  /**
   * 在Label后显示一个冒号
   */
  colon?: boolean
  /**
   * 所有表单项的props
   */
  componentProps?: SuComponentProps

  /**
   * 所有表单项的控件Props
   * @default {}
   */
  formItemProps?: SuFormItemProps
  /**
   * 所有表单项的class
   * @default ""
   */
  formItemClass?: string
  /**
   * 隐藏所有表单项label
   * @default false
   */
  hideLabel?: boolean
  /**
   * 是否隐藏必填标记
   * @default false
   */
  hideRequiredMark?: boolean
  /**
   * 所有表单项的label样式class
   * @default ""
   */
  labelClass?: string
  /**
   * 所有表单项的label宽度
   */
  labelWidth?: number
  /**
   * 所有表单项的model属性名
   * @default "modelValue"
   */
  modelPropName?: string
  /**
   * rules message是否拼接label
   * @default true
   **/
  rulesMessageJoinLabel?: boolean
  /**
   * 设置placeHolder
   * */
  autoSetPlaceHolder?: boolean
}

export type SuUseFormRenderProps<T extends SuUseFormComponentType = SuUseFormComponentType> = {
  /** 是否展开，在showCollapseButton=true下生效 */
  collapsed?: boolean
  /**
   * 折叠时保持行数
   * @default 1
   */
  collapsedRows?: number
  /**
   * 是否触发resize事件
   * @default false
   */
  collapseTriggerResize?: boolean
  /**
   * 表单项通用后备配置，当子项目没配置时使用这里的配置，子项目配置优先级高于此配置
   */
  commonConfig?: SuUseFormCommonConfig

  /**
   * 表单实例
   */
  form?: SuUseFormContext<SuUni.Recordable>
  /**
   * 表单项布局
   */
  layout?: SuUseFormLayout
  /**
   * 表单定义
   */
  schemas?: SuUseFormSchema<T>[]
  /**
   * 是否显示展开/折叠
   * @default false
   */
  showCollapseButton?: boolean
  /**
   * RowProps
   */
  rowProps?: Partial<SuRowProps>
  /**
   * 最外层warpper class
   **/
  warpperClass?: string
  /**
   * form class
   */
  formClass?: string
}

export interface SuUseFormProps<T extends SuUseFormComponentType = SuUseFormComponentType>
  extends Omit<SuUseFormRenderProps<T>, 'componentBindEventMap' | 'componentMap' | 'form'> {
  /**
   * formModel
   */
  model?: SuUni.Recordable
  /**
   * 操作按钮是否反转（提交按钮前置）
   */
  actionButtonsReverse?: boolean
  /**
   * 表单操作区域class
   */
  actionWrapperClass?: string
  /**
   * 表单字段映射
   */
  fieldMappingTime?: SuUseFormFieldMappingTime
  /**
   * 表单重置回调
   */
  handleReset?: SuUseFormHandleResetFn
  /**
   * 表单提交回调
   */
  handleSubmit?: SuUseFormHandleSubmitFn
  /**
   * 表单值变化回调
   */
  handleValuesChange?: (values: Record<string, any>) => void
  /**
   * 重置按钮参数
   */
  resetButtonOptions?: SuUseFormActionButtonOptions
  /**
   * 是否显示默认操作按钮
   * @default false
   */
  showDefaultActions?: boolean
  /**
   * 提交按钮参数
   */
  submitButtonOptions?: SuUseFormActionButtonOptions
  /**
   * 提交触发校验
   * @default false
   */
  submitValidate?: boolean
  /**
   * 消息提示的errorType
   * @default 'message'
   */
  messageType?: 'message' | 'toast'
}

/**
 * 扩展的表单API类型定义
 * @description 定义了扩展的表单API类型，继承自SuUseFormApi，并添加了useStore方法
 * @template T - 表单属性的类型，默认为SuUseFormProps
 * @extends {SuUseFormApi} - 继承自SuUseFormApi
 * @property {function} useStore - 使用Vuex store的方法
 * @param {function} selector - 选择器函数，用于从store中选择特定的状态
 * @returns {Readonly<Ref<T>>} - 返回一个只读的Ref对象，包含选择的状态
 */
export type ExtendedSuUseFormApi = SuUseFormApi & {
  useStore: <T = NoInfer<SuUseFormProps>>(selector?: (state: NoInfer<SuUseFormProps>) => T) => Readonly<Ref<T>>
}

/**
 * 表单操作属性类型定义
 * @description 定义了表单操作的属性类型，继承自SuUseFormProps，并选择了特定的属性
 * @template T - 表单组件类型，默认为SuUseFormComponentType
 * @extends {Pick<SuUseFormProps<T>, 'actionButtonsReverse' | 'handleReset' | 'handleSubmit' | 'resetButtonOptions' | 'showDefaultActions' | 'submitButtonOptions' | 'actionWrapperClass'>} - 继承自SuUseFormProps的特定属性
 */
export type SuUseFormActionProps<T extends SuUseFormComponentType = SuUseFormComponentType> = Pick<
  SuUseFormProps<T>,
  'actionButtonsReverse' | 'handleReset' | 'handleSubmit' | 'resetButtonOptions' | 'showDefaultActions' | 'submitButtonOptions' | 'actionWrapperClass'
>

/**
 * 基础事件类型定义
 * @description 定义了基础的事件类型，包括提交、重置、更新模型和折叠状态改变
 */
export type BaseEmitsType = {
  /**
   * 提交事件
   * @param {SuUni.Recordable} data - 提交的数据
   */
  (e: 'submit', data: SuUni.Recordable): void
  /**
   * 重置事件
   */
  (e: 'reset'): void
  /**
   * 更新模型事件
   * @param {SuUni.Recordable} data - 更新的数据
   */
  (e: 'update:model', data: SuUni.Recordable): void
  /**
   * 折叠状态改变事件
   * @param {boolean} bool - 折叠状态
   */
  (e: 'collapse-change', bool: boolean): void
}
