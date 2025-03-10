<template>
  <su-popup
    mode="center"
    :zoom="getProps.zoom"
    v-model="visible"
    :class="[getProps.customClass]"
    :customStyle="{
      borderRadius: '6px',
      overflow: 'hidden',
      marginTop: `-${addUnit(getProps.negativeTop)}`
    }"
    :closeOnClickOverlay="getProps.closeOnClickOverlay"
    :safeAreaInsetBottom="false"
    :duration="400"
    @click="clickHandler"
  >
    <view
      class="su-modal"
      :style="{
        width: addUnit(getProps.width)
      }"
    >
      <view class="su-modal__title" v-if="getProps.title" :style="getProps.titleStyle">{{ getProps.title }}</view>
      <view
        class="su-modal__content"
        :style="{
          paddingTop: `${getProps.title ? 12 : 25}px`
        }"
      >
        <slot>
          <text class="su-modal__content__text" :style="{ textAlign: getProps.contentTextAlign }">
            {{ content }}
          </text>
        </slot>
      </view>
      <view class="su-modal__button-group--confirm-button" v-if="$slots.confirmButton">
        <slot name="confirmButton"></slot>
      </view>
      <template v-else>
        <su-line></su-line>
        <view
          class="su-modal__button-group"
          :style="{
            flexDirection: getProps.buttonReverse ? 'row-reverse' : 'row'
          }"
        >
          <view
            class="su-modal__button-group__wrapper su-modal__button-group__wrapper--cancel"
            :hover-stay-time="150"
            hover-class="su-modal__button-group__wrapper--hover"
            :class="[getProps.showCancelButton && !getProps.showConfirmButton && 'su-modal__button-group__wrapper--only-cancel']"
            v-if="getProps.showCancelButton"
            @tap="cancelHandler"
          >
            <text
              class="su-modal__button-group__wrapper__text"
              :style="{
                color: getProps.cancelColor
              }"
            >
              {{ getProps.cancelText }}
            </text>
          </view>
          <su-line direction="column" v-if="getProps.showConfirmButton && getProps.showCancelButton"></su-line>
          <view
            class="su-modal__button-group__wrapper su-modal__button-group__wrapper--confirm"
            :hover-stay-time="150"
            hover-class="su-modal__button-group__wrapper--hover"
            :class="[!getProps.showCancelButton && getProps.showConfirmButton && 'su-modal__button-group__wrapper--only-confirm']"
            v-if="getProps.showConfirmButton"
            @tap="confirmHandler"
          >
            <su-loading-icon v-if="loading"></su-loading-icon>
            <text
              v-else
              class="su-modal__button-group__wrapper__text"
              :style="{
                color: getProps.confirmColor
              }"
            >
              {{ getProps.confirmText }}
            </text>
          </view>
        </view>
      </template>
    </view>
  </su-popup>
</template>

<script lang="ts" setup>
import { modalProps, type SuModalProps } from './props'
import { addUnit, deepMerge } from '../../libs/function/index'
import { baseProps } from '../../libs/vue'
import { computed, inject, ref, unref, watch } from 'vue'
import { modalDefaultOptionKey } from '.'
import { cloneDeep } from 'lodash-es'
import defProps from '../../libs/config/props'

