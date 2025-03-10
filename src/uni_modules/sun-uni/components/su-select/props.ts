import type { ExtractPropTypes, PropType } from 'vue';
import defProps from '../../libs/config/props'
import type { SuUni } from '../../types/uni';

export const selectProps = {
  /** 通过双向绑定控制组件的弹出与收起 */
  show: {
    type: Boolean,
    default: () => defProps.select.show
  },
  /** 选中的值 */
  modelValue: {
    type: Array,
    default: []
  },
  /** 列数据 */
  list: {
    type: Array as PropType<SuUni.Recordable[]>,
    default() {
      return () => defProps.select.list;
    }
  },
  /** 
   * 是否显示边框
   * @default true
   */
  border: {
    type: Boolean,
    default: () => defProps.select.border
  },
  /** 
   * "取消"按钮的颜色
   * @default '#606266'
   */
  cancelColor: {
    type: String,
    default: () => defProps.select.cancelColor
  },
  /** 
   * "确定"按钮的颜色
   * @default '#2979ff'
   */
  confirmColor: {
    type: String,
    default: () => defProps.select.confirmColor
  },
  /** 
   * 弹出的z-index值
   * @default 0
   */
  zIndex: {
    type: [String, Number],
    default: () => defProps.select.zIndex
  },
  /**
   * @default false
   */ 
  safeAreaInsetBottom: {
    type: Boolean,
    default: () => defProps.select.safeAreaInsetBottom
  },
  /** 
   * 是否允许通过点击遮罩关闭Picker
   * @default true
   */
  maskCloseAble: {
    type: Boolean,
    default: () => defProps.select.maskCloseAble
  },
  /** 
   * 提供的默认选中的下标
   * @default [0]
   */
  defaultValue: {
    type: Array,
    default: () => defProps.select.defaultValue
  },
  /** 
   * 模式选择，single-column-单列，mutil-column-多列，mutil-column-auto-多列联动
   * @default 'single-column'
   */
  mode: {
    type: String as PropType<SuSelectMode>,
    default: () => defProps.select.mode
  },
  /** 
   * 自定义value属性名
   * @default 'value'
   */
  valueName: {
    type: String,
    default: () => defProps.select.valueName
  },
  /** 
   * 自定义label属性名
   * @default 'label'
   */
  labelName: {
    type: String,
    default: () => defProps.select.labelName
  },
  /** 
   * 自定义多列联动模式的children属性名
   * @default children
   */
  childName: {
    type: String,
    default: () => defProps.select.childName
  },
  /** 顶部标题 */
  title: {
    type: String,
    default: () => defProps.select.title
  },
  /** 
   * 取消按钮的文字
   * @default '取消'
   */
  cancelText: {
    type: String,
    default: () => defProps.select.cancelText
  },
  /** 
   * 确认按钮的文字
   * @default '确认'
   */
  confirmText: {
    type: String,
    default: () => defProps.select.confirmText
  },
  /** 
   * 遮罩的模糊度
   * @default 0
   */
  blur: {
    type: [Number, String],
    default: () => defProps.select.blur
  },
}

export type SuSelectProps = ExtractPropTypes<typeof selectProps>
export type SuSelectMode = 'single-column' | 'mutil-column' | 'mutil-column-auto'
