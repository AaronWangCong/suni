<template>
  <view :class="rootClass" :style="rootStyle" @click="switchValue">
    <view class="su-switch__circle" :style="circleStyle"></view>
  </view>
</template>
<script lang="ts">
export default {
  name: 'su-switch',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, onBeforeMount } from 'vue'
import { addUnit, isFunction, objToStyle } from '../common/util'
import { switchProps } from './types'

const props = defineProps(switchProps)
const emit = defineEmits(['change', 'update:modelValue'])

const rootClass = computed(() => {
  return `su-switch ${props.customClass} ${props.disabled ? 'is-disabled' : ''} ${props.modelValue === props.activeValue ? 'is-checked' : ''}`
})

const rootStyle = computed(() => {
  const rootStyle: Record<string, any> = {
    'font-size': addUnit(props.size),
    background: props.modelValue === props.activeValue ? props.activeColor : props.inactiveColor,
    'border-color': props.modelValue === props.activeValue ? props.activeColor : props.inactiveColor
  }
  return `${objToStyle(rootStyle)};${props.customStyle}`
})

const circleStyle = computed(() => {
  const circleStyle: string =
    (props.modelValue === props.activeValue && props.activeColor) || (props.modelValue !== props.activeValue && props.inactiveColor)
      ? 'box-shadow: none;'
      : ''
  return circleStyle
})

function switchValue() {
  if (props.disabled) return
  const newVal = props.modelValue === props.activeValue ? props.inactiveValue : props.activeValue

  if (props.beforeChange && isFunction(props.beforeChange)) {
    props.beforeChange({
      value: newVal,
      resolve: (pass: boolean) => {
        if (pass) {
          emit('update:modelValue', newVal)
          emit('change', {
            value: newVal
          })
        }
      }
    })
  } else {
    emit('update:modelValue', newVal)
    emit('change', {
      value: newVal
    })
  }
}

onBeforeMount(() => {
  if ([props.activeValue, props.inactiveValue].indexOf(props.modelValue) === -1) {
    emit('update:modelValue', props.inactiveValue)
    emit('change', {
      value: props.inactiveValue
    })
  }
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
