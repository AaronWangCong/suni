import type { CSSProperties, PropType } from 'vue'
import defProps from '../../libs/config/props'

export type imageItemType = {
  url: string
  [key: string]: any
}

export const imagePreviewProps = {
  /**
   * 图片列表集合
   *
   **/
  imageList: {
    type: Array as PropType<string[] | imageItemType[]>,
    default: []
  },
  /**
   * 当前显示的第几个图片
   * */
  current: {
    type: Number,
    default: 0
  },
  /**
   * 裁剪模式
   * @default 'aspectFill'
   */
  imageMode: {
    type: String as PropType<UniHelper.ImageMode>,
    default: () => defProps.imagePreview.imageMode
  },
  /**
   * 图片的样式
   * @default {
      width: '100%',
      height: '100%'
    }
   */
  imageStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => defProps.imagePreview.imageStyle
  },
  /**
   * swiper的样式
   * @default {
      width: '100%',
      height: '80vh'
    }
   */
  swiperStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => defProps.imagePreview.swiperStyle
  }
}
