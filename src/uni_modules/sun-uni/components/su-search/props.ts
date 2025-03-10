import defProps from '../../libs/config/props'
import type { SuUni } from '../../types/uni'
import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'

export const searchProps = {
  /**
   * 搜索框形状，round-圆形，square-方形
   * @default round
   * */
  shape: {
    type: String as PropType<'round' | 'square'>,
    default: () => defProps.search.shape
  },
  /**
   *  搜索框背景色，默认值#f2f2f2
   * @default #f2f2f2
   */
  bgColor: {
    type: String,
    default: () => defProps.search.bgColor
  },
  /**
   * 占位提示文字
   * @default '请输入关键字'
   * */
  placeholder: {
    type: String,
    default: () => defProps.search.placeholder
  },
  /**
   * 是否启用清除控件
   * @default true
   * */
  clearable: {
    type: Boolean,
    default: () => defProps.search.clearable
  },
  /**
   * 是否自动聚焦
   * @default false
   * */
  focus: {
    type: Boolean,
    default: () => defProps.search.focus
  },
  /**
   * 是否在搜索框右侧显示取消按钮
   * @default true
   * */
  showAction: {
    type: Boolean,
    default: () => defProps.search.showAction
  },
  /**
   * 右边控件的样式
   * @default {}
   * */
  actionStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => defProps.search.actionStyle
  },
  /**
   * 取消按钮文字
   * @default '搜索'
   * */
  actionText: {
    type: String,
    default: () => defProps.search.actionText
  },
  /**
   * 输入框内容对齐方式，可选值为 left|center|right
   * @default 'left'
   * */
  inputAlign: {
    type: String as PropType<SuUni.Align>,
    default: () => defProps.search.inputAlign
  },
  /**
   * input输入框的样式，可以定义文字颜色，大小等，对象形式
   * @default {}
   * */
  inputStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => defProps.search.inputStyle
  },
  /**
   * 是否启用输入框
   * @default false
   * */
  disabled: {
    type: Boolean,
    default: () => defProps.search.disabled
  },
  /**
   * 边框颜色
   * @default 'transparent'
   * */
  borderColor: {
    type: String,
    default: () => defProps.search.borderColor
  },
  /**
   * 搜索图标的颜色，默认同输入框字体颜色
   * @default '#909399'
   * */
  searchIconColor: {
    type: String,
    default: () => defProps.search.searchIconColor
  },
  /**
   * 输入框字体颜色
   * @default '#606266'
   * */
  color: {
    type: String,
    default: () => defProps.search.color
  },
  /**
   * placeholder的颜色
   * @default '#909399'
   * */
  placeholderColor: {
    type: String,
    default: () => defProps.search.placeholderColor
  },
  /**
   * 左边输入框的图标，可以为SuIon图标名称或图片路径
   * @default 'search'
   * */
  searchIcon: {
    type: String,
    default: () => defProps.search.searchIcon
  },
  /**
   * 左边输入框的图标大小
   * @default 22
   * */
  searchIconSize: {
    type: [Number, String],
    default: () => defProps.search.searchIconSize
  },
  /**
   * 组件与其他上下左右元素之间的距离，带单位的字符串形式，如"30px"、"30px 20px"等写法
   * @default '0'
   * */
  margin: {
    type: String,
    default: () => defProps.search.margin
  },
  /**
   * 开启showAction时，是否在input获取焦点时才显示
   * @default false
   * */
  animation: {
    type: Boolean,
    default: () => defProps.search.animation
  },
  /**
   * 输入框的初始化内容
   * @default ''
   * */
  modelValue: {
    type: String,
    default: () => defProps.search.value
  },
  value: {
    type: String,
    default: () => defProps.search.value
  },
  /**
   * 输入框最大能输入的长度，-1为不限制长度(来自uniapp文档)
   * @default -1
   * */
  maxlength: {
    type: [String, Number],
    default: () => defProps.search.maxlength
  },
  /**
   * 搜索框高度，单位px
   * @default 32
   * */
  height: {
    type: [String, Number],
    default: () => defProps.search.height
  },
  /**
   * 搜索框左侧文本
   * @default null
   * */
  label: {
    type: [String, Number],
    default: () => defProps.search.label
  },
  /**
   * 键盘弹起时，是否自动上推页面
   * @default true
   * */
  adjustPosition: {
    type: Boolean,
    default: () => defProps.search.adjustPosition
  },
  /**
   * 键盘收起时，是否自动失去焦点
   * @default false
   * */
  autoBlur: {
    type: Boolean,
    default: () => defProps.search.autoBlur
  }
}

export type SuSearchProps = ExtractPropTypes<typeof searchProps>