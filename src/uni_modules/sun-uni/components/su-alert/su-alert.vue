<template>
  <su-transition mode="fade" :show="show">
    <view class="su-alert" :class="[`su-alert--${type}--${effect}`]" @tap.stop="clickHandler" :style="[addStyle(customStyle)]">
      <view class="su-alert__icon" v-if="showIcon">
        <su-icon :name="iconName" size="18" :color="iconColor"></su-icon>
      </view>
      <view
        class="su-alert__content"
        :style="[
          {
            paddingRight: closable ? '20px' : 0
          }
        ]"
      >
        <text
          class="su-alert__content__title"
          v-if="title"
          :style="[
            {
              fontSize: addUnit(fontSize),
              textAlign: center ? 'center' : 'left'
            }
          ]"
          :class="[effect === 'dark' ? 'su-alert__text--dark' : `su-alert__text--${type}--light`]"
        >
          {{ title }}
        </text>
        <text
          class="su-alert__content__desc"
          v-if="description"
          :style="[
            {
              fontSize: addUnit(fontSize),
              textAlign: center ? 'center' : 'left'
            }
          ]"
          :class="[effect === 'dark' ? 'su-alert__text--dark' : `su-alert__text--${type}--light`]"
        >
          {{ description }}
        </text>
      </view>
      <view class="su-alert__close" v-if="closable" @tap.stop="closeHandler">
        <su-icon name="close" :color="iconColor" size="15"></su-icon>
      </view>
    </view>
  </su-transition>
</template>

<script lang="ts" setup>
import { alertProps } from './props'
import { addUnit, addStyle } from '../../libs/function/index'
import { computed, ref } from 'vue'
import { baseProps } from '../../libs/vue'
/**
 * Alert  警告提示
 * @description 警告提示，展现需要关注的信息。
 * @tutorial https://suni.pages.dev/sun-uni/component/alertTips.html
 *
 * @property {String}			title       显示的文字
 * @property {String}			type        使用预设的颜色  （默认 'warning' ）
 * @property {String}			description 辅助性文字，颜色比title浅一点，字号也小一点，可选
 * @property {Boolean}			closable    关闭按钮(默认为叉号icon图标)  （默认 false ）
 * @property {Boolean}			showIcon    是否显示左边的辅助图标   （ 默认 false ）
 * @property {String}			effect      多图时，图片缩放裁剪的模式  （默认 'light' ）
 * @property {Boolean}			center		文字是否居中  （默认 false ）
 * @property {String | Number}	fontSize    字体大小  （默认 14 ）
 * @property {Object}			customStyle	定义需要用到的外部样式
 * @event    {Function}        click       点击组件时触发
 * @example  <su-alert :title="title"  type = "warning" :closable="closable" :description = "description"></su-alert>
 */

defineOptions({
  name: 'su-alert',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps({
  ...alertProps,
  ...baseProps
})

const emit = defineEmits(['click'])
const show = ref(true)

const iconColor = computed(() => {
  return props.effect === 'light' ? props.type : '#fff'
})

const iconName = computed(() => {
  switch (props.type) {
    case 'success':
      return 'checkmark-circle-fill'
    case 'error':
      return 'close-circle-fill'
    case 'warning':
      return 'error-circle-fill'
    case 'info':
      return 'info-circle-fill'
    case 'primary':
      return 'more-circle-fill'
    default:
      return 'error-circle-fill'
  }
})

function clickHandler() {
  emit('click')
}

function closeHandler() {
  show.value = false
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';

.su-alert {
  position: relative;
  background-color: $su-primary;
  padding: 8px 10px;
  @include flex(row);
  align-items: center;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;

  &--primary--dark {
    background-color: $su-primary;
  }

  &--primary--light {
    background-color: #ecf5ff;
  }

  &--error--dark {
    background-color: $su-error;
  }

  &--error--light {
    background-color: #fef0f0;
  }

  &--success--dark {
    background-color: $su-success;
  }

  &--success--light {
    background-color: #f5fff0;
  }

  &--warning--dark {
    background-color: $su-warning;
  }

  &--warning--light {
    background-color: #fdf6ec;
  }

  &--info--dark {
    background-color: $su-info;
  }

  &--info--light {
    background-color: #f4f4f5;
  }

  &__icon {
    margin-right: 5px;
  }

  &__content {
    @include flex(column);
    flex: 1;

    &__title {
      color: $su-main-color;
      font-size: 14px;
      font-weight: bold;
      color: #fff;
      margin-bottom: 2px;
    }

    &__desc {
      color: $su-main-color;
      font-size: 14px;
      flex-wrap: wrap;
      color: #fff;
    }
  }

  &__title--dark,
  &__desc--dark {
    color: #ffffff;
  }

  &__text--primary--light,
  &__text--primary--light {
    color: $su-primary;
  }

  &__text--success--light,
  &__text--success--light {
    color: $su-success;
  }

  &__text--warning--light,
  &__text--warning--light {
    color: $su-warning;
  }

  &__text--error--light,
  &__text--error--light {
    color: $su-error;
  }

  &__text--info--light,
  &__text--info--light {
    color: $su-info;
  }

  &__close {
    position: absolute;
    top: 11px;
    right: 10px;
  }
}
</style>
