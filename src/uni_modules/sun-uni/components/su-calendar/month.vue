<template>
  <view class="su-calendar-month-wrapper" ref="calendarMonthRef">
    <view
      v-for="(item, index) in months"
      :key="index"
      :class="[`su-calendar-month-${index}`]"
      :ref="`su-calendar-month-${index}`"
      :id="`month-${index}`"
    >
      <text v-if="index !== 0" class="su-calendar-month__title">{{ item.year }}年{{ item.month }}月</text>
      <view class="su-calendar-month__days">
        <view v-if="showMark" class="su-calendar-month__days__month-mark-wrapper">
          <text class="su-calendar-month__days__month-mark-wrapper__text">{{ item.month }}</text>
        </view>
        <view
          class="su-calendar-month__days__day"
          v-for="(item1, index1) in item.date"
          :key="index1"
          :style="[dayStyle(index, index1, item1)]"
          @tap="clickHandler(index, index1, item1)"
          :class="[item1.selected && 'su-calendar-month__days__day__select--selected']"
        >
          <view class="su-calendar-month__days__day__select" :style="[daySelectStyle(index, index1, item1)]">
            <text
              class="su-calendar-month__days__day__select__info"
              :class="[item1.disabled && 'su-calendar-month__days__day__select__info--disabled']"
              :style="[textStyle(item1)]"
            >
              {{ item1.day }}
            </text>
            <text
              v-if="getBottomInfo(index, index1, item1)"
              class="su-calendar-month__days__day__select__buttom-info"
              :class="[
                item1.disabled && 'su-calendar-month__days__day__select__buttom-info--disabled',
                !item1.disabled && item1.isWeekendsWorkday && 'su-error'
              ]"
              :style="[textStyle(item1)]"
            >
              {{ getBottomInfo(index, index1, item1) }}
            </text>
            <text v-if="item1.dot" class="su-calendar-month__days__day__select__dot"></text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { addUnit, toast, sleep } from '../../libs/function/index'
import { colorGradient } from '../../libs/function/colorGradient'
import test from '../../libs/function/test'
import dayjs from 'dayjs/esm/index'
import { calendarMonthProps } from './props'
import { computed, getCurrentInstance, nextTick, onMounted, ref, unref, watch, type CSSProperties } from 'vue'
import type { SuUni } from '../../types/uni'
import { useSelectorQuery } from '../../hooks/core/useSelectorQuery'
import { cloneDeep } from 'lodash-es'

