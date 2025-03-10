<script setup lang="ts">
import { ref, watch } from 'vue'
import { baseProps } from '../../libs/vue'
import SuCheckboxGroup from '../su-checkbox-group/su-checkbox-group.vue'
import SuCheckbox from '../su-checkbox/su-checkbox.vue'
import { formCheckboxProps, type SuFormCheckboxProps } from './props'

defineOptions({
  name: 'su-form-checkbox',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps({
  ...formCheckboxProps,
  ...baseProps
})

const emit = defineEmits(['change', 'update:modelValue'])
const checkValue = ref<SuFormCheckboxProps['modelValue']>([])

async function handleChange(val: any) {
  emit('update:modelValue', val)
  emit('change', val)
}

watch(
  () => props.modelValue,
  (val) => {
    checkValue.value = val
  },
  { immediate: true, deep: true }
)
</script>

<template>
  <SuCheckboxGroup v-model="checkValue" v-bind="checkboxGroupProps" @change="handleChange">
    <SuCheckbox
      v-for="(item, index) in options"
      :key="index"
      :label="item.label"
      :name="item.value"
      v-bind="checkboxProps"
      :before-change="beforeChange"
    ></SuCheckbox>
  </SuCheckboxGroup>
</template>
