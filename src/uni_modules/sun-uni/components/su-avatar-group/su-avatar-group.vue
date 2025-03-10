<template>
  <view class="su-avatar-group">
    <view
      class="su-avatar-group__item"
      v-for="(item, index) in showUrl"
      :key="index"
      :style="{
        marginLeft: index === 0 ? 0 : addUnit(-Number(size) * Number(gap))
      }"
    >
      <su-avatar :size="size" :shape="shape" :mode="mode" :src="getSrc(item)"></su-avatar>
      <view class="su-avatar-group__item__show-more" v-if="isShowMore(index)" @tap="clickHandler">
        <su-text
          color="#ffffff"
          :size="Number(size) * 0.4"
          :text="`+${extraValue || urls!.length - showUrl.length}`"
          align="center"
          customStyle="justify-content: center"
        ></su-text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { avatarGroupProps } from './props'
import { addUnit } from '../../libs/function/index'
import test from '../../libs/function/test'
import { computed } from 'vue'
import type { SuUni } from '../../types/uni'
/**
 * AvatarGroup  头像组
 * @description 本组件一般用于展示头像的地方，如个人中心，或者评论列表页的用户头像展示等场所。
 * @tutorial https://suni.pages.dev/component/avatar.html
 *
 * @property {Array}           urls     头像图片组 （默认 [] ）
 * @property {String | Number} maxCount 最多展示的头像数量 （ 默认 5 ）
 * @property {String}          shape    头像形状（ 'circle' (默认) | 'square' ）
 * @property {String}          mode     图片裁剪模式（默认 'scaleToFill' ）
 * @property {Boolean}         showMore 超出maxCount时是否显示查看更多的提示 （默认 true ）
 * @property {String | Number} size      头像大小 （默认 40 ）
 * @property {String}          keyName  指定从数组的对象元素中读取哪个属性作为图片地址
 * @property {String | Number} gap      头像之间的遮挡比例（0.4代表遮挡40%）  （默认 0.5 ）
 * @property {String | Number} extraValue  需额外显示的值
 * @event    {Function}        showMore 头像组更多点击
 * @example  <su-avatar-group:urls="urls" size="35" gap="0.4" ></su-avatar-group:urls=>
 */

defineOptions({
  name: 'su-avatar-group',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps(avatarGroupProps)
const emit = defineEmits(['showMore'])

/** 显示的图片Url */
const showUrl = computed((): SuUni.Recordable[] => {
  if (!props.urls) return []
  return props.urls.slice(0, Number(props.maxCount))
})

/** 获取图片路径 */
const getSrc = computed(() => (item: SuUni.Recordable) => (testObject(item) ? (props.keyName && item[props.keyName]) || item.url : item))

/**
 * 判断是否显示“查看更多”按钮
 * @param index - 当前头像的索引
 * @returns 是否显示“查看更多”按钮
 */
const isShowMore = (index: number) => {
  const bool = props.urls!.length > Number(props.maxCount) || Number(props.extraValue) > 0
  return props.showMore && index === showUrl.value.length - 1 && bool
}

/**
 * 判断是否为对象
 */
const testObject = test.object

/**
 * 处理“查看更多”按钮的点击事件
 * 当用户点击“查看更多”按钮时，触发 showMore 事件
 */
function clickHandler() {
  emit('showMore')
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';

.su-avatar-group {
  @include flex;

  &__item {
    margin-left: -10px;
    position: relative;

    &--no-indent {
      // 如果你想质疑作者不会使用:first-child，说明你太年轻，因为nvue不支持
      margin-left: 0;
    }

    &__show-more {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.3);
      @include flex;
      align-items: center;
      justify-content: center;
      border-radius: 100px;
    }
  }
}
</style>
