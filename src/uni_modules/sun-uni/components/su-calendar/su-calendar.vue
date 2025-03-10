<template>
  <su-popup v-model="popupShow" mode="bottom" closeable @close="close" :round="round" :closeOnClickOverlay="closeOnClickOverlay">
    <view class="su-calendar">
      <uHeader :title="title" :subtitle="subtitle" :showSubtitle="showSubtitle" :showTitle="showTitle"></uHeader>
      <scroll-view
        :style="{
          height: addUnit(listHeight)
        }"
        scroll-y
        @scroll="onScroll"
        :scroll-top="scrollTop"
        :scrollIntoView="scrollIntoView"
      >
        <uMonth
          :color="color"
          :rowHeight="rowHeight"
          :showMark="showMark"
          :months="months"
          :mode="mode"
          :maxCount="maxCount"
          :startText="startText"
          :endText="endText"
          :defaultDate="defaultDate"
          :minDate="innerMinDate"
          :maxDate="innerMaxDate"
          :maxMonth="monthNum"
          :readonly="readonly"
          :maxRange="maxRange"
          :rangePrompt="rangePrompt"
          :showRangePrompt="showRangePrompt"
          :allowSameDay="allowSameDay"
          ref="month"
          @monthSelected="monthSelected"
          @updateMonthTop="updateMonthTop"
        ></uMonth>
      </scroll-view>
      <slot name="footer" v-if="showConfirm">
        <view class="su-calendar__confirm">
          <su-button
            shape="circle"
            :text="buttonDisabled ? confirmDisabledText : confirmText"
            :color="color"
            @click="confirm"
            :disabled="buttonDisabled"
          ></su-button>
        </view>
      </slot>
    </view>
  </su-popup>
</template>

<script lang="ts" setup>
import uHeader from './header.vue'
import uMonth from './month.vue'
import { calendarProps, type SuCalendarMonthProp } from './props'
import dayjs from 'dayjs/esm/index'
import Calendar from '../../libs/util/calendar'
import { addUnit, range, error, padZero } from '../../libs/function/index'
import test from '../../libs/function/test'
import { computed, nextTick, onMounted, ref, unref, watch } from 'vue'
import { isFunction } from 'lodash-es'
import type { SuUni } from '../../types/uni'
import { getFestival, isAddtionalWorkday } from './chinese-workday'
/**
 * Calendar 日历
 * @description  此组件用于单个选择日期，范围选择日期等，日历被包裹在底部弹起的容器中.
 * @tutorial https://suni.pages.dev/sun-uni/component/calendar.html
 *
 * @property {String}				title				标题内容 (默认 日期选择 )
 * @property {Boolean}				showTitle			是否显示标题  (默认 true )
 * @property {Boolean}				showSubtitle		是否显示副标题	(默认 true )
 * @property {String}				mode				日期类型选择  single-选择单个日期，multiple-可以选择多个日期，range-选择日期范围 （ 默认 'single' )
 * @property {String}				startText			mode=range时，第一个日期底部的提示文字  (默认 '开始' )
 * @property {String}				endText				mode=range时，最后一个日期底部的提示文字 (默认 '结束' )
 * @property {Array}				customList			自定义列表
 * @property {String}				color				主题色，对底部按钮和选中日期有效  (默认 ‘#3c9cff' )
 * @property {String | Number}		minDate				最小的可选日期	 (默认 0 )
 * @property {String | Number}		maxDate				最大可选日期  (默认 0 )
 * @property {Array | String| Date}	defaultDate			默认选中的日期，mode为multiple或range是必须为数组格式
 * @property {String | Number}		maxCount			mode=multiple时，最多可选多少个日期  (默认 	Number.MAX_SAFE_INTEGER  )
 * @property {String | Number}		rowHeight			日期行高 (默认 56 )
 * @property {Function}				formatter			日期格式化函数
 * @property {Boolean}				showLunar			是否显示农历  (默认 false )
 * @property {Boolean}				showMark			是否显示月份背景色 (默认 true )
 * @property {String}				confirmText			确定按钮的文字 (默认 '确定' )
 * @property {String}				confirmDisabledText	确认按钮处于禁用状态时的文字 (默认 '确定' )
 * @property {Boolean}				show				是否显示日历弹窗 (默认 false )
 * @property {Boolean}				closeOnClickOverlay	是否允许点击遮罩关闭日历 (默认 false )
 * @property {Boolean}				readonly	        是否为只读状态，只读状态下禁止选择日期 (默认 false )
 * @property {String | Number}		maxRange	        日期区间最多可选天数，默认无限制，mode = range时有效
 * @property {String}				rangePrompt	        范围选择超过最多可选天数时的提示文案，mode = range时有效
 * @property {Boolean}				showRangePrompt	    范围选择超过最多可选天数时，是否展示提示文案，mode = range时有效 (默认 true )
 * @property {Boolean}				allowSameDay	    是否允许日期范围的起止时间为同一天，mode = range时有效 (默认 false )
 * @property {Number|String}	    round				圆角值，默认无圆角  (默认 0 )
 * @property {Number|String}	    monthNum			最多展示的月份数量  (默认 3 )
 *
 * @event {Function()} confirm 		点击确定按钮时触发		选择日期相关的返回参数
 * @event {Function()} close 		日历关闭时触发			可定义页面关闭时的回调事件
 * @example <su-calendar  :defaultDate="defaultDateMultiple" :show="show" mode="multiple" @confirm="confirm">
	</su-calendar>
 * */

