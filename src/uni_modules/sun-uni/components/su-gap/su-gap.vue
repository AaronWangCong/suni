<template>
  <view class="su-gap" :style="[gapStyle]"></view>
</template>

<script lang="ts" setup>
import { gapProps } from './props'
import { addStyle, addUnit, deepMerge } from '../../libs/function/index'
import { computed, type CSSProperties } from 'vue'
import { baseProps } from '../../libs/vue'
/**
 * gap 间隔槽
 * @description 该组件一般用于内容块之间的用一个灰色块隔开的场景，方便用户风格统一，减少工作量
 * @tutorial https://suni.pages.dev/component/gap.html
 * @property {String}			bgColor			背景颜色 （默认 'transparent' ）
 * @property {String | Number}	height			分割槽高度，单位px （默认 20 ）
 * @property {String | Number}	marginTop		与前一个组件的距离，单位px（ 默认 0 ）
 * @property {String | Number}	marginBottom	与后一个组件的距离，单位px （默认 0 ）
 * @property {Object}			customStyle		定义需要用到的外部样式
 *
 * @example <su-gap height="80" bg-color="#bbb"></su-gap>
 */

defineOptions({
  name: 'su-gap',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps({
  ...gapProps,
  ...baseProps
})

/** 样式 */
const gapStyle = computed(() => {
  const style: CSSProperties = {
    backgroundColor: props.bgColor,
    height: addUnit(props.height),
    marginTop: addUnit(props.marginTop),
    marginBottom: addUnit(props.marginBottom)
  }
  return deepMerge(style, addStyle(props.customStyle) as CSSProperties)
})
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';
</style>
