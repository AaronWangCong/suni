import defProps from '../../libs/config/props'
import type { ExtractPropTypes, InjectionKey, PropType } from 'vue'

export const indexListProps = {
  /**
   * 右边锚点非激活的颜色
   * @default '#606266'
   * */
  inactiveColor: {
    type: String,
    default: () => defProps.indexList.inactiveColor
  },
  /**
   * 右边锚点激活的颜色
   * @default '#5677fc'
   * */
  activeColor: {
    type: String,
    default: () => defProps.indexList.activeColor
  },
  /** 索引字符列表，数组形式 */
  indexList: {
    type: Array as PropType<string[]>,
    default: () => defProps.indexList.indexList
  },
  /**
   * 是否开启锚点自动吸顶
   * @default true
   * */
  sticky: {
    type: Boolean,
    default: () => defProps.indexList.sticky
  },
  /**
   * 自定义导航栏的高度
   * @default 0
   * */
  customNavHeight: {
    type: [String, Number],
    default: () => defProps.indexList.customNavHeight
  },
  /**
   * 是否开启底部安全距离适配
   * @default false
   * */
  safeBottomFix: {
    type: Boolean,
    default: () => defProps.indexList.safeBottomFix
  }
}

export type SuIndexListProps = ExtractPropTypes<typeof indexListProps>

export type SuIndexListProvide = {}

export const INDEX_LIST_KEY: InjectionKey<SuIndexListProvide> = Symbol('su-index-list')
