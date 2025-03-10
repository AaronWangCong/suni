import defProps from '../../libs/config/props'
import type { ExtractPropTypes, PropType } from 'vue'

export const copyProps = {
  /**
   * 复制的内容
   * */ 
  content: {
    type: String,
    default: '',
  },
  /**
   * 成功提示的模式
   * @default 'toast'
   * */ 
  alertStyle: {
    type: String as PropType<'modal' | 'toast'>,
    default: () => defProps.copy.alertStyle,
  },
  /**
   * 成功提示的内容
   * @default '复制成功'
   * */ 
  notice: {
    type: String,
    default: () => defProps.copy.notice,
  },
  /**
   * 显示的文本
   * @default '复制'
   * */ 
  text: {
    type: String,
    default: () => defProps.copy.text,
  }
}

export type SuCopyProps = ExtractPropTypes<typeof copyProps>