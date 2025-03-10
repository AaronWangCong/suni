<template>
  <su-transition mode="fade" :show="show" style="display: inline-flex">
    <view class="su-tag-wrapper cursor-pointer">
      <view
        class="su-tag"
        :class="[
          `su-tag--${shape}`,
          !plain && `su-tag--${type}`,
          plain && `su-tag--${type}--plain`,
          `su-tag--${size}`,
          plain && plainFill && `su-tag--${type}--plain--fill`
        ]"
        @tap.stop="clickHandler"
        :style="[
          {
            marginRight: closable ? '10px' : 0,
            marginTop: closable ? '10px' : 0
          },
          style
        ]"
      >
        <slot name="icon">
          <view class="su-tag__icon" v-if="icon">
            <image v-if="testImage(icon)" :src="icon" :style="[imgStyle]"></image>
            <su-icon v-else :color="elIconColor" :name="icon" :size="iconSize"></su-icon>
          </view>
        </slot>
        <text
          class="su-tag__text"
          :style="[textColor]"
          :class="[`su-tag__text--${type}`, plain && `su-tag__text--${type}--plain`, `su-tag__text--${size}`]"
        >
          <slot>
            {{ text }}
          </slot>
        </text>
      </view>
      <view
        class="su-tag__close"
        :class="[`su-tag__close--${size}`]"
        v-if="closable"
        @tap.stop="closeHandler"
        :style="{ backgroundColor: closeColor }"
      >
        <su-icon name="close" :size="closeSize" color="#ffffff"></su-icon>
      </view>
    </view>
  </su-transition>
</template>

<script lang="ts" setup>
import { tagProps } from './props'
import test from '../../libs/function/test'
import { computed, type CSSProperties } from 'vue'
/**
 * Tag 标签
 * @description tag组件一般用于标记和选择，我们提供了更加丰富的表现形式，能够较全面的涵盖您的使用场景
 * @tutorial https://suni.pages.dev/sun-uni/component/tag.html
 * @property {String}			type		标签类型info、primary、success、warning、error （默认 'primary' ）
 * @property {Boolean | String}	disabled	不可用（默认 false ）
 * @property {String}			size		标签的大小，large，medium，mini （默认 'medium' ）
 * @property {String}			shape		tag的形状，circle（两边半圆形）, square（方形，带圆角）（默认 'square' ）
 * @property {String | Number}	text		标签的文字内容
 * @property {String}			bgColor		背景颜色，默认为空字符串，即不处理
 * @property {String}			color		标签字体颜色，默认为空字符串，即不处理
 * @property {String}			borderColor	镂空形式标签的边框颜色
 * @property {String}			closeColor	关闭按钮图标的颜色（默认 #C6C7CB）
 * @property {String | Number}	name		点击时返回的索引值，用于区分例遍的数组哪个元素被点击了
 * @property {Boolean}			plainFill	镂空时是否填充背景色（默认 false ）
 * @property {Boolean}			plain		是否镂空（默认 false ）
 * @property {Boolean}			closable	是否可关闭，设置为true，文字右边会出现一个关闭图标（默认 false ）
 * @property {Boolean}			show		标签显示与否（默认 true ）
 * @property {String}			icon		内置图标，或绝对路径的图片
 * @event {Function(index)} click 点击标签时触发 index: 传递的index参数值
 * @event {Function(index)} close closable为true时，点击标签关闭按钮触发 index: 传递的index参数值
 * @example <su-tag text="标签" type="error" plain plainFill></su-tag>
 */

