import defProps from '../../libs/config/props'
import type { ExtractPropTypes, PropType } from 'vue'


export const keyboardProps = {
  /**
   * 键盘的类型，number-数字键盘，card-身份证键盘，car-车牌号键盘
   * @default 'number'
   * */
  mode: {
    type: String as PropType<'number' | 'card' | 'car'>,
    default: () => defProps.keyboard.mode
  },
  /**
   * 是否显示键盘的"."符号
   * @default false
   * */
  dotDisabled: {
    type: Boolean,
    default: () => defProps.keyboard.dotDisabled
  },
  /**
   * 是否显示顶部工具条
   * @default true
   * */
  tooltip: {
    type: Boolean,
    default: () => defProps.keyboard.tooltip
  },
  /**
   * 是否显示工具条中间的提示
   * @default true
   * */
  showTips: {
    type: Boolean,
    default: () => defProps.keyboard.showTips
  },
  /**
   * 工具条中间的提示文字
   * */
  tips: {
    type: String,
    default: () => defProps.keyboard.tips
  },
  /**
   * 是否显示工具条左边的"取消"按钮
   * @default true
   * */
  showCancel: {
    type: Boolean,
    default: () => defProps.keyboard.showCancel
  },
  /**
   * 是否显示工具条右边的"完成"按钮
   * @default true
   * */
  showConfirm: {
    type: Boolean,
    default: () => defProps.keyboard.showConfirm
  },
  /**
   * 是否打乱键盘按键的顺序
   * @default false
   * */
  random: {
    type: Boolean,
    default: () => defProps.keyboard.random
  },
  /**
   * 是否开启底部安全区适配，开启的话，会在iPhoneX机型底部添加一定的内边距
   * @default true
   * */
  safeAreaInsetBottom: {
    type: Boolean,
    default: () => defProps.keyboard.safeAreaInsetBottom
  },
  /**
   * 是否允许通过点击遮罩关闭键盘
   * @default true
   * */
  closeOnClickOverlay: {
    type: Boolean,
    default: () => defProps.keyboard.closeOnClickOverlay
  },
  /**
   * 控制键盘的弹出与收起
   * @default false
   * */
  show: {
    type: Boolean,
    default: () => defProps.keyboard.show
  },
  /**
   * 是否显示遮罩，某些时候数字键盘时，用户希望看到自己的数值，所以可能不想要遮罩
   * @default true
   * */
  overlay: {
    type: Boolean,
    default: () => defProps.keyboard.overlay
  },
  /**
   *  z-index值
   * @default  10075
   */
  zIndex: {
    type: [String, Number],
    default: () => defProps.keyboard.zIndex
  },
  /**
   * 取消按钮的文字
   * @default '取消'
   * */
  cancelText: {
    type: String,
    default: () => defProps.keyboard.cancelText
  },
  /** 
   * 确认按钮的文字
   * @default '确定'
   */
  confirmText: {
    type: String,
    default: () => defProps.keyboard.confirmText
  },
  /**
   * 输入一个中文后，是否自动切换到英文
   * @default false
   * */
  autoChange: {
    type: Boolean,
    default: () => defProps.keyboard.autoChange
  },
  /**
   * 默认值
   * */
  defaultValue: {
    type: String,
    default: ''
  }
}

export type SuKeyboardProps = ExtractPropTypes<typeof keyboardProps>