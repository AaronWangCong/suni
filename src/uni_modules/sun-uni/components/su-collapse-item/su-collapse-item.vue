<template>
  <view class="su-collapse-item">
    <su-cell
      :title="$slots.title ? '' : title"
      :value="value"
      :label="label"
      :icon="icon"
      :isLink="isLink"
      :clickable="clickable"
      :border="parentData.border && showBorder"
      @click="clickHandler"
      :arrowDirection="expanded ? 'up' : 'down'"
      :disabled="disabled"
    >
      <!-- 微信小程序不支持，因为微信中不支持 <slot name="title" #title />的写法 -->
      <template #title>
        <slot name="title">
          <text v-if="!$slots.title && title">
            {{ title }}
          </text>
        </slot>
      </template>
      <template #icon>
        <slot name="icon">
          <su-icon v-if="!$slots.icon && icon" :size="22" :name="icon"></su-icon>
        </slot>
      </template>
      <template #value>
        <slot name="value">
          <text v-if="!$slots.value && value">
            {{ value }}
          </text>
        </slot>
      </template>
      <template #right-icon>
        <template v-if="showRight">
          <su-icon v-if="!$slots['right-icon']" :size="16" name="arrow-right"></su-icon>
          <slot name="right-icon"></slot>
        </template>
      </template>
    </su-cell>
    <view class="su-collapse-item__content" :animation="animationData" ref="animationRef">
      <view class="su-collapse-item__content__text content-class" :id="elId" :ref="elId"><slot /></view>
    </view>
    <su-line v-if="parentData.border"></su-line>
  </view>
</template>

<script lang="ts" setup>
import { collapseItemProps } from './props'
import { getCurrentInstance, nextTick, onMounted, reactive, ref, unref, watch } from 'vue'
import { guid, sleep, error } from '../../libs/function/index'
import test from '../../libs/function/test'
import { useParent } from '../../hooks/core/useParent'
import { COLLAPSE_KEY } from '../su-collapse/props'
import { useSelectorQuery } from '../../hooks/core/useSelectorQuery'

// #ifdef APP-NVUE
const animation = uni.requireNativePlugin('animation')
const dom = uni.requireNativePlugin('dom')
// #endif
/**
 * collapseItem 折叠面板Item
 * @description 通过折叠面板收纳内容区域（搭配u-collapse使用）
 * @tutorial https://suni.pages.dev/sun-uni/component/collapse.html
 * @property {String}			title 		标题
 * @property {String}			value 		标题右侧内容
 * @property {String}			label 		标题下方的描述信息
 * @property {Boolean}			disbled 	是否禁用折叠面板 ( 默认 false )
 * @property {Boolean}			isLink 		是否展示右侧箭头并开启点击反馈 ( 默认 true )
 * @property {Boolean}			clickable	是否开启点击反馈 ( 默认 true )
 * @property {Boolean}			border		是否显示内边框 ( 默认 true )
 * @property {String}			align		标题的对齐方式 ( 默认 'left' )
 * @property {String | Number}	name		唯一标识符
 * @property {String}			icon		标题左侧图片，可为绝对路径的图片或内置图标
 * @event {Function}			change 			某个item被打开或者收起时触发
 * @example <su-collapse-item :title="item.head" v-for="(item, index) in itemList" :key="index">{{item.body}}</su-collapse-item>
 */
