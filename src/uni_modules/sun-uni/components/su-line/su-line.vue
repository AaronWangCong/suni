<template>
  <view class="su-line" :style="[lineStyle]"></view>
</template>

<script lang="ts" setup>
import { lineProps } from './props'
import { addUnit, addStyle, deepMerge } from '../../libs/function/index'
import { computed, type CSSProperties } from 'vue'
import { baseProps } from '../../libs/vue'

/**
 * line 线条
 * @description 此组件一般用于显示一根线条，用于分隔内容块，有横向和竖向两种模式，且能设置0.5px线条，使用也很简单
 * @tutorial https://suni.pages.dev/component/line.html
 * @property {String}			color		线条的颜色 ( 默认 '#d6d7d9' )
 * @property {String | Number}	length		长度，竖向时表现为高度，横向时表现为长度，可以为百分比，带px单位的值等 ( 默认 '100%' )
 * @property {String}			direction	线条的方向，row-横向，col-竖向 (默认 'row' )
 * @property {Boolean}			hairline	是否显示细线条 (默认 true )
 * @property {String | Number}	margin		线条与上下左右元素的间距，字符串形式，如"30px"  (默认 0 )
 * @property {Boolean}			dashed		是否虚线，true-虚线，false-实线 (默认 false )
 * @property {Object}			customStyle	定义需要用到的外部样式
 * @example <su-line color="red"></su-line>
 */

defineOptions({
  name: 'su-line',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps({
  ...lineProps,
  ...baseProps
})

const lineStyle = computed(() => {
  const style: CSSProperties = {}
  style.margin = props.margin
  if (props.direction === 'row') {
    style.borderBottomWidth = '1px'
    style.borderBottomStyle = props.dashed ? 'dashed' : 'solid'
    style.width = addUnit(props.length)
    if (props.hairline) style.transform = 'scaleY(0.5)'
  } else {
    style.borderLeftWidth = '1px'
    style.borderLeftStyle = props.dashed ? 'dashed' : 'solid'
    style.height = addUnit(props.length)
    if (props.hairline) style.transform = 'scaleX(0.5)'
  }
  style.borderColor = props.color
  return deepMerge(style, addStyle(props.customStyle) as CSSProperties)
})
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';

.su-line {
  /* #ifndef APP-NVUE */
  vertical-align: middle;
  /* #endif */
}
</style>
