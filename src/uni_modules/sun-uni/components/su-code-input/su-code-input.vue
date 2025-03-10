<template>
  <view class="su-code-input">
    <view class="su-code-input__item" :style="[itemStyle(index)]" v-for="(item, index) in codeLength" :key="index">
      <view class="su-code-input__item__dot" v-if="dot && codeArray.length > index"></view>
      <text
        v-else
        :style="{
          fontSize: addUnit(fontSize),
          fontWeight: bold ? 'bold' : 'normal',
          color: color
        }"
      >
        {{ codeArray[index] }}
      </text>
      <view class="su-code-input__item__line" v-if="mode === 'line'" :style="[lineStyle]"></view>
      <!-- #ifndef APP-NVUE -->
      <view v-if="isFocus && codeArray.length === index" :style="{ backgroundColor: color }" class="su-code-input__item__cursor"></view>
      <!-- #endif -->
      <!-- #ifdef APP-NVUE -->
      <view
        v-if="isFocus && codeArray.length === index"
        :style="{ backgroundColor: color, opacity: opacity }"
        class="su-code-input__item__cursor"
      ></view>
      <!-- #endif -->
    </view>
    <input
      :disabled="disabledKeyboard"
      type="number"
      :focus="focus"
      :value="inputValue"
      :maxlength="Number(maxlength)"
      :adjustPosition="adjustPosition"
      class="su-code-input__input"
      @input="inputHandler"
      :style="{
        height: addUnit(size)
      }"
      @focus="isFocus = true"
      @blur="isFocus = false"
    />
  </view>
</template>

<script setup lang="ts">
import { codeInputProps } from './props'
import { addUnit, getPx } from '../../libs/function/index'
import { computed, nextTick, onBeforeMount, ref, unref, watch, type CSSProperties } from 'vue'
/**
 * CodeInput 验证码输入
 * @description 该组件一般用于验证用户短信验证码的场景，也可以结合uview-plus的键盘组件使用
 * @tutorial https://suni.pages.dev/sun-uni/component/codeInput.html
 * @property {String | Number}	maxlength			最大输入长度 （默认 6 ）
 * @property {Boolean}			dot					是否用圆点填充 （默认 false ）
 * @property {String}			mode				显示模式，box-盒子模式，line-底部横线模式 （默认 'box' ）
 * @property {Boolean}			hairline			是否细边框 （默认 false ）
 * @property {String | Number}	space				字符间的距离 （默认 10 ）
 * @property {String | Number}	value				预置值
 * @property {Boolean}			focus				是否自动获取焦点 （默认 false ）
 * @property {Boolean}			bold				字体和输入横线是否加粗 （默认 false ）
 * @property {String}			color				字体颜色 （默认 '#606266' ）
 * @property {String | Number}	fontSize			字体大小，单位px （默认 18 ）
 * @property {String | Number}	size				输入框的大小，宽等于高 （默认 35 ）
 * @property {Boolean}			disabledKeyboard	是否隐藏原生键盘，如果想用自定义键盘的话，需设置此参数为true （默认 false ）
 * @property {String}			borderColor			边框和线条颜色 （默认 '#c9cacc' ）
 * @property {Boolean}			disabledDot			是否禁止输入"."符号 （默认 true ）
 *
 * @event {Function}	change	输入内容发生改变时触发，具体见上方说明			value：当前输入的值
 * @event {Function}	finish	输入字符个数达maxlength值时触发，见上方说明	value：当前输入的值
 * @example	<su-code-input v-model="value4" :focus="true"></su-code-input>
 */
defineOptions({
  name: 'su-code-input',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
})

const emit = defineEmits(['change', 'finish', 'update:modelValue', 'input'])

const props = defineProps(codeInputProps)

// 输入框的值
const inputValue = ref('')
// 是否聚焦
const isFocus = ref(props.focus)
// 定时器
let timer: NodeJS.Timeout | null = null
// 透明度
const opacity = ref(1)

// 根据长度，循环输入框的个数，因为头条小程序数值不能用于v-for
const codeLength = computed(() => new Array(Number(props.maxlength)))

