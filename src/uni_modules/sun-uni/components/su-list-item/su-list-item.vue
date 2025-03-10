<template>
  <!-- #ifdef APP-NVUE -->
  <cell>
    <!-- #endif -->
    <view class="su-list-item" :ref="`su-list-item-${anchor}`" :anchor="`su-list-item-${anchor}`" :class="[`su-list-item-${anchor}`]">
      <slot />
    </view>
    <!-- #ifdef APP-NVUE -->
  </cell>
  <!-- #endif -->
</template>

<script lang="ts" setup>
import { listItemProps } from './props'
import { sys } from '../../libs/function/index'
import { getCurrentInstance, onMounted, ref, watch } from 'vue'
import { LIST_KEY } from '../su-list/props'
import { useParent } from '../../hooks/core/useParent'
import { useSelectorQuery } from '../../hooks/core/useSelectorQuery'

/**
 * List 列表
 * @description 该组件为高性能列表组件
 * @tutorial https://suni.pages.dev/sun-uni/component/list.html
 * @property {String | Number}	anchor	用于滚动到指定item
 * @example <su-list-ite v-for="(item, index) in indexList" :key="index" ></su-list-item>
 */
defineOptions({
  name: 'su-list-item',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps(listItemProps)
// 节点信息
const rect = ref<UniApp.NodeInfo | undefined>()
const show = ref(true)
const systemInfo = sys()

const { parent, index } = useParent(LIST_KEY)

/** 获取当前组件实例的代理对象 */
const { proxy } = getCurrentInstance() as any

/** 获取节点布局信息的方法 */
const { getBoundingClientRect } = useSelectorQuery()

// #ifndef APP-NVUE
watch(
  () => parent?.innerScrollTop.value,
  (val) => {
    const preLoadScreen = parent?.preLoadScreen || 1
    const windowHeight = systemInfo.windowHeight
    if (val) {
      if (val <= windowHeight * +preLoadScreen) {
        parent && parent.updateOffsetFromChild(0)
      } else if (rect.value?.top! <= val - windowHeight * +preLoadScreen) {
        parent && parent.updateOffsetFromChild(rect.value?.top!)
      }
    }
  }
)
// #endif

function init() {
  updateParentData()
  resize()
}

function updateParentData() {}

function resize() {
  queryRect(`su-list-item-${props.anchor}`).then((size: UniApp.NodeInfo) => {
    const lastChild = parent?.children[index.value - 1]
    rect.value = size
    const preLoadScreen = Number(parent!.preLoadScreen) || 0
    const windowHeight = systemInfo.windowHeight
    // #ifndef APP-NVUE
    if (lastChild) {
      rect.value.top = parent?.innerScrollTop.value + lastChild.$el.height
    }
    if (size.top! >= +parent?.innerScrollTop.value! + (1 + preLoadScreen) * windowHeight) show.value = false
    // #endif
  })
}

// 查询元素尺寸
function queryRect(el: string): Promise<UniApp.NodeInfo> {
  return new Promise((resolve) => {
    // #ifndef APP-NVUE
    uni
      .createSelectorQuery()
      .in(proxy)
      .select(`.${el}`)
      .boundingClientRect((size) => {
        resolve(size as UniApp.NodeInfo)
      })
      .exec()
    // #endif

    // #ifdef APP-NVUE
    const ref = proxy.$refs[el]
    getBoundingClientRect(ref).then((data) => {
      resolve(data as UniApp.NodeInfo)
    })
    // #endif
  })
}

onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';

.su-list-item {
}
</style>
