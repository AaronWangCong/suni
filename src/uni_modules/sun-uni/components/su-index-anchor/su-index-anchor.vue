<template>
  <!-- #ifdef APP-NVUE -->
  <header>
    <!-- #endif -->
    <view
      class="su-index-anchor su-border-bottom"
      :ref="`su-index-anchor-${text}`"
      :style="{
        height: addUnit(height),
        backgroundColor: bgColor
      }"
    >
      <text
        class="su-index-anchor__text"
        :style="{
          fontSize: addUnit(size),
          color: color
        }"
      >
        {{ text }}
      </text>
    </view>
    <!-- #ifdef APP-NVUE -->
  </header>
  <!-- #endif -->
</template>

<script lang="ts" setup>
import { indexAnchorProps } from './props'
import { addUnit, $parent, error } from '../../libs/function/index'
import { getCurrentInstance, onMounted } from 'vue'

/**
 * IndexAnchor 列表锚点
 * @description
 * @tutorial https://suni.pages.dev/component/indexList.html
 * @property {String | Number}	text	列表锚点文本内容
 * @property {String}			color	列表锚点文字颜色 ( 默认 '#606266' )
 * @property {String | Number}	size	列表锚点文字大小，单位默认px ( 默认 14 )
 * @property {String}			bgColor	列表锚点背景颜色 ( 默认 '#dedede' )
 * @property {String | Number}	height	列表锚点高度，单位默认px ( 默认 32 )
 * @example <su-index-anchor :text="indexList[index]"></su-index-anchor>
 */

defineOptions({
  name: 'su-index-anchor',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps(indexAnchorProps)
const instance = getCurrentInstance()

function init() {
  const indexListInstance = $parent.call(instance, 'su-index-list')
  if (!indexListInstance) {
    return error('u-index-anchor必须要搭配su-index-list组件使用')
  }
  // 将当前实例放入到u-index-list中
  indexListInstance.exposed.setAnchorsInstance(instance)
  const indexListItemInstance = $parent.call(instance, 'su-index-item')
  // #ifndef APP-NVUE
  // 只有在非nvue下，u-index-anchor才是嵌套在u-index-item中的
  if (!indexListItemInstance) {
    return error('su-index-anchor必须要搭配su-index-item组件使用')
  }
  // 设置u-index-item的id为anchor的text标识符，因为非nvue下滚动列表需要依赖scroll-view滚动到元素的特性
  indexListItemInstance.exposed.setId(props.text ? props.text.toString().charCodeAt(0) : '')
  // #endif
}

onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';

.su-index-anchor {
  position: sticky;
  top: -1px;
  @include flex;
  align-items: center;
  padding-left: 15px;
  z-index: 1;

  &__text {
    @include flex;
    align-items: center;
  }
}
</style>
