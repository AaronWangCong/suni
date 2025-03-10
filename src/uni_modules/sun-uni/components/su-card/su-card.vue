<template>
  <view
    class="su-card"
    @tap.stop="click"
    :class="getClass"
    :style="{
      borderRadius: addUnit(borderRadius),
      margin: margin,
      boxShadow: boxShadow
    }"
  >
    <view
      v-if="showHead"
      class="su-card__head"
      :style="[{ padding: addUnit(paddingHead || padding) }, headStyle]"
      :class="{
        'su-border-bottom': headBorderBottom
      }"
      @tap="headClick"
    >
      <view v-if="!$slots.head" class="su-flex su-row-between">
        <view class="su-card__head--left su-flex su-line-1" v-if="title">
          <image
            :src="thumb"
            class="su-card__head--left__thumb"
            mode="aspectFill"
            v-if="thumb"
            :style="{
              height: addUnit(thumbWidth),
              width: addUnit(thumbWidth),
              borderRadius: thumbCircle ? '50px' : '4px'
            }"
          ></image>
          <text
            class="su-card__head--left__title su-line-1"
            :style="{
              fontSize: addUnit(titleSize),
              color: titleColor
            }"
          >
            {{ title }}
          </text>
        </view>
        <view class="su-card__head--right su-line-1" v-if="subTitle">
          <text
            class="su-card__head__title__text"
            :style="{
              fontSize: addUnit(subTitleSize),
              color: subTitleColor
            }"
          >
            {{ subTitle }}
          </text>
        </view>
      </view>
      <slot name="head" v-else />
    </view>
    <view @tap="bodyClick" class="su-card__body" :style="[{ padding: addUnit(paddingBody || padding) }, bodyStyle]"><slot name="body" /></view>
    <view
      v-if="showFoot"
      class="su-card__foot"
      @tap="footClick"
      :style="[{ padding: $slots.foot ? addUnit(paddingFoot || padding) : 0 }, footStyle]"
      :class="{
        'su-border-top': footBorderTop
      }"
    >
      <slot name="foot" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { propsCard } from './props'
import { addUnit, getPx } from '../../libs/function/index'
import { computed } from 'vue'

/**
 * card 卡片
 * @description 卡片组件一般用于多个列表条目，且风格统一的场景
 * @tutorial https://suni.pages.dev/component/card.html
 * @property {Boolean} full 卡片与屏幕两侧是否留空隙（默认false）
 * @property {String} title 头部左边的标题
 * @property {String} title-color 标题颜色（默认#303133）
 * @property {String | Number} title-size 标题字体大小，单位rpx（默认15px）
 * @property {String} sub-title 头部右边的副标题
 * @property {String} sub-title-color 副标题颜色（默认#909399）
 * @property {String | Number} sub-title-size 副标题字体大小（默认13px
 * @property {Boolean} border 是否显示边框（默认true）
 * @property {String | Number} index 用于标识点击了第几个卡片
 * @property {String} box-shadow 卡片外围阴影，字符串形式（默认none）
 * @property {String} margin 卡片与屏幕两边和上下元素的间距，需带单位，如"30px 20px"（默认15px）
 * @property {String | Number} border-radius 卡片整体的圆角值，单位rpx（默认8px）
 * @property {Object} head-style 头部自定义样式，对象形式
 * @property {Object} body-style 中部自定义样式，对象形式
 * @property {Object} foot-style 底部自定义样式，对象形式
 * @property {Boolean} head-border-bottom 是否显示头部的下边框（默认true）
 * @property {Boolean} foot-border-top 是否显示底部的上边框（默认true）
 * @property {Boolean} show-head 是否显示头部（默认true）
 * @property {Boolean} show-foot 是否显示尾部（默认true）
 * @property {String} thumb 缩略图路径，如设置将显示在标题的左边，不建议使用相对路径
 * @property {String | Number} thumb-width 缩略图的宽度，高等于宽，单位px（默认30px）
 * @property {Boolean} thumb-circle 缩略图是否为圆形（默认false）
 * @event {Function} click 整个卡片任意位置被点击时触发
 * @event {Function} head-click 卡片头部被点击时触发
 * @event {Function} body-click 卡片主体部分被点击时触发
 * @event {Function} foot-click 卡片底部部分被点击时触发
 * @example <su-card paddingFoot="2px 15px" title="card"></su-card>
 */

defineOptions({
  name: 'su-card',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps({
  ...propsCard
})

const emit = defineEmits(['click', 'head-click', 'body-click', 'foot-click'])

/**
 * 计算需要添加到卡片上的类名
 * @returns {Object} 包含类名和对应布尔值的对象
 */
const getClass = computed(() => {
  // 如果 props.border 为 true，则添加 'su-border' 类
  // 如果 props.full 为 true，则添加 'su-card-full' 类
  // 如果 props.borderRadius 转换为像素值大于 0，则添加 'su-card--border' 类
  return { 'su-border': props.border, 'su-card-full': props.full, 'su-card--border': Number(getPx(`${props.borderRadius}`)) > 0 }
})

/**
 * 处理整个卡片的点击事件
 * @description 当整个卡片被点击时，触发 'click' 事件并传递卡片索引
 */
function click() {
  // 触发 'click' 事件并传递 props.index
  emit('click', props.index)
}

/**
 * 处理卡片头部的点击事件
 * @description 当卡片头部被点击时，触发 'head-click' 事件并传递卡片索引
 */
function headClick() {
  // 触发 'head-click' 事件并传递 props.index
  emit('head-click', props.index)
}

/**
 * 处理卡片主体部分的点击事件
 * @description 当卡片主体部分被点击时，触发 'body-click' 事件并传递卡片索引
 */
function bodyClick() {
  // 触发 'body-click' 事件并传递 props.index
  emit('body-click', props.index)
}

/**
 * 处理卡片底部的点击事件
 * @description 当卡片底部被点击时，触发 'foot-click' 事件并传递卡片索引
 */
function footClick() {
  // 触发 'foot-click' 事件并传递 props.index
  emit('foot-click', props.index)
}

</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';

.su-card {
  position: relative;
  overflow: hidden;
  font-size: 28rpx;
  background-color: #ffffff;
  box-sizing: border-box;

  &-full {
    // 如果是与屏幕之间不留空隙，应该设置左右边距为0
    margin-left: 0 !important;
    margin-right: 0 !important;
    width: 100%;
  }

  &--border:after {
    border-radius: 16rpx;
  }

  &__head {
    &--left {
      color: $su-main-color;

      &__thumb {
        margin-right: 16rpx;
      }

      &__title {
        max-width: 400rpx;
      }
    }

    &--right {
      color: $su-tips-color;
      margin-left: 6rpx;
    }
  }

  &__body {
    color: $su-content-color;
  }

  &__foot {
    color: $su-tips-color;
  }
}
</style>
