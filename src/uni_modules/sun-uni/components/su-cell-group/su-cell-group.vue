<template>
  <view :style="[addStyle(customStyle)]" :class="[customClass]" class="su-cell-group">
    <view v-if="title" class="su-cell-group__title">
      <slot name="title">
        <text class="su-cell-group__title__text">{{ title }}</text>
      </slot>
    </view>
    <view class="su-cell-group__wrapper">
      <su-line v-if="border"></su-line>
      <slot />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { cellGroupProps } from './props'
import { addStyle } from '../../libs/function/index'
import { baseProps } from '../../libs/vue'
/**
 * cellGroup  单元格
 * @description cell单元格一般用于一组列表的情况，比如个人中心页，设置页等。
 * @tutorial https://suni.pages.dev/component/cell.html
 *
 * @property {String}	title		分组标题
 * @property {Boolean}	border		是否显示外边框 (默认 true )
 * @property {Object}	customStyle	定义需要用到的外部样式
 *
 * @event {Function} click 	点击cell列表时触发
 * @example <su-cell-group title="设置喜好">
 */

defineOptions({
  name: 'su-cell-group',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
})

defineProps({
  ...cellGroupProps,
  ...baseProps
})
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';

$su-cell-group-title-padding: 16px 16px 8px !default;
$su-cell-group-title-font-size: 15px !default;
$su-cell-group-title-line-height: 16px !default;
$su-cell-group-title-color: $su-main-color !default;

.su-cell-group {
  flex: 1;

  &__title {
    padding: $su-cell-group-title-padding;

    &__text {
      font-size: $su-cell-group-title-font-size;
      line-height: $su-cell-group-title-line-height;
      color: $su-cell-group-title-color;
    }
  }

  &__wrapper {
    position: relative;
  }
}
</style>
