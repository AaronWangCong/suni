import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import defProps from '../../libs/config/props'
import { popupProps } from '../su-popup/props'
import type { SuButtonProps } from '../su-button/props'
import type { baseProps } from '../../libs/vue'
import type { SuUni } from '../../types/uni'

export const drawerProps = {
  ...popupProps,
  /** 
   * 弹出的方向，可选值为 top bottom right left
   * @default 'bottom'
   */
  mode: {
    type: String as PropType<SuUni.Position>,
    default: () => defProps.drawer.mode
  },
  /** 
   * 圆角
   * @default 24
   */
  round: {
    type: [String, Number],
    default: () => defProps.drawer.round
  },
  /** 是否显示关闭图标 */
  closeable: {
    type: Boolean,
    default: () => defProps.drawer.closeable
  },
  /** 当前抽屉的索引 */
  selector: {
    type: String,
    default: undefined
  },
  /** 
   * 是否显示头部
   * @default true
   */
  showHeader: {
    type: Boolean,
    default: () => defProps.drawer.showHeader
  },
  /** 头部的样式 */
  headerStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => defProps.drawer.headerStyle
  },
  /** 
   * 头部的高度 单位px 默认44px
   * @default 44
   */
  headerHeight: {
    type: [String, Number],
    default: () => defProps.drawer.headerHeight
  },
  /** 
   * 是否显示头部下边框
   * @default true
   */
  showHeaderBottomBorder: {
    type: Boolean,
    default: () => defProps.drawer.showHeaderBottomBorder
  },
  /** 标题 */
  title: {
    type: [String],
    default: () => defProps.drawer.title
  },
  /** 标题的样式 */
  titleStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => defProps.drawer.titleStyle
  },
  /** 内容的样式 */
  contentStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => defProps.drawer.contentStyle
  },
  /** 
   * 底部是否显示
   * @default false
   */
  showFooter: {
    type: Boolean,
    default: () => defProps.drawer.showFooter
  },
  /** 
   * 底部的的上边框
   * @default true
   */
  showFooterTopBorder: {
    type: Boolean,
    default: () => defProps.drawer.showFooterTopBorder
  },
  /** 
   * 底部高度 单位px, rpx 默认58px
   * @default 58
   */
  footerHeight: {
    type: [String, Number],
    default: () => defProps.drawer.footerHeight
  },
  /** 底部的样式 */
  footerStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => defProps.drawer.footerStyle
  },
  /** 
   * 是否显示确定按钮
   * @default true
   */
  showConfirmButton: {
    type: Boolean,
    default: () => defProps.drawer.showConfirmButton
  },
  /** 
   * 是否显示取消按钮
   * @default true
   */
  showCancelButton: {
    type: Boolean,
    default: () => defProps.drawer.showCancelButton
  },
  /** 
   * 确定按钮的文字
   * @default '确定'
   */
  confirmText: {
    type: String,
    default: () => defProps.drawer.confirmText
  },
  /** 
   * 取消按钮的文字
   * @default '取消'
   */
  cancelText: {
    type: String,
    default: () => defProps.modal.cancelText
  },
  /** 
   * 确定按钮的参数
   * @default  { type: 'primary' }
   */ 
  confirmButtonProps: {
    type: Object as PropType<SuButtonProps>,
    default: () => defProps.drawer.confirmButtonProps
  },
  /** 取消按钮的参数 */ 
  cancelButtonProps: {
    type: Object as PropType<SuButtonProps>,
    default: () => defProps.drawer.cancelButtonProps
  },
  /** 
   * 确定col的参数
   * @default { span: 6 }
   */ 
  confirmColProps: {
    type: Object,
    default: () => defProps.drawer.confirmColProps
  },
  /** 
   * 取消col的参数 
   * @default { span: 6 }
   */ 
  cancelColProps: {
    type: Object,
    default: () => defProps.drawer.cancelColProps
  },
  /** 关闭前的回调函数，如果返回 false 则不会关闭，支持返回 Promise */ 
  closeFunc: {
    type: Function as PropType<() => Promise<boolean>>
  },
  /** 确定按钮是否loading */ 
  confirmLoading: {
    type: Boolean,
    default: false
  }
}

export type SuDrawerProps = ExtractPropTypes<typeof drawerProps> & ExtractPropTypes<typeof baseProps>
