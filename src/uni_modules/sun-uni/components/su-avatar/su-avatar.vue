<template>
  <view class="su-avatar" :class="[`su-avatar--${shape}`]" :style="[getStyle, addStyle(customStyle)]" @tap="clickHandler">
    <slot>
      <!-- #ifdef MP-WEIXIN || MP-QQ || MP-BAIDU  -->
      <open-data
        v-if="mpAvatar && allowMp"
        type="userAvatarUrl"
        :style="[
          {
            width: addUnit(size),
            height: addUnit(size)
          }
        ]"
      />
      <!-- #endif -->
      <!-- #ifndef MP-WEIXIN && MP-QQ && MP-BAIDU  -->
      <template v-if="mpAvatar && allowMp"></template>
      <!-- #endif -->
      <su-icon v-else-if="icon" :name="icon" :size="fontSize" :color="color"></su-icon>
      <su-text v-else-if="text" :text="text" :size="fontSize" :color="color" align="center" customStyle="justify-content: center"></su-text>
      <image
        class="su-avatar__image"
        v-else
        :class="[`su-avatar__image--${shape}`]"
        :src="avatarUrl || defaultUrl"
        :mode="mode"
        @error="errorHandler"
        :style="[
          {
            width: addUnit(size),
            height: addUnit(size)
          }
        ]"
      ></image>
    </slot>
  </view>
</template>

<script lang="ts" setup>
import { avatarProps, base64Avatar, colors } from './props'
import { addStyle, addUnit, random } from '../../libs/function/index'
import { baseProps } from '../../libs/vue'
import { onMounted, ref, watch } from 'vue'
import { computed } from 'vue'

/**
 * Avatar  头像
 * @description 本组件一般用于展示头像的地方，如个人中心，或者评论列表页的用户头像展示等场所。
 * @tutorial https://suni.pages.dev/component/avatar.html
 *
 * @property {String}			src				头像路径，如加载失败，将会显示默认头像(不能为相对路径)
 * @property {String}			shape			头像形状  （ circle (默认) | square）
 * @property {String | Number}	size			头像尺寸，可以为指定字符串，或者数值 （默认 40 ）
 * @property {String}			mode			头像图片的裁剪类型，与uni的image组件的mode参数一致，如效果达不到需求，可尝试传widthFix值 （默认 'scaleToFill' ）
 * @property {String}			text			用文字替代图片，级别优先于src
 * @property {String}			bgColor			背景颜色，一般显示文字时用 （默认 '#c0c4cc' ）
 * @property {String}			color			文字颜色 （默认 '#ffffff' ）
 * @property {String | Number}	fontSize		文字大小  （默认 18 ）
 * @property {String}			icon			显示的图标
 * @property {Boolean}			mpAvatar		显示小程序头像，只对百度，微信，QQ小程序有效  （默认 false ）
 * @property {Boolean}			randomBgColor	是否使用随机背景色  （默认 false ）
 * @property {String}			defaultUrl		加载失败的默认头像(组件有内置默认图片)
 * @property {String | Number}	colorIndex		如果配置了randomBgColor为true，且配置了此值，则从默认的背景色数组中取出对应索引的颜色值，取值0-19之间
 * @property {String}			name			组件标识符  （默认 'level' ）
 * @property {Object}			customStyle		定义需要用到的外部样式
 *
 * @event    {Function}        click       点击组件时触发   index: 用户传递的标识符
 * @example  <su-avatar :src="src" mode="square"></su-avatar>
 */

defineOptions({
  name: 'su-avatar',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps({
  ...avatarProps,
  ...baseProps
})

const emit = defineEmits(['click'])

const avatarUrl = ref(props.url)

const allowMp = ref(false)

const getStyle = computed(() => {
  const index: number = props.colorIndex !== '' ? +props.colorIndex! : random(0, 19)
  const bgColor = props.randomBgColor ? colors[index] : props.bgColor
  return {
    backgroundColor: props.text || props.icon ? bgColor : 'transparent',
    width: addUnit(props.size),
    height: addUnit(props.size)
  }
})

function errorHandler() {
  avatarUrl.value = props.defaultUrl || base64Avatar
}

function init() {
  // 目前只有这几个小程序平台具有open-data标签
  // 其他平台可以通过uni.getUserInfo类似接口获取信息，但是需要弹窗授权(首次)，不合符组件逻辑
  // 故目前自动获取小程序头像只支持这几个平台
  // #ifdef MP-WEIXIN || MP-QQ || MP-BAIDU
  allowMp.value = true
  // #endif
}

function clickHandler() {
  emit('click', props.name)
}

watch(
  () => props.src,
  (newVal) => {
    avatarUrl.value = newVal!
    // 如果没有传src，则主动触发error事件，用于显示默认的头像，否则src为''空字符等的时候，会无内容展示
    if (!newVal) {
      errorHandler()
    }
  },
  { immediate: true }
)

onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';

.su-avatar {
  @include flex;
  align-items: center;
  justify-content: center;

  &--circle {
    border-radius: 100px;
  }

  &--square {
    border-radius: 4px;
  }

  &__image {
    &--circle {
      border-radius: 100px;
      overflow: hidden;
    }

    &--square {
      border-radius: 4px;
    }
  }
}
</style>
