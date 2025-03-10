import type { ExtractPropTypes, PropType } from 'vue'
import defProps from '../../libs/config/props'
import type { SuUni } from '../../types/uni'

export const alertProps = {
  /** 显示文字 */
  title: {
    type: String,
    default: () => defProps.alert.title
  },
  /** 
   * 主题，success/warning/info/error 
   * @default warning
   */
  type: {
    type: String as PropType<SuUni.Type>,
    default: () => defProps.alert.type
  },
  /** 辅助性文字 */
  description: {
    type: String,
    default: () => defProps.alert.description
  },
  /** 
   * 是否可关闭
   * @default false
   */
  closable: {
    type: Boolean,
    default: () => defProps.alert.closable
  },
  /** 
   * 是否显示图标
   * @default false
   */
  showIcon: {
    type: Boolean,
    default: () => defProps.alert.showIcon
  },
  /** 
   * 浅或深色调，light-浅色，dark-深色
   * @default light
   */
  effect: {
    type: String as PropType<'light' | 'dark'>,
    default: () => defProps.alert.effect
  },
  /** 
   * 文字是否居中
   * @default false
   */
  center: {
    type: Boolean,
    default: () => defProps.alert.center
  },
  /** 
   * 字体大小
   * @default 14
   */
  fontSize: {
    type: [String, Number],
    default: () => defProps.alert.fontSize
  }
}

export type SuAlertProps = ExtractPropTypes<typeof alertProps>