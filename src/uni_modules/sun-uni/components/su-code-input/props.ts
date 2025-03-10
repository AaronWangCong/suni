import defProps from '../../libs/config/props'
import type { ExtractPropTypes, PropType } from 'vue'

export const codeInputProps = {
  /**
   * 键盘弹起时，是否自动上推页面
   * @default true
   * */
  adjustPosition: {
    type: Boolean,
    default: () => defProps.codeInput.adjustPosition
  },
  /**
   * 最大输入长度
   * @default 6
   * */
  maxlength: {
    type: [String, Number],
    default: () => defProps.codeInput.maxlength
  },
  /**
   * 是否用圆点填充
   * @default false
   * */
  dot: {
    type: Boolean,
    default: () => defProps.codeInput.dot
  },
  /**
   * 显示模式，box-盒子模式，line-底部横线模式
   * @default 'box'
   * */
  mode: {
    type: String as PropType<'box' | 'line'>,
    default: () => defProps.codeInput.mode
  },
  /**
   * 是否细边框
   * @default false
   * */
  hairline: {
    type: Boolean,
    default: () => defProps.codeInput.hairline
  },
  /**
   * 字符间的距离
   * @default 10
   * */
  space: {
    type: [String, Number],
    default: () => defProps.codeInput.space
  },
  // #ifdef VUE3
  /**
   * 预置值
   * */
  modelValue: {
    type: [String, Number],
    default: () => defProps.codeInput.value
  },
  // #endif
  // #ifdef VUE2
  /**
   * 预置值
   * */
  value: {
    type: [String, Number],
    default: () => defProps.codeInput.value
  },
  // #endif
  /**
   * 是否自动获取焦点
   * @default false
   * */
  focus: {
    type: Boolean,
    default: () => defProps.codeInput.focus
  },
  /**
   * 字体是否加粗
   * @default false
   * */
  bold: {
    type: Boolean,
    default: () => defProps.codeInput.bold
  },
  /**
   * 字体颜色
   * @default '#606266'
   * */
  color: {
    type: String,
    default: () => defProps.codeInput.color
  },
  /**
   * 字体大小
   * @default 18
   * */
  fontSize: {
    type: [String, Number],
    default: () => defProps.codeInput.fontSize
  },
  /**
   * 输入框的大小，宽等于高
   * @default 35
   * */
  size: {
    type: [String, Number],
    default: () => defProps.codeInput.size
  },
  /**
   * 是否隐藏原生键盘，如果想用自定义键盘的话，需设置此参数为true
   * @default false
   * */
  disabledKeyboard: {
    type: Boolean,
    default: () => defProps.codeInput.disabledKeyboard
  },
  /**
   * 边框和线条颜色
   * @default '#c9cacc'
   * */
  borderColor: {
    type: String,
    default: () => defProps.codeInput.borderColor
  },
  /**
   * 是否禁止输入"."符号
   * @default true
   * */
  disabledDot: {
    type: Boolean,
    default: () => defProps.codeInput.disabledDot
  }
}

export type SuCodeProps = ExtractPropTypes<typeof codeInputProps>
