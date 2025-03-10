import defProps from '../../libs/config/props'
import type { ExtractPropTypes, PropType } from 'vue'
import type { SuUni } from '../../types/uni'

export const pickerProps = {
  /** 绑定的值 */
  modelValue: {
    type: Array,
    default: () => []
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 禁用的颜色 */
  disabledColor: {
    type: String,
    default: () => defProps.input.disabledColor
  },
  /** 是否隐藏输入框 */
  hasInput: {
    type: Boolean,
    default: false
  },
  /** 输入框的placeholder */
  placeholder: {
    type: String,
    default: () => '请选择'
  },
  /** 
   * 是否展示picker弹窗
   * @default false
   */
  show: {
    type: Boolean,
    default: () => defProps.picker.show
  },
  /** 
   * 弹出的方向，可选值为 top bottom right left center
   * @default 'bottom'
   */
  popupMode: {
    type: String as PropType<SuUni.Position | 'center'>,
    default: () => defProps.picker.popupMode
  },
  /** 
   * 是否展示顶部的操作栏
   * @default true
   */
  showToolbar: {
    type: Boolean,
    default: () => defProps.picker.showToolbar
  },
  /** 顶部标题 */
  title: {
    type: String,
    default: () => defProps.picker.title
  },
  /** 对象数组，设置每一列的数据 */
  columns: {
    type: Array as PropType<SuUni.Recordable[][]>,
    default: () => defProps.picker.columns
  },
  /** 
   * 是否显示加载中状态
   * @default false
   */
  loading: {
    type: Boolean,
    default: () => defProps.picker.loading
  },
  /** 
   * 各列中，单个选项的高度
   * @default 44
   */
  itemHeight: {
    type: [String, Number],
    default: () => defProps.picker.itemHeight
  },
  /** 
   * 取消按钮的文字
   * @default '取消'
   */
  cancelText: {
    type: String,
    default: () => defProps.picker.cancelText
  },
  /** 
   * 确认按钮的文字
   * @default '确定'
   */
  confirmText: {
    type: String,
    default: () => defProps.picker.confirmText
  },
  /**
   * 取消按钮的颜色
   * @default '#909193'
   * */ 
  cancelColor: {
    type: String,
    default: () => defProps.picker.cancelColor
  },
  /**
   * 确认按钮的颜色
   * @default '#3c9cff'
   * */ 
  confirmColor: {
    type: String,
    default: () => defProps.picker.confirmColor
  },
  /**
   * 每列中可见选项的数量
   * @default 5
   * */ 
  visibleItemCount: {
    type: [String, Number],
    default: () => defProps.picker.visibleItemCount
  },
  /**
   * 选项对象中，需要展示的属性键名
   * @default 'text'
   * */ 
  keyName: {
    type: String,
    default: () => defProps.picker.keyName
  },
  /**
   * 是否允许点击遮罩关闭选择器
   * @default false
   * */ 
  closeOnClickOverlay: {
    type: Boolean,
    default: () => defProps.picker.closeOnClickOverlay
  },
  /**
   * 各列的默认索引
   * @default []
   * */ 
  defaultIndex: {
    type: Array as PropType<number[]>,
    default: () => defProps.picker.defaultIndex
  },
  /**
   * 是否在手指松开时立即触发 change 事件。若不开启则会在滚动动画结束后触发 change 事件，只在微信2.21.1及以上有效
   * @default true
   * */ 
  immediateChange: {
    type: Boolean,
    default: () => defProps.picker.immediateChange
  },
  /**
   * 工具栏右侧插槽是否开启
   * @default false
   * */ 
  toolbarRightSlot: {
    type: Boolean,
    default: false
  }
}

export type SuPickerProps = ExtractPropTypes<typeof pickerProps>