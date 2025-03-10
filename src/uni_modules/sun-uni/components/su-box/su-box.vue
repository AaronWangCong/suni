<template>
  <view class="su-box" :style="[{ height: height }, addStyle(customStyle)]">
    <view class="su-box__left" :style="{ borderRadius: borderRadius, backgroundColor: bgColors[0] }">
      <slot name="left">左</slot>
    </view>
    <view class="su-box__gap" :style="{ width: gap, height: height }"></view>
    <view class="su-box__right">
      <view class="su-box__right-top" :style="{ borderRadius: borderRadius, backgroundColor: bgColors[1] }">
        <slot name="rightTop">右上</slot>
      </view>
      <view class="su-box__right-gap" :style="{ height: gap }"></view>
      <view class="su-box__right-bottom" :style="{ borderRadius: borderRadius, backgroundColor: bgColors[2] }">
        <slot name="rightBottom">右下</slot>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { boxProps } from './props'
import { mpMixin } from '../../libs/mixin/mpMixin'
import { addStyle } from '../../libs/function/index'
import { baseProps } from '../../libs/vue'
/**
 * box 盒子
 * @description box盒子一般为左边一个盒子，右侧两个等高的半盒组成，常用于App首页座位重点突出。
 * @tutorial https://suni.pages.dev/component/box.html
 * @property {Array}	bgColors			背景色
 * @property {String}	height			    高度
 * @property {String}	borderRadius		圆角
 * @property {Object}   customStyle		    定义需要用到的外部样式
 *
 * @event {Function}			click			点击cell列表时触发
 * @example <su-box colors=['blue', 'red', 'yellow'] height="200px"></su-box>
 */

defineOptions({
  name: 'su-box',
  mixins: [mpMixin]
})

defineProps({
  ...boxProps,
  ...baseProps
})
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';

.su-box {
  /* #ifndef APP-NVUE */
  /* #endif */
  @include flex();
  flex: 1;

  &__left {
    @include flex();
    justify-content: center;
    align-items: center;
    flex: 1;
  }
  &__gap {
    @include flex();
    flex-direction: column;
  }
  &__right {
    @include flex();
    flex-direction: column;
    flex: 1;
  }

  &__right-top {
    @include flex();
    flex: 1;
    justify-content: center;
    align-items: center;
  }

  &__right-bottom {
    @include flex();
    flex: 1;
    justify-content: center;
    align-items: center;
  }
}
</style>