defineOptions({
  name: 'su-tag',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps({
  ...tagProps
})

const emit = defineEmits(['click', 'close'])

const style = computed(() => {
  const style: CSSProperties = {}
  if (props.bgColor) style.backgroundColor = props.bgColor
  if (props.color) style.color = props.color
  if (props.borderColor) style.borderColor = props.borderColor
  return style
})

/** nvue下，文本颜色无法继承父元素 */
const textColor = computed(() => {
  const style: CSSProperties = {}
  if (props.color) style.color = props.color
  return style
})

/** 图片样式 */
const imgStyle = computed(() => {
  const width = props.size === 'large' ? '17px' : props.size === 'medium' ? '15px' : '13px'
  return {
    width,
    height: width
  }
})

/** 取消图标的样式 */
const closeSize = computed(() => {
  const size = props.size === 'large' ? 15 : props.size === 'medium' ? 13 : 12
  return size
})

/** 图标大小 */
const iconSize = computed(() => {
  const size = props.size === 'large' ? 21 : props.size === 'medium' ? 19 : 16
  return size
})

/** 图标颜色 */
const elIconColor = computed(() => {
  return props.iconColor ? props.iconColor : props.plain ? props.type : '#ffffff'
})

const testImage = test.image

/** 点击关闭按钮 */
function closeHandler() {
  emit('close', props.name)
}

/** 点击标签 */
function clickHandler() {
  emit('click', props.name)
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';

.su-tag-wrapper {
  position: relative;
}

.su-tag {
  @include flex;
  align-items: center;
  border-style: solid;

  &--circle {
    border-radius: 100px;
  }

  &--square {
    border-radius: 3px;
  }

  &__icon {
    margin-right: 4px;
  }

  &__text {
    &--mini {
      font-size: 12px;
      line-height: 12px;
    }

    &--medium {
      font-size: 13px;
      line-height: 13px;
    }

    &--large {
      font-size: 15px;
      line-height: 15px;
    }
  }

  &--mini {
    height: 22px;
    line-height: 22px;
    padding: 0 5px;
  }

  &--medium {
    height: 26px;
    line-height: 22px;
    padding: 0 10px;
  }

  &--large {
    height: 32px;
    line-height: 32px;
    padding: 0 15px;
  }

  &--primary {
    background-color: $su-primary;
    border-width: 1px;
    border-color: $su-primary;
  }

  &--primary--plain {
    border-width: 1px;
    border-color: $su-primary;
  }

  &--primary--plain--fill {
    background-color: #ecf5ff;
  }

  &__text--primary {
    color: #ffffff;
  }

  &__text--primary--plain {
    color: $su-primary;
  }

  &--error {
    background-color: $su-error;
    border-width: 1px;
    border-color: $su-error;
  }

  &--error--plain {
    border-width: 1px;
    border-color: $su-error;
  }

  &--error--plain--fill {
    background-color: #fef0f0;
  }

  &__text--error {
    color: #ffffff;
  }

  &__text--error--plain {
    color: $su-error;
  }

  &--warning {
    background-color: $su-warning;
    border-width: 1px;
    border-color: $su-warning;
  }

  &--warning--plain {
    border-width: 1px;
    border-color: $su-warning;
  }

  &--warning--plain--fill {
    background-color: #fdf6ec;
  }

  &__text--warning {
    color: #ffffff;
  }

  &__text--warning--plain {
    color: $su-warning;
  }

  &--success {
    background-color: $su-success;
    border-width: 1px;
    border-color: $su-success;
  }

  &--success--plain {
    border-width: 1px;
    border-color: $su-success;
  }

  &--success--plain--fill {
    background-color: #f5fff0;
  }

  &__text--success {
    color: #ffffff;
  }

  &__text--success--plain {
    color: $su-success;
  }

  &--info {
    background-color: $su-info;
    border-width: 1px;
    border-color: $su-info;
  }

  &--info--plain {
    border-width: 1px;
    border-color: $su-info;
  }

  &--info--plain--fill {
    background-color: #f4f4f5;
  }

  &__text--info {
    color: #ffffff;
  }

  &__text--info--plain {
    color: $su-info;
  }

  &__close {
    position: absolute;
    z-index: 999;
    top: 10px;
    right: 10px;
    border-radius: 100px;
    background-color: #c6c7cb;
    @include flex(row);
    align-items: center;
    justify-content: center;
    /* #ifndef APP-NVUE */
    transform: scale(0.6) translate(80%, -80%);
    /* #endif */
    /* #ifdef APP-NVUE */
    transform: scale(0.6) translate(50%, -50%);
    /* #endif */

    &--mini {
      width: 18px;
      height: 18px;
    }

    &--medium {
      width: 22px;
      height: 22px;
    }

    &--large {
      width: 25px;
      height: 25px;
    }
  }
}
</style>
