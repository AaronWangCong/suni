<template>
  <view
    class="su-radio cursor-pointer"
    @tap.stop="wrapperClickHandler"
    :style="[radioStyle]"
    :class="[`su-radio-label--${parentData.iconPlacement}`, parentData.borderBottom && parentData.placement === 'column' && 'su-border-bottom']"
  >
    <view class="su-radio__icon-wrap cursor-pointer" @tap.stop="iconClickHandler" :class="iconClasses" :style="[iconWrapStyle]">
      <slot name="icon">
        <su-icon class="su-radio__icon-wrap__icon" name="checkbox-mark" :size="elIconSize" :color="elIconColor" />
      </slot>
    </view>
    <view class="su-radio__label-wrap cursor-pointer" @tap.stop="labelClickHandler">
      <slot name="label" :label="label" :elDisabled="elDisabled">
        <text
          class="su-radio__text"
          :style="{
            color: elDisabled ? elInactiveColor : elLabelColor,
            fontSize: elLabelSize,
            lineHeight: elLabelSize
          }"
        >
          {{ label }}
        </text>
      </slot>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { radioProps } from './props'
import { addUnit, addStyle, os, deepMerge, formValidate, error } from '../../libs/function/index'
import { baseProps } from '../../libs/vue'
import { computed, ref, unref, watch } from 'vue'
import { reactive, nextTick, onMounted, getCurrentInstance } from 'vue'
import { useParent } from '../../hooks/core/useParent'
import { RADIO_KEY, type SuRadioGroupProps } from '../su-radio-group/props'
import type { CSSProperties } from 'vue'
import { isFunction } from 'lodash-es'

/**
 * radio 单选框
 * @description 单选框用于有一个选择，用户只能选择其中一个的场景。搭配u-radio-group使用
 * @tutorial https://suni.pages.dev/sun-uni/component/radio.html
 * @property {String | Number}	name			radio的名称
 * @property {String}			shape			形状，square为方形，circle为圆型
 * @property {Boolean}			disabled		是否禁用
 * @property {String | Boolean}	labelDisabled	是否禁止点击提示语选中单选框
 * @property {String}			activeColor		选中时的颜色，如设置parent的active-color将失效
 * @property {String}			inactiveColor	未选中的颜色
 * @property {String | Number}	iconSize		图标大小，单位px
 * @property {String | Number}	labelSize		label字体大小，单位px
 * @property {String | Number}	label			label提示文字，因为nvue下，直接slot进来的文字，由于特殊的结构，无法修改样式
 * @property {String | Number}	size			整体的大小
 * @property {String}			iconColor		图标颜色
 * @property {String}			labelColor		label的颜色
 * @property {Object}			customStyle		组件的样式，对象形式
 *
 * @event {Function} change 某个radio状态发生变化时触发(选中状态)
 * @example <su-radio :labelDisabled="false">门掩黄昏，无计留春住</su-radio>
 */

