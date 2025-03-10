<template>
  <text
    v-if="show && ((Number(value) === 0 ? showZero : true) || isDot)"
    :class="[
      isDot ? 'su-badge--dot' : 'su-badge--not-dot',
      inverted && 'su-badge--inverted',
      shape === 'horn' && 'su-badge--horn',
      `su-badge--${type}${inverted ? '--inverted' : ''}`
    ]"
    :style="[addStyle(customStyle), badgeStyle]"
    class="su-badge"
  >
    {{ isDot ? '' : showValue }}
  </text>
</template>

<script setup lang="ts">
import { badgeProps } from './props'
import { addStyle, addUnit } from '../../libs/function/index'
import { computed, type CSSProperties } from 'vue'
import { baseProps } from '../../libs/vue'
/**
 * badge 徽标数
 * @description 该组件一般用于图标右上角显示未读的消息数量，提示用户点击，有圆点和圆包含文字两种形式。
 * @tutorial https://suni.pages.dev/component/badge.html
 *
 * @property {Boolean} 			isDot 		是否显示圆点 （默认 false ）
 * @property {String | Number} 	value 		显示的内容
 * @property {Boolean} 			show 		是否显示 （默认 true ）
 * @property {String | Number} 	max 		最大值，超过最大值会显示 '{max}+'  （默认999）
 * @property {String} 			type 		主题类型，error|warning|success|primary （默认 'error' ）
 * @property {Boolean} 			showZero	当数值为 0 时，是否展示 Badge （默认 false ）
 * @property {String} 			bgColor 	背景颜色，优先级比type高，如设置，type参数会失效
 * @property {String} 			color 		字体颜色 （默认 '#ffffff' ）
 * @property {String} 			shape 		徽标形状，circle-四角均为圆角，horn-左下角为直角 （默认 'circle' ）
 * @property {String} 			numberType	设置数字的显示方式，overflow|ellipsis|limit  （默认 'overflow' ）
 * @property {Array}} 			offset		设置badge的位置偏移，格式为 [x, y]，也即设置的为top和right的值，absolute为true时有效
 * @property {Boolean} 			inverted	是否反转背景和字体颜色（默认 false ）
 * @property {Boolean} 			absolute	是否绝对定位（默认 false ）
 * @property {Object}			customStyle	定义需要用到的外部样式
 * @example <su-badge :type="type" :count="count"></su-badge>
 */
defineOptions({
  name: 'su-badge',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps({
  ...badgeProps,
  ...baseProps
})

/** 徽标数样式 */
const badgeStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.color) style.color = props.color
  if (props.bgColor && !props.inverted) {
    style.backgroundColor = props.bgColor
  }
  if (props.absolute) {
    style.position = 'absolute'
    if (props.offset?.length) {
      // top和right分为为offset的第一个和第二个值，如果没有第二个值，则right等于top
      const top = props.offset[0]
      const right = props.offset[1] || top
      style.top = addUnit(top!)
      style.right = addUnit(right!)
    }
  }
  return style
})

/** 显示的数字 */
const showValue = computed(() => {
  const value = Number(props.value)
  switch (props.numberType) {
    case 'overflow':
      return value > Number(props.max) ? props.max + '+' : props.value
    case 'ellipsis':
      return value > Number(props.max) ? '...' : props.value
    case 'limit':
      return value > 999 ? (value >= 9999 ? Math.floor((value / 1e4) * 100) / 100 + 'w' : Math.floor((value / 1e3) * 100) / 100 + 'k') : props.value
    default:
      return value
  }
})
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';

$su-badge-primary: $su-primary !default;
$su-badge-error: $su-error !default;
$su-badge-success: $su-success !default;
$su-badge-info: $su-info !default;
$su-badge-warning: $su-warning !default;
$su-badge-dot-radius: 100px !default;
$su-badge-dot-size: 8px !default;
$su-badge-dot-right: 4px !default;
$su-badge-dot-top: 0 !default;
$su-badge-text-font-size: 11px !default;
$su-badge-text-right: 10px !default;
$su-badge-text-padding: 2px 5px !default;
$su-badge-text-align: center !default;
$su-badge-text-color: #ffffff !default;

.su-badge {
  border-top-right-radius: $su-badge-dot-radius;
  border-top-left-radius: $su-badge-dot-radius;
  border-bottom-left-radius: $su-badge-dot-radius;
  border-bottom-right-radius: $su-badge-dot-radius;
  @include flex;
  line-height: $su-badge-text-font-size;
  text-align: $su-badge-text-align;
  font-size: $su-badge-text-font-size;
  color: $su-badge-text-color;

  &--dot {
    height: $su-badge-dot-size;
    width: $su-badge-dot-size;
  }

  &--inverted {
    font-size: 13px;
  }

  &--not-dot {
    padding: $su-badge-text-padding;
  }

  &--horn {
    border-bottom-left-radius: 0;
  }

  &--primary {
    background-color: $su-badge-primary;
  }

  &--primary--inverted {
    color: $su-badge-primary;
  }

  &--error {
    background-color: $su-badge-error;
  }

  &--error--inverted {
    color: $su-badge-error;
  }

  &--success {
    background-color: $su-badge-success;
  }

  &--success--inverted {
    color: $su-badge-success;
  }

  &--info {
    background-color: $su-badge-info;
  }

  &--info--inverted {
    color: $su-badge-info;
  }

  &--warning {
    background-color: $su-badge-warning;
  }

  &--warning--inverted {
    color: $su-badge-warning;
  }
}
</style>
