<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  option: {
    type: Object,
    default() {
      return {}
    }
  },
  value: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'input', 'click'])

const left = computed(() => (props.option.left ? addUnit(props.option.left) : 'auto'))
const right = computed(() => (props.option.left ? 'auto' : addUnit(props.option.right)))
const isShow = computed(() => {
  // #ifdef VUE3
  return props.modelValue
  // #endif
  // #ifdef VUE2
  return props.value
  // #endif
})

function addUnit(value: number | string) {
  if (!value) return 0
  if (typeof value === 'number') return value + 'rpx'
  return value
}

function toTopClick() {
  // #ifdef VUE3
  emit('update:modelValue', false)
  // #endif
  // #ifdef VUE2
  emit('input', false)
  // #endif
  emit('click')
}
</script>

<template>
  <image
    v-if="option.src"
    class="mescroll-totop"
    :class="[isShow ? 'mescroll-totop-in' : 'mescroll-totop-out', { 'mescroll-totop-safearea': option.safearea }]"
    :style="{
      'z-index': option.zIndex,
      left: left,
      right: right,
      bottom: addUnit(option.bottom),
      width: addUnit(option.width),
      'border-radius': addUnit(option.radius)
    }"
    :src="option.src"
    mode="widthFix"
    @click="toTopClick"
  />
</template>

<style lang="scss" scoped>
/* 回到顶部的按钮 */
.mescroll-totop {
  z-index: 9990;
  position: fixed !important; /* 加上important避免编译到H5,在多mescroll中定位失效 */
  right: 20rpx;
  bottom: 120rpx;
  width: 72rpx;
  height: auto;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.5s; /* 过渡 */
  margin-bottom: var(--window-bottom); /* css变量 */
}

/* 适配 iPhoneX */
@supports (bottom: constant(safe-area-inset-bottom)) or (bottom: env(safe-area-inset-bottom)) {
  .mescroll-totop-safearea {
    margin-bottom: calc(var(--window-bottom) + constant(safe-area-inset-bottom)); /* window-bottom + 适配 iPhoneX */
    margin-bottom: calc(var(--window-bottom) + env(safe-area-inset-bottom));
  }
}

/* 显示 -- 淡入 */
.mescroll-totop-in {
  opacity: 1;
}

/* 隐藏 -- 淡出且不接收事件*/
.mescroll-totop-out {
  opacity: 0;
  pointer-events: none;
}
</style>
