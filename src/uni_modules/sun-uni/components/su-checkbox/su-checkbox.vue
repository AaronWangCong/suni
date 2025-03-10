<template>
  <view
    class="su-checkbox cursor-pointer"
    :style="[checkboxStyle]"
    @tap.stop="wrapperClickHandler"
    :class="[`su-checkbox-label--${parentData.iconPlacement}`, parentData.borderBottom && parentData.placement === 'column' && 'su-border-bottom']"
  >
    <view class="su-checkbox__icon-wrap cursor-pointer" @tap.stop="iconClickHandler" :class="iconClasses" :style="[iconWrapStyle]">
      <slot name="icon">
        <su-icon class="su-checkbox__icon-wrap__icon" name="checkbox-mark" :size="elIconSize" :color="elIconColor" />
      </slot>
    </view>
    <view class="su-checkbox__label-wrap cursor-pointer" @tap.stop="labelClickHandler">
      <slot name="label" :label="label" :elDisabled="elDisabled">
        <text
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
import { checkboxProps } from './props'
import { addStyle, addUnit, deepMerge, formValidate, error } from '../../libs/function/index'
import test from '../../libs/function/test'
import { baseProps } from '../../libs/vue'
import { computed, getCurrentInstance, nextTick, onMounted, reactive, ref, unref, watch, type CSSProperties } from 'vue'
import { CHECKBOX_KEY, type SuCheckboxGroupProps } from '../su-checkbox-group/props'
import { useParent } from '../../hooks/core/useParent'
import { preventEvent } from '../../libs/mixin/mixinvue3'
import { isFunction } from 'lodash-es'
/**
 * checkbox  复选框
 * @description 复选框组件一般用于需要多个选择的场景，该组件功能完整，使用方便
 * @tutorial https://suni.pages.dev/component/checkbox.html
 * @property {String | Number | Boolean}	name			checkbox组件的标示符
 * @property {String}						shape			形状，square为方形，circle为圆型
 * @property {String | Number}				size			整体的大小
 * @property {Boolean}						checked			是否默认选中
 * @property {String | Boolean}				disabled		是否禁用
 * @property {String}						activeColor		选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值
 * @property {String}						inactiveColor	未选中的颜色
 * @property {String | Number}				iconSize		图标的大小，单位px
 * @property {String}						iconColor		图标颜色
 * @property {String | Number}				label			label提示文字，因为nvue下，直接slot进来的文字，由于特殊的结构，无法修改样式
 * @property {String}						labelColor 		label的颜色
 * @property {String | Number}				labelSize		label的字体大小，px单位
 * @property {String | Boolean}				labelDisabled	是否禁止点击提示语选中复选框
 * @property {Object}						customStyle		定义需要用到的外部样式
 *
 * @event {Function}	change	任一个checkbox状态发生变化时触发，回调为一个对象
 * @example <su-checkbox v-model="checked" :disabled="false">天涯</su-checkbox>
 */

