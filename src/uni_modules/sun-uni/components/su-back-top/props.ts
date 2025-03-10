import defProps from '../../libs/config/props'
import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import type { SuUni } from '../../types/uni'

export const backTopProps = {
  /** 
   * 返回顶部的形状，circle-圆形，square-方形
   * @default circle
   */
  mode: {
    type: String as PropType<SuUni.Shape>,
    default: () => defProps.backtop.mode
  },
  /** 
   * 自定义图标
   * @default arrow-upward
   */
  icon: {
    type: String,
    default: () => defProps.backtop.icon
  },
  /** 提示文字 */
  text: {
    type: String,
    default: () => defProps.backtop.text
  },
  /** 
   * 返回顶部滚动时间
   * @default 100
   */
  duration: {
    type: [String, Number],
    default: () => defProps.backtop.duration
  },
  /** 滚动距离 */
  scrollTop: {
    type: [String, Number],
    default: () => defProps.backtop.scrollTop
  },
  /** 
   * 距离顶部多少距离显示，单位px
   * @default 400
   */
  top: {
    type: [String, Number],
    default: () => defProps.backtop.top
  },
  /** 
   * 返回顶部按钮到底部的距离，单位px
   * @default 100
   */
  bottom: {
    type: [String, Number],
    default: () => defProps.backtop.bottom
  },
  /** 
   * 返回顶部按钮到右边的距离，单位px
   * @default 20
   */
  right: {
    type: [String, Number],
    default: () => defProps.backtop.right
  },
  /** 
   * 层级
   * @default 9
   */
  zIndex: {
    type: [String, Number],
    default: () => defProps.backtop.zIndex
  },
  /** 
   * 图标的样式，对象形式
   * @default { color: '#909399', fontSize: '19px' }
   */
  iconStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => defProps.backtop.iconStyle
  }
}

export type SuBackTopProps = ExtractPropTypes<typeof backTopProps>
