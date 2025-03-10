import defProps from '../../libs/config/props'
import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import type { SuUni } from '../../types/uni'

export const actionSheetProps = {
  /** 
   * 操作菜单是否展示 （默认false）
   * @default false
   */
  show: {
    type: Boolean,
    default: () => defProps.actionSheet.show
  },
  /** 
   * 操作菜单是否展示 （默认false）
   * @default false
   */
  modelValue: {
    type: Boolean,
    default: () => defProps.actionSheet.modelValue
  },
  /** 
   * 标题
   */
  title: {
    type: String,
    default: () => defProps.actionSheet.title
  },
  /** 选项上方的描述信息 */
  description: {
    type: String,
    default: () => defProps.actionSheet.description
  },
  /** 数据 */
  actions: {
    type: Array as PropType<SuActionSheetActionItem[]>,
    default: () => defProps.actionSheet.actions
  },
  /** 取消按钮的文字，不为空时显示按钮 */
  cancelText: {
    type: String,
    default: () => defProps.actionSheet.cancelText
  },
  /** 
   * 点击某个菜单项时是否关闭弹窗
   * @default true
   */
  closeOnClickAction: {
    type: Boolean,
    default: () => defProps.actionSheet.closeOnClickAction
  },
  /** 
   * 处理底部安全区（默认true）
   * @default true
   */
  safeAreaInsetBottom: {
    type: Boolean,
    default: () => defProps.actionSheet.safeAreaInsetBottom
  },
  /** 
   * 小程序的打开方式
   */
  openType: {
    type: String as PropType<UniHelper.ButtonOpenType>,
    default: () => defProps.actionSheet.openType
  },
  /** 
   * 点击遮罩是否允许关闭 (默认true) 
   * @default true 
   */
  closeOnClickOverlay: {
    type: Boolean,
    default: () => defProps.actionSheet.closeOnClickOverlay
  },
  /** 
   * 圆角值
   */
  round: {
    type: [Boolean, String, Number],
    default: () => defProps.actionSheet.round
  },
  /** 
   * 选项区域最大高度
   * @default 600px
   */
  wrapMaxHeight: {
    type: [String],
    default: () => defProps.actionSheet.wrapMaxHeight
  }
}

export type SuActionSheetProps = ExtractPropTypes<typeof actionSheetProps>
export type SuActionSheetActionItem = CSSProperties & SuUni.Recordable