<template>
  <view class="su-datetime-picker">
    <view v-if="hasInput" class="su-datetime-picker__has-input" @click="onShowByClickInput">
      <slot name="trigger" :value="inputValue">
        <su-input :placeholder="placeholder" :readonly="!!showByClickInput" border="surround" v-model="inputValue" :disabled="disabled"></su-input>
        <div class="input-cover"></div>
      </slot>
    </view>
    <su-picker
      ref="picker"
      :show="show || (hasInput && showByClickInput)"
      :popupMode="popupMode"
      :closeOnClickOverlay="closeOnClickOverlay"
      :columns="columns"
      :title="title"
      :itemHeight="itemHeight"
      :showToolbar="showToolbar"
      :visibleItemCount="visibleItemCount"
      :defaultIndex="innerDefaultIndex"
      :cancelText="cancelText"
      :confirmText="confirmText"
      :cancelColor="cancelColor"
      :confirmColor="confirmColor"
      :toolbarRightSlot="toolbarRightSlot"
      @close="close"
      @cancel="cancel"
      @confirm="confirm"
      @change="change"
    >
      <template #toolbar-right>
        <slot name="toolbar-right"></slot>
      </template>
      <template #toolbar-bottom>
        <slot name="toolbar-bottom"></slot>
      </template>
    </su-picker>
  </view>
</template>

<script lang="ts" setup>
import { datetimePickerProps, type SuDatetimePickerProps } from './props'
import dayjs from 'dayjs/esm/index'
import { range, error, padZero } from '../../libs/function/index'
import { baseProps } from '../../libs/vue'
import { ref, unref, watch } from 'vue'
import type { SuUni } from '../../types/uni'
import { isFunction } from 'lodash-es'
/**
 * DatetimePicker 时间日期选择器
 * @description 此选择器用于时间日期
 * @tutorial https://suni.pages.dev/sun-uni/component/datetimePicker.html
 * @property {Boolean}			show				用于控制选择器的弹出与收起 ( 默认 false )
 * @property {Boolean}			showToolbar			是否显示顶部的操作栏  ( 默认 true )
 * @property {String | Number}	modelValue		    绑定值
 * @property {String}			title				顶部标题
 * @property {String}			mode				展示格式 mode=date为日期选择，mode=time为时间选择，mode=year-month为年月选择，mode=datetime为日期时间选择  ( 默认 ‘datetime )
 * @property {Number}			maxDate				可选的最大时间  默认值为后10年
 * @property {Number}			minDate				可选的最小时间  默认值为前10年
 * @property {Number}			minHour				可选的最小小时，仅mode=time有效   ( 默认 0 )
 * @property {Number}			maxHour				可选的最大小时，仅mode=time有效	  ( 默认 23 )
 * @property {Number}			minMinute			可选的最小分钟，仅mode=time有效	  ( 默认 0 )
 * @property {Number}			maxMinute			可选的最大分钟，仅mode=time有效   ( 默认 59 )
 * @property {Function}			filter				选项过滤函数
 * @property {Function}			formatter			选项格式化函数
 * @property {Boolean}			loading				是否显示加载中状态   ( 默认 false )
 * @property {String | Number}	itemHeight			各列中，单个选项的高度   ( 默认 44 )
 * @property {String}			cancelText			取消按钮的文字  ( 默认 '取消' )
 * @property {String}			confirmText			确认按钮的文字  ( 默认 '确认' )
 * @property {String}			cancelColor			取消按钮的颜色  ( 默认 '#909193' )
 * @property {String}			confirmColor		确认按钮的颜色  ( 默认 '#3c9cff' )
 * @property {String | Number}	visibleItemCount	每列中可见选项的数量  ( 默认 5 )
 * @property {Boolean}			closeOnClickOverlay	是否允许点击遮罩关闭选择器  ( 默认 false )
 * @property {Array}			defaultIndex		各列的默认索引
 * @event {Function} close 关闭选择器时触发
 * @event {Function} confirm 点击确定按钮，返回当前选择的值
 * @event {Function} change 当选择值变化时触发
 * @event {Function} cancel 点击取消按钮
 * @example  <su-datetime-picker :show="show" :value="value1"  mode="datetime" ></su-datetime-picker>
 */

