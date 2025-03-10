<script lang="ts" setup>
import type { SuUni } from '@/uni_modules/sun-uni/types/uni'
import { http } from '@/uni_modules/sun-uni'
import SuMescrollB from './body.vue'
import { CountryGetPageGET } from '@/api/dc-default/Country'

async function upCallback(mescroll: SuUni.MeScroll) {
  return await CountryGetPageGET({
    PageIndex: mescroll.num,
    PageSize: 20
  })
}
</script>

<template>
  <su-mescroll :queryCallback="upCallback" dataField="data.list" totalField="data.pagination.total">
    <template #default="{ list }">
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
    </template>
  </su-mescroll>
</template>
