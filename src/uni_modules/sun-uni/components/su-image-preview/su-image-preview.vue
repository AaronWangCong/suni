<template>
  <view :class="prefixCls">
    <!-- 头部 -->
    <view :class="`${prefixCls}-header`">
      <view :class="`${prefixCls}-header-back-warp`" @click="handleBackClick">
        <su-icon name="arrow-left" color="#fff" :size="16"></su-icon>
      </view>
      <view :class="`${prefixCls}-header-right`">
        <text>{{ scrollCurrent + 1 }}</text>
        <text style="margin: 0 8rpx">/</text>
        <text>{{ imageList.length }}</text>
      </view>
    </view>
    <!-- 内容区域 -->
    <swiper :class="`${prefixCls}-swiper`" :style="swiperStyle" :current="scrollCurrent" :duration="300" @change="handleChangeSwiper">
      <swiper-item :class="`${prefixCls}-swiper-item`" v-for="(item, index) in getImageList" :key="index">
        <view :class="`${prefixCls}-movable-area-wrap`" :style="swiperStyle">
          <movable-area scale-area>
            <movable-view direction="all" scale :scale-min="1" :scale-max="4">
              <image :class="`${prefixCls}-swiper-item-image`" :style="imageStyle" :src="item.url" :lazy-load="true" :mode="imageMode" />
            </movable-view>
          </movable-area>
        </view>
      </swiper-item>
    </swiper>
    <!-- 底部 -->
    <view :class="`${prefixCls}-footer`">
      <scroll-view
        :class="`${prefixCls}-scroll-view`"
        :scroll-x="true"
        :scroll-into-view="scrollIndex"
        :scroll-with-animation="true"
        scroll-left="20"
      >
        <view
          v-for="(item, index) in getImageList"
          :key="index"
          :class="{
            [`${prefixCls}-scroll-view-item`]: true,
            [`${prefixCls}-scroll-view-item-checked`]: scrollCurrent === index
          }"
          :id="`scrollToIndex${index}`"
          @click.stop="handleToImage(index)"
        >
          <image :class="`${prefixCls}-scroll-view-image`" :src="item.url" :mode="imageMode" />
        </view>
      </scroll-view>
      <view :class="`${prefixCls}-footer-action`">
        <slot name="action">
          <view :class="`${prefixCls}-footer-action-delete`" @click.top="handleDelete">
            <su-icon name="trash" size="36"></su-icon>
          </view>
        </slot>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue'
import { useDesign } from '../../hooks'
import { imagePreviewProps } from './props'
import { isString } from 'lodash-es'

defineOptions({
  name: 'su-image-preview',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps(imagePreviewProps)
const emit = defineEmits(['change', 'update:current', 'delete'])

const scrollIndex = ref('')
const scrollCurrent = ref(0)

const { prefixCls } = useDesign('image-preview')

/** image 图片列表 */
const getImageList = computed(() => {
  return props.imageList.map((item) => {
    // 如果是字符串则添加一个url的属性
    if (isString(item)) {
      return {
        url: item
      }
    }
    return item
  })
})

/** 返回事件 */
function handleBackClick() {
  uni.navigateBack()
}

/** swiper事件 */
function handleChangeSwiper(e: UniHelper.SwiperOnChangeEvent) {
  scrollCurrent.value = e.detail.current
  scrollIndex.value = `scrollToIndex${e.detail.current}`
  emit('change', scrollCurrent.value)
  emit('update:current', scrollCurrent.value)
}

/** 小图片点击事件 */
function handleToImage(index: number) {
  scrollCurrent.value = index
  emit('change', scrollCurrent.value)
  emit('update:current', scrollCurrent.value)
}

function handleDelete() {
  emit('delete', scrollCurrent.value)
}

watch(
  () => props.current,
  (val, oVal) => {
    if (val !== oVal) {
      scrollCurrent.value = props.current
      scrollIndex.value = `scrollToIndex${scrollCurrent.value}`
    }
  },
  { immediate: true }
)

watchEffect(() => {
  // scrollCurrent.value = props.current
  // scrollIndex.value = `scrollToIndex${scrollCurrent.value}`
})
</script>

<style lang="scss">
$prefix-cls: 'su-image-preview';

.#{$prefix-cls} {
  width: 100%;
  height: 100vh;
  position: relative;

  movable-view {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;
  }

  movable-area {
    position: fixed;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  movable-view image {
    width: 100%;
  }

  &-header {
    position: absolute;
    z-index: 1000;
    top: 48rpx;
    left: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 32rpx;
    box-sizing: border-box;

    &-back-warp {
      width: 64rpx;
      height: 64rpx;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.4);
      display: flex;
      justify-content: center;
      align-content: center;
    }

    &-right {
      padding: 0 24rpx;
      height: 64rpx;
      border-radius: 64rpx;
      background: rgba(0, 0, 0, 0.4);
      color: #fff;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-content: center;
    }
  }

  &-swiper {
    background-color: rgba(0, 0, 0, 0.7);

    &-item {
      width: 100vw;
      height: 100%;
    }
  }

  &-movable-area-wrap {
    display: flex;
    width: 100vw;
  }

  &-footer {
    position: fixed;
    z-index: 9999;
    bottom: 50rpx;
    left: 0;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 100vw;

    //  height: 200rpx;
    padding: 30rpx;

    transition: ease-in-out 0.3s;

    &-action {
      width: 100%;
      margin-top: 16rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &-scroll-view {
    width: 100%;
    box-sizing: border-box;
    padding-right: 32rpx;
    white-space: nowrap;

    &-item {
      display: inline-block;

      margin-right: 10rpx;

      transition: ease-in 0.1s;
      transform: scale(0.8);

      border-radius: 12rpx;
      background: #c2c2c2;

      &:last-child {
        margin-right: 0;
      }

      &-checked {
        transform: scale(1);
      }
    }

    &-image {
      display: block;
      width: 160rpx;
      height: 200rpx;
    }
  }
}
</style>
