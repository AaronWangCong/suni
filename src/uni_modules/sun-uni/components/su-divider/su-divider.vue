<template>
  <view class="su-divider" :style="[addStyle(customStyle)]" @tap="click">
    <su-line :color="lineColor" :customStyle="leftLineStyle" :hairline="hairline" :dashed="dashed"></su-line>
    <text v-if="dot" class="su-divider__dot">●</text>
    <text v-else-if="text" class="su-divider__text" :style="[textStyle]">{{ text }}</text>
    <su-line :color="lineColor" :customStyle="rightLineStyle" :hairline="hairline" :dashed="dashed"></su-line>
  </view>
</template>

<script lang="ts" setup>
import { dividerProps } from './props'
import { addStyle, addUnit } from '../../libs/function/index'
import { baseProps } from '../../libs/vue'
import { computed, type CSSProperties } from 'vue'
/**
 * divider 分割线
 * @description 区隔内容的分割线，一般用于页面底部"没有更多"的提示。
 * @tutorial https://suni.pages.dev/sun-uni/component/divider.html
 * @property {Boolean}			dashed			是否虚线 （默认 false ）
 * @property {Boolean}			hairline		是否细线 （默认  true ）
 * @property {Boolean}			dot				是否以点替代文字，优先于text字段起作用 （默认 false ）
 * @property {String}			textPosition	内容文本的位置，left-左边，center-中间，right-右边 （默认 'center' ）
 * @property {String | Number}	text			文本内容
 * @property {String | Number}	textSize		文本大小 （默认 14）
 * @property {String}			textColor		文本颜色 （默认 '#909399' ）
 * @property {String}			lineColor		线条颜色 （默认 '#dcdfe6' ）
 * @property {Object}			customStyle		定义需要用到的外部样式
 *
 * @event {Function}	click	divider组件被点击时触发
 * @example <su-divider :color="color">锦瑟无端五十弦</su-divider>
 */

defineOptions({
  name: 'su-divider',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps({
  ...dividerProps,
  ...baseProps
})

const emit = defineEmits(['click'])

const textStyle = computed(() => {
  return {
    fontSize: addUnit(props.textSize),
    color: props.textColor
  }
})

const leftLineStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.textPosition === 'left') {
    style.width = '80rpx'
  } else {
    style.flex = 1
  }
  return style
})

const rightLineStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.textPosition === 'right') {
    style.width = '80rpx'
  } else {
    style.flex = 1
  }
  return style
})

function click() {
  emit('click')
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';
$su-divider-margin: 15px 0 !default;
$su-divider-text-margin: 0 15px !default;
$su-divider-dot-font-size: 12px !default;
$su-divider-dot-margin: 0 12px !default;
$su-divider-dot-color: #c0c4cc !default;

.su-divider {
  @include flex;
  flex-direction: row;
  align-items: center;
  margin: $su-divider-margin;

  &__text {
    margin: $su-divider-text-margin;
  }

  &__dot {
    font-size: $su-divider-dot-font-size;
    margin: $su-divider-dot-margin;
    color: $su-divider-dot-color;
  }
}
</style>
