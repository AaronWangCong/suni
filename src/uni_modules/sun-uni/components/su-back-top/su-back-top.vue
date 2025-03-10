<template>
  <su-transition mode="fade" :customStyle="backTopStyle" :show="show">
    <view class="su-back-top" :style="[contentStyle]" v-if="!$slots.default && !$slots.$default" @click="backToTop">
      <su-icon :name="icon" :custom-style="iconStyle"></su-icon>
      <text v-if="text" class="su-back-top__text">{{ text }}</text>
    </view>
    <slot v-else />
  </su-transition>
</template>

<script lang="ts" setup>
import { backTopProps } from './props'
import { addUnit, addStyle, getPx, deepMerge, error } from '../../libs/function/index'
import { baseProps } from '../../libs/vue'
import { computed, getCurrentInstance, type CSSProperties } from 'vue'

// #ifdef APP-NVUE
// @ts-ignore
const dom = weex.requireModule('dom')
// #endif
/**
 * backTop 返回顶部
 * @description 本组件一个用于长页面，滑动一定距离后，出现返回顶部按钮，方便快速返回顶部的场景。
 * @tutorial https://suni.pages.dev/component/backTop.html
 *
 * @property {String}			mode  		返回顶部的形状，circle-圆形，square-方形 （默认 'circle' ）
 * @property {String} 			icon 		自定义图标 （默认 'arrow-upward' ） 见官方文档示例
 * @property {String} 			text 		提示文字
 * @property {String | Number}  duration	返回顶部滚动时间 （默认 100）
 * @property {String | Number}  scrollTop	滚动距离 （默认 0 ）
 * @property {String | Number}  top  		距离顶部多少距离显示，单位px （默认 400 ）
 * @property {String | Number}  bottom  	返回顶部按钮到底部的距离，单位px （默认 100 ）
 * @property {String | Number}  right  		返回顶部按钮到右边的距离，单位px （默认 20 ）
 * @property {String | Number}  zIndex 		层级   （默认 9 ）
 * @property {Object<Object>}  	iconStyle 	图标的样式，对象形式   （默认 {color: '#909399',fontSize: '19px'}）
 * @property {Object}			customStyle	定义需要用到的外部样式
 *
 * @example <su-back-top :scrollTop="scrollTop"></su-back-top>
 */

defineOptions({
  name: 'su-back-top',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps({
  ...backTopProps,
  ...baseProps
})

const emit = defineEmits(['click'])
const instance = getCurrentInstance()

/** 样式 */
const backTopStyle = computed(() => {
  return {
    bottom: addUnit(props.bottom),
    right: addUnit(props.right),
    width: '40px',
    height: '40px',
    position: 'fixed',
    zIndex: 10
  }
})

/** 是否显示 */
const show = computed(() => getPx(`${props.scrollTop}`) > getPx(`${props.top}`))

/** 内容样式 */
const contentStyle = computed(() => {
  const style: CSSProperties = {}
  let radius = '0px'
  // 是否圆形
  if (props.mode === 'circle') {
    radius = '100px'
  } else {
    radius = '4px'
  }
  // 为了兼容安卓nvue，只能这么分开写
  style.borderTopLeftRadius = radius
  style.borderTopRightRadius = radius
  style.borderBottomLeftRadius = radius
  style.borderBottomRightRadius = radius
  return deepMerge(style, addStyle(props.customStyle) as CSSProperties)
})

/** 滚动到顶部按钮事件 */
function backToTop() {
  // #ifdef APP-NVUE
  if (!instance!.proxy?.$refs['su-back-top']) {
    error("nvue页面需要给页面最外层元素设置\"ref='su-back-top'")
  }
  dom.scrollToElement(instance!.proxy?.$refs['su-back-top'], {
    offset: 0
  })
  // #endif

  // #ifndef APP-NVUE
  uni.pageScrollTo({
    scrollTop: 0,
    duration: Number(props.duration) || 100
  })
  // #endif
  emit('click')
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';
$su-back-top-flex: 1 !default;
$su-back-top-height: 100% !default;
$su-back-top-background-color: #e1e1e1 !default;
$su-back-top-tips-font-size: 12px !default;
.su-back-top {
  @include flex;
  flex-direction: column;
  align-items: center;
  flex: $su-back-top-flex;
  height: $su-back-top-height;
  justify-content: center;
  background-color: $su-back-top-background-color;

  &__tips {
    font-size: $su-back-top-tips-font-size;
    transform: scale(0.8);
  }
}
</style>