defineOptions({
  name: 'su-checkbox',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps({
  ...checkboxProps,
  ...baseProps
})

const emit = defineEmits(['change', 'update:checked'])

const isChecked = ref(false)

// 父组件的默认值，因为头条小程序不支持在computed中使用this.parent.shape的形式
const parentData = reactive<SuCheckboxGroupProps>({
  iconSize: 12,
  labelDisabled: undefined,
  disabled: undefined,
  shape: 'square',
  activeColor: undefined,
  inactiveColor: undefined,
  size: 18,
  modelValue: undefined,
  iconColor: undefined,
  placement: 'row',
  borderBottom: false,
  iconPlacement: 'left',
  labelColor: '#606266'
})

const { parent } = useParent(CHECKBOX_KEY)
const instance = getCurrentInstance()

/* 是否禁用，如果父组件u-radios-group禁用的话，将会忽略子组件的配置 */
const elDisabled = computed(() => {
  return props.disabled !== '' ? props.disabled : parentData.disabled !== undefined ? parentData.disabled : false
})

/* 是否禁用label点击 */
const elLabelDisabled = computed(() => {
  return props.labelDisabled !== '' ? props.labelDisabled : parentData.labelDisabled !== undefined ? parentData.labelDisabled : false
})

/* 组件尺寸，对应size的值，默认值为21px */
const elSize = computed(() => {
  return props.size ? props.size : parentData.size ? parentData.size : 21
})

/* 组件的勾选图标的尺寸，默认12px  */
const elIconSize = computed(() => {
  return props.iconSize ? props.iconSize : parentData.iconSize ? parentData.iconSize : 12
})

/* 组件选中激活时的颜色  */
const elActiveColor = computed(() => {
  return props.activeColor ? props.activeColor : parentData.activeColor ? parentData.activeColor : '#2979ff'
})

/* 组件选未中激活时的颜色  */
const elInactiveColor = computed(() => {
  return props.inactiveColor ? props.inactiveColor : parentData.inactiveColor ? parentData.inactiveColor : '#c8c9cc'
})

/* label的颜色  */
const elLabelColor = computed(() => {
  return props.labelColor ? props.labelColor : parentData.labelColor ? parentData.labelColor : '#c8c9cc'
})

/* 组件的形状  */
const elShape = computed(() => {
  return props.shape ? props.shape : parentData.shape ? parentData.shape : 'circle'
})

/* label大小  */
const elLabelSize = computed(() => {
  return addUnit(props.labelSize ? props.labelSize : parentData.labelSize ? parentData.labelSize : '15')
})

/* icon 颜色  */
const elIconColor = computed(() => {
  const iconColor = props.iconColor ? props.iconColor : parentData.iconColor ? parentData.iconColor : '#ffffff'
  if (unref(elDisabled)) {
    return unref(isChecked) ? unref(elInactiveColor) : 'transparent'
  }
  return unref(isChecked) ? iconColor : 'transparent'
})

/** icon class */
const iconClasses = computed(() => {
  let classes: string | string[] = []
  // 组件的形状
  classes.push('su-checkbox__icon-wrap--' + unref(elShape))
  if (unref(elDisabled)) {
    classes.push('su-checkbox__icon-wrap--disabled')
  }

  if (unref(isChecked) && unref(elDisabled)) {
    classes.push('su-checkbox__icon-wrap--disabled--checked')
  }

  // 支付宝，头条小程序无法动态绑定一个数组类名，否则解析出来的结果会带有","，而导致失效
  // #ifdef MP-ALIPAY || MP-TOUTIAO
  classes = classes.join(' ')
  // #endif
  return classes
})

/** icon 整体的样式 */
const iconWrapStyle = computed(() => {
  // checkbox的整体样式
  const style: CSSProperties = {}

  style.backgroundColor = unref(isChecked) && !unref(elDisabled) ? unref(elActiveColor) : '#ffffff'
  style.borderColor = unref(isChecked) && !unref(elDisabled) ? unref(elActiveColor) : unref(elInactiveColor)
  style.width = addUnit(unref(elSize))
  style.height = addUnit(unref(elSize))
  // 如果是图标在右边的话，移除它的右边距
  if (!props.usedAlone) {
    if (parentData.iconPlacement === 'right') {
      style.marginRight = 0
    }
  }
  return style
})

/** checkbox 样式 */
const checkboxStyle = computed(() => {
  const style: CSSProperties = {}
  if (!props.usedAlone) {
    if (parentData.borderBottom && parentData.placement === 'row') {
      error('检测到您将borderBottom设置为true，需要同时将u-checkbox-group的placement设置为column才有效')
    }
    // 当父组件设置了显示下边框并且排列形式为纵向时，给内容和边框之间加上一定间隔
    if (parentData.borderBottom && parentData.placement === 'column') {
      style.paddingBottom = '8px'
    }
  }
  return deepMerge(style, addStyle(props.customStyle) as CSSProperties)
})

/** 初始化 */
function init() {
  if (!props.usedAlone) {
    // 支付宝小程序不支持provide/inject，所以使用这个方法获取整个父组件，在created定义，避免循环引用
    if (!parent) {
      error('su-checkbox必须搭配su-checkbox-group组件使用')
    }
    const value = parentData.modelValue

    if (props.checked) {
      isChecked.value = true
    } else if (!props.usedAlone && test.array(value)) {
      // 查找数组是是否存在this.name元素值
      isChecked.value = (value as Array<any>).some((item) => {
        return item === props.name
      })
    }
  } else {
    if (props.checked) {
      isChecked.value = true
    }
  }
}

/** 横向两端排列时，点击组件即可触发选中事件 */
function wrapperClickHandler(e: UniHelper.EventTarget) {
  if (!props.usedAlone) {
    parentData.iconPlacement === 'right' && iconClickHandler(e)
  } else {
    iconClickHandler(e)
  }
}

/* 点击图标 */
function iconClickHandler(e: UniHelper.EventTarget) {
  preventEvent(e)
  // 如果整体被禁用，不允许被点击
  if (!unref(elDisabled)) {
    setRadioCheckedStatus()
  }
}

/* 点击label */
function labelClickHandler(e: UniHelper.EventTarget) {
  preventEvent(e)
  // 如果整体被禁用，不允许被点击
  if (!unref(elDisabled) && !unref(elLabelDisabled)) {
    setRadioCheckedStatus()
  }
}

function emitEvent() {
  emit('change', isChecked.value)
  if (!props.usedAlone) {
    emit('update:checked', isChecked.value)
  }

  nextTick(() => {
    formValidate(instance, 'change')
  })
}

/**
 * 改变组件选中状态
 * 这里的改变的依据是，更改本组件的checked值为true，同时通过父组件遍历所有su-checkbox实例
 * 将本组件外的其他su-checkbox的checked都设置为false(都被取消选中状态)，因而只剩下一个为选中状态
 * */
async function setRadioCheckedStatus() {
  let flag = true
  if (props.beforeChange && isFunction(props.beforeChange)) {
    flag = await props.beforeChange(props.name, isChecked.value)
  }
  if (flag) {
    // 将本组件标记为与原来相反的状态
    isChecked.value = !isChecked.value
    emitEvent()
    if (!props.usedAlone) {
      typeof parent?.handleCheckedOther === 'function' && parent?.handleCheckedOther()
    }
  }
}

watch(
  () => props.checked,
  (val) => {
    if (val !== isChecked.value) {
      isChecked.value = !!val
    }
  }
)

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
      parentData.shape = val.shape || 'square'
      parentData.labelSize = val.labelSize || '15'
      parentData.iconColor = val.iconColor || '#ffffff'
      parentData.placement = val.placement || 'row'
      parentData.borderBottom = val.borderBottom || false
      parentData.iconPlacement = val.iconPlacement || 'left'
      parentData.modelValue = val.modelValue
    }
  },
  { deep: true, immediate: true }
)

