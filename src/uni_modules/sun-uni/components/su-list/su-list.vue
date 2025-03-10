<template>
  <!-- #ifdef APP-NVUE -->
  <list
    class="su-list"
    :enableBackToTop="enableBackToTop"
    :loadmoreoffset="lowerThreshold"
    :showScrollbar="showScrollbar"
    :style="[listStyle]"
    :offset-accuracy="Number(offsetAccuracy)"
    @scroll="onScroll"
    @loadmore="scrolltolower"
  >
    <slot />
  </list>
  <!-- #endif -->
  <!-- #ifndef APP-NVUE -->
  <scroll-view
    class="su-list"
    :scroll-into-view="scrollIntoView"
    :style="[listStyle]"
    :scroll-y="scrollable"
    :scroll-top="Number(scrollTop)"
    :lower-threshold="Number(lowerThreshold)"
    :upper-threshold="Number(upperThreshold)"
    :show-scrollbar="showScrollbar"
    :enable-back-to-top="enableBackToTop"
    :scroll-with-animation="scrollWithAnimation"
    @scroll="onScroll"
    @scrolltolower="scrolltolower"
    @scrolltoupper="scrolltoupper"
    :refresher-enabled="refresherEnabled"
    :refresher-threshold="refresherThreshold"
    :refresher-default-style="refresherDefaultStyle"
    :refresher-background="refresherBackground"
    :refresher-triggered="refresherTriggered"
    @refresherpulling="refresherpulling"
    @refresherrefresh="refresherrefresh"
    @refresherrestore="refresherrestore"
    @refresherabort="refresherabort"
    :scroll-anchoring="true"
  >
    <view>
      <slot />
    </view>
  </scroll-view>
  <!-- #endif -->
</template>

<script lang="ts" setup>
import { listProps, LIST_KEY } from './props'
import { addUnit, addStyle, deepMerge, sleep, sys } from '../../libs/function/index'
import { computed, onMounted, ref, watch, type CSSProperties } from 'vue'
import { baseProps } from '../../libs/vue'
import { useChildren } from '../../hooks/core/useChildren'
import type { SuUni } from '../../types/uni'

// #ifdef APP-NVUE
const dom = uni.requireNativePlugin('dom')
// #endif
/**
 * List 列表
 * @description 该组件为高性能列表组件
 * @tutorial https://suni.pages.dev/sun-uni/component/list.html
 * @property {Boolean}			showScrollbar		控制是否出现滚动条，仅nvue有效 （默认 false ）
 * @property {String ｜ Number}	lowerThreshold		距底部多少时触发scrolltolower事件 （默认 50 ）
 * @property {String ｜ Number}	upperThreshold		距顶部多少时触发scrolltoupper事件，非nvue有效 （默认 0 ）
 * @property {String ｜ Number}	scrollTop			设置竖向滚动条位置（默认 0 ）
 * @property {String ｜ Number}	offsetAccuracy		控制 onscroll 事件触发的频率，仅nvue有效（默认 10 ）
 * @property {Boolean}			enableFlex			启用 flexbox 布局。开启后，当前节点声明了display: flex就会成为flex container，并作用于其孩子节点，仅微信小程序有效（默认 false ）
 * @property {Boolean}			pagingEnabled		是否按分页模式显示List，（默认 false ）
 * @property {Boolean}			scrollable			是否允许List滚动（默认 true ）
 * @property {String}			scrollIntoView		值应为某子元素id（id不能以数字开头）
 * @property {Boolean}			scrollWithAnimation	在设置滚动条位置时使用动画过渡 （默认 false ）
 * @property {Boolean}			enableBackToTop		iOS点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只对微信小程序有效 （默认 false ）
 * @property {String ｜ Number}	height				列表的高度 （默认 0 ）
 * @property {String ｜ Number}	width				列表宽度 （默认 0 ）
 * @property {String ｜ Number}	preLoadScreen		列表前后预渲染的屏数，1代表一个屏幕的高度，1.5代表1个半屏幕高度  （默认 1 ）
 * @property {Object}			customStyle			定义需要用到的外部样式
 *
 * @example <su-list @scrolltolower="scrolltolower"></su-list>
 */

