<script lang="ts" setup>
import { withDefaults, computed } from 'vue'
import type { SuUseFormActionProps } from '../types/form'
import { useDesign } from '../../../../hooks'
import { omit } from 'lodash-es'
import type { SuUseFormApi } from '../form-api'
import SuButton from '../../../su-button/su-button.vue'

interface Props extends SuUseFormActionProps {
  formApi: SuUseFormApi
}

defineOptions({
  name: 'SuUseFormAction'
})

const props = withDefaults(defineProps<Props>(), {
  submitButtonOptions: () => {
    return {
      content: uni.$u.config.i18n('提交'),
      show: true,
      type: 'primary'
    }
  },
  resetButtonOptions: () => {
    return {
      content: uni.$u.config.i18n('重置'),
      show: true
    }
  }
})

const { prefixCls } = useDesign('use-form-action')

const getActionStyle = computed(() => {
  return {
    display: 'flex',
    'flex-direction': props.actionButtonsReverse ? 'column-reverse' : 'column',
    gap: '10px'
  }
})

/** 提交事件 */
function onSubmitClick() {
  props.formApi.submitForm()
}

/** 重置事件 */
function onResetClick() {
  props.formApi.resetForm()
}
</script>

<template>
  <view v-if="showDefaultActions" :class="[prefixCls, actionWrapperClass]" :style="getActionStyle">
    <slot name="action-before"></slot>
    <SuButton v-if="submitButtonOptions.show" v-bind="omit(submitButtonOptions, ['content', 'show'])" @click="onSubmitClick">
      {{ submitButtonOptions.content }}
    </SuButton>
    <slot name="action-center"></slot>
    <SuButton v-if="resetButtonOptions.show" v-bind="omit(resetButtonOptions, ['content', 'show'])" @click="onResetClick">
      {{ resetButtonOptions.content }}
    </SuButton>
    <slot name="action-after"></slot>
  </view>
</template>
