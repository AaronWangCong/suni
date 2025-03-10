<template>
  <view class="su-toolbar" @touchmove.stop.prevent="noop" v-if="show">
    <view class="su-toolbar__left">
      <view class="su-toolbar__cancel__wrapper" hover-class="su-hover-class">
        <text
          class="su-toolbar__wrapper__cancel"
          @tap="cancel"
          :style="{
            color: cancelColor
          }"
        >
          {{ cancelText }}
        </text>
      </view>
    </view>
    <text class="su-toolbar__title su-line-1" v-if="title">{{ title }}</text>
    <view class="su-toolbar__right">
      <view v-if="!rightSlot" class="su-toolbar__confirm__wrapper" hover-class="su-hover-class">
        <text
          class="su-toolbar__wrapper__confirm"
          @tap="confirm"
          :style="{
            color: confirmColor
          }"
        >
          {{ confirmText }}
        </text>
      </view>
      <template v-else>
        <slot name="right"></slot>
      </template>
    </view>
  </view>
</template>

<script>
import { props } from './props'
import { mpMixin } from '../../libs/mixin/mpMixin'
import { mixin } from '../../libs/mixin/mixin'
/**
 * Toolbar 工具条
 * @description
 * @tutorial https://suni.pages.dev/sun-uni/component/toolbar.html
 * @property {Boolean}	show			是否展示工具条（默认 true ）
 * @property {String}	cancelText		取消按钮的文字（默认 '取消' ）
 * @property {String}	confirmText		确认按钮的文字（默认 '确认' ）
 * @property {String}	cancelColor		取消按钮的颜色（默认 '#909193' ）
 * @property {String}	confirmColor	确认按钮的颜色（默认 '#3c9cff' ）
 * @property {String}	title			标题文字
 * @event {Function}
 * @example
 */
export default {
  name: 'su-toolbar',
  mixins: [mpMixin, mixin, props],
  emits: ['confirm', 'cancel'],
  created() {
    // console.log(this.$slots)
  },
  methods: {
    // 点击取消按钮
    cancel() {
      this.$emit('cancel')
    },
    // 点击确定按钮
    confirm() {
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';

.su-toolbar {
  height: 42px;
  @include flex;
  justify-content: space-between;
  align-items: center;

  &__wrapper {
    &__cancel {
      color: $su-tips-color;
      font-size: 15px;
      padding: 0 15px;
    }
  }

  &__title {
    color: $su-main-color;
    padding: 0 60rpx;
    font-size: 16px;
    flex: 1;
    text-align: center;
  }

  &__wrapper {
    &__left,
    &__right {
      @include flex;
    }
    &__confirm {
      color: $su-primary;
      font-size: 15px;
      padding: 0 15px;
    }
  }
}
</style>
