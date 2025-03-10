<script lang="ts" setup>
import { computed, unref, watchEffect } from 'vue'
import SuFormItem from '../../../su-form-item/su-form-item.vue'
import { formItemProps } from '../props'
import { useFormItemRender } from '../hooks/useRender'
import { reactive } from 'vue'
import { isFunction, omit } from 'lodash-es'
import type { SuUni } from '@/uni_modules/sun-uni/types/uni'
import { watch } from 'vue'
import { injectFormProps } from '../hooks/useFormContext'

import SuInput from '../../../su-input/su-input.vue'
import SuSelect from '../../../su-select/su-select.vue'
import SuApiList from '../../../su-api-list/su-api-list.vue'
import SuReadonlyWrapper from '../../../su-readonly-wrapper/su-readonly-wrapper.vue'
import SuFormCheckbox from '../../../su-form-checkbox/su-form-checkbox.vue'
import SuFormRadio from '../../../su-form-radio/su-form-radio.vue'

defineOptions({
  name: 'SuUseFormItem',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps(formItemProps)
const { isIfShow, isShow, isRequired, getFormComponentProps, handleItemRules, getCompProps } = useFormItemRender(props)

const [_, formApi] = injectFormProps()

/**
 * 计算表单项标签宽度
 * @description 根据表单布局和配置计算表单项标签的宽度
 * @returns {string} - 返回表单项标签的宽度
 */
const itemLabelWidth = computed(() => {
  // 获取表单项的标签宽度
  const { labelWidth } = props.schema
  // 获取全局配置的标签宽度
  const { labelWidth: globLabelWidth } = props.formProps.commonConfig || {}
  // 获取表单布局
  const { layout } = props.formProps

  // 如果表单布局为水平布局
  if (layout === 'horizontal') {
    // 返回表单项的标签宽度或全局配置的标签宽度
    return labelWidth || globLabelWidth
  }
  // 返回表单项的标签宽度或全局配置的标签宽度或默认宽度 '100%'
  return labelWidth || globLabelWidth || '100%'
})

const popupModel = reactive({
  visiable: false,
  defaultValue: [],
  valueText: ''
})

const compProps = computed(() => {
  return getCompProps()
})

const isShowWrapper = computed(() => {
  return ['SuFormSelect', 'SuApiList'].includes(props.schema.component)
})

const popupProps = computed(() => {
  return {
    ...omit(props.schema.popupProps || {}, 'onConfirm'),
    defaultValue: popupModel.defaultValue,
    onConfirm: hendleConfim
  }
})

/**
 * 处理包装器点击事件
 * @description 当点击包装器时，显示弹出框，并设置默认值
 */
function onWrapperClick() {
  // 显示弹出框
  popupModel.visiable = true
  // 设置弹出框的默认值
  popupModel.defaultValue = props.formModel[`${props.schema.field}_defaultValue`] || []
}

/**
 * 处理弹出框确认事件
 * @description 当弹出框确认时，根据配置处理数据并更新表单模型
 * @param {...SuUni.Recordable[]} arg - 弹出框确认时传递的参数
 */
function hendleConfim(...arg: SuUni.Recordable[]) {
  // 获取表单项的弹出框配置
  const pupopProps = props.schema.popupProps
  // 解构参数，获取第一个参数
  const [data] = arg

  // 定义默认的数据处理函数
  let defaultFunc = (val: SuUni.Recordable) => {
    return {
      // 将选中项的标签用 - 连接成字符串
      text: val.map((item: { label: string }) => item.label).join('-'),
      // 获取选中项的值
      value: val.map((item: { value: any }) => item.value),
      // 获取选中项的索引
      defaultValue: val.map((item: { index: number }) => item.index)
    }
  }

  // 如果存在弹出框配置
  if (pupopProps) {
    // 如果配置中存在 onConfirm 方法且为函数
    if (pupopProps.onConfirm && isFunction(pupopProps.onConfirm)) {
      // 调用配置中的 onConfirm 方法
      pupopProps.onConfirm(...arg)
    }

    // 如果配置中存在 handleConfirmData 方法且为函数
    if (pupopProps.handleConfirmData && isFunction(pupopProps.onConfirm)) {
      // 使用配置中的 handleConfirmData 方法替换默认处理函数
      defaultFunc = pupopProps.handleConfirmData
    }
  }

  // 调用处理函数处理数据
  const result = defaultFunc(data)
  // 更新弹出框的默认值
  popupModel.defaultValue = result.defaultValue
  // 更新弹出框显示的文本
  popupModel.valueText = result.text
  // 更新表单模型中的值
  props.setFormModel(props.schema.field, result.value)
  // 更新表单模型中的文本值
  props.setFormModel(props.schema.textField || `${props.schema.field}_text`, result.text)
  // 更新表单模型中的默认值
  props.setFormModel(`${props.schema.field}_defaultValue`, result.defaultValue)
  // 验证表单字段
  formApi.validateField([props.schema.field])
}

/**
 * 处理包装器关闭事件
 * @description 当包装器关闭时，清空表单模型中的相关值，并重置默认值
 */
function onWrapperClose() {
  // 清空表单模型中的值
  props.setFormModel(props.schema.field, undefined)
  // 清空表单模型中的文本值
  props.setFormModel(props.schema.textField || `${props.schema.field}_text`, undefined)
  // 获取默认值数组的长度
  const length = popupModel.defaultValue.length
  // 重置默认值数组为全 0
  props.setFormModel(`${props.schema.field}_defaultValue`, Array(length).fill(0))
  // 验证表单字段
  formApi.validateField([props.schema.field])
}


watch(
  () => props.formModel,
  () => {
    popupModel.valueText = props.formModel[props.schema.textField || `${props.schema.field}_text`]
  },
  { deep: true, immediate: true }
)

</script>

<template>
  <SuFormItem
    v-if="isIfShow"
    :label="schema.label"
    :prop="schema.field"
    :labelPosition="formProps.layout === 'horizontal' ? 'left' : 'top'"
    :labelWidth="itemLabelWidth"
    :style="{
      display: isShow ? 'flex' : 'none'
    }"
    :borderBottom="false"
    :required="isRequired"
    :rules="handleItemRules()"
    :hideLabel="schema.hideLabel || formProps.commonConfig?.hideLabel || false"
    :colon="schema.colon || formProps.commonConfig?.colon || false"
    :hideRequiredMark="schema.hideRequiredMark || formProps.commonConfig?.hideRequiredMark || false"
    v-bind="getFormComponentProps"
  >
    <SuInput v-if="schema.component === 'SuFormInput'" v-bind="compProps"></SuInput>
    <SuFormRadio v-if="schema.component === 'SuFormRadio'" v-bind="compProps"></SuFormRadio>
    <SuFormCheckbox v-if="schema.component === 'SuFormCheckbox'" v-bind="compProps"></SuFormCheckbox>
    <view :style="{ width: '100%' }" v-if="isShowWrapper">
      <!-- <SuInput readonly :placeholder="compProps.placeholder" @click="onSelectClick"></SuInput> -->
      <SuReadonlyWrapper
        :placeholder="compProps.placeholder"
        v-model="popupModel.valueText"
        :collapsed="popupModel.visiable"
        @click="onWrapperClick"
        @close="onWrapperClose"
      />
      <template v-if="schema.component === 'SuFormSelect'">
        <SuSelect v-model:show="popupModel.visiable" :zIndex="999999" v-bind="popupProps"></SuSelect>
      </template>
      <template v-if="schema.component === 'SuApiList'">
        <SuApiList v-model:show="popupModel.visiable" :zIndex="999999" v-bind="popupProps"></SuApiList>
      </template>
    </view>
  </SuFormItem>
</template>
