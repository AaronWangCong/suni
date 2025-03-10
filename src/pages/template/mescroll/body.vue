<script setup lang="ts">
import type { SuUni } from '@/uni_modules/sun-uni/types/uni'
import { useMescroll } from '@/uni_modules/sun-uni/components/su-mescroll'
import { ref } from 'vue'

const props = defineProps<{
  queryCallback: (mescroll: any) => Promise<{ list: any[]; total: number }>
  onReachBottom: SuUni.onReachBottom
  onPageScroll: SuUni.onPageScroll
}>()
const data = ref<any[]>([])
const { mescrollInit, downCallback, getMescroll } = useMescroll(
  props.onPageScroll,
  props.onReachBottom
)
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
async function upCallback(mescroll: any) {
  try {
    const queryList: Promise<any>[] = [props.queryCallback(mescroll)]
    if (mescroll.num === 1) queryList.push(delay(500))
    const [{ list, total }] = await Promise.all(queryList)
    if (mescroll.num === 1) data.value = []
    data.value = data.value.concat(list)
    mescroll.endBySize(data.value.length, total)
  } catch (error) {
    console.log('error:', error)
    mescroll.endErr() // 请求失败, 结束加载
  }
}

defineExpose({
  getMescroll,
})
</script>

<template>
  <su-mescroll-body
    :up="{
      page: { num: 0, size: 10 },
      textNoMore: '-- 我是有底线的 --',
      empty: { icon: 'https://ylw-common.oss-cn-shenzhen.aliyuncs.com/wechat/empty.png', tip: '暂无数据' },
      noMoreSize: 0,
    }"
    v-bind="$attrs"
    @init="mescrollInit"
    @down="downCallback"
    @up="upCallback"
  >
    <slot :list="data" />
  </su-mescroll-body>
</template>
