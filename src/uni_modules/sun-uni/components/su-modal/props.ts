import defProps from '../../libs/config/props'
import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import type { SuUni } from '../../types/uni'

export const modalProps = {
  /** 当前弹窗的索引 */
  selector: {
    type: String,
    default: undefined
  },
  modelValue: {
    type: Boolean,
    default: undefined
  },
  /** 标题 */
  title: {
    type: [String],
    default: () => defProps.modal.title
  },
  /** 弹窗内容 */
  content: {
    type: String,
    default: () => defProps.modal.content
  },
  /** 
   * 确认文案
   * @default '确认'
   */
  confirmText: {
    type: String,
    default: () => defProps.modal.confirmText
  },
  /** 
   * 取消文案
   * @default '取消'
   */
  cancelText: {
    type: String,
    default: () => defProps.modal.cancelText
  },
  /** 
   * 是否显示确认按钮
   * @default true
   */
  showConfirmButton: {
    type: Boolean,
    default: () => defProps.modal.showConfirmButton
  },
  /** 
   * 是否显示取消按钮
   * @default false
   */
  showCancelButton: {
    type: Boolean,
    default: () => defProps.modal.showCancelButton
  },
  /** 
   * 确认按钮颜色
   * @default '#2979ff'
   */
  confirmColor: {
    type: String,
    default: () => defProps.modal.confirmColor
  },
  /** 
   * 取消文字颜色
   * @default '#606266'
   */
  cancelColor: {
    type: String,
    default: () => defProps.modal.cancelColor
  },
  /** 
   * 对调确认和取消的位置
   * @default false
   */
  buttonReverse: {
    type: Boolean,
    default: () => defProps.modal.buttonReverse
  },
  /** 
   * 是否开启缩放效果
   * @default true
   */
  zoom: {
    type: Boolean,
    default: () => defProps.modal.zoom
  },
  /** 
   * 是否异步关闭，只对确定按钮有效
   * @default false
   */
  asyncClose: {
    type: Boolean,
    default: () => defProps.modal.asyncClose
  },
  /** 
   * 是否允许点击遮罩关闭modal
   * @default false
   */
  closeOnClickOverlay: {
    type: Boolean,
    default: () => defProps.modal.closeOnClickOverlay
  },
  /** 
   * 给一个负的margin-top，往上偏移，避免和键盘重合的情况
   * @default 0
   */
  negativeTop: {
    type: [String, Number],
    default: () => defProps.modal.negativeTop
  },
  /** 
   * modal宽度，不支持百分比，可以数值，px，rpx单位
   * @default '650rpx'
   */
  width: {
    type: [String, Number],
    default: () => defProps.modal.width
  },
  /** 确认按钮的样式，circle-圆形，square-方形，如设置，将不会显示取消按钮 */
  confirmButtonShape: {
    type: String as PropType<SuUni.Shape>,
    default: () => defProps.modal.confirmButtonShape
  },
  /** 
   * 文案对齐方式
   * @default 'left'
   */
  contentTextAlign: {
    type: String as PropType<SuUni.Align>,
    default: () => defProps.modal.contentTextAlign
  },
  /** 自定义标题样式 */
  titleStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => defProps.modal.titleStyle
  }
}

export type SuModalProps = ExtractPropTypes<typeof modalProps>