defineOptions({
  name: 'su-radio',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps({
  ...radioProps,
  ...baseProps
})

const emit = defineEmits(['change'])

const checked = ref(false)

const parentData = reactive<SuRadioGroupProps>({
  iconSize: 12,
  labelDisabled: undefined,
  disabled: undefined,
  shape: undefined,
  activeColor: undefined,
  inactiveColor: undefined,
  size: 21,
  modelValue: undefined,
  iconColor: undefined,
  placement: 'row',
  borderBottom: false,
  iconPlacement: 'left'
})

const { parent } = useParent(RADIO_KEY)
const instance = getCurrentInstance()

/** 是否禁用，如果父组件u-raios-group禁用的话，将会忽略子组件的配置 */
const elDisabled = computed(() => {
  return props.disabled !== '' ? props.disabled : parentData.disabled !== undefined ? parentData.disabled : false
})

/** 是否禁用label点击 */
const elLabelDisabled = computed(() => {
  return props.labelDisabled !== '' ? props.labelDisabled : parentData.labelDisabled !== undefined ? parentData.labelDisabled : false
})

/** 组件尺寸，对应size的值，默认值为21px */
const elSize = computed(() => {
  return props.size ? props.size : parentData.size ? parentData.size : 21
})

/** 组件选中激活时的颜色 */
const elIconSize = computed(() => {
  return props.iconSize ? props.iconSize : parentData.iconSize ? parentData.iconSize : 12
})

/** 组件的勾选图标的尺寸，默认12px */
const elActiveColor = computed(() => {
  return props.activeColor ? props.activeColor : parentData.activeColor ? parentData.activeColor : '#2979ff'
})

/** 组件选未中激活时的颜色 */
const elInactiveColor = computed(() => {
  return props.inactiveColor ? props.inactiveColor : parentData.inactiveColor ? parentData.inactiveColor : '#c8c9cc'
})

/** label的颜色 */
const elLabelColor = computed(() => {
  return props.labelColor ? props.labelColor : parentData.labelColor ? parentData.labelColor : '#606266'
})

/** 组件的形状 */
const elShape = computed(() => {
  return props.shape ? props.shape : parentData.shape ? parentData.shape : 'circle'
})

/** label大小 */
const elLabelSize = computed(() => {
  return addUnit(props.labelSize ? props.labelSize : parentData.labelSize ? parentData.labelSize : '15')
})

/** 图标颜色 */
const elIconColor = computed(() => {
  const iconColor = props.iconColor ? props.iconColor : parentData.iconColor ? parentData.iconColor : '#ffffff'
  // 图标的颜色
  if (unref(elDisabled)) {
    // disabled状态下，已勾选的radio图标改为elInactiveColor
    return unref(checked) ? unref(elInactiveColor) : 'transparent'
  } else {
    return unref(checked) ? iconColor : 'transparent'
  }
})

const iconClasses = computed(() => {
  let classes: string | string[] = []
  // 组件的形状
  classes.push('su-radio__icon-wrap--' + unref(elShape))
  if (unref(elDisabled)) {
    classes.push('su-radio__icon-wrap--disabled')
  }

  if (unref(checked) && unref(elDisabled)) {
    classes.push('su-radio__icon-wrap--disabled--checked')
  }

  // 支付宝，头条小程序无法动态绑定一个数组类名，否则解析出来的结果会带有","，而导致失效
  // #ifdef MP-ALIPAY || MP-TOUTIAO
  classes = classes.join(' ')
  // #endif
  return classes
})

/** icon 样式 */
const iconWrapStyle = computed(() => {
  // radio的整体样式
  const style: CSSProperties = {}
  style.backgroundColor = unref(checked) && !unref(elDisabled) ? unref(elActiveColor) : '#ffffff'
  style.borderColor = unref(checked) && !unref(elDisabled) ? unref(elActiveColor) : unref(elInactiveColor)
  style.width = addUnit(unref(elSize))
  style.height = addUnit(unref(elSize))
  // 如果是图标在右边的话，移除它的右边距
  if (parentData.iconPlacement === 'right') {
    style.marginRight = 0
  }
  return style
})

/** radio样式 */
const radioStyle = computed(() => {
  const style: CSSProperties = {}
  if (parentData.borderBottom && parentData.placement === 'row') {
    error('检测到您将borderBottom设置为true，需要同时将su-radio-group的placement设置为column才有效')
  }
  // 当父组件设置了显示下边框并且排列形式为纵向时，给内容和边框之间加上一定间隔
  if (parentData.borderBottom && parentData.placement === 'column') {
    // ios像素密度高，需要多一点的距离
    style.paddingBottom = os() === 'ios' ? '12px' : '8px'
  }
  return deepMerge(style, addStyle(props.customStyle) as CSSProperties)
})

function init() {
  if (!parent) {
    error('su-radio必须搭配su-radio-group组件使用')
  }

  checked.value = props.name === parent?.props.modelValue
}

// 点击图标
function iconClickHandler(e: UniHelper.EventTarget) {
  e && typeof e.stopPropagation === 'function' && e.stopPropagation()
  if (!unref(elDisabled)) {
    setRadioCheckedStatus()
  }
}

function wrapperClickHandler(e: UniHelper.EventTarget) {
  parentData.iconPlacement === 'right' && iconClickHandler(e)
}

/** 点击label */
function labelClickHandler(e: UniHelper.EventTarget) {
  e && typeof e.stopPropagation === 'function' && e.stopPropagation()
  // 如果按钮整体被禁用或者label被禁用，则不允许点击文字修改状态
  if (!unref(elLabelDisabled) && !unref(elDisabled)) {
    setRadioCheckedStatus()
  }
}

function emitEvent() {
  // su-radio的checked不为true时(意味着未选中)，才发出事件，避免多次点击触发事件
  if (!checked.value) {
    emit('change', props.name)
    // 尝试调用u-form的验证方法，进行一定延迟，否则微信小程序更新可能会不及时
    nextTick(() => {
      formValidate(instance, 'change')
    })
  }
}

// 改变组件选中状态
// 这里的改变的依据是，更改本组件的checked值为true，同时通过父组件遍历所有u-radio实例
// 将本组件外的其他u-radio的checked都设置为false(都被取消选中状态)，因而只剩下一个为选中状态
async function setRadioCheckedStatus() {
  let flag = true
  if (props.beforeChange && isFunction(props.beforeChange)) {
    flag = await props.beforeChange(props.name, checked.value)
  }
  if (flag) {
    emitEvent()
    // 将本组件标记为选中状态
    checked.value = true
    typeof parent?.handleCheckedOther === 'function' && parent?.handleCheckedOther(instance!)
  }
}

function setChecked(bool = false) {
  checked.value = bool
}

watch(
  () => parent?.props,
  (val) => {
    if (val) {
      parentData.disabled = val.disabled || false
      parentData.labelDisabled = val.labelDisabled || false
      parentData.iconSize = val.iconSize || 12
      parentData.size = val.size || 21
      parentData.activeColor = val.activeColor || '#2979ff'
      parentData.inactiveColor = val.inactiveColor || '#c8c9cc'
      parentData.labelColor = val.labelColor || '#606266'
      parentData.shape = val.shape || 'circle'
      parentData.labelSize = val.labelSize || '15'
      parentData.iconColor = val.iconColor || '#ffffff'
      parentData.placement = val.placement || 'row'
      parentData.borderBottom = val.borderBottom || false
      parentData.iconPlacement = val.iconPlacement || 'left'
    }
  },
  { deep: true, immediate: true }
)

onMounted(() => {
  init()
})

defineExpose({
  setChecked
})
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';
$su-radio-wrap-margin-right: 6px !default;
$su-radio-wrap-font-size: 20px !default;
$su-radio-wrap-border-width: 1px !default;
$su-radio-wrap-border-color: #c8c9cc !default;
$su-radio-line-height: 0 !default;
$su-radio-circle-border-radius: 100% !default;
$su-radio-square-border-radius: 3px !default;
$su-radio-checked-color: #fff !default;
$su-radio-checked-background-color: red !default;
$su-radio-checked-border-color: #2979ff !default;
$su-radio-disabled-background-color: #ebedf0 !default;
$su-radio-disabled--checked-color: #c8c9cc !default;
$su-radio-label-margin-left: 5px !default;
$su-radio-label-margin-right: 12px !default;
$su-radio-label-color: $su-content-color !default;
$su-radio-label-font-size: 15px !default;
$su-radio-label-disabled-color: #c8c9cc !default;

.su-radio {
  /* #ifndef APP-NVUE */
  @include flex(row);
  /* #endif */
  overflow: hidden;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
  margin-top: 5px;

  &-label--left {
    flex-direction: row;
  }

  &-label--right {
    flex-direction: row-reverse;
    justify-content: space-between;
  }

  &__icon-wrap {
    /* #ifndef APP-NVUE */
    box-sizing: border-box;
    // nvue下，border-color过渡有问题
    transition-property: border-color, background-color, color;
    transition-duration: 0.2s;
    /* #endif */
    color: $su-content-color;
    @include flex;
    align-items: center;
    justify-content: center;
    color: transparent;
    text-align: center;
    margin-right: $su-radio-wrap-margin-right;
    font-size: $su-radio-wrap-font-size;
    border-width: $su-radio-wrap-border-width;
    border-color: $su-radio-wrap-border-color;
    border-style: solid;

    /* #ifdef MP-TOUTIAO */
    // 头条小程序兼容性问题，需要设置行高为0，否则图标偏下
    &__icon {
      line-height: $su-radio-line-height;
    }

    /* #endif */

    &--circle {
      border-radius: $su-radio-circle-border-radius;
    }

    &--square {
      border-radius: $su-radio-square-border-radius;
    }

    &--checked {
      color: $su-radio-checked-color;
      background-color: $su-radio-checked-background-color;
      border-color: $su-radio-checked-border-color;
    }

    &--disabled {
      background-color: $su-radio-disabled-background-color !important;
    }

    &--disabled--checked {
      color: $su-radio-disabled--checked-color !important;
    }
  }

  &__label {
    /* #ifndef APP-NVUE */
    word-wrap: break-word;
    /* #endif */
    margin-left: $su-radio-label-margin-left;
    margin-right: $su-radio-label-margin-right;
    color: $su-radio-label-color;
    font-size: $su-radio-label-font-size;

    &--disabled {
      color: $su-radio-label-disabled-color;
    }
  }
}
</style>
