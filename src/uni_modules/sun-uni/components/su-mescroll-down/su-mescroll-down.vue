<!-- 下拉刷新区域 -->
<template>
  <view v-if="mOption.use" class="mescroll-downwarp" :style="{ 'background-color': mOption.bgColor, color: mOption.textColor }">
    <view class="downwarp-content">
      <view
        class="downwarp-progress"
        :class="{ 'mescroll-rotate': isDownLoading }"
        :style="{ 'border-color': mOption.textColor, transform: downRotate }"
      ></view>
      <view class="downwarp-tip">{{ downText }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, unref } from 'vue'

const props = defineProps({
  option: {
    type: Object,
    default: () => ({})
  }, // down的配置项
  type: {
    type: Number,
    default: undefined
  }, // 下拉状态（inOffset：1， outOffset：2， showLoading：3， endDownScroll：4）
  rate: {
    type: Number,
    default: 0
  } // 下拉比率 (inOffset: rate<1; outOffset: rate>=1)
})

// 支付宝小程序需写成计算属性,prop定义default仍报错
const mOption = computed(() => props.option)
// 是否在加载中
const isDownLoading = computed(() => props.type === 3)
// 旋转的角度
const downRotate = computed(() => 'rotate(' + 360 * props.rate + 'deg)')
// 文本提示
const downText = computed(() => {
  switch (props.type) {
    case 1:
      return unref(mOption).textInOffset
    case 2:
      return unref(mOption).textOutOffset
    case 3:
      return unref(mOption).textLoading
    case 4:
      return unref(mOption).textLoading
    default:
      return unref(mOption).textInOffset
  }
})
</script>

<style>
@import './mescroll-down.css';
</style>
