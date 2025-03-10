<template>
  <view class="su-grid" ref="gridRef" :style="[gridStyle]">
    <slot />
  </view>
</template>

<script lang="ts" setup>
import { GRID_KEY, gridProps } from './props'
import { mpMixin } from '../../libs/mixin/mpMixin'
import { mixin } from '../../libs/mixin/mixin'
import { addStyle, deepMerge } from '../../libs/function/index'
import { baseProps } from '../../libs/vue'
import { computed, ref, watch, type CSSProperties } from 'vue'
import { useChildren } from '../../hooks/core/useChildren'
import type { SuGridItemProps } from '../su-grid-item/props'
/**
 * grid 宫格布局
 * @description 宫格组件一般用于同时展示多个同类项目的场景，可以给宫格的项目设置徽标组件(badge)，或者图标等，也可以扩展为左右滑动的轮播形式。
 * @tutorial https://suni.pages.dev/sun-uni/component/grid.html
 * @property {String | Number}	col			宫格的列数（默认 3 ）
 * @property {Boolean}			border		是否显示宫格的边框（默认 false ）
 * @property {String}			align		宫格对齐方式，表现为数量少的时候，靠左，居中，还是靠右 （默认 'left' ）
 * @property {Object}			customStyle	定义需要用到的外部样式
 * @event {Function} click 点击宫格触发
 * @example <su-grid :col="3" @click="click"></su-grid>
 */
defineOptions({
  name: 'su-grid',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps({
  ...gridProps,
  ...baseProps
})
const emit = defineEmits(['click'])

const index = ref(0)
const width = ref(0)

const gridRef = ref<UniApp.NodesRef>()

const { linkChildren, internalChildren } = useChildren(GRID_KEY)

const gridStyle = computed(() => {
  let style: CSSProperties = {}
  switch (props.align) {
    case 'left':
      style.justifyContent = 'flex-start'
      break
    case 'center':
      style.justifyContent = 'center'
      break
    case 'right':
      style.justifyContent = 'flex-end'
      break
    default:
      style.justifyContent = 'flex-start'
  }
  return deepMerge(style, addStyle(props.customStyle) as CSSProperties)
})

function childClick(name: SuGridItemProps['name']) {
  emit('click', name)
}

watch(
  () => [props.col, props.border],
  () => {}
)

linkChildren({
  col: props.col,
  childClick,
  gridRef,
  border: props.border,
})

defineExpose({
  childClick
})
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';
$su-grid-width: 100% !default;
.su-grid {
  /* #ifdef APP-NVUE */
  width: $su-grid-width;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  display: block;
  /* #endif */
  justify-content: center;
  @include flex;
  flex-wrap: wrap;
  align-items: center;
  // 在uni-app中应尽量避免使用flex布局以外的方式,因为nvue/uvue等方案都支持flex布局
  // 这里使用grid布局使用为目前20240409uni-app在抖音小程序开启virtualHost时有bug，存在事件失效问题。
  /* #ifndef APP-NVUE */
  display: grid;
  grid-gap: v-bind(gap);
  grid-template-columns: repeat(v-bind(col), 1fr);
  /* #endif */
}
</style>
