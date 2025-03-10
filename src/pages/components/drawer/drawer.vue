<script lang="ts" setup>
import { ref } from 'vue'

import { useDrawer } from '@/uni_modules/sun-uni/hooks'

const show = ref(false)

const { openDrawer, closeDrawer } = useDrawer('user-drawer')

function onOpenClick() {
  show.value = true
}

function useDrawerClick() {
  openDrawer(true)
}
</script>

<template>
  <view class="px-2">
    <su-button @click="onOpenClick">打开抽屉</su-button>

    <su-button class="mt-4" @click="useDrawerClick">useDrawer 打开抽屉</su-button>
    <su-drawer v-model="show" title="标题" show-footer :custom-style="{ height: '500px' }">
      <view class="p-2 h-900px">
        45151515151
        <su-button @click="show = false">关闭抽屉</su-button>

        关闭抽屉关闭抽屉关闭抽屉关闭抽屉
      </view>
      45151515151
    </su-drawer>
    <su-drawer selector="user-drawer" title="标题" show-footer :custom-style="{ height: '500px' }">
      <view class="p-2 h-900px">
        openDraweropenDraweropenDraweropenDraweropenDrawer
        <su-button @click="closeDrawer">关闭抽屉</su-button>

        关闭抽屉关闭抽屉关闭抽屉关闭抽屉
      </view>
      openDraweropenDraweropenDraweropenDraweropenDraweropenDrawer
    </su-drawer>
  </view>
</template>

<style></style>
