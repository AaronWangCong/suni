import defProps from '../../libs/config/props'
import type { ExtractPropTypes, PropType } from 'vue'
import type { SuUni } from '../../types/uni'

export const datetimePickerProps = {
  /**
   * 是否显示input
   * @default false
   * */
  hasInput: {
    type: Boolean,
    default: () => false
  },
  /**
   * input 是否禁用
   * @default false
   * */
  disabled: {
    type: Boolean,
    default: () => false
  },
  /**
  * 是否input的placeholder
  * @default '请选择'
  * */
  placeholder: {
    type: String,
    default: () => '请选择'
  },
  /**
* 格式化
* @default ''
* */
  format: {
    type: String,
    default: () => ''
  },
  /**
   * 是否打开组件
   * @default false
   * */
  show: {
    type: Boolean,
    default: () => defProps.datetimePicker.show
  },
  /**
   * 弹出的方向，可选值为 top bottom right left center
   * @default 'bottom'
   * */
  popupMode: {
    type: String as PropType<SuUni.Position | 'center'>,
    default: () => defProps.picker.popupMode
  },
  /**
   * 是否展示顶部的操作栏
   * @default true
   * */ 
  showToolbar: {
    type: Boolean,
    default: () => defProps.datetimePicker.showToolbar
  },
  /**
   * 工具栏右侧内容
   * @default false
   * */ 
  toolbarRightSlot: {
    type: Boolean,
    default: false
  },
  /**
   * 绑定值
   * */ 
  modelValue: {
    type: [String, Number],
    default: () => defProps.datetimePicker.value
  },
  /**
   * 顶部标题
   * */ 
  title: {
    type: String,
    default: () => defProps.datetimePicker.title
  },
  /**  展示格式，mode=date为日期选择，mode=time为时间选择，mode=year-month为年月选择，mode=datetime为日期时间选择 */
  mode: {
    type: String as PropType<'datetime' | 'date' | 'time' | 'year-month'>,
    default: () => defProps.datetimePicker.mode
  },
  /**
   * 可选的最大时间
   * @default new Date(new Date().getFullYear() + 10, 0, 1).getTime()
   * */ 
  maxDate: {
    type: Number,
    // 最大默认值为后10年
    default: () => defProps.datetimePicker.maxDate
  },
  /**
   * 可选的最小时间
   * @default new Date(new Date().getFullYear() - 10, 0, 1).getTime()
   * */ 
  minDate: {
    type: Number,
    // 最小默认值为前10年
    default: () => defProps.datetimePicker.minDate
  },
  /**
   * 可选的最小小时，仅mode=time有效
   * @default 0
   * */ 
  minHour: {
    type: Number,
    default: () => defProps.datetimePicker.minHour
  },
  /** 
   * 可选的最大小时，仅mode=time有效
   * @default 23
   *  */ 
  maxHour: {
    type: Number,
    default: () => defProps.datetimePicker.maxHour
  },
  /**
   * 可选的最小分钟，仅mode=time有效
   * @default 0
   * */ 
  minMinute: {
    type: Number,
    default: () => defProps.datetimePicker.minMinute
  },
  /**
   * 可选的最大分钟，仅mode=time有效
   * @default 59
   * */ 
  maxMinute: {
    type: Number,
    default: () => defProps.datetimePicker.maxMinute
  },
  /**
   * 选项过滤函数
   * @default null
   * */ 
  filter: {
    type: [Function, null],
    default: () => defProps.datetimePicker.filter
  },
  /**
   * 选项格式化函数
   * @default null
   * */ 
  formatter: {
    type: [Function, null],
    default: () => defProps.datetimePicker.formatter
  },
  /**
   * 是否显示加载中状态
   * @default false
   * */ 
  loading: {
    type: Boolean,
    default: () => defProps.datetimePicker.loading
  },
  /**
   * 各列中，单个选项的高度
   * @default 44
   * */ 
  itemHeight: {
    type: [String, Number],
    default: () => defProps.datetimePicker.itemHeight
  },
  /**
   * 取消按钮的文字
   * @default '取消'
   * */ 
  cancelText: {
    type: String,
    default: () => defProps.datetimePicker.cancelText
  },
  /**
   * 确认按钮的文字
   * @default '确认'
   * */ 
  confirmText: {
    type: String,
    default: () => defProps.datetimePicker.confirmText
  },
  /**
   * 取消按钮的颜色
   * @default '#909193'
   * */ 
  cancelColor: {
    type: String,
    default: () => defProps.datetimePicker.cancelColor
  },
  /**
   * 确认按钮的颜色
   * @default '#3c9cff'
   * */ 
  confirmColor: {
    type: String,
    default: () => defProps.datetimePicker.confirmColor
  },
  /**
   * 每列中可见选项的数量
   * @default 5
   * */ 
  visibleItemCount: {
    type: [String, Number],
    default: () => defProps.datetimePicker.visibleItemCount
  },
  /**
   * 是否允许点击遮罩关闭选择器
   * @default false
   * */ 
  closeOnClickOverlay: {
    type: Boolean,
    default: () => defProps.datetimePicker.closeOnClickOverlay
  },
  /**
   * 各列的默认索引
   * */ 
  defaultIndex: {
    type: Array,
    default: () => defProps.datetimePicker.defaultIndex
  }
}

export type SuDatetimePickerProps = ExtractPropTypes<typeof datetimePickerProps>
