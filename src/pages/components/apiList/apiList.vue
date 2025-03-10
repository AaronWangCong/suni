<template>
  <view class="su-page">
    <view class="su-demo-block">
      <text class="su-demo-block__title">基础使用</text>
      <view class="su-demo-block__content">
        <su-api-list v-model="modelValue" v-bind="basicListProps"></su-api-list>
      </view>
    </view>

    <view class="su-demo-block">
      <text class="su-demo-block__title">api使用</text>
      <view class="su-demo-block__content">
        <su-api-list
          v-model="modelValue"
          v-bind="apiListProps"
          :listProps="{
            height: '500px'
          }"
        ></su-api-list>
      </view>
    </view>

    <view class="su-demo-block">
      <text class="su-demo-block__title">弹窗使用</text>
      <view class="su-demo-block__content">
        <su-button type="primary" @click="openDrawer(true)">打开弹窗</su-button>
      </view>
    </view>

    <su-drawer selector="user-drawer" title="国家列表" show-footer :custom-style="{ height: '600px' }">
      <view style="padding: 24rpx">
        <su-api-list
          v-model="modelValue"
          v-bind="apiListProps"
          :listProps="{
            height: '430px'
          }"
        ></su-api-list>
      </view>
    </su-drawer>
  </view>
</template>

<script setup lang="ts">
import { CountryGetPageGET } from '@/api/dc-default/Country'
import type { SuApiListProps } from '@/uni_modules/sun-uni/components/su-api-list/props'
import { watch } from 'vue'
import { ref } from 'vue'

import { useDrawer } from '@/uni_modules/sun-uni/hooks'

const modelValue = ref([1101])

const { openDrawer, closeDrawer } = useDrawer('user-drawer')

const apiListProps: Partial<SuApiListProps> = {
  api: CountryGetPageGET,
  labelField: 'cnName',
  valueField: 'id',
  totalField: 'data.pagination.total',
  dataField: 'data.list',
  searchField: 'keyWord',
  showPager: true,
  multiple: true,
  remoteSearch: true,
  showSearch: true
}

const basicListProps: Partial<SuApiListProps> = {
  // api: CountryGetPageGET,
  labelField: 'cnName',
  valueField: 'id',
  totalField: 'data.pagination.total',
  dataField: 'data.list',
  searchField: 'keyWord',
  listProps: {
    height: 'auto'
  },
  showPager: true,
  multiple: true,
  // remoteSearch: true,
  showSearch: false,
  list: [
    {
      id: 1101,
      cnName: '中国'
    },
    {
      id: 1102,
      cnName: '美国'
    },
    {
      id: 1103,
      cnName: '日本'
    }
  ]
}

watch(
  () => modelValue.value,
  () => {
    console.log(modelValue.value, 'modelValue.value')
  },
  { deep: true }
)
</script>
