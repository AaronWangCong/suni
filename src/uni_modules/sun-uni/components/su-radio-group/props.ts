import defProps from '../../libs/config/props'
import type { ComponentInternalInstance, ExtractPropTypes, InjectionKey, PropType } from 'vue'
import type { SuUni } from '../../types/uni'

export const radioGroupProps = {
  /** 绑定的值 */
  modelValue: {
    type: [String, Number, Boolean],
    default: () => defProps.radioGroup.value
  },
  /**
   * 是否禁用全部radio
   * @default false
   */
  disabled: {
    type: Boolean,
    default: () => defProps.radioGroup.disabled
  },
  /**
   * 形状，circle-圆形，square-方形
   * @default circle
   */
  shape: {
    type: String as PropType<SuUni.Shape>,
    default: () => defProps.radioGroup.shape
  },
  /**
   * 选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值
   * @default '#2979ff'
   * */
  activeColor: {
    type: String,
    default: () => defProps.radioGroup.activeColor
  },
  /**
   * 未选中的颜色
   * @default '#c8c9cc'
   * */
  inactiveColor: {
    type: String,
    default: () => defProps.radioGroup.inactiveColor
  },
  /**
   * 标识符
   */
  name: {
    type: String,
    default: () => defProps.radioGroup.name
  },
  /**
   * 整个组件的尺寸，默认px
   * @default 18
   */
  size: {
    type: [String, Number],
    default: () => defProps.radioGroup.size
  },
  /**
   * 布局方式，row-横向，column-纵向
   * @default 'row'
   */
  placement: {
    type: String as PropType<'row' | 'column'>,
    default: () => defProps.radioGroup.placement
  },
  /**
   * label的文本
   * @default 'row'
   */
  label: {
    type: String,
    default: () => defProps.radioGroup.label
  },
  /**
   * label的颜色
   * @default '#303133'
   */
  labelColor: {
    type: String,
    default: () => defProps.radioGroup.labelColor
  },
  /**
   * label的字体大小，px单位
   * @default 14
   */
  labelSize: {
    type: [String, Number],
    default: () => defProps.radioGroup.labelSize
  },
  /**
   * 是否禁止点击文本操作radio
   * @default false
   */
  labelDisabled: {
    type: Boolean,
    default: () => defProps.radioGroup.labelDisabled
  },
  /** 图标颜色 */
  iconColor: {
    type: String,
    default: () => defProps.radioGroup.iconColor
  },
  /**
   * 图标的大小，单位px
   * @default 12
   */
  iconSize: {
    type: [String, Number],
    default: () => defProps.radioGroup.iconSize
  },
  /**
   * 竖向配列时，是否显示下划线
   * @default false
   */
  borderBottom: {
    type: Boolean,
    default: () => defProps.radioGroup.borderBottom
  },
  /**
   * 图标与文字的对齐方式
   * @default false
   */
  iconPlacement: {
    type: String as PropType<'left' | 'right'>,
    default: () => defProps.radioGroup.iconPlacement
  },
  /**
   * 图标与文字的对齐方式
   * @default false
   */
  gap: {
    type: [String, Number],
    default: () => defProps.radioGroup.gap
  }
}

export type SuRadioGroupProps = ExtractPropTypes<typeof radioGroupProps>

export type SuRadioProvide = {
  props: SuRadioGroupProps
  handleCheckedOther: (instance: ComponentInternalInstance) => void
}

export const RADIO_KEY: InjectionKey<SuRadioProvide> = Symbol('su-radio-group')
