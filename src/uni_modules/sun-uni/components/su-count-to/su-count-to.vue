<template>
  <text
    class="su-count-num"
    :style="{
      fontSize: addUnit(fontSize),
      fontWeight: bold ? 'bold' : 'normal',
      color: color
    }"
  >
    {{ displayValue }}
  </text>
</template>

<script lang="ts" setup>
import { countToProps } from './props'
import { mpMixin } from '../../libs/mixin/mpMixin'
import { mixin } from '../../libs/mixin/mixin'
import { addUnit } from '../../libs/function/index'
import { computed, onMounted, ref, unref, watch } from 'vue'
import type { SuUni } from '../../types/uni'
/**
 * countTo 数字滚动
 * @description 该组件一般用于需要滚动数字到某一个值的场景，目标要求是一个递增的值。
 * @tutorial https://suni.pages.dev/sun-uni/component/countTo.html
 * @property {String | Number}	startVal	开始的数值，默认从0增长到某一个数（默认 0 ）
 * @property {String | Number}	endVal		要滚动的目标数值，必须 （默认 0 ）
 * @property {String | Number}	duration	滚动到目标数值的动画持续时间，单位为毫秒（ms） （默认 2000 ）
 * @property {Boolean}			autoplay	设置数值后是否自动开始滚动 （默认 true ）
 * @property {String | Number}	decimals	要显示的小数位数，见官网说明（默认 0 ）
 * @property {Boolean}			useEasing	滚动结束时，是否缓动结尾，见官网说明（默认 true ）
 * @property {String}			decimal		十进制分割 （ 默认 "." ）
 * @property {String}			color		字体颜色（ 默认 '#606266' )
 * @property {String | Number}	fontSize	字体大小，单位px（ 默认 22 ）
 * @property {Boolean}			bold		字体是否加粗（默认 false ）
 * @property {String}			separator	千位分隔符，见官网说明
 * @event {Function} end 数值滚动到目标值时触发
 * @example <su-count-to ref="uCountTo" :end-val="endVal" :autoplay="autoplay"></su-count-to>
 */

defineOptions({
  name: 'su-count-to',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps(countToProps)
const emit = defineEmits(['end'])

const localStartVal = ref<number>(Number(props.startVal || 0))
const displayValue = ref<string>(formatNumber(props.startVal))
const printVal = ref<number | null>(null)
const paused = ref(false)
const localDuration = ref(Number(props.duration))
const startTime = ref<number | null>(null)
const timestamp = ref<number | null>(null)
const remaining = ref<number | null>(null)
const rAF = ref<NodeJS.Timeout | null>(null)
const lastTime = ref<number>(0)

const countDown = computed(() => {
  return props.startVal! > props.endVal!
})

function easingFn(t: number, b: number, c: number, d: number) {
  return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b
}

function requestAnimationFrame(callback: SuUni.Fn) {
  const currTime = new Date().getTime()
  // 为了使setTimteout的尽可能的接近每秒60帧的效果
  const timeToCall = Math.max(0, 16 - (currTime - unref(lastTime)))
  const id = setTimeout(() => {
    callback(currTime + timeToCall)
  }, timeToCall)
  lastTime.value = currTime + timeToCall
  return id
}

function cancelAnimationFrame(id: string | number | NodeJS.Timeout | undefined) {
  clearTimeout(id)
}

function start() {
  localStartVal.value = Number(props.startVal || 0)
  startTime.value = null
  localDuration.value = +props.duration!
  paused.value = false
  rAF.value = requestAnimationFrame(count)
}

function reStart() {
  if (unref(paused)) {
    resume()
    paused.value = false
  } else {
    stop()
    paused.value = true
  }
}

function stop() {
  cancelAnimationFrame(unref(rAF)!)
}

function resume() {
  if (!remaining.value) return
  startTime.value = 0
  localDuration.value = remaining.value!
  localStartVal.value = printVal.value!
  requestAnimationFrame(count)
}

function reset() {
  startTime.value = null
  stop()
  displayValue.value = formatNumber(props.startVal)
}

function count(time: number) {
  if (!startTime.value) startTime.value = time
  timestamp.value = time
  const progress = time - unref(startTime)!
  remaining.value = unref(localDuration) - progress
  if (props.useEasing) {
    if (unref(countDown)) {
      printVal.value =
        Number(unref(localStartVal) || 0) - easingFn(progress, 0, Number(unref(localStartVal) || 0) - Number(props.endVal || 0), unref(localDuration))
    } else {
      printVal.value = easingFn(
        progress,
        Number(unref(localStartVal) || 0),
        Number(props.endVal) - Number(unref(localStartVal) || 0),
        unref(localDuration)
      )
    }
  } else {
    if (unref(countDown)) {
      printVal.value =
        Number(unref(localStartVal) || 0) - (Number(unref(localStartVal) || 0) - Number(props.endVal)) * (progress / unref(localDuration))
    } else {
      printVal.value =
        Number(unref(localStartVal) || 0) - (Number(props.endVal) - Number(unref(localStartVal) || 0)) * (progress / unref(localDuration))
    }
  }

  if (unref(countDown)) {
    printVal.value = unref(printVal)! < Number(props.endVal) ? Number(props.endVal) : unref(printVal)
  } else {
    printVal.value = unref(printVal)! > Number(props.endVal) ? Number(props.endVal) : unref(printVal)
  }

  displayValue.value = formatNumber(printVal.value!) || ''
  if (progress < localDuration.value) {
    rAF.value = requestAnimationFrame(count)
  } else {
    emit('end')
  }
}

function isNumber(val: string) {
  return !isNaN(parseFloat(val))
}

function formatNumber(num: string | number | undefined): string {
  // 将num转为Number类型，因为其值可能为字符串数值，调用toFixed会报错
  num = Number(num)
  num = num.toFixed(Number(props.decimals))
  num += ''
  const x = num.split('.')
  let x1 = x[0]
  const x2 = x.length > 1 ? props.decimal + x[1] : ''
  const rgx = /(\d+)(\d{3})/
  if (props.separator && !isNumber(props.separator)) {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + props.separator + '$2')
    }
  }
  return x1 + x2
}

function destroyed() {
  cancelAnimationFrame(unref(rAF)!)
}

watch(
  () => props.startVal,
  () => {
    props.autoplay && start()
  }
)
watch(
  () => props.endVal,
  () => {
    props.autoplay && start()
  }
)

onMounted(() => {
  props.autoplay && start()
})

defineExpose({
  start,
  reStart,
  stop,
  destroyed,
  reset,
  resume
})
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';

.su-count-num {
  /* #ifndef APP-NVUE */
  display: inline-flex;
  /* #endif */
  text-align: center;
}
</style>
