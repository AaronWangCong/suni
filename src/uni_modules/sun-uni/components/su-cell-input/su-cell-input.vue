<script setup lang="ts">
import { cellInputProps } from './props'
import { computed, ref, watchEffect, unref, type CSSProperties, getCurrentInstance, watch } from 'vue'
import { isNumber } from 'lodash-es'
import { useDesign } from '../../hooks'
import type { SuUni } from '../../types/uni'
// import Emitter from '../../libs/util/emitter.js'
import { formValidate } from '../../libs/function/index'

defineOptions({
  name: 'su-cell-input',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  },
  // mixins: [Emitter]
})

const props = defineProps(cellInputProps)
const emit = defineEmits(['focus', 'blur', 'confirm', 'input', 'update:modelValue', 'clear', 'keyboardheightchange', 'click'])

const { prefixCls } = useDesign('cell-input')

const instance = getCurrentInstance() as any

/** input 值 */
const defaultValue = ref<string>('')
/** 当前是否处于获得焦点的状态 */
const focused = ref(false)
/** input 高度 默认值70 */
const inputHeight = ref(70)
/** 是否预览密码 */
const showPassword = ref(false)

/** 光标起始位置 */
const getSelectionStart = computed(() => Number(props.selectionStart))
/** 光标结束位置 */
const getSelectionEnd = computed(() => Number(props.selectionEnd))
/** 最大长度 */
const inputMaxlength = computed(() => Number(props.maxlength))
/** 指定光标与键盘的距离 */
const getCursorSpacing = computed(() => Number(props.cursorSpacing))
/** 是否可以清除 */
const isClearable = computed(() => props.clearable && defaultValue.value && !props.disabled)
/** 获取type */
const getType = computed((): UniHelper.InputProps['type'] => {
  if (props.type === 'select' || props.type === 'textarea') {
    return 'text'
  }
  return props.type
})

/** 获取input的placeholder */
const getPlaceholder = computed(() => {
  if (props.type === 'select') {
    return props.placeholder || '请选择'
  }
  return props.placeholder
})

/** 获取 cell 的样式 */
const getStyle = computed((): CSSProperties => {
  if (props.type === 'textarea') {
    return {
      flexDirection: 'column'
    }
  }
  return {
    height: isNumber(props.height) ? `${props.height}rpx` : props.height
  }
})

/** 获取 label 的样式 */
const getLabelStyle = computed((): CSSProperties => {
  return {
    width: props.type === 'textarea' ? '100%' : isNumber(props.labelWidth) ? `${props.labelWidth}rpx` : props.labelWidth,
    fontSize: '28rpx',
    color: '#666',
    height: props.type === 'textarea' ? '64rpx' : 'auto',
    ...(props.labelStyle || {})
  }
})

/** input的样式*/
const getInputStyle = computed((): CSSProperties => {
  return {
    minHeight: props.height ? `${props.height}rpx` : `${unref(inputHeight)}rpx`,
    ...(props.customStyle || {})
  }
})

const getTextareaStyle = computed((): CSSProperties => {
  return {
    // border: `1rpx solid ${unref(borderColor)}`
  }
})

/** 内容区域的样式*/
const getContentStyle = computed(() => {
  return {
    textAlign: props.type === 'textarea' ? 'left' : props.inputAlign || '',
    width: props.type === 'textarea' ? '100%' : 'auto'
  } as CSSProperties
})

/** 当键盘输入时，触发input事件 */
function handleInput(event: SuUni.Recordable) {
  let value = event.detail.value
  // 判断是否去除空格
  if (props.trim) value = (uni as SuUni.Recordable).$u.trim(value)
  if (props.type === 'number' && isNumber(value)) value = +value
  defaultValue.value = value
  emit('input', value)
  emit('update:modelValue', value)
  // TODO form处理
  setTimeout(() => {
    // instance && instance.proxy.dispatch('su-form-item', 'onFieldChange', event.detail.value)
    formValidate(instance.proxy, 'change')
  }, 100)
}

/** 输入框聚焦时触发此事件 */
function handleFocus(event: SuUni.Recordable) {
  focused.value = true
  emit('focus', event)
}

/** 输入框失去焦点时触发此事件 */
function handleBlur(event: SuUni.Recordable) {
  setTimeout(() => {
    focused.value = false
    // instance && instance.proxy.dispatch('su-form-item', 'onFieldBlur', event.detail.value)
    formValidate(instance.proxy, 'blur')
  }, 100)
  emit('blur', event)
}

/** 点击完成按钮时触发此事件 */
function handleConfirm(event: SuUni.Recordable) {
  emit('confirm', event)
}

/** 键盘高度发生变化的时候触发此事件 */
function handleKeyboardheightchange(event: SuUni.Recordable) {
  emit('keyboardheightchange', event)
}

/** 点击事件 */
function inputClick() {
  emit('click')
}

/** 清除 */
function handleClear() {
  emit('input', '')
  emit('update:modelValue', '')
  emit('clear')
}

watch(
  () => defaultValue.value,
  (nVal, oVal) => {
    if (nVal !== oVal && props.type === 'select') {
      handleInput({
        detail: {
          value: nVal
        }
      })
    }

    if (props.disabled) {
      // instance && instance.proxy.dispatch('su-form-item', 'onFieldChange', nVal)
      formValidate(instance.proxy, 'change')
    }
  }
)

