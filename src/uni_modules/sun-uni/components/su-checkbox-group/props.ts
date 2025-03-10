import defProps from '../../libs/config/props'
import type { ComponentInternalInstance, ExtractPropTypes, InjectionKey, PropType } from 'vue'
import type { SuUni } from '../../types/uni'

export const checkboxGroupProps = {
  /** 标识符 */
  name: {
    type: String,
    default: () => defProps.checkboxGroup.name
  },
  modelValue: {
    type: Array,
    default: () => defProps.checkboxGroup.modelValue
  },
  /**
   * 形状，circle-圆形，square-方形
   * @default 'square'
   * */
  shape: {
    type: String as PropType<SuUni.Shape>,
    default: () => defProps.checkboxGroup.shape
  },
  /**
   * 是否禁用全部checkbox
   * @default false
   * */
  disabled: {
    type: Boolean,
    default: () => defProps.checkboxGroup.disabled
  },

  /**
   * 选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值
   * @default '#2979ff'
   * */
  activeColor: {
    type: String,
    default: () => defProps.checkboxGroup.activeColor
  },
  /**
   * 未选中的颜色
   * @default '#c8c9cc'
   * */
  inactiveColor: {
    type: String,
    default: () => defProps.checkboxGroup.inactiveColor
  },

  /**
   * 整个组件的尺寸，默认px
   * @default 18
   * */
  size: {
    type: [String, Number],
    default: () => defProps.checkboxGroup.size
  },
  /**
   * 布局方式，row-横向，column-纵向
   * @default 'row'
   * */
  placement: {
    type: String as PropType<'row' | 'column'>,
    default: () => defProps.checkboxGroup.placement
  },
  /**
   * label的字体大小，px单位
   * @default 14
   */
  labelSize: {
    type: [String, Number],
    default: () => defProps.checkboxGroup.labelSize
  },
  /**
   * label的字体颜色
   * @default '#303133'
   * */
  labelColor: {
    type: [String],
    default: () => defProps.checkboxGroup.labelColor
  },
  /**
   * 是否禁止点击文本操作
   * @default false
   * */
  labelDisabled: {
    type: Boolean,
    default: () => defProps.checkboxGroup.labelDisabled
  },
  /**
   * 图标颜色
   * @default '#ffffff'
   * */
  iconColor: {
    type: String,
    default: () => defProps.checkboxGroup.iconColor
  },
  /**
   * 图标的大小，单位px
   * @default 12
   * */
  iconSize: {
    type: [String, Number],
    default: () => defProps.checkboxGroup.iconSize
  },
  /**
   * 勾选图标的对齐方式，left-左边，right-右边
   * @default 'left'
   * */
  iconPlacement: {
    type: String as PropType<'left' | 'right'>,
    default: () => defProps.checkboxGroup.iconPlacement
  },
  /**
   * 竖向配列时，是否显示下划线
   * @default false
   * */
  borderBottom: {
    type: Boolean,
    default: () => defProps.checkboxGroup.borderBottom
  }
}

export type SuCheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>

export type SuCheckboxProvide = {
  props: SuCheckboxGroupProps
  handleCheckedOther: (instance?: ComponentInternalInstance) => void
}

export const CHECKBOX_KEY: InjectionKey<SuCheckboxProvide> = Symbol('su-checkbox-group')
