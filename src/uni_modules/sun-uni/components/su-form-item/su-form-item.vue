<template>
  <view class="su-form-item" :class="{ 'su-form-item--error': !!message && parentData.errorType === 'message' }">
    <view
      class="su-form-item__body"
      @tap="clickHandler"
      :style="[
        addStyle(customStyle),
        {
          flexDirection: (labelPosition || parentData.labelPosition) === 'left' ? 'row' : 'column'
        }
      ]"
    >
      <!-- 微信小程序中，将一个参数设置空字符串，结果会变成字符串"true" -->
      <slot name="label" v-if="!hideLabel">
        <!-- {{required}} -->
        <view
          class="su-form-item__body__left"
          v-if="required || leftIcon || label"
          :style="{
            width: addUnit(labelWidth || parentData.labelWidth),
            marginBottom: (labelPosition || parentData.labelPosition) === 'left' ? 0 : '5px'
          }"
        >
          <!-- 为了块对齐 -->
          <view class="su-form-item__body__left__content">
            <!-- nvue不支持伪元素before -->
            <text v-if="required && !hideRequiredMark" class="su-form-item__body__left__content__required">*</text>
            <view class="su-form-item__body__left__content__icon" v-if="leftIcon">
              <su-icon :name="leftIcon" :custom-style="leftIconStyle"></su-icon>
            </view>
            <text
              class="su-form-item__body__left__content__label"
              :style="[
                parentData.labelStyle,
                {
                  justifyContent: parentData.labelAlign === 'left' ? 'flex-start' : parentData.labelAlign === 'center' ? 'center' : 'flex-end'
                }
              ]"
            >
              {{ label }}
              <text v-if="colon">：</text>
            </text>
          </view>
        </view>
      </slot>
      <view class="su-form-item__body__right">
        <view class="su-form-item__body__right__content">
          <view class="su-form-item__body__right__content__slot">
            <slot />
          </view>
          <view class="item__body__right__content__icon" v-if="$slots.right">
            <slot name="right" />
          </view>
        </view>
      </view>
    </view>
    <slot name="error">
      <text
        v-if="!!message && parentData.errorType === 'message'"
        class="su-form-item__body__right__message"
        :style="{
          marginLeft: addUnit((labelPosition || parentData.labelPosition) === 'top' ? 0 : labelWidth || parentData.labelWidth)
        }"
      >
        {{ message }}
      </text>
    </slot>
    <su-line
      v-if="borderBottom"
      :color="message && parentData.errorType === 'border-bottom' ? color.error : propsLine.color"
      :customStyle="`margin-top: ${message && parentData.errorType === 'message' ? '5px' : 0}`"
    ></su-line>
  </view>
</template>

<script lang="ts" setup>
import { formItemProps, type SuFormItemProps } from './props'
import defProps from '../../libs/config/props'
import color from '../../libs/config/color'
import { addStyle, addUnit, error } from '../../libs/function/index'
import { computed, reactive, ref, watch, onMounted } from 'vue'
import { baseProps } from '../../libs/vue'
import { FORM_KEY, type SuFormProvide } from '../su-form/props'
import { useParent } from '../../hooks/core/useParent'
import { get, set } from 'lodash-es'

defineOptions({
  name: 'su-form-item',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
})

const emit = defineEmits(['click'])

/**
 * Form 表单
 * @description 此组件一般用于表单场景，可以配置Input输入框，Select弹出框，进行表单验证等。
 * @tutorial https://suni.pages.dev/component/form.html
 * @property {String}			label			input的label提示语
 * @property {String}			prop			绑定的值
 * @property {Array}			rules			绑定的规则
 * @property {String | Boolean}	borderBottom	是否显示表单域的下划线边框
 * @property {String | Number}	labelWidth		label的宽度，单位px
 * @property {String}			rightIcon		右侧图标
 * @property {String}			leftIcon		左侧图标
 * @property {String | Object} leftIconStyle    左侧图标的样式
 * @property {Boolean}			required		是否显示左边的必填星号，只作显示用，具体校验必填的逻辑，请在rules中配置 (默认 false )
 *
 * @example <su-form-item label="姓名" prop="userInfo.name" borderBottom ref="item1"></su-form-item>
 */

const props = defineProps({
  ...formItemProps,
  ...baseProps
})

// console.log(props, 'formitem, propspropspropspropsprops')

const { parent: form } = useParent(FORM_KEY)

// 错误提示
const message = ref<string | null>('')

const parentData = reactive<SuFormProvide['props']>({
  // 提示文本的位置
  labelPosition: 'left',
  // 提示文本对齐方式
  labelAlign: 'left',
  // 提示文本的样式
  labelStyle: {},
  // 提示文本的宽度
  labelWidth: 45,
  // 错误提示方式
  errorType: 'message',
  model: {}
})
/** 当前item 的规则 */
const itemRules = ref<SuFormItemProps['rules']>([])

const propsLine = computed(() => defProps.line)

/** 规则 */
const getRules = computed(() => itemRules.value)

function updateParentData() {
  parentData.labelPosition = form?.props.labelPosition!
  parentData.labelAlign = form?.props.labelAlign!
  parentData.labelStyle = form?.props.labelStyle!
  parentData.labelWidth = form?.props.labelWidth!
  parentData.errorType = form?.props.errorType!
}

/**
 * 设置规则
 * @param rules 规则
 */
function setRules(rules: SuFormItemProps['rules']) {
  if (!rules || rules?.length === 0) {
    itemRules.value = []
  }
  itemRules.value = rules
}

function clickHandler() {
  emit('click')
}

/**
 * 移除u-form-item的校验结果
 */
function clearValidate() {
  message.value = null
}

function resetField() {
  // 找到原始值
  const value = get(form!.originalModel, props.prop!)
  set(form?.props?.model!, props.prop!, value)
  // 移除校验结果
  message.value = null
}

/** 初始化 */
function init() {
  if (!form) {
    error('su-form-item需要结合su-form组件使用')
  }
}

/** 设置消息 */
function setMessage(msg: string) {
  message.value = msg
}

watch(
  () => props.rules,
  (val) => {
    setRules(val)
  },
  { immediate: true }
)

onMounted(() => {
  init()
})

defineExpose({
  clearValidate,
  resetField,
  updateParentData,
  getRules,
  setMessage,
  prop: props.prop,
  clickHandler
})
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';

.su-form-item {
  @include flex(column);
  font-size: 14px;
  color: $su-main-color;
  padding: 10px 0;

  &__body {
    @include flex;
    // padding: 10px 0;

    &__left {
      @include flex;
      align-items: center;

      &__content {
        position: relative;
        @include flex;
        align-items: center;
        padding-right: 10rpx;
        flex: 1;

        &__icon {
          margin-right: 8rpx;
        }

        &__required {
          // position: absolute;
          // left: -9px;
          color: $su-error;
          line-height: 20px;
          font-size: 20px;
          top: 3px;
        }

        &__label {
          @include flex;
          align-items: center;
          flex: 1;
          color: $su-main-color;
          font-size: 15px;
        }
      }
    }

    &__right {
      flex: 1;

      &__content {
        @include flex;
        align-items: center;
        flex: 1;

        &__slot {
          flex: 1;
          /* #ifndef MP */
          @include flex;
          align-items: center;
          /* #endif */
        }

        &__icon {
          margin-left: 10rpx;
          color: $su-light-color;
          font-size: 30rpx;
        }
      }

      &__message {
        font-size: 12px;
        line-height: 12px;
        color: $su-error;
        margin-top: 4px;
      }
    }
  }
}
</style>