watchEffect(() => {
  defaultValue.value = props.modelValue
})
</script>

<template>
  <view
    :class="{
      [prefixCls]: true,
      'is--request': isRequest,
      'is--error': isError,
      'is--focused': focused,
      [prefixCls + '-border-bottom']: type !== 'textarea'
    }"
    :style="[getStyle]"
    @tap.stop="inputClick"
  >
    <view :class="`${prefixCls}-label`" :style="getLabelStyle">
      <view>{{ label }}</view>
    </view>
    <view :class="`${prefixCls}-content`" :style="getContentStyle">
      <slot v-if="isCustom"></slot>
      <view
        v-else-if="type === 'textarea'"
        :class="{
          [`${prefixCls}-input-textarea`]: true,
          [prefixCls + '-border']: type === 'textarea',
          'is--error': isError,
          'is--focused': focused
        }"
        :style="[getTextareaStyle]"
      >
        <view :class="`${prefixCls}-textarea-wrapper`">
          <textarea
            :class="`${prefixCls}-textarea`"
            :style="[getInputStyle]"
            :value="defaultValue"
            :focus="focus"
            :maxlength="inputMaxlength"
            :disabled="disabled"
            :selection-end="getSelectionEnd"
            :selection-start="getSelectionStart"
            :placeholder="getPlaceholder"
            :placeholderStyle="placeholderStyle"
            :cursor-spacing="getCursorSpacing"
            @focus="handleFocus"
            @input="handleInput"
            @blur="handleBlur"
            @confirm="handleConfirm"
            @keyboardheightchange="handleKeyboardheightchange"
          />
          <view :class="`${prefixCls}-right-icon u-flex`">
            <view v-if="isClearable" :class="`${prefixCls}-clear ${prefixCls}-right-icon-item`" @tap="handleClear">
              <su-icon size="16" name="close-circle-fill" color="#c0c4cc" />
            </view>
          </view>
        </view>
        <view style="text-align: right; color: #ccc; font-size: 26rpx">
          <text>{{ defaultValue.toString().length || 0 }}/{{ inputMaxlength }}</text>
        </view>
      </view>
      <template v-else>
        <input
          :value="defaultValue"
          :class="`${prefixCls}-input`"
          :style="[getInputStyle]"
          :type="getType"
          :focus="focus"
          :password="type == 'password' && !showPassword"
          :cursor-spacing="getCursorSpacing"
          :disabled="disabled || type === 'select'"
          :maxlength="inputMaxlength"
          :placeholder="getPlaceholder"
          :confirmType="confirmType"
          :placeholderStyle="placeholderStyle"
          :selection-end="getSelectionEnd"
          :selection-start="getSelectionStart"
          @focus="handleFocus"
          @input="handleInput"
          @blur="handleBlur"
          @confirm="handleConfirm"
          @keyboardheightchange="handleKeyboardheightchange"
        />
        <view :class="`${prefixCls}-right-icon u-flex`">
          <view v-if="isClearable" :class="`${prefixCls}-clear ${prefixCls}-right-icon-item`" @tap="handleClear">
            <su-icon size="16" name="close-circle-fill" color="#c0c4cc" />
          </view>
          <view
            v-if="type == 'select'"
            :class="{
              [`${prefixCls}-select`]: true,
              [`${prefixCls}-select-reverse`]: selectOpen,
              [`${prefixCls}-right-icon-item`]: true
            }"
          >
            <su-icon name="arrow-down" size="13" color="#c0c4cc"></su-icon>
          </view>
        </view>
      </template>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.su-cell-input {
  // --su-border-color: $su-border-color;
  display: flex;
  align-items: center;
  padding: 0 12rpx;
  box-sizing: border-box;

  &-border-bottom {
    border-bottom: 1rpx solid $su-border-color;

    &.is--error {
      border-color: $su-error;
    }

    &.is--focused {
      border-color: $su-primary;
    }
  }

  &-border {
    border: 1rpx solid $su-border-color;

    &.is--error {
      border-color: $su-error;
    }

    &.is--focused {
      border-color: $su-primary;
    }
  }

  &-content {
    flex: 1;
    display: flex;
    align-items: center;
  }

  &-input {
    flex: 1;
  }

  &-input-textarea {
    width: 100%;
    background-color: #fdfdfd;
    padding: 16rpx 20rpx;
    margin: 0 -12rpx;
    // border: 1rpx solid $su-border-color;
  }

  &-textarea-wrapper {
    display: flex;
    align-items: center;
  }

  &-label {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
  }

  &-right-icon {
    height: 100%;
    align-items: center;

    &-item {
      margin-left: 10rpx;
    }
  }

  &-select {
    transition: transform 0.4s;

    &-reverse {
      transform: rotate(-180deg);
    }
  }

  &.is--request {
    .su-cell-input-label {
      padding-left: 14rpx;
      &::before {
        content: '*';
        position: absolute;
        left: 0;
        margin: auto 0;
        color: $su-error;
        font-family: PingFang SC;
        letter-spacing: 0;
      }
    }
  }
}
</style>
