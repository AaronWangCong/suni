<template>
  <su-cell
    custom-class="su-form-item"
    :required="required"
    :title="label"
    :center="center"
    :border="border"
    :title-width="labelWidth"
    :is-link="isLink"
  >
    <slot></slot>
    <view v-if="errorMessage" class="su-form-item__error-message">{{ errorMessage }}</view>
  </su-cell>
</template>
<script lang="ts">
export default {
  name: 'su-form-item',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed } from 'vue'
import { useParent } from '../composables/useParent'
import WdCell from '../su-cell/su-cell.vue'
import { FORM_KEY } from '../su-form/types'
import { formItemProps } from './types'

const props = defineProps(formItemProps)

const { parent: form, index } = useParent(FORM_KEY)

const errorMessage = computed(() => {
  if (form && props.prop && form.errorMessages && form.errorMessages[props.prop]) {
    return form.errorMessages[props.prop]
  } else {
    return ''
  }
})

const border = computed(() => {
  if (index.value > 0 && form && form.props.border) {
    return true
  } else {
    return false
  }
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
