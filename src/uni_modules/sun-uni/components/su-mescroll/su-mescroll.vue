<script lang="ts" setup>
import { useDesign } from '../../hooks'
import useMescroll from './hooks/useMescroll'
import { mescrollProps } from './props'
import { ref } from 'vue'
import type { SuUni } from '../../types/uni'
import type { MeScrollPage } from '../../types/comps/mescroll'
import { get } from 'lodash-es'

// 定义组件的props，使用defineProps函数
const props = defineProps(mescrollProps)

// 创建一个响应式的数据数组，用于存储加载的数据
const data = ref<SuUni.Recordable[]>([])

// 初始化mescroll，包括滚动初始化、下拉刷新和获取mescroll实例的回调函数
const { mescrollInit, downCallback, getMescroll } = useMescroll(props.onPageScroll, props.onReachBottom)

// 使用useDesign钩子获取设计相关的属性，如前缀类名
const { prefixCls } = useDesign('mescroll')

// 定义一个延迟函数，返回一个Promise，用于模拟异步操作或加载延迟
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * 上拉加载的回调函数
 * @param {SuUni.MeScroll & MeScrollPage} mescroll - mescroll实例，包含当前滚动的状态和方法
 * 当上拉加载时，此函数会被调用，负责处理数据的加载和更新
 */
const upCallback = async (mescroll: SuUni.MeScroll & MeScrollPage) => {
  try {
    // 创建一个Promise数组，包含数据加载的Promise
    const queryList: Promise<any>[] = [props.queryCallback(mescroll)]
    // 如果是第一页数据，添加一个延迟的Promise，用于模拟加载延迟
    if (mescroll.num === 1) queryList.push(delay(500))
    // 等待所有Promise完成，获取结果
    const [res] = await Promise.all(queryList)
    // 清空数据数组
    if (mescroll.num === 1) data.value = []
    // 从响应数据中提取列表数据和总数据数
    const list = get(res, props.dataField) || []
    const total = get(res, props.totalField) || 0
    // 更新数据数组
    data.value = data.value.concat(list)
    // 调用mescroll的结束函数，通知mescroll数据加载完成
    mescroll.endBySize(data.value.length, total)
  } catch (error) {
    // 捕获异常，打印错误信息，并调用mescroll的错误结束函数
    console.error('su-mescroll-uni-callback :', error)
    mescroll.endErr()
  }
}

defineExpose({
  getMescroll
})
</script>

<template>
  <su-mescroll-body
    :class="prefixCls"
    @init="mescrollInit"
    @down="downCallback"
    @up="upCallback"
    :up="{
      page: { num: 0, size: pageSize },
      textNoMore: '-- 我是有底线的 --',
      noMoreSize: 0
    }"
    v-bind="$attrs"
  >
    <slot :list="data"></slot>
  </su-mescroll-body>
</template>
