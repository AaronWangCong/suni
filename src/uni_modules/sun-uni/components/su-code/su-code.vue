<template>
  <view class="su-code">
    <!-- 此组件功能由js完成，无需写html逻辑 -->
  </view>
</template>

<script lang="ts" setup>
import { codeProps } from './props'
import { computed, onMounted, onUnmounted, ref, unref, watch } from 'vue'
/**
 * Code 验证码输入框
 * @description 考虑到用户实际发送验证码的场景，可能是一个按钮，也可能是一段文字，提示语各有不同，所以本组件 不提供界面显示，只提供提示语，由用户将提示语嵌入到具体的场景
 * @tutorial https://suni.pages.dev/sun-uni/component/code.html
 * @property {String | Number}	seconds			倒计时所需的秒数（默认 60 ）
 * @property {String}			startText		开始前的提示语，见官网说明（默认 '获取验证码' ）
 * @property {String}			changeText		倒计时期间的提示语，必须带有字母"x"，见官网说明（默认 'X秒重新获取' ）
 * @property {String}			endText			倒计结束的提示语，见官网说明（默认 '重新获取' ）
 * @property {Boolean}			keepRunning		是否在H5刷新或各端返回再进入时继续倒计时（ 默认false ）
 * @property {String}			uniqueKey		为了区分多个页面，或者一个页面多个倒计时组件本地存储的继续倒计时变了
 *
 * @event {Function}	change	倒计时期间，每秒触发一次
 * @event {Function}	start	开始倒计时触发
 * @event {Function}	end		结束倒计时触发
 * @example <su-code ref="uCode" @change="codeChange" seconds="20"></su-code>
 */

defineOptions({
  name: 'su-code',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps({
  ...codeProps
})

const emit = defineEmits(['start', 'end', 'change'])

// 倒计时timer
let timer: NodeJS.Timeout | null = null
/** 倒计时总秒数 */
const secNum = ref<number>(+props.seconds!)
// 是否可以执行验证码操作
const canGetCode = ref(true)

const storageKey = computed(() => `${props.uniqueKey}_$uCountDownTimestamp`)

function checkKeepRunning() {
  // 获取上一次退出页面(H5还包括刷新)时的时间戳，如果没有上次的保存，此值可能为空
  let lastTimestamp = Number(uni.getStorageSync(unref(storageKey)))
  if (!lastTimestamp) return changeEvent(props.startText!)
  // 当前秒的时间戳
  let nowTimestamp = Math.floor(+new Date() / 1000)
  //  判断当前的时间戳，是否小于上一次的本该按设定结束，却提前结束的时间戳
  if (props.keepRunning && lastTimestamp && lastTimestamp > nowTimestamp) {
    // 剩余尚未执行完的倒计秒数
    secNum.value = lastTimestamp - nowTimestamp
    // 清除本地保存的变量
    uni.removeStorageSync(unref(storageKey))
    // 开始倒计时
    start()
  } else {
    changeEvent(props.startText!)
  }
}

// 开始倒计时
function start() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
  emit('start')
  canGetCode.value = false
  changeEvent(props.changeText!.replace(/x|X/, `${secNum.value}`))
  timer = setInterval(() => {
    if (secNum.value) {
      secNum.value -= 1
      changeEvent(props.changeText!.replace(/x|X/, `${secNum.value}`))
    } else {
      reset()
      emit('end')
    }
  }, 1000)
  setTimeToStorage()
}

/** 重置，可以让用户再次获取验证码 */
function reset() {
  canGetCode.value = true
  clearInterval(timer!)
  timer = null
  secNum.value = Number(props.seconds)
  changeEvent(props.endText!)
}

/** 改变事件 */
function changeEvent(text: string) {
  emit('change', text)
}

/** 保存时间戳，为了防止倒计时尚未结束，H5刷新或者各端的右上角返回上一页再进来 */
function setTimeToStorage() {
  if (!props.keepRunning || !timer) return
  // 记录当前的时间戳，为了下次进入页面，如果还在倒计时内的话，继续倒计时
  // 倒计时尚未结束，结果大于0；倒计时已经开始，就会小于初始值，如果等于初始值，说明没有开始倒计时，无需处理
  if (secNum.value > 0 && secNum.value < +props.seconds!) {
    // 获取当前时间戳(+ new Date()为特殊写法)，除以1000变成秒，再去除小数部分
    let nowTimestamp = Math.floor(+new Date() / 1000)
    // 将本该结束时候的时间戳保存起来 => 当前时间戳 + 剩余的秒数
    uni.setStorage({
      key: unref(storageKey),
      data: nowTimestamp + Number(secNum.value)
    })
  }
}

watch(
  () => props.seconds,
  () => {
    secNum.value = +props.seconds! || 60
  },
  { immediate: true }
)

onMounted(() => {
  checkKeepRunning()
})

onUnmounted(() => {
  setTimeToStorage()
  clearTimeout(timer!)
  timer = null
})

defineExpose({
  canGetCode,
  start
})
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';
</style>