defineOptions({
  name: 'su-calendar',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps(calendarProps)
const emit = defineEmits(['confirm', 'close', 'update:show'])

// 开始时间的时间戳
const startDateNow = ref<number>(0)
/** 需要显示的月份的数组 */
const months = ref<SuCalendarMonthProp[]>([])
/** 在月份滚动区域中，当前视图中月份的index索引 */
const monthIndex = ref(0)
/** 月份滚动区域的高度 */
const listHeight = ref(0)
// month组件中选择的日期数组
const selected = ref<SuUni.Recordable[]>([])
const scrollIntoView = ref('')
const scrollIntoViewScroll = ref('')

// 弹窗显示
const popupShow = ref(false)
// 滚动的高度
const scrollTop = ref(0)
let innerFormatter = (value: SuCalendarMonthProp['date']) => value

// 由于maxDate和minDate可以为字符串(2021-10-10)，或者数值(时间戳)，但是dayjs如果接受字符串形式的时间戳会有问题，这里进行处理
const innerMaxDate = computed(() => {
  return test.number(`${props.maxDate}`) ? Number(props.maxDate) : props.maxDate
})

const innerMinDate = computed(() => {
  return test.number(`${props.minDate}`) ? Number(props.minDate) : props.minDate
})

const subtitle = computed(() => {
  // 初始化时，this.months为空数组，所以需要特别判断处理
  if (months.value.length) {
    return `${unref(months)[unref(monthIndex)].year}年${unref(months)[unref(monthIndex)].month}月`
  } else {
    return ''
  }
})

const buttonDisabled = computed(() => {
  // 如果为range类型，且选择的日期个数不足1个时，让底部的按钮出于disabled状态
  if (props.mode === 'range') {
    return unref(selected).length <= 1
  } else {
    return false
  }
})

/** 在微信小程序中，不支持将函数当做props参数，故只能通过ref形式调用 */
function setFormatter(formatter: Function) {
  if (formatter && isFunction(formatter)) {
    innerFormatter = formatter
  }
}

function monthSelected(e: SuUni.Recordable[], scene = 'init') {
  selected.value = e
  if (!props.showConfirm) {
    // 在不需要确认按钮的情况下，如果为单选，或者范围多选且已选长度大于2，则直接进行返还
    if (props.mode === 'multiple' || props.mode === 'single' || (props.mode === 'range' && unref(selected).length >= 2)) {
      if (scene === 'init') {
        return
      }
      if (scene === 'tap') {
        emit('confirm', selected.value)
      }
    }
  }
}

function init() {
  // 校验maxDate，不能小于minDate。
  if (unref(innerMaxDate) && unref(innerMinDate) && new Date(unref(innerMaxDate)!).getTime() < new Date(unref(innerMinDate)!).getTime()) {
    return error('maxDate不能小于minDate时间')
  }
  // 滚动区域的高度
  listHeight.value = Number(props.rowHeight) * 5 + 30
  setMonth()
}

function close() {
  emit('close')
}

function confirm() {
  if (!unref(buttonDisabled)) {
    emit('confirm', unref(selected))
  }
}

// 获得两个日期之间的月份数
function getMonths(minDate: dayjs.ConfigType, maxDate: dayjs.ConfigType) {
  const minYear = dayjs(minDate).year()
  const minMonth = dayjs(minDate).month() + 1
  const maxYear = dayjs(maxDate).year()
  const maxMonth = dayjs(maxDate).month() + 1
  return (maxYear - minYear) * 12 + (maxMonth - minMonth) + 1
}

// 设置月份数据
function setMonth() {
  // 最小日期的毫秒数
  const minDate = unref(innerMinDate) || dayjs().valueOf()
  // 如果没有指定最大日期，则往后推3个月
  const maxDate =
    unref(innerMaxDate) ||
    dayjs(minDate)
      .add(Number(props.monthNum) - 1, 'month')
      .valueOf()
  // 最大最小月份之间的共有多少个月份，
  const newMonths = range(1, Number(props.monthNum), getMonths(minDate, maxDate))
  // 先清空月份
  months.value = []
  const monthData: SuCalendarMonthProp[] = []

  // 月份循环函数
  function monthMapFunc(_: any, i: number, index: number): SuCalendarMonthProp['date'][0] {
    // 日期，取值1-31
    let day = i + 1
    // 星期，0-6，0为周日
    const week = dayjs(minDate).add(index, 'month').date(day).day()
    const date = dayjs(minDate).add(index, 'month').date(day).format('YYYY-MM-DD')
    let bottomInfo = ''
    if (props.showLunar) {
      // 将日期转为农历格式
      const lunar = Calendar.solar2lunar(dayjs(date).year(), dayjs(date).month() + 1, dayjs(date).date()) as {
        IDayCn: string
        lDay: number
        IMonthCn: string
      }
      bottomInfo = lunar.lDay === 1 ? lunar.IMonthCn : lunar.IDayCn
    }

    if (props.showWordDay) {
      // 将日期转为工作日格式
      bottomInfo = getFestival(date)
    }

    const config: SuCalendarMonthProp['date'][0] = {
      day,
      week,
      // 小于最小允许的日期，或者大于最大的日期，则设置为disabled状态
      disabled: dayjs(date).isBefore(dayjs(minDate).format('YYYY-MM-DD')) || dayjs(date).isAfter(dayjs(maxDate).format('YYYY-MM-DD')),
      // 返回一个日期对象，供外部的formatter获取当前日期的年月日等信息，进行加工处理
      date: new Date(date),
      bottomInfo,
      dot: false,
      month: dayjs(minDate).add(index, 'month').month() + 1,
      isWeekendsWorkday: props.showWordDay ? isAddtionalWorkday(date) : false
    }
    const formatter = props.formatter || innerFormatter
    return formatter(config)
  }

  for (let index = 0; index < newMonths; index++) {
    const newDate = new Array(dayjs(minDate).add(index, 'month').daysInMonth()).fill(1).map((item, idx) => monthMapFunc(item, idx, index))
    const item = {
      date: newDate,
      // 当前所属的月份
      month: dayjs(minDate).add(index, 'month').month() + 1,
      // 当前年份
      year: dayjs(minDate).add(index, 'month').year(),
      top: 0
    }
    monthData.push(item)
  }
  // 赋值
  months.value = monthData
}

function scrollIntoDefaultMonth(selectData: string) {
  // 查询默认日期在可选列表的下标
  const _index = unref(months).findIndex(({ year, month }) => {
    month = padZero(month)
    return `${year}-${month}` === selectData
  })
  if (_index !== -1) {
    // #ifndef MP-WEIXIN
    nextTick(() => {
      scrollIntoView.value = `month-${_index}`
      scrollIntoViewScroll.value = scrollIntoView.value
    })
    // #endif
    // #ifdef MP-WEIXIN
    scrollTop.value = unref(months)[_index].top || 0
    // #endif
  }
}

/** scroll-view滚动监听 */
function onScroll(event: UniHelper.ScrollViewOnScrollEvent) {
  // 不允许小于0的滚动值，如果scroll-view到顶了，继续下拉，会出现负数值
  const scrollTop = Math.max(0, event.detail.scrollTop)
  // 将当前滚动条数值，除以滚动区域的高度，可以得出当前滚动到了哪一个月份的索引
  for (let i = 0; i < unref(months).length; i++) {
    if (scrollTop >= (unref(months)[i].top || unref(listHeight))) {
      monthIndex.value = i
      scrollIntoViewScroll.value = `month-${i}`
    }
  }
}

// 更新月份的top值
function updateMonthTop(topArr = []) {
  // 设置对应月份的top值，用于onScroll方法更新月份
  topArr.map((item, index) => {
    unref(months)[index].top = item
  })
  // 获取默认日期的下标
  if (!props.defaultDate) {
    // 如果没有设置默认日期，则将当天日期设置为默认选中的日期
    const selected = dayjs().format('YYYY-MM')
    scrollIntoDefaultMonth(selected)
    return
  }
  let selected = dayjs().format('YYYY-MM')
  // 单选模式，可以是字符串或数组，Date对象等
  if (!test.array(props.defaultDate)) {
    selected = dayjs(props.defaultDate as dayjs.ConfigType).format('YYYY-MM')
  } else {
    selected = dayjs((props.defaultDate as any)[0] as dayjs.ConfigType).format('YYYY-MM')
  }
  scrollIntoDefaultMonth(selected)
}

// 多个条件的变化，会引起选中日期的变化，这里统一管理监听
watch(
  () => [innerMinDate.value, innerMaxDate.value, props.defaultDate],
  () => {
    setMonth()
  },
  { immediate: true }
)

watch(
  () => props.show,
  (val) => {
    popupShow.value = !!val
    if (val) setMonth()
    else {
      // 关闭时重置scrollIntoView，否则会出现二次打开日历，当前月份数据显示不正确。
      // scrollIntoView需要有一个值变动过程，才会产生作用。
      scrollIntoView.value = ''
    }
  },
  { immediate: true }
)

watch(
  () => popupShow.value,
  () => {
    emit('update:show', popupShow.value)
  }
)

onMounted(() => {
  startDateNow.value = Date.now()
  init()
})

defineExpose({
  setFormatter
})
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';

.su-calendar {
  &__confirm {
    padding: 7px 18px;
  }
}
</style>
