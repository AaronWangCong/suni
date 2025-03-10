<template>
  <view class="su-radio-group" :class="bemClass" :style="radioGroupStyle">
    <slot></slot>
  </view>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { baseProps, bem } from '../../libs/vue'
import { RADIO_KEY, radioGroupProps } from './props'
import { addStyle, addUnit, deepMerge } from '../../libs/function'
import type { ComponentInternalInstance, CSSProperties } from 'vue'
import { watch } from 'vue'
import { useChildren } from '../../hooks/core/useChildren'
import type { SuUni } from '../../types/uni'

/**
 * radioRroup 单选框父组件
 * @description 单选框用于有一个选择，用户只能选择其中一个的场景。搭配u-radio使用
 * @tutorial https://suni.pages.dev/sun-uni/component/radio.html
 * @property {String | Number | Boolean}	value 			绑定的值
 * @property {Boolean}						disabled		是否禁用所有radio（默认 false ）
 * @property {String}						shape			外观形状，shape-方形，circle-圆形(默认 circle )
 * @property {String}						activeColor		选中时的颜色，应用到所有子Radio组件（默认 '#2979ff' ）
 * @property {String}						inactiveColor	未选中的颜色 (默认 '#c8c9cc' )
 * @property {String}						name			标识符
 * @property {String | Number}				size			组件整体的大小，单位px（默认 18 ）
 * @property {String}						placement		布局方式，row-横向，column-纵向 （默认 'row' ）
 * @property {String}						label			文本
 * @property {String}						labelColor		label的颜色 （默认 '#303133' ）
 * @property {String | Number}				labelSize		label的字体大小，px单位 （默认 14 ）
 * @property {Boolean}						labelDisabled	是否禁止点击文本操作checkbox(默认 false )
 * @property {String}						iconColor		图标颜色 （默认 '#ffffff' ）
 * @property {String | Number}				iconSize		图标的大小，单位px （默认 12 ）
 * @property {Boolean}						borderBottom	placement为row时，是否显示下边框 （默认 false ）
 * @property {String}						iconPlacement	图标与文字的对齐方式 （默认 'left' ）
 * @property {Object}						customStyle		组件的样式，对象形式
 * @event {Function} change 任一个radio状态发生变化时触发
 * @example <su-radio-group v-model="value"></su-radio-group>
 */

defineOptions({
  name: 'su-radio-group',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps({
  ...radioGroupProps,
  ...baseProps
})

const emit = defineEmits(['update:modelValue', 'change'])

const bemClass = computed(() => bem('radio-group', ['placement'], [], props))

const radioGroupStyle = computed(() => {
  const style: CSSProperties = {
    gap: addUnit(props.gap)
  }
  return deepMerge(style, addStyle(props.customStyle) as CSSProperties)
})

const { internalChildren, linkChildren } = useChildren(RADIO_KEY)
/**
 * 处理单选框选中状态变化的函数
 * @description 当某个单选框被选中时，将其他单选框的选中状态设置为 false，并更新绑定的值，触发 change 事件
 * @param {ComponentInternalInstance} instance - 当前被选中的单选框组件实例
 */
function handleCheckedOther(instance: ComponentInternalInstance) {
  // 遍历所有子组件
  internalChildren.map((child: SuUni.Recordable) => {
    // 如果当前子组件不是被选中的组件
    if (instance.uid !== child.uid) {
      // 将该子组件的选中状态设置为 false
      child.exposed.setChecked(false)
    }
  })
  // 触发 'update:modelValue' 事件，更新绑定的值为当前被选中单选框的 name 属性值
  emit('update:modelValue', instance.props.name)
  // 触发 'change' 事件，传递当前被选中单选框的 name 属性值
  emit('change', instance.props.name)
}

/**
 * 关联子组件
 * @description 将当前组件的 props 和 handleCheckedOther 函数传递给子组件，以便子组件在状态变化时可以调用 handleCheckedOther 函数
 */
linkChildren({ props, handleCheckedOther })
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';

.su-radio-group {
  flex: 1;

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
