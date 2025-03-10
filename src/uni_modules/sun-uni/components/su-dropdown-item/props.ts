import defProps from '../../libs/config/props'
import type { ExtractPropTypes, PropType } from 'vue'
import type { SuUni } from '../../types/uni'


export const dropdownItemProps = {
  /**
   * 当前选中项的value值
   * */
  modelValue: {
    type: [Number, String, Array],
    default: ''
  },
  /**
   * 菜单项标题
   * */
  title: {
    type: [String, Number],
    default: ''
  },
  /**
   * 选项数据，如果传入了默认slot，此参数无效
   * */
  options: {
    type: Array as PropType<SuUni.Recordable[]>,
    default() {
      return []
    }
  },
  /**
   * 是否禁用此菜单项
   * @default false
   * */
  disabled: {
    type: Boolean,
    default: () => defProps.dropdownItem.disabled
  },
  /**
   * 下拉弹窗的高度
   * @default 'auto'
   * */
  height: {
    type: [Number, String],
    default: () => defProps.dropdownItem.height
  },
  /**
   * 点击遮罩是否可以收起弹窗
   * @default true
   * */
  closeOnClickOverlay: {
    type: Boolean,
    default: () => defProps.dropdownItem.closeOnClickOverlay
  }
}

export type SuDropdownItemProps = ExtractPropTypes<typeof dropdownItemProps>