defineOptions({
  name: 'su-datetime-picker',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps({
  ...datetimePickerProps,
  ...baseProps
})

const emit = defineEmits(['close', 'cancel', 'confirm', 'change', 'update:modelValue'])

// 原来的日期选择器不方便，这里增加一个hasInput选项支持类似element的自带输入框的功能。
const inputValue = ref<SuDatetimePickerProps['modelValue']>('')
/**
 * 控制是否通过点击输入框显示选择器
 */
const showByClickInput = ref(false)
/**
 * 存储选择器各列的数据
 */
const columns = ref<SuUni.Recordable[]>([])
/**
 * 存储选择器各列的默认索引
 */
const innerDefaultIndex = ref([])
/**
 * 内部格式化函数，用于格式化选择器中的选项
 */
let innerFormatter = (type: string, value: string) => value
/**
 * 存储选择器的内部值
 */
const innerValue = ref<SuDatetimePickerProps['modelValue']>('')


/**
 * 生成一个包含指定次数迭代结果的数组
 * @param {number} n - 迭代的次数
 * @param {function} iteratee - 每次迭代调用的函数
 * @returns {Array} - 包含迭代结果的数组
 */
function times(n: number, iteratee: (arg0: number) => any) {
  // 初始化索引
  let index = -1
  // 创建一个长度为 n 的数组，如果 n 为负数则长度为 0
  const result = Array(n < 0 ? 0 : n)
  // 循环迭代
  while (++index < n) {
    // 调用迭代函数并将结果存储在数组中
    result[index] = iteratee(index)
  }
  return result
}

/**
 * 根据选择的时间值更新输入框的值
 * @param {SuDatetimePickerProps['modelValue']} newValue - 新的时间值
 */
function getInputValue(newValue: SuDatetimePickerProps['modelValue']) {
  // 如果新值为空或未定义，则将输入框的值设为空
  if (newValue == '' || !newValue || newValue == undefined) {
    inputValue.value = ''
    return
  }

  // 如果模式为时间模式，则直接将新值赋给输入框
  if (props.mode === 'time') {
    inputValue.value = newValue
  } else {
    // 如果有自定义格式，则使用自定义格式格式化新值
    if (props.format) {
      inputValue.value = dayjs(newValue).format(props.format)
    } else {
      // 根据不同的模式设置默认格式
      let format = ''
      switch (props.mode) {
        case 'date':
          format = 'YYYY-MM-DD'
          break
        case 'year-month':
          format = 'YYYY-MM'
          break
        case 'datetime':
          format = 'YYYY-MM-DD HH:mm'
          break
        default:
          break
      }
      // 使用默认格式格式化新值
      inputValue.value = dayjs(newValue).format(format)
      console.log(inputValue.value, 'inputValue.value')
    }
  }
}

/**
 * 初始化组件状态
 */
function init() {
  // 校正传入的时间值
  innerValue.value = correctValue(props.modelValue)
  console.log(props.modelValue, 'props.modelValue')
  // 根据校正后的值更新列数据
  updateColumnValue(unref(innerValue))
  // 根据校正后的值更新输入框的值
  getInputValue(unref(innerValue))
}

/**
 * 设置格式化函数
 * @param {Function} func - 格式化函数
 */
function setFormatter(func: Function) {
  // 如果传入的函数有效，则将其设置为内部格式化函数
  if (func && isFunction(func)) {
    innerFormatter = func
  }
}

/**
 * 关闭选择器
 */
function close() {
  // 如果允许点击遮罩关闭选择器，则触发关闭事件
  if (props.closeOnClickOverlay) {
    emit('close')
  }
}

/**
 * 取消选择
 */
function cancel() {
  // 如果有输入框，则隐藏输入框触发的选择器显示状态
  if (props.hasInput) {
    showByClickInput.value = false
  }
  // 触发取消事件
  emit('cancel')
}

/**
 * 确认选择
 */
function confirm() {
  // 更新绑定的值
  emit('update:modelValue', unref(innerValue))
  if (props.hasInput) {
    // 根据确认的值更新输入框的值
    getInputValue(unref(innerValue))
    // 隐藏输入框触发的选择器显示状态
    showByClickInput.value = false
  }
  // 触发确认事件，传递选择的值和模式
  emit('confirm', {
    value: unref(innerValue),
    mode: props.mode
  })
}

/**
 * 用正则截取输出值，当出现多组数字时，抛出错误
 * @param {any} e - 输入的值
 * @param {any} [type] - 类型，可选
 * @returns {number|string} - 截取后的结果
 */
function intercept(e: any, type?: any) {
  // 使用正则表达式匹配数字
  let judge = e.match(/\d+/g)
  // 判断是否掺杂多个数字
  if (judge!.length > 1) {
    // 抛出错误信息
    error('请勿在过滤或格式化函数时添加数字')
    return 0
  } else if (type && judge![0].length == 4) {
    // 判断是否是年份
    return judge![0]
  } else if (judge![0].length > 2) {
    // 抛出错误信息
    error('请勿在过滤或格式化函数时添加数字')
    return 0
  } else {
    return judge![0]
  }
}

/**
 * 当选择值变化时触发
 * @param {Object} e - 包含索引和值的对象
 * @param {any} e.indexs - 选择的索引
 * @param {any} e.values - 选择的值
 */
function change(e: { indexs: any; values: any }) {
  const { indexs, values } = e
  let selectValue: SuDatetimePickerProps['modelValue'] = ''
  // 如果是时间模式
  if (props.mode === 'time') {
    // 根据value各列索引，从各列数组中，取出当前时间的选中值
    selectValue = `${intercept(values[0][indexs[0]])}:${intercept(values[1][indexs[1]])}`
  } else {
    // 将选择的值转为数值，比如'03'转为数值的3，'2019'转为数值的2019
    const year = parseInt(intercept(values[0][indexs[0]], 'year'))
    const month = parseInt(intercept(values[1][indexs[1]]))
    let date = parseInt(values[2] ? intercept(values[2][indexs[2]]) : 1)
    let hour = 0,
      minute = 0
    // 此月份的最大天数
    const maxDate = dayjs(`${year}-${month}`).daysInMonth()
    // year-month模式下，date不会出现在列中，设置为1，为了符合后边需要减1的需求
    if (props.mode === 'year-month') {
      date = 1
    }
    // 不允许超过maxDate值
    date = Math.min(maxDate, date)
    if (props.mode === 'datetime') {
      hour = parseInt(intercept(values[3][indexs[3]]))
      minute = parseInt(intercept(values[4][indexs[4]]))
    }
    // 转为时间模式
    selectValue = Number(new Date(year, month - 1, date, hour, minute))
  }
  // 取出准确的合法值，防止超越边界的情况
  selectValue = correctValue(selectValue)
  innerValue.value = selectValue
  // 根据选择的值更新列数据
  updateColumnValue(selectValue)
  // 发出change事件，value为当前选中的时间戳
  emit('change', {
    value: selectValue,
    mode: props.mode
  })
}

/**
 * 根据选择的值更新列数据和默认索引
 * @param {SuDatetimePickerProps['modelValue']} value - 选择的值
 */
function updateColumnValue(value: SuDatetimePickerProps['modelValue']) {
  // 更新内部值
  innerValue.value = value
  // 更新列数据
  updateColumns()
  // 延迟执行，等待su-picker组件列数据更新完后再设置选中值索引
  setTimeout(() => {
    // 更新默认索引
    updateIndexs(value)
  }, 0)
}

/**
 * 更新列数据
 */
function updateColumns() {
  // 获取格式化函数
  const formatter = props.formatter || unref(innerFormatter)
  // 获取各列的值，并且map后，对各列的具体值进行补0操作
  const results = getOriginColumns().map((column) => column.values.map((value) => formatter(column.type, value)))
  // 更新列数据
  columns.value = results
}

/**
 * 获取原始的列数据
 * @returns {Array} - 包含各列信息的数组
 */
function getOriginColumns() {
  // 生成各列的值
  const results = getRanges().map(({ type, range }) => {
    let values = times(range[1]! - range[0]! + 1, (index) => {
      const value = range[0]! + index
      return type === 'year' ? `${value}` : padZero(value)
    })
    // 进行过滤
    if (props.filter) {
      values = props.filter(type, values)
      if (!values || (values && values.length == 0)) {
        // uni.showToast({
        // 	title: '日期filter结果不能为空',
        // 	icon: 'error',
        // 	mask: true
        // })
        console.log('日期filter结果不能为空')
      }
    }
    return { type, values }
  })
  return results
}

/**
 * 生成一个从 start 到 end 的数组
 * @param {number|undefined} start - 起始值
 * @param {number} end - 结束值
 * @returns {Array} - 生成的数组
 */
function generateArray(start: number | undefined, end: number) {
  return Array.from(new Array(end + 1).keys()).slice(start)
}

/**
 * 获取各列的范围
 * @returns {Array} - 包含各列范围的数组
 */
function getRanges() {
  // 如果是时间模式
  if (props.mode === 'time') {
    return [
      {
        type: 'hour',
        range: [props.minHour, props.maxHour]
      },
      {
        type: 'minute',
        range: [props.minMinute, props.maxMinute]
      }
    ]
  }
  // 获取最大值边界
  const { maxYear, maxDate, maxMonth, maxHour, maxMinute } = getBoundary('max', unref(innerValue))
  // 获取最小值边界
  const { minYear, minDate, minMonth, minHour, minMinute } = getBoundary('min', unref(innerValue))
  const result = [
    {
      type: 'year',
      range: [minYear, maxYear]
    },
    {
      type: 'month',
      range: [minMonth, maxMonth]
    },
    {
      type: 'day',
      range: [minDate, maxDate]
    },
    {
      type: 'hour',
      range: [minHour, maxHour]
    },
    {
      type: 'minute',
      range: [minMinute, maxMinute]
    }
  ]
  // 如果是日期模式，移除小时和分钟列
  if (props.mode === 'date') result.splice(3, 2)
  // 如果是年月模式，移除天、小时和分钟列
  if (props.mode === 'year-month') result.splice(2, 3)
  return result
}

/**
 * 获取边界值
 * @param {'max' | 'min'} type - 边界类型，最大或最小
 * @param {SuDatetimePickerProps['modelValue']} innerValue - 内部值
 * @returns {Object} - 包含边界值的对象
 */
function getBoundary(type: 'max' | 'min', innerValue: SuDatetimePickerProps['modelValue']) {
  // 将内部值转换为日期对象
  const value = new Date((innerValue! as number) || 0)
  // 获取边界日期对象
  const boundary = new Date((props[`${type}Date`] as number) || '')
  // 获取边界年份
  const year = dayjs(boundary).year()
  let month = 1
  let date = 1
  let hour = 0
  let minute = 0
  if (type === 'max') {
    // 最大月份为12
    month = 12
    // 月份的天数
    date = dayjs(value).daysInMonth()
    // 最大小时为23
    hour = 23
    // 最大分钟为59
    minute = 59
  }
  // 获取边界值，逻辑是：当年达到了边界值(最大或最小年)，就检查月允许的最大和最小值，以此类推
  if (dayjs(value).year() === year) {
    month = dayjs(boundary).month() + 1
    if (dayjs(value).month() + 1 === month) {
      date = dayjs(boundary).date()
      if (dayjs(value).date() === date) {
        hour = dayjs(boundary).hour()
        if (dayjs(value).hour() === hour) {
          minute = dayjs(boundary).minute()
        }
      }
    }
  }
  return {
    [`${type}Year`]: year,
    [`${type}Month`]: month,
    [`${type}Date`]: date,
    [`${type}Hour`]: hour,
    [`${type}Minute`]: minute
  }
}

/**
 * 更新各列的默认索引
 * @param {SuDatetimePickerProps['modelValue']} value - 选择的值
 */
function updateIndexs(value: SuDatetimePickerProps['modelValue']) {
  let values = []
  // 获取格式化函数
  const formatter = props.formatter || unref(innerFormatter)
  if (props.mode === 'time') {
    // 将time模式的时间用:分隔成数组
    const timeArr = (value as string).split(':')
    // 使用formatter格式化方法进行管道处理
    values = [formatter('hour', timeArr[0]), formatter('minute', timeArr[1])]
  } else {
    values = [
      formatter('year', `${dayjs(value).year()}`),
      // 月份补0
      formatter('month', padZero(dayjs(value).month() + 1))
    ]
    if (props.mode === 'date') {
      // date模式，需要添加天列
      values.push(formatter('day', padZero(dayjs(value).date())))
    }
    if (props.mode === 'datetime') {
      // 数组的push方法，可以写入多个参数
      values.push(
        formatter('day', padZero(dayjs(value).date())),
        formatter('hour', padZero(dayjs(value).hour())),
        formatter('minute', padZero(dayjs(value).minute()))
      )
    }
  }

  // 根据当前各列的所有值，从各列默认值中找到默认值在各列中的索引
  const indexs = unref(columns).map((column, index) => {
    // 通过取大值，可以保证不会出现找不到索引的-1情况
    return Math.max(
      0,
      column.findIndex((item: any) => item === values[index as number])
    )
  })
  // 更新内部默认索引
  innerDefaultIndex.value = indexs as []
}

/**
 * 校正时间值，确保其在合法范围内
 * @param {SuDatetimePickerProps['modelValue']} value - 要校正的时间值
 * @returns {SuDatetimePickerProps['modelValue']} - 校正后的时间值
 */
function correctValue(value: SuDatetimePickerProps['modelValue']): SuDatetimePickerProps['modelValue'] {
  // 判断是否为日期模式
  const isDateMode = props.mode !== 'time'
  console.log(dayjs.unix(value as number).isValid(), value, 'value')
  // 如果是日期类型，但是又没有设置合法的当前时间的话，使用最小时间为当前时间
  if (isDateMode && !dayjs.unix(value as number).isValid()) {
    value = props.minDate
  } else if (!isDateMode && !value) {
    // 如果是时间类型，而又没有默认值的话，就用最小时间
    value = `${padZero(props.minHour)}:${padZero(props.minMinute)}`
  }
  // 时间类型
  if (!isDateMode) {
    // 检查时间格式是否正确
    if (String(value).indexOf(':') === -1) {
      // 抛出错误信息
      error('时间错误，请传递如12:24的格式')
      return ''
    }
    // 分割小时和分钟
    let [hour, minute] = (value as string).split(':')
    // 对时间补零，同时控制在最小值和最大值之间
    hour = padZero(range(props.minHour, props.maxHour, Number(hour)))
    minute = padZero(range(props.minMinute, props.maxMinute, Number(minute)))
    return `${hour}:${minute}`
  } else {
    // 如果是日期格式，控制在最小日期和最大日期之间
    value = dayjs(value).isBefore(dayjs(props.minDate)) ? props.minDate : value
    value = dayjs(value).isAfter(dayjs(props.maxDate)) ? props.maxDate : value
    console.log(value, 'value151515')
    return value
  }
}

/**
 * 处理输入框点击事件，显示或隐藏选择器
 */
function onShowByClickInput() {
  // 如果组件未禁用
  if (!props.disabled) {
    // 切换显示状态
    showByClickInput.value = !showByClickInput.value
  }
}

watch(
  () => props.show,
  (val) => {
    if (val) {
      updateColumnValue(unref(innerValue))
    }
  }
)

watch(
  () => [props.modelValue, props.mode, props.minDate, props.maxDate, props.minHour, props.maxHour, props.minMinute, props.maxMinute, props.filter],
  () => {
    init()
  },
  {
    immediate: true
  }
)

defineExpose({
  setFormatter
})
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';
.su-datetime-picker {
  &__has-input {
    /* #ifndef APP-NVUE */
    width: 100%;
    /* #endif */
  }
}
</style>
