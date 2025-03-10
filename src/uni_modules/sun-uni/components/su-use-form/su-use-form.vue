<script setup lang="ts">
import { useForwardPriorityValues } from '../../hooks/core/usePriorityValue'
import type { ExtendedSuUseFormApi, SuUseFormProps } from './src/types/form'
import { useFormInitial, provideFormProps } from './src/hooks/useFormContext'
import Form from './src/form-render/Form.vue'
import FormAction from './src/components/FormAction.vue'
import FormCollapse from './src/components/FormCollapse.vue'
import { baseEmits, COMPONENT_MAP } from './src/config'
import { computed, ref, unref, watchEffect } from 'vue'
import { SuUseFormApi } from './src/form-api'
import { omit, pick } from 'lodash-es'
import { useDesign } from '../../hooks'
import type { SuUni } from '../../types/uni'

/**
 * 组件属性接口
 * @description 定义了组件的属性接口，继承自 SuUseFormProps，并添加了 formApi 属性
 * @extends {SuUseFormProps} - 继承自 SuUseFormProps
 * @property {ExtendedSuUseFormApi} [formApi] - 扩展的表单 API
 */
interface Props extends SuUseFormProps {
  formApi?: ExtendedSuUseFormApi
}

// 使用 defineProps 定义组件的属性
const props = defineProps<Props>()

// 使用 defineEmits 定义组件的事件
const emit = defineEmits(baseEmits)

// 创建一个 ref 变量，用于存储当前折叠状态
const currentCollapsed = ref(false)

// 如果 props 中存在 formApi，则使用它，否则创建一个新的 SuUseFormApi 实例
const api = props.formApi ?? new SuUseFormApi(props)

// 获取表单的状态
const state = api.useStore?.()

// 使用 useForwardPriorityValues 函数获取优先级值
const forward = useForwardPriorityValues(props, state)

// 获取设计前缀
const { prefixCls } = useDesign('use-form')

// 使用 useFormInitial 函数初始化表单
const { delegatedSlots, form } = useFormInitial(forward, api, emit)

/**
 * 计算表单属性
 * @description 根据 forward 对象计算表单属性，排除一些不需要的属性
 * @returns {Record<string, any>} - 返回计算后的表单属性
 */
const getFormProps = computed(() => {
  return omit(unref(forward), [
    'actionButtonsReverse',
    'actionWrapperClass',
    'fieldMappingTime',
    'handleReset',
    'handleSubmit',
    'handleValuesChange',
    'resetButtonOptions',
    'showDefaultActions',
    'submitButtonOptions',
    'submitOnChange',
    'submitOnEnter',
    'formApi'
  ])
})

/**
 * 计算表单操作属性
 * @description 根据 forward 对象计算表单操作属性，只包含需要的属性
 * @returns {Record<string, any>} - 返回计算后的表单操作属性
 */
const getFormActionProps = computed(() => {
  return pick(unref(forward), [
    'actionButtonsReverse',
    'handleReset',
    'handleSubmit',
    'resetButtonOptions',
    'showDefaultActions',
    'submitButtonOptions'
  ])
})

// 提供表单属性
provideFormProps([forward, form])

// 如果 api 存在 mount 方法，则调用它并传入 form
api?.mount?.(form)

/**
 * 处理折叠状态更新
 * @description 处理折叠状态更新事件，更新 currentCollapsed 变量并触发 collapse-change 事件
 * @param {boolean} value - 折叠状态
 */
function handleUpdateCollapsed(value: boolean) {
  currentCollapsed.value = !!value
  emit('collapse-change', value)
}

/**
 * 处理值变化
 * @description 处理表单值变化事件，调用 props.handleValuesChange 方法
 * @param {SuUni.Recordable} value - 变化后的值
 */
function handleValuesChange(value: SuUni.Recordable) {
  props.handleValuesChange && props.handleValuesChange(value)
}

// 监听 props.collapsed 的变化，更新 currentCollapsed 变量
watchEffect(() => {
  currentCollapsed.value = props.collapsed
})

// 暴露 form 实例
defineExpose(form)
</script>

<template>
  <view :class="[warpperClass, prefixCls]">
    <slot name="before" />
    <Form
      v-bind="getFormProps"
      :component-map="COMPONENT_MAP"
      :collapsed="currentCollapsed"
      :form="form"
      :api="api"
      @value-change="handleValuesChange"
    >
      <template #action>
        <FormAction v-bind="getFormActionProps" :formApi="api"></FormAction>
      </template>
      <template #collapse>
        <FormCollapse :form="form" :collapsed="currentCollapsed" @change="handleUpdateCollapsed"></FormCollapse>
      </template>
    </Form>
  </view>
</template>
