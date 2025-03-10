<template>
  <view class="su-checkbox-group" :class="bemClass">
    <slot></slot>
  </view>
</template>

<script lang="ts" setup>
import { CHECKBOX_KEY, checkboxGroupProps, type SuCheckboxGroupProps } from './props'
import { baseProps, bem } from '../../libs/vue'
import { computed } from 'vue'
import { useChildren } from '../../hooks/core/useChildren'
import type { SuUni } from '../../types/uni'
/**
 * checkboxGroup 复选框组
 * @description 复选框组件一般用于需要多个选择的场景，该组件功能完整，使用方便
 * @tutorial https://suni.pages.dev/sun-uni/component/checkbox.html
 * @property {String}			name			标识符
 * @property {Array}			value			绑定的值
 * @property {String}			shape			形状，circle-圆形，square-方形 （默认 'square' ）
 * @property {Boolean}			disabled		是否禁用全部checkbox （默认 false ）
 * @property {String}			activeColor		选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值 （默认 '#2979ff' ）
 * @property {String}			inactiveColor	未选中的颜色 （默认 '#c8c9cc' ）
 * @property {String | Number}	size			整个组件的尺寸 单位px （默认 18 ）
 * @property {String}			placement		布局方式，row-横向，column-纵向 （默认 'row' ）
 * @property {String | Number}	labelSize		label的字体大小，px单位  （默认 14 ）
 * @property {String}			labelColor		label的字体颜色 （默认 '#303133' ）
 * @property {Boolean}			labelDisabled	是否禁止点击文本操作 (默认 false )
 * @property {String}			iconColor		图标颜色 （默认 '#ffffff' ）
 * @property {String | Number}	iconSize		图标的大小，单位px （默认 12 ）
 * @property {String}			iconPlacement	勾选图标的对齐方式，left-左边，right-右边  （默认 'left' ）
 * @property {Boolean}			borderBottom	placement为row时，是否显示下边框 （默认 false ）
 * @event {Function}	change	任一个checkbox状态发生变化时触发，回调为一个对象
 * @event {Function}	input	修改通过v-model绑定的值时触发，回调为一个对象
 * @example <su-checkbox-group></su-checkbox-group>
 */
defineOptions({
  name: 'su-checkbox-group',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps({
  ...checkboxGroupProps,
  ...baseProps
})

const emit = defineEmits(['update:modelValue', 'change'])

const bemClass = computed(() => bem('radio-group', ['placement'], [], props))

/**
 * 使用 useChildren 钩子函数，获取内部子组件和关联子组件的方法
 * @description 通过 CHECKBOX_KEY 来识别子组件，internalChildren 是子组件实例数组，linkChildren 是用于关联子组件的函数
 */
const { internalChildren, linkChildren } = useChildren(CHECKBOX_KEY)

/**
 * 处理复选框选中状态变化的函数
 * @description 遍历所有子组件，收集被选中的复选框的 name 值，然后触发 'update:modelValue' 和 'change' 事件
 */
function handleCheckedOther() {
  // 用于存储被选中的复选框的 name 值的数组
  const values: SuCheckboxGroupProps['modelValue'] = []
  // 遍历所有子组件
  internalChildren.map((child: SuUni.Recordable) => {
    // 检查子组件是否被选中
    if (child.exposed.isChecked) {
      // 如果被选中，则将其 name 值添加到 values 数组中
      values.push(child.proxy.name)
    }
  })
  // 触发 'update:modelValue' 事件，更新绑定的值
  emit('update:modelValue', values)
  // 触发 'change' 事件，通知外部复选框状态已改变
  emit('change', values)
}

/**
 * 关联子组件
 * @description 将当前组件的 props 和 handleCheckedOther 函数传递给子组件，以便子组件在状态变化时可以调用 handleCheckedOther 函数
 */
linkChildren({ props, handleCheckedOther })

</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';

.su-checkbox-group {
  &--row {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-flow: row wrap;
  }

  &--column {
    @include flex(column);
  }
}
</style>
