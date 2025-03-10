import type { ExtractPropTypes, PropType } from "vue"
import defProps from '../../libs/config/props'


export const carKeyboardProps = {
  /** 车牌号码 */
  modelValue: {
    type: String,
    default: ''
  },
  /** 是否显示光标 */
  showCursor: {
    type: Boolean,
    default: () => defProps.carKeyboard.showCursor
  },
  /** 是否振动 */
  vibration: {
    type: Boolean,
    default: () => defProps.carKeyboard.vibration
  },
  /** 输入内容的最大长度 */
  maxLength: {
    type: Number,
    default: () => defProps.carKeyboard.maxLength
  },
  /** 是否显示取消按钮 */
  showCancelBtn: {
    type: Boolean,
    default: () => defProps.carKeyboard.showCancelBtn,
  }
}

export type SuCarKeyboardProps = ExtractPropTypes<typeof carKeyboardProps>