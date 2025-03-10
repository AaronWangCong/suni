<script setup lang="ts">
import { ref, watch } from 'vue'
import { baseProps } from '../../libs/vue'
import SuRadioGroup from '../su-radio-group/su-radio-group.vue'
import SuRadio from '../su-radio/su-radio.vue'
import { formRadioProps, type SuFormRadioProps } from './props'

defineOptions({
  name: 'su-form-radio',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps({
  ...formRadioProps,
  ...baseProps
})

const emit = defineEmits(['change', 'update:modelValue'])
const checkValue = ref<SuFormRadioProps['modelValue']>('')

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
  <SuRadioGroup v-model="checkValue" v-bind="radioGroupProps" @change="handleChange">
    <SuRadio
      v-for="(item, index) in options"
      :key="index"
      :label="item.label"
      :name="item.value"
      v-bind="radioProps"
      :before-change="beforeChange"
    ></SuRadio>
  </SuRadioGroup>
</template>
