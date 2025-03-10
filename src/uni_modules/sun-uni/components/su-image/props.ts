import defProps from '../../libs/config/props'
import type { ExtractPropTypes, PropType } from 'vue'
import type { SuUni } from '../../types/uni'

export const imageProps = {
  /** 图片地址 */
  src: {
    type: String,
    default: () => defProps.image.src
  },
  /** 
   * 裁剪模式
   * @default 'aspectFill'
   */
  mode: {
    type: String as PropType<UniHelper.ImageMode>,
    default: () => defProps.image.mode
  },
  /** 
   * 宽度，单位任意
   * @default 300
   */
  width: {
    type: [String, Number],
    default: () => defProps.image.width
  },
  /** 
   * 高度，单位任意
   * @default 225
   */
  height: {
    type: [String, Number],
    default: () => defProps.image.height
  },
  /** 
   * 图片形状，circle-圆形，square-方形
   * @default 'square'
   */
  shape: {
    type: String as PropType<SuUni.Shape>,
    default: () => defProps.image.shape
  },
  /** 
   * 圆角，单位任意
   * @default 0
   */
  radius: {
    type: [String, Number],
    default: () => defProps.image.radius
  },
  /** 
   * 是否懒加载，微信小程序、App、百度小程序、字节跳动小程序
   * @default true
   */
  lazyLoad: {
    type: Boolean,
    default: () => defProps.image.lazyLoad
  },
  /** 
   * 开启长按图片显示识别微信小程序码菜单
   * @default true
   */
  showMenuByLongpress: {
    type: Boolean,
    default: () => defProps.image.showMenuByLongpress
  },
  /** 
   * 加载中的图标，或者小图片
   * @default 'photo'
   */
  loadingIcon: {
    type: String,
    default: () => defProps.image.loadingIcon
  },
  /** 
   * 加载失败的图标，或者小图片
   * @default 'error-circle'
   */
  errorIcon: {
    type: String,
    default: () => defProps.image.errorIcon
  },
  /** 
   * 是否显示加载中的图标或者自定义的slot
   * @default true
   */
  showLoading: {
    type: Boolean,
    default: () => defProps.image.showLoading
  },
  /** 
   * 是否显示加载错误的图标或者自定义的slot
   * @default true
   */
  showError: {
    type: Boolean,
    default: () => defProps.image.showError
  },
  /** 
   * 是否需要淡入效果
   * @default true
   */
  fade: {
    type: Boolean,
    default: () => defProps.image.fade
  },
  /** 
   * 只支持网络资源，只对微信小程序有效
   * @default false
   */
  webp: {
    type: Boolean,
    default: () => defProps.image.webp
  },
  /** 
   * 过渡时间，单位ms
   * @default 500
   */
  duration: {
    type: [String, Number],
    default: () => defProps.image.duration
  },
  /** 
   * 背景颜色，用于深色页面加载图片时，为了和背景色融合
   * @default #f3f4f6
   */
  bgColor: {
    type: String,
    default: () => defProps.image.bgColor
  }
}


export type SuImageProps = ExtractPropTypes<typeof imageProps>