import type { ExtractPropTypes, PropType } from 'vue'
import defProps from '../../libs/config/props'
import type { SuUni } from '../../types/uni'

export const avatarGroupProps = {
  /** 
   * 头像图片组
   */
  urls: {
    type: Array as PropType<SuUni.Recordable[]>,
    default: () => defProps.avatarGroup.urls
  },
  /** 
   * 最多展示的头像数量
   * @default 5
   */
  maxCount: {
    type: [String, Number],
    default: () => defProps.avatarGroup.maxCount
  },
  /**
   * 头像形状，circle-圆形，square-方形
   * @enum {String} circle-圆形
   * @enum {String} square-方形
   * @default circle
   */
  shape: {
    type: String as PropType<SuUni.Shape>,
    default: () => defProps.avatarGroup.shape
  },
  /**
   * 裁剪模式
   * @description 头像图片的裁剪类型，与uni的image组件的mode参数一致，如效果达不到需求，可尝试传widthFix值 （默认 'scaleToFill' ）
   * @default scaleToFill
   */
  mode: {
    type: String as PropType<UniHelper.ImageMode>,
    default: () => defProps.avatarGroup.mode
  },
  /** 
   * 超出maxCount时是否显示查看更多的提示
   * @default true
   */
  showMore: {
    type: Boolean,
    default: () => defProps.avatarGroup.showMore
  },
  /** 
   * 头像大小
   * @default 40
   */
  size: {
    type: [String, Number],
    default: () => defProps.avatarGroup.size
  },
  /** 指定从数组的对象元素中读取哪个属性作为图片地址 */
  keyName: {
    type: String,
    default: () => defProps.avatarGroup.keyName
  },
  /** 
   * 头像之间的遮挡比例
   * @default 0.5
   */
  gap: {
    type: [String, Number],
    validator(value: number) {
      return value >= 0 && value <= 1
    },
    default: () => defProps.avatarGroup.gap
  },
  /** 
   * 需额外显示的值
   * @default 0
   */
  extraValue: {
    type: [Number, String],
    default: () => defProps.avatarGroup.extraValue
  }
}


export type SuAvaterGroupProps = ExtractPropTypes<typeof avatarGroupProps>