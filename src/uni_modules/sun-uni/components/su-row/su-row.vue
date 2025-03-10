<template>
  <view class="su-row" ref="rowRef" :style="[rowStyle]" @tap="clickHandler">
    <slot />
  </view>
</template>

<script lang="ts" setup>
import { ROW_KEY, rowProps } from './props'
import { addUnit, addStyle, deepMerge, sleep } from '../../libs/function/index'
import { baseProps } from '../../libs/vue'
import { computed, getCurrentInstance, ref, unref, type CSSProperties } from 'vue'
import { useSelectorQuery } from '../../hooks/core/useSelectorQuery'
import { useChildren } from '../../hooks/core/useChildren'

/**
 * Row 栅格系统中的行
 * @description 通过基础的 12 分栏，迅速简便地创建布局
 * @tutorial https://suni.pages.dev/sun-uni/component/layout.html
 * @property {String | Number}	gutter		栅格间隔，左右各为此值的一半，单位px  (默认 0 )
 * @property {String}			justify		水平排列方式(微信小程序暂不支持) 可选值为`start`(或`flex-start`)、`end`(或`flex-end`)、`center`、`around`(或`space-around`)、`between`(或`space-between`)  (默认 'start' )
 * @property {String}			align		垂直排列方式 (默认 'center' )
 * @property {Object}			customStyle	定义需要用到的外部样式
 *
 * @event {Function} click row被点击
 * @example <su-row justify="space-between" customStyle="margin-bottom: 10px"></su-row>
 */

defineOptions({
  name: 'su-row',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps({
  ...rowProps,
  ...baseProps
})

const emit = defineEmits(['click'])

const rowRef = ref<UniApp.NodesRef>()

const instance = getCurrentInstance()

/** 获取节点布局信息的方法 */
const { getBoundingClientRect } = useSelectorQuery()

const { linkChildren } = useChildren(ROW_KEY)

/**
 * 计算 justify 属性的值，将部分值转换为标准的 flexbox 值
 * @returns {string} 转换后的 justify 属性值
 */
const uJustify = computed(() => {
  // 如果 justify 属性为 'end' 或 'start'，转换为 'flex-end' 或 'flex-start'
  if (props.justify == 'end' || props.justify == 'start') return 'flex-' + props.justify
  // 如果 justify 属性为 'around' 或 'between'，转换为 'space-around' 或 'space-between'
  else if (props.justify == 'around' || props.justify == 'between') return 'space-' + props.justify
  // 其他情况直接返回原属性值
  else return props.justify
})

/**
 * 计算 align 属性的值，将部分值转换为标准的 flexbox 值
 * @returns {string} 转换后的 align 属性值
 */
const uAlignItem = computed(() => {
  // 如果 align 属性为 'top'，转换为 'flex-start'
  if (props.align == 'top') return 'flex-start'
  // 如果 align 属性为 'bottom'，转换为 'flex-end'
  if (props.align == 'bottom') return 'flex-end'
  // 其他情况直接返回原属性值
  else return props.align
})

/**
 * 计算行的样式对象
 * @returns {CSSProperties} 合并后的样式对象
 */
const rowStyle = computed(() => {
  // 初始化样式对象
  const style: CSSProperties = {
    // 设置垂直对齐方式
    alignItems: unref(uAlignItem),
    // 设置水平排列方式
    justifyContent: unref(uJustify)
  }

  // 通过给u-row左右两边的负外边距，消除u-col在有gutter时，第一个和最后一个元素的左内边距和右内边距造成的影响
  if (props.gutter) {
    // 设置左边负外边距
    style.marginLeft = addUnit(-Number(props.gutter) / 2)
    // 设置右边负外边距
    style.marginRight = addUnit(-Number(props.gutter) / 2)
  }
  // 合并自定义样式并返回
  return deepMerge(style, addStyle(props.customStyle) as CSSProperties)
})

/**
 * 处理行的点击事件
 * @description 触发 'click' 事件，通知外部组件行被点击
 */
function clickHandler() {
  // 触发 'click' 事件
  emit('click')
}

/**
 * 获取组件的宽度
 * @description 等待节点渲染完成后，通过不同平台的方法获取组件的宽度
 * @returns {Promise<number>} 包含组件宽度的 Promise
 */
async function getComponentWidth() {
  // 延时一定时间，以确保节点渲染完成
  await sleep()
  return new Promise<number>((resolve) => {
    // uView封装的获取节点的方法，详见文档
    // #ifndef APP-NVUE
    uni
      .createSelectorQuery()
      .in(instance?.proxy)
      .select('.su-row')
      .boundingClientRect((size) => {
        // 解析查询结果并返回组件宽度
        resolve((size as UniApp.NodeInfo).width || 0)
      })
      .exec()
    // #endif
    // #ifdef APP-NVUE
    // nvue的dom模块用于获取节点
    getBoundingClientRect(unref(rowRef)!).then((data) => {
      // 解析查询结果并返回组件宽度
      resolve((data as UniApp.NodeInfo).width || 0)
    })
    // #endif
  })
}

/**
 * 关联子组件，传递必要的属性和方法
 * @description 将 gutter 值和获取组件宽度的方法传递给子组件
 */
linkChildren({
  // 栅格间隔
  gutter: Number(props.gutter || 0),
  // 获取组件宽度的方法
  getComponentWidth,
})

</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';

.su-row {
  @include flex;
}
</style>