defineOptions({
  name: 'su-collapse-item',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps(collapseItemProps)

// 唯一标识
const elId = ref(guid())
// uni.createAnimation的导出数据
const animationData = ref()
// 是否展开状态
const expanded = ref(false)
// 根据expanded确定是否显示border，为了控制展开时，cell的下划线更好的显示效果，进行一定时间的延时
const showBorder = ref(false)
// 是否动画中，如果是则不允许继续触发点击
const animating = ref(false)
// 父组件su-collapse的参数
const parentData = reactive({
  accordion: false,
  border: false
})
let timer: any = null
const animationRef = ref<UniApp.NodesRef>()

const instance = getCurrentInstance()

/** 获取节点布局信息的方法 */
const { getBoundingClientRect } = useSelectorQuery()

const { parent } = useParent(COLLAPSE_KEY)

/**
 * 初始化折叠面板项的状态
 * @description 该函数用于初始化折叠面板项的展开状态，根据父组件的模式（手风琴模式或非手风琴模式）和传入的值来确定当前项是否展开。
 *              同时，会调用 `setContentAnimate` 函数来设置内容区域的动画效果。
 */
async function init() {
  // 检查是否存在父组件，如果不存在则输出错误信息并返回
  if (!parent) {
    return error('su-collapse-item必须要搭配su-collapse组件使用')
  }
  // 如果父组件处于手风琴模式
  if (parent.accordion) {
    // 检查父组件的 value 参数是否为数组，如果是则输出错误信息并返回
    if (test.array(parent.value)) {
      return error('手风琴模式下，su-collapse组件的value参数不能为数组')
    }
    // 根据当前项的 name 和父组件的 value 来确定是否展开
    expanded.value = props.name === parent.value
  } else {
    // 如果父组件不处于手风琴模式，检查父组件的 value 参数是否不是数组且不为 null，如果是则输出错误信息并返回
    if (!test.array(parent.value) && parent.value !== null) {
      return error('非手风琴模式下，su-collapse组件的value参数必须为数组')
    }
    // 根据当前项的 name 是否在父组件的 value 数组中来确定是否展开
    expanded.value = ((parent.value || []) as any[]).some((item) => item === props.name)
  }
  // 等待下一个渲染周期，确保 DOM 已经更新
  await nextTick()
  // 设置组件的展开或收起状态
  setContentAnimate()
}

/**
 * 设置折叠面板内容区域的动画效果
 * @description 该函数用于根据折叠面板的展开状态设置内容区域的高度动画。
 *              会根据不同的平台（APP-NVUE 或其他）使用不同的动画实现方式。
 */
async function setContentAnimate() {
  // 每次面板打开或者收起时，都查询元素尺寸
  // 好处是，父组件从服务端获取内容后，变更折叠面板后可以获得最新的高度
  const rect = await queryRect()
  // 根据展开状态确定内容区域的高度
  const height = unref(expanded) ? rect.height : 0
  // 设置动画进行中状态
  animating.value = true
  // 如果是 APP-NVUE 平台
  // #ifdef APP-NVUE
  // 使用 APP-NVUE 的 animation 插件进行过渡动画
  animation.transition(
    unref(animationRef),
    {
      styles: {
        height: height + 'px'
      },
      duration: props.duration,
      // 必须设置为true，否则会到面板收起或展开时，页面其他元素不会随之调整它们的布局
      needLayout: true,
      timingFunction: 'ease-in-out'
    },
    () => {
      // 动画结束后，设置动画结束状态
      animating.value = false
    }
  )
  // #endif
  // 如果不是 APP-NVUE 平台
  // #ifndef APP-NVUE
  // 使用 uni.createAnimation 创建动画
  const animationUni = uni.createAnimation({
    timingFunction: 'ease-in-out'
  })
  // 设置动画的高度
  animationUni.height(height || 0).step({
    duration: props.duration
  })
  // 导出动画数据
  animationData.value = animationUni.export()
  // 等待动画时长后，结束动画状态
  sleep(props.duration).then(() => {
    animationUni.step()
    animating.value = false
  })
  // #endif
}

/**
 * 处理折叠面板项的点击事件
 * @description 该函数用于处理折叠面板项的点击事件，会检查当前项是否禁用和是否正在动画中，
 *              如果条件允许，则调用父组件的 `onChange` 方法来更新展开状态。
 */
function clickHandler() {
  // 如果当前项被禁用且正在动画中，则直接返回
  if (props.disabled && animating.value) return
  // 调用父组件的 onChange 方法，传递当前实例和展开状态
  parent && parent.onChange(instance!, unref(expanded))
}

/**
 * 查询折叠面板内容区域的尺寸信息
 * @description 该函数用于查询折叠面板内容区域的尺寸信息，会根据不同的平台（APP-NVUE 或其他）使用不同的查询方式。
 * @returns {Promise<UniApp.NodeInfo>} 返回一个 Promise，包含查询到的节点信息。
 */
function queryRect() {
  return new Promise<UniApp.NodeInfo>((resolve) => {
    // 如果不是 APP-NVUE 平台
    // #ifndef APP-NVUE
    // 使用 uni.createSelectorQuery 查询节点尺寸
    uni
      .createSelectorQuery()
      .in(instance?.proxy)
      .select(`#${unref(elId)}`)
      .boundingClientRect((size) => {
        // 解析查询结果并返回
        resolve(size as UniApp.NodeInfo)
      })
      .exec()
    // #endif
    // 如果是 APP-NVUE 平台
    // #ifdef APP-NVUE
    // 使用 nvue 的 dom 模块获取节点尺寸
    getBoundingClientRect(unref(elId)!).then((data) => {
      // 解析查询结果并返回
      resolve(data as UniApp.NodeInfo)
    })
    // #endif
  })
}

/**
 * 设置折叠面板项的展开状态
 * @description 该函数用于手动设置折叠面板项的展开状态。
 * @param {boolean} bool - 要设置的展开状态，true 表示展开，false 表示收起。
 */
function setExpanded(bool: boolean) {
  // 设置展开状态
  expanded.value = bool
}

watch(
  () => expanded.value,
  (val) => {
    clearTimeout(timer)
    // 这里根据expanded的值来进行一定的延时，是为了cell的下划线更好的显示效果
    timer = setTimeout(
      () => {
        showBorder.value = val
      },
      val ? 10 : 290
    )
  }
)

onMounted(() => {
  init()
})

defineExpose({
  init,
  expanded,
  setExpanded,
  setContentAnimate
})
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';

.su-collapse-item {
  &__content {
    overflow: hidden;
    height: 0;

    &__text {
      padding: 12px 15px;
      color: $su-content-color;
      font-size: 14px;
      line-height: 18px;
    }
  }
}
</style>
