<template>
  <page-wraper>
    <demo-block title="基本用法" transparent>
      <su-cell-group>
        <su-cell title="基础用法" is-link @click="showBasicNotify" />
      </su-cell-group>
    </demo-block>
    <demo-block title="通知类型" transparent>
      <su-cell-group>
        <su-cell title="主要通知" is-link @click="showType('primary')" />
        <su-cell title="成功通知" is-link @click="showType('success')" />
        <su-cell title="危险通知" is-link @click="showType('danger')" />
        <su-cell title="警告通知" is-link @click="showType('warning')" />
      </su-cell-group>
    </demo-block>
    <demo-block title="自定义配置" transparent>
      <su-cell-group>
        <su-cell title="自定义颜色" is-link @click="showCustomColor" />
        <su-cell title="自定义位置" is-link @click="showCustomPosition" />
        <su-cell title="自定义时长" is-link @click="showCustomDuration" />
      </su-cell-group>
    </demo-block>
    <demo-block title="使用 Notify 组件" transparent>
      <su-cell-group>
        <su-cell title="使用 Notify 组件" is-link @click="showNotifyComponent" />
      </su-cell-group>
    </demo-block>
    <su-notify selector="visible" type="success" v-model:visible="visible">
      <su-icon name="check-outline" size="inherit" color="inherit" />
      成功通知
    </su-notify>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { NotifyType } from '@/uni_modules/suni/components/su-notify/types'
import { useNotify } from '@/uni_modules/suni'

let timer: ReturnType<typeof setTimeout>
const visible = ref(false)
const { showNotify } = useNotify()

const showType = (type: NotifyType) => {
  showNotify({
    message: '通知内容',
    type
  })
}
const showBasicNotify = () => showNotify('测试')
const showCustomColor = () => {
  showNotify({
    color: '#ad0000',
    message: '自定义颜色',
    background: '#ffe1e1'
  })
}
const showCustomPosition = () => {
  showNotify({
    message: '自定义位置',
    position: 'bottom'
  })
}
const showCustomDuration = () => {
  showNotify({
    message: '自定义时长',
    duration: 1000
  })
}
const showNotifyComponent = () => {
  visible.value = true
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    visible.value = false
  }, 2000)
}
</script>
