import defProps from '../../libs/config/props'
import type { ExtractPropTypes, PropType } from 'vue'
import { pick } from 'lodash-es'
import type { SuUni } from '../../types/uni'

export const calendarProps = {
  /** 
   * 日历顶部标题
   * @default '日期选择'
   */
  title: {
    type: String,
    default: () => defProps.calendar.title
  },
  /**
   * 是否显示标题
   * @default true
   * */
  showTitle: {
    type: Boolean,
    default: () => defProps.calendar.showTitle
  },
  /**
   * 是否显示副标题
   * @default true
   * */
  showSubtitle: {
    type: Boolean,
    default: () => defProps.calendar.showSubtitle
  },
  /**
   * 日期类型选择，single-选择单个日期，multiple-可以选择多个日期，range-选择日期范围
   * @default 'single'
   * */
  mode: {
    type: String as PropType<'single' | 'multiple' | 'range'>,
    default: () => defProps.calendar.mode
  },
  /**
   * mode=range时，第一个日期底部的提示文字
   * @default '开始'
   * */
  startText: {
    type: String,
    default: () => defProps.calendar.startText
  },
  /**
   * mode=range时，最后一个日期底部的提示文字
   * @default '结束'
   * */
  endText: {
    type: String,
    default: () => defProps.calendar.endText
  },
  /**
   * 自定义列表
   * */
  customList: {
    type: Array,
    default: () => defProps.calendar.customList
  },
  /**
   * 主题色，对底部按钮和选中日期有效
   * @default '#3c9cff'
   * */
  color: {
    type: String,
    default: () => defProps.calendar.color
  },
  /**
   * 最小的可选日期
   * @default 0
   * */
  minDate: {
    type: [String, Number],
    default: () => defProps.calendar.minDate
  },
  /**
   * 最大可选日期
   * @default 0
   * */
  maxDate: {
    type: [String, Number],
    default: () => defProps.calendar.maxDate
  },
  /**
   * 默认选中的日期，mode为multiple或range是必须为数组格式
   * */
  defaultDate: {
    type: [Array, String, Date, null],
    default: () => defProps.calendar.defaultDate
  },
  /**
   * mode=multiple时，最多可选多少个日期
   * @default Number.MAX_SAFE_INTEGER
   * */
  maxCount: {
    type: [String, Number],
    default: () => defProps.calendar.maxCount
  },
  /**
   * 日期行高
   * @default 56
   * */
  rowHeight: {
    type: [String, Number],
    default: () => defProps.calendar.rowHeight
  },
  /**
   * 日期格式化函数
   * */
  formatter: {
    type: [Function, null],
    default: () => defProps.calendar.formatter
  },
  /**
   * 是否显示农历
   * @default false
   * */
  showLunar: {
    type: Boolean,
    default: () => defProps.calendar.showLunar
  },
  /**
   * 是否显示工作日
   * @default false
   * */
  showWordDay: {
    type: Boolean,
    default: () => defProps.calendar.showWordDay
  },
  /**
   * 是否显示月份背景色
   * @default true
   * */
  showMark: {
    type: Boolean,
    default: () => defProps.calendar.showMark
  },
  /** 
   * 确定按钮的文字
   * @default '确定'
   *  */
  confirmText: {
    type: String,
    default: () => defProps.calendar.confirmText
  },
  /**
   * 确认按钮处于禁用状态时的文字
   * @default '确定'
   * */
  confirmDisabledText: {
    type: String,
    default: () => defProps.calendar.confirmDisabledText
  },
  /**
   * 是否显示日历弹窗
   * @default false
   * */
  show: {
    type: Boolean,
    default: () => defProps.calendar.show
  },
  /**
   * 是否允许点击遮罩关闭日历
   * @default false
   * */
  closeOnClickOverlay: {
    type: Boolean,
    default: () => defProps.calendar.closeOnClickOverlay
  },
  /**
   * 是否为只读状态，只读状态下禁止选择日期
   * @default false
   * */
  readonly: {
    type: Boolean,
    default: () => defProps.calendar.readonly
  },
  /**
   * 是否展示确认按钮
   * @default true
   * */
  showConfirm: {
    type: Boolean,
    default: () => defProps.calendar.showConfirm
  },
  /**
   * 日期区间最多可选天数，默认无限制，mode = range时有效
   * @default  Number.MAX_SAFE_INTEGER
   * */
  maxRange: {
    type: [Number, String],
    default: () => defProps.calendar.maxRange
  },
  /**
   * 范围选择超过最多可选天数时的提示文案，mode = range时有效
   * */
  rangePrompt: {
    type: String,
    default: () => defProps.calendar.rangePrompt
  },
  /**
   * 范围选择超过最多可选天数时，是否展示提示文案，mode = range时有效
   * @default true
   * */
  showRangePrompt: {
    type: Boolean,
    default: () => defProps.calendar.showRangePrompt
  },
  /**
   * 是否允许日期范围的起止时间为同一天，mode = range时有效
   * @default false
   * */
  allowSameDay: {
    type: Boolean,
    default: () => defProps.calendar.allowSameDay
  },
  /**
   * 圆角值
   * @default 0
   * */
  round: {
    type: [Boolean, String, Number],
    default: () => defProps.calendar.round
  },
  /**
   * 最多展示月份数量
   * @default 3
   * */
  monthNum: {
    type: [Number, String],
    default: () => defProps.calendar.monthNum
  },
  /**
   * 星期文案
   * @default ['一', '二', '三', '四', '五', '六', '日']
   * */
  weekText: {
    type: Array as PropType<string[]>,
    default: defProps.calendar.weekText
  },
  /** 禁用日期 */
  forbidDays: {
    type: Array,
    default: defProps.calendar.forbidDays
  },
  /** 
   * 禁用日期提示文本
   * @default '该日期已禁用'
   */
  forbidDaysToast: {
    type: String,
    default: defProps.calendar.forbidDaysToast
  },
}

export const calendarMonthProps = {
  ...pick(calendarProps, ['showMark', 'color', 'mode', 'rowHeight', 'maxCount', 'startText', 'endText', 'defaultDate', 'minDate', 'maxDate', 'readonly', 'maxRange', 'rangePrompt', 'showRangePrompt', 'allowSameDay', 'forbidDays', 'forbidDaysToast']),
  /**
   * 月份数据
   * */
  months: {
    type: Array as PropType<SuUni.Recordable[]>,
    default: () => []
  },
  /**
  * 如果没有设置maxDate，则往后推多少个月
  * @default 2
  * */
  maxMonth: {
    type: [String, Number],
    default: 2
  },
}

export type SuCalendarProps = ExtractPropTypes<typeof calendarProps>

export type SuCalendarMonthProp = {
  year: number
  month: number | string
  top: number
  date: {
    day: number;
    week: number;
    disabled: boolean;
    date: Date;
    bottomInfo: string;
    dot: boolean;
    month: number;
    // 是否为调休工作日
    isWeekendsWorkday: boolean;
  }[]
}
