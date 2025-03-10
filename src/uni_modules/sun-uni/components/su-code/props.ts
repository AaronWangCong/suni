import type { ExtractPropTypes } from 'vue'
import defProps from '../../libs/config/props'

export const codeProps = {
  /**
   * 倒计时总秒数
   * @default 60
   * */
  seconds: {
    type: [String, Number],
    default: () => defProps.code.seconds
  },
  /**
   * 尚未开始时提示
   * @default '获取验证码'
   * */
  startText: {
    type: String,
    default: () => defProps.code.startText
  },
  /**
   * 正在倒计时中的提示
   * @default 'X秒重新获取'
   * */
  changeText: {
    type: String,
    default: () => defProps.code.changeText
  },
  /**
   * 倒计时结束时的提示
   * @default '重新获取'
   * */
  endText: {
    type: String,
    default: () => defProps.code.endText
  },
  /**
   * 是否在H5刷新或各端返回再进入时继续倒计时
   * @default false
   * */
  keepRunning: {
    type: Boolean,
    default: () => defProps.code.keepRunning
  },
  /**
   * 为了区分多个页面，或者一个页面多个倒计时组件本地存储的继续倒计时变了
   * */
  uniqueKey: {
    type: String,
    default: () => defProps.code.uniqueKey
  }
}

export type SuCodeProps = ExtractPropTypes<typeof codeProps>