const itemStyle = computed(() => {
  return (index: number) => {
    const style: CSSProperties = {
      width: addUnit(props.size),
      height: addUnit(props.size)
    }

    if (props.mode === 'box') {
      // 设置盒子的边框，如果是细边框，则设置为0.5px宽度
      style.border = `${props.hairline ? 0.5 : 1}px solid ${props.borderColor}`
      // 如果盒子间距为0的话
      if (getPx(props.space as string) === 0) {
        if (index === 0) {
          // 给第一和最后一个盒子设置圆角
          style.borderTopLeftRadius = '3px'
          style.borderBottomLeftRadius = '3px'
        }
        if (index === unref(codeLength).length - 1) {
          style.borderTopRightRadius = '3px'
          style.borderBottomRightRadius = '3px'
        }
        // 最后一个盒子的右边框需要保留
        if (index !== unref(codeLength).length - 1) {
          style.borderRight = 'none'
        }
      }
    }

    if (index !== unref(codeLength).length - 1) {
      // 设置验证码字符之间的距离，通过margin-right设置，最后一个字符，无需右边框
      style.marginRight = addUnit(props.space)
    } else {
      // 最后一个盒子的有边框需要保留
      style.marginRight = 0
    }

    return style
  }
})

// 将输入的值，转为数组，给item历遍时，根据当前的索引显示数组的元素
const codeArray = computed(() => String(inputValue.value).split(''))

//  下划线模式下，横线的样式
const lineStyle = computed(() => {
  const style: CSSProperties = {}
  style.height = props.hairline ? '2px' : '4px'
  style.width = addUnit(props.size)
  // 线条模式下，背景色即为边框颜色
  style.backgroundColor = props.borderColor
  return style
})

// 监听输入框的值发生变化
function inputHandler(e: UniHelper.InputOnInputEvent) {
  const value = e.detail.value
  inputValue.value = value
  // 是否允许输入“.”符号
  if (props.disabledDot) {
    nextTick(() => {
      inputValue.value = value.replace('.', '')
    })
  }

  emit('change', value)
  // #ifdef VUE3
  emit('update:modelValue', value)
  // #endif
  // #ifdef VUE2
  emit('input', value)
  // #endif
  // 达到用户指定输入长度时，发出完成事件
  if (String(value).length >= Number(props.maxlength)) {
    emit('finish', value)
  }
}

watch(
  () => [props.value, props.modelValue],
  () => {
    // #ifdef VUE2
    inputValue.value = String(props.value).substring(0, props.maxlength as number)
    // #endif
    // #ifdef VUE3
    inputValue.value = String(props.modelValue).substring(0, props.maxlength as number)
    // #endif
  },
  { immediate: true }
)

watch(
  () => isFocus.value,
  (val) => {
    // #ifdef APP-NVUE
    if (val) {
      timer = setInterval(() => {
        opacity.value = Math.abs(opacity.value - 1)
      }, 600)
    } else {
      timer && clearInterval(timer)
    }
    // #endif
  }
)

onBeforeMount(() => {
  // #ifdef APP-NVUE
  timer && clearInterval(timer)
  // #endif
})
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';
$su-code-input-cursor-width: 1px;
$su-code-input-cursor-height: 20px;
$su-code-input-cursor-animation-duration: 1s;
$su-code-input-cursor-animation-name: su-cursor-flicker;

.su-code-input {
  @include flex;
  position: relative;
  overflow: hidden;

  &__item {
    @include flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &__text {
      font-size: 15px;
      color: $su-content-color;
    }

    &__dot {
      width: 7px;
      height: 7px;
      border-radius: 100px;
      background-color: $su-content-color;
    }

    &__line {
      position: absolute;
      bottom: 0;
      height: 4px;
      border-radius: 100px;
      width: 40px;
      background-color: $su-content-color;
    }
    &__cursor {
      position: absolute;
      /* #ifndef APP-NVUE */
      top: 50%;
      left: 50%;
      opacity: 1;
      transform: translate(-50%, -50%);
      /* #endif */
      width: $su-code-input-cursor-width;
      height: $su-code-input-cursor-height;
      animation: $su-code-input-cursor-animation-duration su-cursor-flicker infinite;
    }
  }

  &__input {
    // 之所以需要input输入框，是因为有它才能唤起键盘
    // 这里将它设置为两倍的屏幕宽度，再将左边的一半移出屏幕，为了不让用户看到输入的内容
    position: absolute;
    left: -750rpx;
    width: 1500rpx;
    top: 0;
    background-color: transparent;
    text-align: left;
  }
}

/* #ifndef APP-NVUE */
@keyframes su-cursor-flicker {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
/* #endif */
</style>
