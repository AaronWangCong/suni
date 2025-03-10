<template>
  <view @click="handleClick">
    <slot>{{ text }}</slot>
  </view>
</template>

<script lang="ts" setup>
import { copyProps } from './props'

defineOptions({
  name: 'su-copy',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps(copyProps)
const emit = defineEmits(['success'])

/** 点击事件 */ 
function handleClick() {
  let content = props.content
  if (!content) {
    uni.showToast({
      title: '暂无',
      icon: 'none',
      duration: 2000
    })
    return false
  }
  content = typeof content === 'string' ? content : (content as any).toString() // 复制内容，必须字符串，数字需要转换为字符串
  /**
   * 小程序端 和 app端的复制逻辑
   */
  uni.setClipboardData({
    data: content,
    success: function () {
      if (props.alertStyle == 'modal') {
        uni.showModal({
          title: '提示',
          content: props.notice
        })
      } else {
        uni.showToast({
          title: props.notice,
          icon: 'none'
        })
      }
      emit('success')
    },
    fail: function () {
      uni.showToast({
        title: '复制失败',
        icon: 'none',
        duration: 3000
      })
    }
  })
}
</script>

<style lang="scss" scoped></style>
