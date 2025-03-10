<template>
  <view class="su-col" ref="su-col" :class="['su-col-' + span]" :style="[colStyle]" @tap="clickHandler">
    <slot></slot>
  </view>
</template>

<script lang="ts" setup>
import { colProps } from './props'
import { addStyle, addUnit, deepMerge, getPx } from '../../libs/function/index'
import { computed, onMounted, reactive, ref, unref, type CSSProperties } from 'vue'
import { baseProps } from '../../libs/vue'
import { ROW_KEY } from '../su-row/props'
import { useParent } from '../../hooks/core/useParent'
/**
 * CodeInput 栅格系统的列
 * @description 该组件一般用于Layout 布局 通过基础的 12 分栏，迅速简便地创建布局
 * @tutorial https://suni.pages.dev/sun-uni/component/Layout.html
 * @property {String | Number}	span		栅格占据的列数，总12等份 (默认 12 )
 * @property {String | Number}	offset		分栏左边偏移，计算方式与span相同 (默认 0 )
 * @property {String}			justify		水平排列方式，可选值为`start`(或`flex-start`)、`end`(或`flex-end`)、`center`、`around`(或`space-around`)、`between`(或`space-between`)  (默认 'start' )
 * @property {String}			align		垂直对齐方式，可选值为top、center、bottom、stretch (默认 'stretch' )
 * @property {String}			textAlign	文字水平对齐方式 (默认 'left' )
 * @property {Object}			customStyle	定义需要用到的外部样式
 * @event {Function}	click	col被点击，会阻止事件冒泡到row
 * @example	 <su-col  span="3" offset="3" > <view class="demo-layout bg-purple"></view> </su-col>
 */

defineOptions({
  name: 'su-col',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
})
const props = defineProps({
  ...colProps,
  ...baseProps
})

const emit = defineEmits(['click'])

// 宽度
const width = ref(0)
// 父级的参数
const parentData = reactive({
  gutter: 0
})
// 栅格数
const gridNum = ref(12)

const { parent } = useParent(ROW_KEY)

const uJustify = computed(() => {
  if (props.justify == 'end' || props.justify == 'start') return 'flex-' + props.justify
  else if (props.justify == 'around' || props.justify == 'between') return 'space-' + props.justify
  else return props.justify
})

const uAlignItem = computed(() => {
  if (props.align == 'top') return 'flex-start'
  if (props.align == 'bottom') return 'flex-end'
  else return props.align
})

const colStyle = computed(() => {
  const style: CSSProperties = {
    paddingLeft: addUnit((getPx(`${parentData.gutter}`) as number) / 2),
    paddingRight: addUnit((getPx(`${parentData.gutter}`) as number) / 2),
    alignItems: unref(uAlignItem),
    justifyContent: unref(uJustify),
    textAlign: props.textAlign,
    // #ifndef APP-NVUE
    flex: `0 0 ${(100 / unref(gridNum)) * Number(props.span)}%`,
    marginLeft: (100 / 12) * Number(props.offset) + '%'
    // #endif
  }

  // #ifdef APP-NVUE
  // 在nvue环境下添加额外的样式
  Object.assign(style, {
    width: addUnit(Math.floor((unref(width) / unref(gridNum)) * Number(props.span))),
    marginLeft: addUnit(Math.floor((unref(width) / unref(gridNum)) * Number(props.offset)))
  })
  // #endif
  return deepMerge(style, addStyle(props.customStyle) as CSSProperties)
})

function clickHandler() {
  emit('click')
}

onMounted(async () => {
  width.value = (await parent?.getComponentWidth()) || 0
  parentData.gutter = parent?.gutter || 0
})
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';

.su-col {
  padding: 0;
  /* #ifndef APP-NVUE */
  box-sizing: border-box;
  /* #endif */
  /* #ifdef MP */
  display: block;
  /* #endif */
}

// nvue下百分比无效
/* #ifndef APP-NVUE */
.su-col-0 {
  width: 0;
}

.su-col-1 {
  width: calc(100% / 12);
}

.su-col-2 {
  width: calc(100% / 12 * 2);
}

.su-col-3 {
  width: calc(100% / 12 * 3);
}

.su-col-4 {
  width: calc(100% / 12 * 4);
}

.su-col-5 {
  width: calc(100% / 12 * 5);
}

.su-col-6 {
  width: calc(100% / 12 * 6);
}

.su-col-7 {
  width: calc(100% / 12 * 7);
}

.su-col-8 {
  width: calc(100% / 12 * 8);
}

.su-col-9 {
  width: calc(100% / 12 * 9);
}

.su-col-10 {
  width: calc(100% / 12 * 10);
}

.su-col-11 {
  width: calc(100% / 12 * 11);
}

.su-col-12 {
  width: calc(100% / 12 * 12);
}

/* #endif */
</style>
