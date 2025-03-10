import defProps from '../../libs/config/props'
import type { ExtractPropTypes } from 'vue'


export const indexAnchorProps = {
  /**
   * 列表锚点文本内容
   * */ 
  text: {
    type: [String, Number],
    default: () => defProps.indexAnchor.text
  },
  /**
   * 列表锚点文字颜色
   * @default '#606266'
   * */ 
  color: {
    type: String,
    default: () => defProps.indexAnchor.color
  },
  /**
   * 列表锚点文字大小，单位默认px
   * @default 14
   * */ 
  size: {
    type: [String, Number],
    default: () => defProps.indexAnchor.size
  },
  /**
   * 列表锚点背景颜色
   * @default '#dedede'
   * */ 
  bgColor: {
    type: String,
    default: () => defProps.indexAnchor.bgColor
  },
  /**
   * 列表锚点高度，单位默认px
   * @default 32
   * */ 
  height: {
    type: [String, Number],
    default: () => defProps.indexAnchor.height
  }
}

export type SuIndexAnchorProps = ExtractPropTypes<typeof indexAnchorProps>
