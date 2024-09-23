<template>
  <view
    :class="['su-cell', isBorder ? 'is-border' : '', size ? 'is-' + size : '', center ? 'is-center' : '', customClass]"
    :style="customStyle"
    :hover-class="isLink || clickable ? 'is-hover' : 'none'"
    hover-stay-time="70"
    @click="onClick"
  >
    <view :class="['su-cell__wrapper', vertical ? 'is-vertical' : '']">
      <view
        :class="['su-cell__left', isRequired ? 'is-required' : '']"
        :style="titleWidth ? 'min-width:' + titleWidth + ';max-width:' + titleWidth + ';' : ''"
      >
        <!--左侧icon部位-->
        <su-icon v-if="icon" :name="icon" :custom-class="`su-cell__icon  ${customIconClass}`"></su-icon>
        <slot v-else name="icon" />

        <view class="su-cell__title">
          <!--title BEGIN-->
          <view v-if="title" :class="customTitleClass">{{ title }}</view>
          <slot v-else name="title"></slot>
          <!--title END-->

          <!--label BEGIN-->
          <view v-if="label" :class="`su-cell__label ${customLabelClass}`">{{ label }}</view>
          <slot v-else name="label" />
          <!--label END-->
        </view>
      </view>
      <!--right content BEGIN-->
      <view class="su-cell__right">
        <view class="su-cell__body">
          <!--文案内容-->
          <view :class="`su-cell__value ${customValueClass}`">
            <slot>{{ value }}</slot>
          </view>
          <!--箭头-->
          <su-icon v-if="isLink" custom-class="su-cell__arrow-right" name="arrow-right" />
          <slot v-else name="right-icon" />
        </view>
        <view v-if="errorMessage" class="su-cell__error-message">{{ errorMessage }}</view>
      </view>
      <!--right content END-->
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'su-cell',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import wdIcon from '../su-icon/su-icon.vue'
import { computed } from 'vue'
import { useCell } from '../composables/useCell'
import { useParent } from '../composables/useParent'
import { FORM_KEY } from '../su-form/types'
import { cellProps } from './types'
import { isDef } from '../common/util'

const props = defineProps(cellProps)
const emit = defineEmits(['click'])

const cell = useCell()

const isBorder = computed(() => {
  return isDef(cell.border.value) ? cell.border.value : props.border
})

const { parent: form } = useParent(FORM_KEY)

const errorMessage = computed(() => {
  if (form && props.prop && form.errorMessages && form.errorMessages[props.prop]) {
    return form.errorMessages[props.prop]
  } else {
    return ''
  }
})

// 是否展示必填
const isRequired = computed(() => {
  let formRequired = false
  if (form && form.props.rules) {
    const rules = form.props.rules
    for (const key in rules) {
      if (Object.prototype.hasOwnProperty.call(rules, key) && key === props.prop && Array.isArray(rules[key])) {
        formRequired = rules[key].some((rule) => rule.required)
      }
    }
  }
  return props.required || props.rules.some((rule) => rule.required) || formRequired
})

/**
 * @description 点击cell的handle
 */
function onClick() {
  const url = props.to

  if (props.clickable || props.isLink) {
    emit('click')
  }
  if (url && props.isLink) {
    if (props.replace) {
      uni.redirectTo({ url })
    } else {
      uni.navigateTo({ url })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