/**
 * Modal 模态框
 * @description 弹出模态框，常用于消息提示、消息确认、在当前页面内完成特定的交互操作。
 * @tutorial https://suni.pages.dev/component/modal.html
 * @property {Boolean}			modelValue			是否显示模态框，请赋值给modelValue （默认 false ）
 * @property {String}			title				标题内容
 * @property {String}			content				模态框内容，如传入slot内容，则此参数无效
 * @property {String}			confirmText			确认按钮的文字 （默认 '确认' ）
 * @property {String}			cancelText			取消按钮的文字 （默认 '取消' ）
 * @property {Boolean}			showConfirmButton	是否显示确认按钮 （默认 true ）
 * @property {Boolean}			showCancelButton	是否显示取消按钮 （默认 false ）
 * @property {String}			confirmColor		确认按钮的颜色 （默认 '#2979ff' ）
 * @property {String}			cancelColor			取消按钮的颜色 （默认 '#606266' ）
 * @property {Boolean}			buttonReverse		对调确认和取消的位置 （默认 false ）
 * @property {Boolean}			zoom				是否开启缩放模式 （默认 true ）
 * @property {Boolean}			asyncClose			是否异步关闭，只对确定按钮有效，见上方说明 （默认 false ）
 * @property {Boolean}			closeOnClickOverlay	是否允许点击遮罩关闭Modal （默认 false ）
 * @property {String | Number}	negativeTop			往上偏移的值，给一个负的margin-top，往上偏移，避免和键盘重合的情况，单位任意，数值则默认为px单位 （默认 0 ）
 * @property {String | Number}	width				modal宽度，不支持百分比，可以数值，px，rpx单位 （默认 '650rpx' ）
 * @property {String}			confirmButtonShape	确认按钮的样式,如设置，将不会显示取消按钮
 * @event {Function} confirm	点击确认按钮时触发
 * @event {Function} cancel		点击取消按钮时触发
 * @event {Function} close		点击遮罩关闭出发，closeOnClickOverlay为true有效
 * @example <su-modal :show="show" />
 */

defineOptions({
  name: 'su-modal',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps({
  ...modalProps,
  ...baseProps
})

const emit = defineEmits(['confirm', 'cancel', 'close', 'update-props', 'update:modelValue'])

const visible = ref(false)
const loading = ref(false)
const propsRef = ref<SuModalProps>({})

const modalOptionKey = props.selector ? modalDefaultOptionKey + props.selector : modalDefaultOptionKey
const modalOptions = inject(modalOptionKey, ref(cloneDeep(defProps.modal)))

const getProps = computed(() => {
  return {
    ...props,
    ...unref(propsRef)
  }
})

/** 更新双向绑定的的值 */
function updateModel() {
  modalOptions.value.modelValue = false
  emit('update:modelValue', false)
}

function confirmHandler() {
  if (unref(getProps).asyncClose) {
    loading.value = true
  } else {
    visible.value = false
    updateModel()
  }
  emit('confirm')
}

function cancelHandler() {
  updateModel()
  emit('cancel')
}

function clickHandler() {
  if (unref(getProps).closeOnClickOverlay) {
    updateModel()
    emit('close')
  }
}

function clearLoading() {
  loading.value = false
}

watch(
  () => modalOptions.value,
  (val) => {
    propsRef.value = deepMerge(propsRef.value, val)
    visible.value = !!val.modelValue
    emit('update-props', val)
  },
  { deep: true }
)

watch(
  () => unref(getProps).modelValue,
  () => {
    visible.value = !!unref(getProps).modelValue
    if (unref(getProps).modelValue && loading.value) loading.value = false
  }
)

defineExpose({
  clearLoading
})
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';
$su-modal-border-radius: 6px;

.su-modal {
  width: 650rpx;
  border-radius: $su-modal-border-radius;
  overflow: hidden;

  &__title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    color: $su-content-color;
    text-align: center;
    padding-top: 25px;
  }

  &__content {
    padding: 12px 25px 25px 25px;
    @include flex;
    justify-content: center;

    &__text {
      font-size: 15px;
      color: $su-content-color;
      flex: 1;
    }
  }

  &__button-group {
    @include flex;

    &--confirm-button {
      flex-direction: column;
      padding: 0px 25px 15px 25px;
    }

    &__wrapper {
      flex: 1;
      @include flex;
      justify-content: center;
      align-items: center;
      height: 48px;

      &--confirm,
      &--only-cancel {
        border-bottom-right-radius: $su-modal-border-radius;
      }

      &--cancel,
      &--only-confirm {
        border-bottom-left-radius: $su-modal-border-radius;
      }

      &--hover {
        background-color: $su-bg-color;
      }

      &__text {
        color: $su-content-color;
        font-size: 16px;
        text-align: center;
      }
    }
  }
}
</style>
