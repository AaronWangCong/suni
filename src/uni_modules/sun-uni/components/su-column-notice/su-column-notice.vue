<template>
  <view class="su-notice" @tap="clickHandler">
    <slot name="icon">
      <view class="su-notice__left-icon" v-if="icon">
        <su-icon :name="icon" :color="color" size="19"></su-icon>
      </view>
    </slot>
    <swiper
      :disable-touch="disableTouch"
      :vertical="step ? false : true"
      circular
      :interval="Number(duration)"
      :autoplay="true"
      class="su-notice__swiper"
      @change="noticeChange"
    >
      <swiper-item v-for="(item, index) in text" :key="index" class="su-notice__swiper__item" :style="{ justifyContent: justifyContent }">
        <text class="su-notice__swiper__item__text su-line-1" :style="[textStyle]">{{ item }}</text>
      </swiper-item>
    </swiper>
    <view class="su-notice__right-icon" v-if="['link', 'closable'].includes(mode)">
      <su-icon v-if="mode === 'link'" name="arrow-right" :size="17" :color="color"></su-icon>
      <su-icon v-if="mode === 'closable'" name="close" :size="16" :color="color" @click="close"></su-icon>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { columnNoticeProps } from './props'
import { mpMixin } from '../../libs/mixin/mpMixin'
import { mixin } from '../../libs/mixin/mixin'
import { addUnit, error } from '../../libs/function/index'
import test from '../../libs/function/test'
import { computed, ref, watch } from 'vue'
/**
 * ColumnNotice 滚动通知中的垂直滚动 内部组件
 * @description 该组件用于滚动通告场景，是其中的垂直滚动方式
 * @tutorial https://suni.pages.dev/sun-uni/component/noticeBar.html
 * @property {Array}			text 			显示的内容，字符串
 * @property {String}			icon 			是否显示左侧的音量图标 （ 默认 'volume' ）
 * @property {String}			mode 			通告模式，link-显示右箭头，closable-显示右侧关闭图标
 * @property {String}			color 			文字颜色，各图标也会使用文字颜色 （ 默认 '#f9ae3d' ）
 * @property {String}			bgColor 		背景颜色 （ 默认 '#fdf6ec' ）
 * @property {String | Number}	fontSize		字体大小，单位px  （ 默认 14 ）
 * @property {String | Number}	speed			水平滚动时的滚动速度，即每秒滚动多少px(rpx)，这有利于控制文字无论多少时，都能有一个恒定的速度 （ 默认 80 ）
 * @property {Boolean}			step			direction = row时，是否使用步进形式滚动 （ 默认 false ）
 * @property {String | Number}	duration		滚动一个周期的时间长，单位ms （ 默认 1500 ）
 * @property {Boolean}			disableTouch	是否禁止用手滑动切换   目前HX2.6.11，只支持App 2.5.5+、H5 2.5.5+、支付宝小程序、字节跳动小程序 （ 默认 true ）
 * @example
 */
defineOptions({
  name: 'su-column-notice',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps(columnNoticeProps)
const emit = defineEmits(['click', 'close'])

const index = ref(0)

const textStyle = computed(() => {
  return {
    color: props.color,
    fontSize: addUnit(props.fontSize)
  }
})

function noticeChange(e: UniHelper.SwiperOnChangeEvent) {
  index.value = e.detail.current
}

// 点击通告栏
function clickHandler() {
  emit('click', index.value)
}
// 点击关闭按钮
function close() {
  emit('close')
}

watch(
  () => props.text,
  (val) => {
    if (!test.array(val)) {
      error('noticebar组件direction为column时，要求text参数为数组形式')
    }
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';

.su-notice {
  @include flex;
  align-items: center;
  justify-content: space-between;

  &__left-icon {
    align-items: center;
    margin-right: 5px;
  }

  &__right-icon {
    margin-left: 5px;
    align-items: center;
  }

  &__swiper {
    height: 16px;
    @include flex;
    align-items: center;
    flex: 1;

    &__item {
      @include flex;
      align-items: center;
      overflow: hidden;

      &__text {
        font-size: 14px;
        color: $su-warning;
      }
    }
  }
}
</style>
