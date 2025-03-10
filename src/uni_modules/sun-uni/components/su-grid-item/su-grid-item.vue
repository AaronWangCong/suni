<template>
  <!-- #ifndef APP-NVUE -->
  <view
    v-if="Number(parent?.col!) > 0"
    class="su-grid-item"
    hover-class="su-grid-item--hover-class"
    :hover-stay-time="200"
    @tap="clickHandler"
    :class="classes"
    :style="[itemStyle]"
  >
    <slot />
  </view>
  <!-- #endif -->
  <!-- #ifdef APP-NVUE -->
  <view class="su-grid-item" :hover-stay-time="200" @tap="clickHandler" :class="classes" :style="[itemStyle]">
    <slot />
  </view>
  <!-- #endif -->
</template>

<script lang="ts" setup>
import { gridItemProps } from './props'
import { mpMixin } from '../../libs/mixin/mpMixin'
import { mixin } from '../../libs/mixin/mixin'
import { addStyle, deepMerge } from '../../libs/function/index'
import { computed, getCurrentInstance, nextTick, onBeforeMount, onMounted, ref, unref, type CSSProperties } from 'vue'
import { baseProps } from '../../libs/vue'
import { useParent } from '../../hooks/core/useParent'
import { GRID_KEY } from '../su-grid/props'
import { useSelectorQuery } from '../../hooks/core/useSelectorQuery'
/**
 * gridItem 提示
 * @description 宫格组件一般用于同时展示多个同类项目的场景，可以给宫格的项目设置徽标组件(badge)，或者图标等，也可以扩展为左右滑动的轮播形式。搭配u-grid使用
 * @tutorial https://suni.pages.dev/sun-uni/component/grid.html
 * @property {String | Number}	name		宫格的name ( 默认 null )
 * @property {String}			bgColor		宫格的背景颜色 （默认 'transparent' ）
 * @property {Object}			customStyle	自定义样式，对象形式
 * @event {Function} click 点击宫格触发
 * @example <su-grid-item></su-grid-item>
 */

defineExpose({
  name: 'su-grid-item',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps({
  ...gridItemProps,
  ...baseProps
})

const emit = defineEmits(['click'])

const classes = ref<string | string[]>([])
// #ifdef APP-NVUE
const width = ref<number | string>(0) // nvue下才这么计算，vue下放到computed中，否则会因为延时造成闪烁
// #endif

const { parent } = useParent(GRID_KEY)

const instance = getCurrentInstance()

/** 获取节点布局信息的方法 */
const { getBoundingClientRect } = useSelectorQuery()

const itemStyle = computed(() => {
  const style: CSSProperties = {
    background: props.bgColor
  }
  // #ifdef APP-NVUE
  style['width'] = unref(width)
  // #endif
  // #ifndef APP-NVUE
  style['width'] = '100%'
  // #endif
  return deepMerge(style, addStyle(props.customStyle) as CSSProperties)
})

async function init() {
  uni.$on('su-grid-item', () => {
    gridItemClasses()
  })

  // #ifdef APP-NVUE
  // 获取元素该有的长度，nvue下要延时才准确
  await nextTick(function () {
    getItemWidth()
  })
  // #endif
  // 发出事件，通知所有的grid-item都重新计算自己的边框
  uni.$emit('su-grid-item')
  gridItemClasses()
}

function clickHandler() {
  let name = props.name
  // 如果没有设置name属性，历遍父组件的children数组，判断当前的元素是否和本实例this相等，找出当前组件的索引
  const children = parent ? parent.children : []
  if (children.length && props.name === null) {
    name = children.findIndex((child) => child === instance?.proxy)
  }
  parent && parent.childClick(name!)
  emit('click', name)
}

async function getItemWidth() {
  // 如果是nvue，不能使用百分比，只能使用固定宽度
  let newWidth: number | string = 0
  if (parent) {
    // 获取父组件宽度后，除以栅格数，得出每个item的宽度
    const node = await getParentWidth()
    newWidth = node.width! / Number(parent.col) + 'px'
  }
  width.value = newWidth
}

// 获取父元素的尺寸
function getParentWidth() {
  // #ifdef APP-NVUE
  // 返回一个promise，让调用者可以用await同步获取
  return new Promise<UniApp.NodeInfo>((resolve) => {
    // 调用父组件的ref
    getBoundingClientRect(unref(parent?.gridRef)!).then((data) => {
      resolve(data as UniApp.NodeInfo)
    })
  })
  // #endif
}

function gridItemClasses() {
  if (parent?.border) {
    let newClasses: string[] = []
    parent.children.forEach((child, index) => {
      if (instance?.proxy === child) {
        const len = parent.children.length
        // 贴近右边屏幕边沿的child，并且最后一个（比如只有横向2个的时候），无需右边框
        if ((index + 1) % Number(parent.col) !== 0 && index + 1 !== len) {
          newClasses.push('su-border-right')
        }

        // 总的宫格数量对列数取余的值
        // 如果取余后，值为0，则意味着要将最后一排的宫格，都不需要下边框
        const lessNum = len % Number(parent.col) === 0 ? Number(parent.col) : len % Number(parent.col)
        // 最下面的一排child，无需下边框
        if (index < len - lessNum) {
          newClasses.push('su-border-bottom')
        }
      }
    })

    // 支付宝，头条小程序无法动态绑定一个数组类名，否则解析出来的结果会带有","，而导致失效
    // #ifdef MP-ALIPAY || MP-TOUTIAO
    classes.value = newClasses.join(' ')
    // #endif
    classes.value = newClasses
  }
}

onMounted(() => {
  init()
})

onBeforeMount(() => {
  uni.$off('su-grid-item')
})
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';
$su-grid-item-hover-class-opcatiy: 0.5 !default;
$su-grid-item-margin-top: 1rpx !default;
$su-grid-item-border-right-width: 0.5px !default;
$su-grid-item-border-bottom-width: 0.5px !default;
$su-grid-item-border-right-color: $su-border-color !default;
$su-grid-item-border-bottom-color: $su-border-color !default;
.su-grid-item {
  align-items: center;
  justify-content: center;
  position: relative;
  flex-direction: column;
  /* #ifndef APP-NVUE */
  box-sizing: border-box;
  display: flex;
  /* #endif */

  /* #ifdef MP */
  position: relative;
  float: left;
  /* #endif */

  /* #ifdef MP-WEIXIN */
  margin-top: $su-grid-item-margin-top;
  /* #endif */

  &--hover-class {
    opacity: $su-grid-item-hover-class-opcatiy;
  }
}

/* #ifdef APP-NVUE */
// 由于nvue不支持组件内引入app.vue中再引入的样式，所以需要写在这里
.su-border-right {
  border-right-width: $su-grid-item-border-right-width;
  border-color: $su-grid-item-border-right-color;
}

.su-border-bottom {
  border-bottom-width: $su-grid-item-border-bottom-width;
  border-color: $su-grid-item-border-bottom-color;
}

/* #endif */
</style>
