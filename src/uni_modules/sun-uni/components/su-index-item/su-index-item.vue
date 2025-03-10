<template>
  <!-- #ifdef APP-NVUE -->
  <cell ref="indexItemRef">
    <!-- #endif -->
    <view class="su-index-item" :id="`su-index-item-${id}`" :class="[`su-index-item-${id}`]">
      <slot />
    </view>
    <!-- #ifdef APP-NVUE -->
  </cell>
  <!-- #endif -->
</template>

<script lang="ts" setup>
import { indexItemProps } from './props'
import { sleep, error } from '../../libs/function/index'
import { getCurrentInstance, onMounted, ref, unref } from 'vue'
import { useSelectorQuery } from '../../hooks/core/useSelectorQuery'
import { INDEX_LIST_KEY } from '../su-index-list/props'
import { useParent } from '../../hooks/core/useParent'

/**
 * IndexItem
 * @description
 * @tutorial https://suni.pages.dev/component/indexList.html
 * @property {String}
 * @event {Function}
 * @example
 */

defineOptions({
  name: 'su-index-item',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
})

defineProps(indexItemProps)

// 本组件到滚动条顶部的距离
const top = ref(0)
// 高度
const height = ref(0)
// id
const id = ref('')

const indexItemRef = ref<UniApp.NodesRef>()

/** 获取节点布局信息的方法 */
const { getBoundingClientRect } = useSelectorQuery()

const instance = getCurrentInstance()

const { parent } = useParent(INDEX_LIST_KEY)

function init() {
  if (!parent) {
    return error('su-index-item必须要搭配su-index-list组件使用')
  }

  sleep().then(() => {
    getIndexItemRect().then((size) => {
      // 由于对象的引用特性，此处会同时生效到父组件的children数组的本实例的top属性中，供父组件判断读取
      top.value = Math.ceil(size.top || 0)
      height.value = Math.ceil(size.height || 0)
    })
  })
}

function setId(val: string) {
  id.value = val
}

function getIndexItemRect() {
  return new Promise<UniApp.NodeInfo>((resolve) => {
    // #ifndef APP-NVUE
    uni
      .createSelectorQuery()
      .in(instance?.proxy)
      .select('.su-index-item')
      .boundingClientRect((size) => {
        resolve(size as UniApp.NodeInfo)
      })
      .exec()
    // #endif
    // #ifdef APP-NVUE
    // nvue的dom模块用于获取节点
    getBoundingClientRect(unref(indexItemRef)!).then((data) => {
      resolve(data as UniApp.NodeInfo)
    })
    // #endif
  })
}

onMounted(() => {
  init()
})

defineExpose({
  setId
})
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';
</style>