defineOptions({
  name: 'su-calendar-month',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps(calendarMonthProps)
const emit = defineEmits(['monthSelected', 'updateMonthTop', 'monthSelected'])

const calendarMonthRef = ref<UniApp.NodesRef>()

// 每个日期的宽度
const width = ref(0)
// 当前选中的日期item
const selectItem = ref({})
// 当前选中的日期
const selected = ref<any[]>([])

const instance = getCurrentInstance()

/** 获取节点布局信息的方法 */
const { getBoundingClientRect } = useSelectorQuery()

const dayStyle = computed(() => {
  return (index1: number, index2: number, item: SuUni.Recordable) => {
    const style: CSSProperties = {}
    let week = item.week
    // 不进行四舍五入的形式保留2位小数
    const dayWidth = Number(
      parseFloat(`${unref(width) / 7}`)
        .toFixed(3)
        .slice(0, -1)
    )
    // 得出每个日期的宽度
    // #ifdef APP-NVUE
    style.width = addUnit(dayWidth, 'px')
    // #endif
    style.height = addUnit(props.rowHeight)
    if (index2 === 0) {
      // 获取当前为星期几，如果为0，则为星期天，减一为每月第一天时，需要向左偏移的item个数
      week = (week === 0 ? 7 : week) - 1
      style.marginLeft = addUnit(week * dayWidth, 'px')
    }

    if (props.mode === 'range') {
      // 之所以需要这么写，是因为DCloud公司的iOS客户端导致的bug
      style.paddingLeft = 0
      style.paddingRight = 0
      style.paddingBottom = 0
      style.paddingTop = 0
    }
    return style
  }
})

const daySelectStyle = computed(() => {
  return (index1: number, index2: number, item: SuUni.Recordable) => {
    let date = dayjs(item.date).format('YYYY-MM-DD')
    let style: CSSProperties = {}
    // 判断date是否在selected数组中，因为月份可能会需要补0，所以使用dateSame判断，而不用数组的includes判断
    if (unref(selected).some((item) => dateSame(item, date))) {
      style.backgroundColor = props.color
    }
    if (props.mode === 'single') {
      if (date === unref(selected)[0]) {
        // 因为需要对nvue的兼容，只能这么写，无法缩写，也无法通过类名控制等等
        style.borderTopLeftRadius = '3px'
        style.borderBottomLeftRadius = '3px'
        style.borderTopRightRadius = '3px'
        style.borderBottomRightRadius = '3px'
      }
    } else if (props.mode === 'range') {
      if (unref(selected).length >= 2) {
        const len = unref(selected).length - 1
        // 第一个日期设置左上角和左下角的圆角
        if (dateSame(date, unref(selected)[0])) {
          style.borderTopLeftRadius = '3px'
          style.borderBottomLeftRadius = '3px'
        }
        // 最后一个日期设置右上角和右下角的圆角
        if (dateSame(date, unref(selected)[len])) {
          style.borderTopRightRadius = '3px'
          style.borderBottomRightRadius = '3px'
        }
        // 处于第一和最后一个之间的日期，背景色设置为浅色，通过将对应颜色进行等分，再取其尾部的颜色值
        if (dayjs(date).isAfter(dayjs(unref(selected)[0])) && dayjs(date).isBefore(dayjs(unref(selected)[len]))) {
          style.backgroundColor = colorGradient(props.color, '#ffffff', 100)[90]
          // 增加一个透明度，让范围区间的背景色也能看到底部的mark水印字符
          style.opacity = 0.7
        }
      } else if (unref(selected).length === 1) {
        // 之所以需要这么写，是因为DCloud公司的iOS客户端的开发者能力有限导致的bug
        // 进行还原操作，否则在nvue的iOS，uni-app有bug，会导致诡异的表现
        style.borderTopLeftRadius = '3px'
        style.borderBottomLeftRadius = '3px'
      }
    } else {
      if (unref(selected).some((item) => dateSame(item, date))) {
        style.borderTopLeftRadius = '3px'
        style.borderBottomLeftRadius = '3px'
        style.borderTopRightRadius = '3px'
        style.borderBottomRightRadius = '3px'
      }
    }
    return style
  }
})

const textStyle = computed(() => {
  return (item: SuUni.Recordable) => {
    const date = dayjs(item.date).format('YYYY-MM-DD')
    const style: CSSProperties = {}
    // 选中的日期，提示文字设置白色
    if (unref(selected).some((item) => dateSame(item, date))) {
      style.color = '#ffffff'
    }
    if (props.mode === 'range') {
      const len = unref(selected).length - 1
      // 如果是范围选择模式，第一个和最后一个之间的日期，文字颜色设置为高亮的主题色
      if (dayjs(date).isAfter(dayjs(unref(selected)[0])) && dayjs(date).isBefore(dayjs(unref(selected)[len]))) {
        style.color = props.color
      }
    }

    return style
  }
})

const getBottomInfo = computed(() => {
  return (index1: number, index2: number, item: SuUni.Recordable) => {
    const date = dayjs(item.date).format('YYYY-MM-DD')
    const bottomInfo = item.bottomInfo
    // 当为日期范围模式时，且选择的日期个数大于0时
    if (props.mode === 'range' && unref(selected).length > 0) {
      if (unref(selected).length === 1) {
        // 选择了一个日期时，如果当前日期为数组中的第一个日期，则显示底部文字为“开始”
        if (dateSame(date, unref(selected)[0])) return props.startText
        else return bottomInfo
      } else {
        const len = unref(selected).length - 1
        // 如果数组中的日期大于2个时，第一个和最后一个显示为开始和结束日期
        if (dateSame(date, unref(selected)[0]) && dateSame(date, unref(selected)[1]) && len === 1) {
          // 如果长度为2，且第一个等于第二个日期，则提示语放在同一个item中
          return `${props.startText}/${props.endText}`
        } else if (dateSame(date, unref(selected)[0])) {
          return props.startText
        } else if (dateSame(date, unref(selected)[len])) {
          return props.endText
        } else {
          return bottomInfo
        }
      }
    } else {
      return bottomInfo
    }
  }
})

function init() {
  emit('monthSelected', selected.value)
  nextTick(() => {
    // 这里需要另一个延时，因为获取宽度后，会进行月份数据渲染，只有渲染完成之后，才有真正的高度
    // 因为nvue下，$nextTick并不是100%可靠的
    sleep(10).then(() => {
      getWrapperWidth()
      getMonthRect()
    })
  })
}

function isForbid(item: SuUni.Recordable) {
  let date = dayjs(item.date).format('YYYY-MM-DD')
  if (props.mode !== 'range' && props.forbidDays?.includes(date)) {
    return true
  }
  return false
}

/** 判断两个日期是否相等 */
function dateSame(date1: dayjs.ConfigType, date2: dayjs.ConfigType) {
  return dayjs(date1).isSame(dayjs(date2))
}

/** 获取月份数据区域的宽度，因为nvue不支持百分比，所以无法通过css设置每个日期item的宽度 */
function getWrapperWidth() {
  // #ifdef APP-NVUE
  getBoundingClientRect(unref(calendarMonthRef)!).then((data) => {
    width.value = (data as UniApp.NodeInfo).width || 0
  })
  // #endif
  // #ifndef APP-NVUE
  uni
    .createSelectorQuery()
    .in(instance?.proxy)
    .select('.su-calendar-month-wrapper')
    .boundingClientRect((size) => {
      console.log(size, 'size')
      width.value = (size as UniApp.NodeInfo).width || 0
    })
    .exec()
  // #endif
}

function getMonthRect() {
  // 获取每个月份数据的尺寸，用于父组件在scroll-view滚动事件中，监听当前滚动到了第几个月份
  const promiseAllArr = unref(props.months).map((item, index) => getMonthRectByPromise(`su-calendar-month-${index}`))
  Promise.all(promiseAllArr).then((sizes: UniApp.NodeInfo[]) => {
    let height = 1
    console.log(sizes, 'sizes')
    const topArr = []
    for (let i = 0; i < unref(props.months).length; i++) {
      // 添加到months数组中，供scroll-view滚动事件中，判断当前滚动到哪个月份
      topArr[i] = height
      height += sizes[i].height || 0
    }
    // 由于微信下，无法通过this.months[i].top的形式(引用类型)去修改父组件的month的top值，所以使用事件形式对外发出
    emit('updateMonthTop', topArr)
  })
}

/** 获取每个月份区域的尺寸 */
function getMonthRectByPromise(el: string) {
  return new Promise<UniApp.NodeInfo>((resolve) => {
    // #ifndef APP-NVUE
    uni
      .createSelectorQuery()
      .in(instance?.proxy)
      .select(`.${el}`)
      .boundingClientRect((size) => {
        resolve(size as UniApp.NodeInfo)
      })
      .exec()
    // #endif
    // #ifdef APP-NVUE
    // nvue下，使用dom模块查询元素高度
    // 返回一个promise，让调用此方法的主体能使用then回调
    const ref = instance?.proxy?.$refs[el] as UniApp.NodesRef
    getBoundingClientRect(ref).then((data) => {
      resolve(data as UniApp.NodeInfo)
    })
    // #endif
  })
}

/** 点击某一个日期 */
function clickHandler(index1: number, index2: number, item: SuUni.Recordable) {
  if (props.readonly) {
    return
  }
  selectItem.value = item
  const date = dayjs(item.date).format('YYYY-MM-DD')
  if (item.disabled) return
  if (isForbid(item)) {
    uni.showToast({
      title: props.forbidDaysToast
    })
    return
  }
  // 对上一次选择的日期数组进行深度克隆
  let newSelect = cloneDeep(unref(selected))
  if (props.mode === 'single') {
    // 单选情况下，让数组中的元素为当前点击的日期
    newSelect = [date]
  } else if (props.mode === 'multiple') {
    if (newSelect.some((i) => dateSame(i, date))) {
      // 如果点击的日期已在数组中，则进行移除操作，也就是达到反选的效果
      const itemIndex = newSelect.findIndex((item) => item === date)
      newSelect.splice(itemIndex, 1)
    } else {
      // 如果点击的日期不在数组中，且已有的长度小于总可选长度时，则添加到数组中去
      if (newSelect.length < Number(props.maxCount)) newSelect.push(date)
    }
  } else {
    // 选择区间形式
    if (newSelect.length === 0 || newSelect.length >= 2) {
      // 如果原来就为0或者大于2的长度，则当前点击的日期，就是开始日期
      newSelect = [date]
    } else if (newSelect.length === 1) {
      // 如果已经选择了开始日期
      const existsDate = newSelect[0]
      if (dayjs(date).isBefore(existsDate)) {
        newSelect = [date]
      } else if (dayjs(date).isAfter(existsDate)) {
        // 当前日期减去最大可选的日期天数，如果大于起始时间，则进行提示
        if (dayjs(dayjs(date).subtract(Number(props.maxRange), 'day')).isAfter(dayjs(newSelect[0])) && props.showRangePrompt) {
          if (props.rangePrompt) {
            toast(props.rangePrompt)
          } else {
            toast(`选择天数不能超过 ${props.maxRange} 天`)
          }
          return
        }
        // 如果当前日期大于已有日期，将当前的添加到数组尾部
        newSelect.push(date)
        const startDate = newSelect[0]
        const endDate = newSelect[1]
        const arr = []
        let i = 0
        do {
          // 将开始和结束日期之间的日期添加到数组中
          arr.push(dayjs(startDate).add(i, 'day').format('YYYY-MM-DD'))
          i++
          // 累加的日期小于结束日期时，继续下一次的循环
        } while (dayjs(startDate).add(i, 'day').isBefore(dayjs(endDate)))
        // 为了一次性修改数组，避免computed中多次触发，这里才用arr变量一次性赋值的方式，同时将最后一个日期添加近来
        arr.push(endDate)
        newSelect = arr
      } else {
        // 选择区间时，只有一个日期的情况下，且不允许选择起止为同一天的话，不允许选择自己
        if (newSelect[0] === date && !props.allowSameDay) return
        newSelect.push(date)
      }
    }
  }
  setSelected(newSelect)
}

function setDefaultDate() {
  if (!props.defaultDate) {
    // 如果没有设置默认日期，则将当天日期设置为默认选中的日期
    const selected = [dayjs().format('YYYY-MM-DD')]
    return setSelected(selected, false)
  }
  let defaultDate: any[] = []
  const minDate = props.minDate || dayjs().format('YYYY-MM-DD')
  const maxDate =
    props.maxDate ||
    dayjs(minDate)
      .add(Number(props.maxMonth) - 1, 'month')
      .format('YYYY-MM-DD')
  if (props.mode === 'single') {
    // 单选模式，可以是字符串或数组，Date对象等
    if (!test.array(props.defaultDate)) {
      defaultDate = [dayjs(props.defaultDate as dayjs.ConfigType).format('YYYY-MM-DD')]
    } else {
      defaultDate = [(props.defaultDate as any)[0]]
    }
  } else {
    // 如果为非数组，则不执行
    if (!test.array(props.defaultDate)) return
    defaultDate = props.defaultDate as any[]
  }
  // 过滤用户传递的默认数组，取出只在可允许最大值与最小值之间的元素
  defaultDate = defaultDate.filter((item) => {
    return dayjs(item).isAfter(dayjs(minDate).subtract(1, 'day')) && dayjs(item).isBefore(dayjs(maxDate).add(1, 'day'))
  })
  setSelected(defaultDate, false)
}

function setSelected(data: any[], event = true) {
  selected.value = data
  event && emit('monthSelected', selected.value, 'tap')
}

watch(
  () => [props.minDate, props.maxDate, props.defaultDate],
  () => {
    setDefaultDate()
  },
  { immediate: true }
)

onMounted(() => {
  init()
  console.log(props.months, 'unref(props.months)')
})
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';

.su-calendar-month-wrapper {
  margin-top: 4px;
}

.su-calendar-month {
  &__title {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    line-height: 42px;
    height: 42px;
    color: $su-main-color;
    text-align: center;
    font-weight: bold;
  }

  &__days {
    position: relative;
    @include flex;
    flex-wrap: wrap;

    &__month-mark-wrapper {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      @include flex;
      justify-content: center;
      align-items: center;

      &__text {
        font-size: 155px;
        color: rgba(231, 232, 234, 0.83);
      }
    }

    &__day {
      @include flex;
      padding: 2px;
      /* #ifndef APP-NVUE */
      // vue下使用css进行宽度计算，因为某些安卓机会无法进行js获取父元素宽度进行计算得出，会有偏移
      width: calc(100% / 7);
      box-sizing: border-box;
      /* #endif */

      &__select {
        flex: 1;
        @include flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        position: relative;

        &__dot {
          width: 7px;
          height: 7px;
          border-radius: 100px;
          background-color: $su-error;
          position: absolute;
          top: 12px;
          right: 7px;
        }

        &__buttom-info {
          color: $su-content-color;
          text-align: center;
          font-size: 10px;

          &--selected {
            color: #ffffff;
          }

          &--disabled {
            color: #cacbcd;
          }

          &.su-error {
            color: $su-error;
          }
        }

        &__info {
          text-align: center;
          font-size: 16px;

          &--selected {
            color: #ffffff;
          }

          &--disabled {
            color: #cacbcd;
          }
        }

        &--selected {
          background-color: $su-primary;
          @include flex;
          justify-content: center;
          align-items: center;
          flex: 1;
          border-radius: 3px;
        }

        &--range-selected {
          opacity: 0.3;
          border-radius: 0;
        }

        &--range-start-selected {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }

        &--range-end-selected {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
      }
    }
  }
}
</style>