defineOptions({
  name: 'su-list',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps({
  ...listProps,
  ...baseProps
})

const emit = defineEmits(['scroll', 'scrolltolower', 'scrolltoupper', 'refresherpulling', 'refresherrefresh', 'refresherrestore', 'refresherabort'])

// 内部滚动条的位置，默认为0
const innerScrollTop = ref(0)
// 滚动条的偏移量，默认为0
const offset = ref(0)
// 获取系统信息
const systemInfo = sys()

const { internalChildren, linkChildren } = useChildren(LIST_KEY)

const listStyle = computed(() => {
  const style: CSSProperties = {}

  if (props.width !== 0) style.width = addUnit(props.width)
  if (props.height !== 0) style.height = addUnit(props.height)
  // 如果没有定义列表高度，则默认使用屏幕高度
  if (!style.height) style.height = addUnit(systemInfo.windowHeight, 'px')

  return deepMerge(style, addStyle(props.customStyle) as CSSProperties)
})

function updateOffsetFromChild(top: number) {
  offset.value = top
}

function onScroll(e: UniHelper.ScrollViewOnScrollEvent) {
  let scrollTop = 0
  // #ifdef APP-NVUE
  scrollTop = e.contentOffset.y
  // #endif
  // #ifndef APP-NVUE
  scrollTop = e.detail.scrollTop
  // #endif
  innerScrollTop.value = scrollTop
  emit('scroll', scrollTop)
}

function scrollIntoViewById(id: string) {
  // #ifdef APP-NVUE
  // 根据id参数，找到所有u-list-item中匹配的节点，再通过dom模块滚动到对应的位置
  console.log(internalChildren, 'internalChildren')
  const item = internalChildren.find((key: SuUni.Recordable) => (key[id] ? true : false))
  console.log(item, 'item')
  dom.scrollToElement(item, {
    // 是否需要滚动动画
    animated: props.scrollWithAnimation
  })
  // #endif
}

function scrolltolower() {
  sleep(30).then(() => {
    emit('scrolltolower')
  })
}

// #ifndef APP-NVUE
// 滚动到底部时触发，非nvue有效
function scrolltoupper() {
  sleep(30).then(() => {
    emit('scrolltoupper')
    // 这一句很重要，能绝对保证在性功能障碍的webview，滚动条到顶时，取消偏移值，让页面置顶
    offset.value = 0
  })
}

/**
 * 处理下拉刷新事件
 * @param e - 下拉刷新事件对象
 */
function refresherpulling(e: UniHelper.ScrollViewOnRefresherpullingEvent) {
  emit('refresherpulling', e)
}

/**
 * 处理下拉刷新完成事件
 * @param e - 下拉刷新完成事件对象
 */
function refresherrefresh(e: UniHelper.ScrollViewOnRefresherrefreshEvent) {
  emit('refresherrefresh', e)
}

/**
 * 处理下拉刷新重置事件
 * @param e - 下拉刷新重置事件对象
 */
function refresherrestore(e: UniHelper.ScrollViewOnRefresherrestoreEvent) {
  emit('refresherrestore', e)
}

/**
 * 处理下拉刷新中止事件
 * @param e - 下拉刷新中止事件对象
 */
function refresherabort(e: UniHelper.ScrollViewOnRefresherabortEvent) {
  emit('refresherabort', e)
}
// #endif

watch(
  () => props.scrollIntoView,
  (val) => {
    scrollIntoViewById(val!)
  }
)

onMounted(() => {})

linkChildren({
  updateOffsetFromChild,
  innerScrollTop,
  preLoadScreen: props.preLoadScreen
})
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';

.su-list {
  @include flex(column);
}
</style>
