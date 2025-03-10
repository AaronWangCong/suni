import defProps from '../../libs/config/props'
import type { ExtractPropTypes, PropType } from 'vue'
import type { SuUni } from '../../types/uni'

export const dividerProps = {
  /**
   * 是否虚线
   * @default false
   * */
  dashed: {
    type: Boolean,
    default: () => defProps.divider.dashed
  },
  /**
   * 是否细线
   * @default true
   * */
  hairline: {
    type: Boolean,
    default: () => defProps.divider.hairline
  },
  /**
   * 是否以点替代文字，优先于text字段起作用
   * @default false
   * */
  dot: {
    type: Boolean,
    default: () => defProps.divider.dot
  },
  /**
   * 内容文本的位置，left-左边，center-中间，right-右边
   * @default 'center'
   * */
  textPosition: {
    type: String as PropType<SuUni.Align>,
    default: () => defProps.divider.textPosition
  },
  /** 文本内容 */
  text: {
    type: [String, Number],
    default: () => defProps.divider.text
  },
  /** 
   * 文本大小
   * @default 14
   */
  textSize: {
    type: [String, Number],
    default: () => defProps.divider.textSize
  },
  /**
   * 文本颜色
   * @default '#909399'
   * */
  textColor: {
    type: String,
    default: () => defProps.divider.textColor
  },
  /**
   * 线条颜色
   * @default '#dcdfe6'
   * */
  lineColor: {
    type: String,
    default: () => defProps.divider.lineColor
  }
}

export type SuDividerProps = ExtractPropTypes<typeof dividerProps>
