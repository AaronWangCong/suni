import defProps from '../../libs/config/props'
import type { ExtractPropTypes, InjectionKey } from 'vue'
import type { SuUni } from '../../types/uni'

export const dropdownProps = {
  /**
   * 菜单标题和选项的激活态颜色
   * @default '#2979ff'
   * */
  activeColor: {
    type: String,
    default: () => defProps.dropdown.activeColor
  },
  /**
   * 菜单标题和选项的未激活态颜色
   * @default '#606266'
   * */
  inactiveColor: {
    type: String,
    default: () => defProps.dropdown.inactiveColor
  },
  /** 
   * 点击遮罩是否关闭菜单
   * @default true
   *  */
  closeOnClickMask: {
    type: Boolean,
    default: () => defProps.dropdown.closeOnClickMask
  },
  /**
   * 点击当前激活项标题是否关闭菜单
   * @default true
   * */
  closeOnClickSelf: {
    type: Boolean,
    default: () => defProps.dropdown.closeOnClickSelf
  },
  /**
   * 过渡时间
   * @default 300
   * */
  duration: {
    type: [Number, String],
    default: () => defProps.dropdown.duration
  },
  /**
   * 标题菜单的高度
   * @default 40
   * */
  height: {
    type: [Number, String],
    default: () => defProps.dropdown.height
  },
  /**
   * 是否显示下边框
   * @default false
   * */
  borderBottom: {
    type: Boolean,
    default: () => defProps.dropdown.borderBottom
  },
  /**
   * 标题的字体大小
   * @default 14
   * */
  titleSize: {
    type: [Number, String],
    default: () => defProps.dropdown.titleSize
  },
  /**
   * 下拉出来的内容部分的圆角值
   * @default 0
   * */
  borderRadius: {
    type: [Number, String],
    default: () => defProps.dropdown.borderRadius
  },
  /**
   * 菜单右侧的icon图标
   * @default 'arrow-down'
   * */
  menuIcon: {
    type: String,
    default: () => defProps.dropdown.menuIcon
  },
  /**
   * 菜单右侧图标的大小
   * @default 14
   * */
  menuIconSize: {
    type: [Number, String],
    default: () => defProps.dropdown.menuIconSize
  }
}

export type SuDropdownProps = ExtractPropTypes<typeof dropdownProps>

export type SuDropdownProvide = {
  init: SuUni.Fn
  activeColor: SuDropdownProps['activeColor']
  inactiveColor: SuDropdownProps['inactiveColor']
  setMenuList: (list: SuUni.Recordable) => void
  close: SuUni.Fn
}

export const DROPDOWN_KEY: InjectionKey<SuDropdownProvide> = Symbol('su-dropdown')