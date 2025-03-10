<script setup lang="ts">
import { computed } from 'vue'
import { useDesign } from '../../hooks'
import { readonlyWrapperProps } from './props'
import { baseProps } from '../../libs/vue'
import type { CSSProperties } from 'vue'
import { addStyle, addUnit, deepMerge } from '../../libs/function'
import SuIcon from '../su-icon/su-icon.vue'

defineOptions({
  name: 'su-readonly-wrapper',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
})

const { prefixCls } = useDesign('readonly-wrapper')

const props = defineProps({
  ...readonlyWrapperProps,
  ...baseProps
})

const emit = defineEmits(['click', 'close'])

/**
 * 计算包装器的类名
 * @description 根据 props.border 的值来决定添加哪些类名，用于控制包装器的边框样式和圆角样式
 * @returns {string} 拼接好的类名字符串
 */
const wrapperClass = computed(() => {
  // 初始化类名数组
  let classes: string[] = []
  // 解构赋值获取 props 中的 border 属性
  const { border } = props
  // 如果 border 属性为 'surround'，表示需要添加环绕边框和圆角样式
  if (border === 'surround') {
    // 将 'su-border' 和 `${prefixCls}--radius` 添加到类名数组中
    classes = classes.concat(['su-border', `${prefixCls}--radius`])
  }
  // 如果 border 属性为 'bottom'，表示只需要添加底部边框，且不需要圆角样式
  if (border === 'bottom') {
    // 将 'su-border-bottom' 和 `${prefixCls}--no-radius` 添加到类名数组中
    classes = classes.concat(['su-border-bottom', `${prefixCls}--no-radius`])
  }
  // 将类名数组中的元素用空格连接成字符串并返回
  return classes.join(' ')
})

/**
 * 计算包装器的样式
 * @description 根据 props.border 的值来决定包装器的内边距，同时合并自定义样式
 * @returns {CSSProperties} 合并后的样式对象
 */
const wrapperStyle = computed(() => {
  // 初始化样式对象
  const style: CSSProperties = {}
  // 如果 border 属性为 'none'，表示不需要边框，此时内边距为 0
  if (props.border === 'none') {
    style.padding = '0'
  } else {
    // 如果有边框，设置内边距
    style.paddingTop = '6px'
    style.paddingBottom = '6px'
    style.paddingLeft = '9px'
    style.paddingRight = '9px'
  }
  // 合并自定义样式并返回
  return deepMerge(style, addStyle(props.customStyle) as CSSProperties)
})

/**
 * 计算内容区域的样式
 * @description 根据 props 中的属性来设置内容区域的颜色、字体大小和文本对齐方式
 * @returns {CSSProperties} 样式对象
 */
const contentStyle = computed((): CSSProperties => {
  return {
    // 设置内容区域的文本颜色
    color: props.color,
    // 设置内容区域的字体大小，并确保单位正确
    fontSize: addUnit(props.fontSize),
    // 设置内容区域的文本对齐方式
    textAlign: props.valueAlign
  }
})

/**
 * 处理包装器的点击事件
 * @description 触发 'click' 事件，通知外部组件包装器被点击
 */
function hendleClick() {
  // 触发 'click' 事件
  emit('click')
}

/**
 * 处理关闭按钮的点击事件
 * @description 触发 'close' 事件，通知外部组件关闭操作被触发
 */
function hendleClose() {
  // 触发 'close' 事件
  emit('close')
}

</script>

<template>
  <view :class="[prefixCls, wrapperClass]" :style="[wrapperStyle]" @click="hendleClick">
    <view :style="contentStyle" :class="`${prefixCls}-content`">
      <view v-if="modelValue" :class="['uni-input-input']">{{ modelValue }}</view>
      <view v-else :class="['uni-input-placeholder', placeholderClass]" :style="placeholderStyle">{{ placeholder }}</view>
    </view>
    <view :class="`${prefixCls}-right`">
      <view :class="`${prefixCls}-right-close-icon`" @click.stop="hendleClose">
        <SuIcon v-if="clearable && modelValue" name="close-circle" :size="14"></SuIcon>
      </view>
      <SuIcon v-if="showArrow" :name="collapsed ? 'arrow-up' : 'arrow-down'" :size="14"></SuIcon>
    </view>
  </view>
</template>

<style lang="scss" scoped>
$prefix-cls: 'su-readonly-wrapper';

.#{$prefix-cls} {
  display: flex;
  align-items: center;

  &--radius {
    border-radius: 4px;
  }

  &--no-radius {
    border-radius: 0;
  }

  &-content {
    position: relative;
    line-height: 26px;
    color: $su-main-color;
    font-size: 15px;
    height: 24px;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &-right {
    display: flex;
    align-items: center;
    height: 100%;

    &-close-icon {
      margin-right: 4px;
    }
  }
}
</style>
