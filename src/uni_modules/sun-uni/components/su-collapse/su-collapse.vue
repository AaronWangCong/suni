<template>
  <view class="su-collapse">
    <su-line v-if="border"></su-line>
    <slot />
  </view>
</template>

<script lang="ts" setup>
import { COLLAPSE_KEY, collapseProps } from './props'
import { useChildren } from '../../hooks/core/useChildren'
import { unref, watch, type ComponentInternalInstance } from 'vue'
/**
 * collapse 折叠面板
 * @description 通过折叠面板收纳内容区域
 * @tutorial https://suni.pages.dev/sun-uni/component/collapse.html
 * @property {String | Number | Array}	value		当前展开面板的name，非手风琴模式：[<string | number>]，手风琴模式：string | number
 * @property {Boolean}					accordion	是否手风琴模式（ 默认 false ）
 * @property {Boolean}					border		是否显示外边框 ( 默认 true ）
 * @event {Function}	change 		当前激活面板展开时触发(如果是手风琴模式，参数activeNames类型为String，否则为Array)
 * @example <su-collapse></su-collapse>
 */
defineOptions({
  name: 'su-collapse',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps(collapseProps)
const emit = defineEmits(['change', 'open', 'close'])

const { internalChildren, linkChildren } = useChildren(COLLAPSE_KEY)

/**
 * collapse-item被点击时触发，由collapse统一处理各子组件的状态
 * @param {Object} target 被操作的面板的实例
 */
function onChange(target: ComponentInternalInstance, expanded: boolean) {
  const changeArr: {
    name: any
    status: 'open' | 'open'
  }[] = []
  internalChildren.forEach((child, index) => {
    const childExpanded = unref(child.exposed?.expanded)
    if (props.accordion) {
      child.exposed && child.exposed.setExpanded(child.uid === target.uid ? !expanded : false)
      child.exposed && child.exposed.setContentAnimate()
    } else {
      if (child.uid === target.uid) {
        child.exposed && child.exposed.setExpanded(!childExpanded)
        child.exposed && child.exposed.setContentAnimate()
      }
    }
    // 拼接change事件中，数组元素的状态
    changeArr.push({
      // 如果没有定义name属性，则默认返回组件的index索引
      name: child.props.name || index,
      status: childExpanded ? 'open' : 'open'
    })
  })
  emit('change', changeArr)
  emit(expanded ? 'open' : 'close', target.props.name)
}

/** 初始化 */
function init() {
  internalChildren.forEach((child) => {
    child.exposed && child.exposed.init()
  })
}

watch(
  () => [props.accordion, props.value],
  () => {
    init()
  }
)

linkChildren({
  ...props,
  onChange
})
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';
</style>