onMounted(() => {
  init()
})

defineExpose({
  isChecked
})
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';
$su-checkbox-icon-wrap-margin-right: 6px !default;
$su-checkbox-icon-wrap-font-size: 6px !default;
$su-checkbox-icon-wrap-border-width: 1px !default;
$su-checkbox-icon-wrap-border-color: #c8c9cc !default;
$su-checkbox-icon-wrap-icon-line-height: 0 !default;
$su-checkbox-icon-wrap-circle-border-radius: 100% !default;
$su-checkbox-icon-wrap-square-border-radius: 3px !default;
$su-checkbox-icon-wrap-checked-color: #fff !default;
$su-checkbox-icon-wrap-checked-background-color: red !default;
$su-checkbox-icon-wrap-checked-border-color: #2979ff !default;
$su-checkbox-icon-wrap-disabled-background-color: #ebedf0 !default;
$su-checkbox-icon-wrap-disabled-checked-color: #c8c9cc !default;
$su-checkbox-label-margin-left: 5px !default;
$su-checkbox-label-margin-right: 12px !default;
$su-checkbox-label-color: $su-content-color !default;
$su-checkbox-label-font-size: 15px !default;
$su-checkbox-label-disabled-color: #c8c9cc !default;

.su-checkbox {
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
    margin-right: $su-checkbox-icon-wrap-margin-right;

    font-size: $su-checkbox-icon-wrap-font-size;
    border-width: $su-checkbox-icon-wrap-border-width;
    border-color: $su-checkbox-icon-wrap-border-color;
    border-style: solid;

    /* #ifdef MP-TOUTIAO */
    // 头条小程序兼容性问题，需要设置行高为0，否则图标偏下
    &__icon {
      line-height: $su-checkbox-icon-wrap-icon-line-height;
    }

    /* #endif */

    &--circle {
      border-radius: $su-checkbox-icon-wrap-circle-border-radius;
    }

    &--square {
      border-radius: $su-checkbox-icon-wrap-square-border-radius;
    }

    &--checked {
      color: $su-checkbox-icon-wrap-checked-color;
      background-color: $su-checkbox-icon-wrap-checked-background-color;
      border-color: $su-checkbox-icon-wrap-checked-border-color;
    }

    &--disabled {
      background-color: $su-checkbox-icon-wrap-disabled-background-color !important;
    }

    &--disabled--checked {
      color: $su-checkbox-icon-wrap-disabled-checked-color !important;
    }
  }

  &__label {
    /* #ifndef APP-NVUE */
    word-wrap: break-word;
    /* #endif */
    margin-left: $su-checkbox-label-margin-left;
    margin-right: $su-checkbox-label-margin-right;
    color: $su-checkbox-label-color;
    font-size: $su-checkbox-label-font-size;

    &--disabled {
      color: $su-checkbox-label-disabled-color;
    }
  }
}
</style>
