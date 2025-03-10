<script lang="ts" setup>
import { useDesign } from '@/uni_modules/sun-uni/hooks'
import { useMescroll } from '@/uni_modules/sun-uni/components/su-mescroll'
import { onPageScroll, onReachBottom } from '@dcloudio/uni-app'
import type { SuUni } from '@/uni_modules/sun-uni/types/uni'
import { ref } from 'vue'
import { CountryGetPageGET } from '@/api/dc-default/Country'

const { prefixCls } = useDesign('mescroll-body')
const { mescrollInit, downCallback, getMescroll } = useMescroll(onPageScroll, onReachBottom)

const list = ref<Array<any>>([])

async function upCallback(mescroll: SuUni.MeScroll) {
  const { data } = await CountryGetPageGET({
    PageIndex: mescroll.num,
    PageSize: 20
  })
  console.log(data, 'data')
  if (mescroll.num === 1) {
    list.value = data.list || []
  } else {
    list.value = list.value?.concat(data.list || [])
  }
  if (mescroll.endBySize) mescroll.endBySize(list.value?.length, data.pagination?.total || 0)
}
</script>

<template>
  <su-mescroll-body :class="prefixCls" @init="mescrollInit" @down="downCallback" @up="upCallback">
    <view v-for="(item, index) in list" :key="index" class="py-2 px-4 border-#eee border-b-solid border-b-1">
      <view>
        <text>中文名</text>
        <text>{{ item.cnName }}</text>
      </view>
      <view>
        <text>英文名</text>
        <text>{{ item.enName }}</text>
      </view>
    </view>
  </su-mescroll-body>
</template>

<style lang="scss" scoped>
.sjzy-mescroll-body {
  width: 100%;
  height: 100%;
}
</style>
