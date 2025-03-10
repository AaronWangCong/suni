import type { CSSProperties, PropType } from 'vue'
import defProps from '../../libs/config/props'
import type { SuUni } from '../../types/uni'

export const readonlyWrapperProps = {
  /** 显示的值 */
  modelValue: {
    type: String,
    default: ''
  },
  /** 显示为空时的占位符 */
  placeholder: {
    type: String,
    default: () => defProps.readonlyWrapper.placeholder
  },
  /** 指定placeholder的样式类 */
  placeholderClass: {
    type: String,
    default: () => defProps.readonlyWrapper.placeholderClass
  },
  /** 指定placeholder的样式类 */
  placeholderStyle: {
    type: [Object, String] as PropType<CSSProperties | string>,
    default: () => defProps.readonlyWrapper.placeholderStyle
  },
  /**
   * 内容对齐方式
   * @default 'left'
   */
  valueAlign: {
    type: String as PropType<SuUni.Align>,
    default: () => defProps.readonlyWrapper.valueAlign
  },
  /**
   * 字体的大小
   * @default '15px'
   */
  fontSize: {
    type: String,
    default: () => defProps.readonlyWrapper.fontSize
  },
  /**
   * 字体的颜色
   * @default '#303133'
   */
  color: {
    type: String,
    default: () => defProps.readonlyWrapper.color
  },
  /**
   * 边框类型
   * @default '#surround'
   */
  border: {
    type: String as PropType<'surround' | 'bottom' | 'none'>,
    default: () => defProps.readonlyWrapper.border
  },
  /**
   * 是否展开
   * @default false
   **/
  collapsed: {
    type: Boolean,
    default: false
  },
  /**
   * 是否有箭头
   * @default true
   **/
  showArrow: {
    type: Boolean,
    default: () => defProps.readonlyWrapper.showArrow
  },
  /**
   * 是否清除
   * @default true
   **/
  clearable: {
    type: Boolean,
    default: () => defProps.readonlyWrapper.clearable
  }
}


