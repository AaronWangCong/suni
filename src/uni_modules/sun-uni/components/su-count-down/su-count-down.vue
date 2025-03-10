<template>
  <view class="su-count-down">
    <slot>
      <text class="su-count-down__text">{{ formattedTime }}</text>
    </slot>
  </view>
</template>

<script lang="ts" setup>
import { countDownProps } from './props'
import { mpMixin } from '../../libs/mixin/mpMixin'
import { mixin } from '../../libs/mixin/mixin'
import { isSameSecond, parseFormat, parseTimeData } from './utils'
import { onBeforeMount, onMounted, ref, unref, watch } from 'vue'
/**
 * su-count-down 倒计时
 * @description 该组件一般使用于某个活动的截止时间上，通过数字的变化，给用户明确的时间感受，提示用户进行某一个行为操作。
 * @tutorial https://suni.pages.dev/component/countDown.html
 * @property {String | Number}	time		倒计时时长，单位ms （默认 0 ）
 * @property {String}			format		时间格式，DD-日，HH-时，mm-分，ss-秒，SSS-毫秒  （默认 'HH:mm:ss' ）
 * @property {Boolean}			autoStart	是否自动开始倒计时 （默认 true ）
 * @property {Boolean}			millisecond	是否展示毫秒倒计时 （默认 false ）
 * @event {Function} finish 倒计时结束时触发
 * @event {Function} change 倒计时变化时触发
 * @event {Function} start	开始倒计时
 * @event {Function} pause	暂停倒计时
 * @event {Function} reset	重设倒计时，若 auto-start 为 true，重设后会自动开始倒计时
 * @example <su-count-down :time="time"></su-count-down>
 */
defineOptions({
  name: 'su-count-down',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps(countDownProps)
const emit = defineEmits(['change', 'finish'])

let timer: any = null
const formattedTime = ref('0')
const runing = ref(false)
const endTime = ref(0)
const remainTime = ref(0)

function start() {
  if (unref(runing)) return
  runing.value = true
  endTime.value = Date.now() + unref(remainTime)
  toTick()
}

function toTick() {
  if (props.millisecond) {
    microTick()
  } else {
    macroTick()
  }
}

function macroTick() {
  clearTimeoutFunc()
  timer = setTimeout(() => {
    const remain = getRemainTime()
    if (isSameSecond(remain, unref(remainTime)) || remain === 0) {
      setRemainTime(remain)
    }
    if (remainTime.value !== 0) {
      macroTick()
    }
  }, 30)
}

function microTick() {
  clearTimeoutFunc()
  timer = setTimeout(() => {
    setRemainTime(getRemainTime())
    if (remainTime.value !== 0) {
      microTick()
    }
  }, 50)
}

function getRemainTime() {
  return Math.max(unref(endTime) - Date.now(), 0)
}

function setRemainTime(remain: number) {
  remainTime.value = remain
  const timeData = parseTimeData(remain)
  emit('change', timeData)
  formattedTime.value = parseFormat(props.format!, timeData)
  // 如果时间已到，停止倒计时
  if (remain <= 0) {
    pause()
    emit('finish')
  }
}

function reset() {
  pause()
  remainTime.value = Number(props.time!)
  setRemainTime(remainTime.value)
  if (props.autoStart) {
    start()
  }
}

function pause() {
  runing.value = false
  clearTimeoutFunc()
}

function clearTimeoutFunc() {
  clearTimeout(timer)
  timer = null
}

watch(
  () => props.time,
  () => {
    reset()
  }
)

onMounted(() => {
  reset()
})

onBeforeMount(() => {
  clearTimeoutFunc()
})

defineExpose({
  start,
  reset,
  pause
})
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';
$su-count-down-text-color: $su-content-color !default;
$su-count-down-text-font-size: 15px !default;
$su-count-down-text-line-height: 22px !default;

.su-count-down {
  &__text {
    color: $su-count-down-text-color;
    font-size: $su-count-down-text-font-size;
    line-height: $su-count-down-text-line-height;
  }
}
</style>
