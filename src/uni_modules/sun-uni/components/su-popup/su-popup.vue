<template>
  <view class="su-popup" :class="[customClass]">
    <su-overlay
      :show="modelValue"
      @click="overlayClick"
      v-if="overlay"
      :zIndex="zIndex"
      :duration="overlayDuration"
      :customStyle="overlayStyle"
      :opacity="overlayOpacity"
    ></su-overlay>
    <su-transition
      :show="modelValue"
      :customStyle="transitionStyle"
      :mode="position"
      :duration="duration"
      @afterEnter="afterEnter"
      @click="clickHandler"
    >
      <view class="su-popup__content" :style="[contentStyle]" @tap.stop="stopPropagationFunc">
        <su-status-bar v-if="safeAreaInsetTop"></su-status-bar>
        <slot></slot>
        <view
          v-if="closeable"
          @tap.stop="close"
          class="su-popup__content__close"
          :class="['su-popup__content__close--' + closeIconPos]"
          hover-class="su-popup__content__close--hover"
          :hover-stay-time="150"
        >
          <su-icon name="close" color="#909399" size="18" bold></su-icon>
        </view>
        <su-safe-bottom v-if="safeAreaInsetBottom"></su-safe-bottom>
      </view>
    </su-transition>
  </view>
</template>

<script lang="ts" setup>
import { popupProps, type SuPopupProps } from './props'
import { addUnit, addStyle, deepMerge, sleep } from '../../libs/function/index'
import { baseProps, stopPropagationFunc } from '../../libs/vue'
import { computed, getCurrentInstance, ref, watch, type CSSProperties } from 'vue'
import type { SuUni } from '../../types/uni'
/**
 * popup 弹窗
 * @description 弹出层容器，用于展示弹窗、信息提示等内容，支持上、下、左、右和中部弹出。组件只提供容器，内部内容由用户自定义
 * @tutorial https://suni.pages.dev/component/popup.html
 * @property {Boolean}			modalValue				是否展示弹窗 (默认 false )
 * @property {Boolean}			overlay				是否显示遮罩 （默认 true ）
 * @property {String}			mode				弹出方向（默认 'bottom' ）
 * @property {String | Number}	duration			动画时长，单位ms （默认 300 ）
 * @property {String | Number}	overlayDuration		遮罩层动画时长，单位ms （默认 350 ）
 * @property {Boolean}			closeable			是否显示关闭图标（默认 false ）
 * @property {Object | String}	overlayStyle		自定义遮罩的样式
 * @property {String | Number}	overlayOpacity		遮罩透明度，0-1之间（默认 0.5）
 * @property {Boolean}			closeOnClickOverlay	点击遮罩是否关闭弹窗 （默认  true ）
 * @property {String | Number}	zIndex				层级 （默认 10075 ）
 * @property {Boolean}			safeAreaInsetBottom	是否为iPhoneX留出底部安全距离 （默认 true ）
 * @property {Boolean}			safeAreaInsetTop	是否留出顶部安全距离（状态栏高度） （默认 false ）
 * @property {String}			closeIconPos		自定义关闭图标位置（默认 'top-right' ）
 * @property {String | Number}	round				圆角值（默认 0）
 * @property {Boolean}			zoom				当mode=center时 是否开启缩放（默认 true ）
 * @property {Object}			customStyle			组件的样式，对象形式
 * @event {Function} open 弹出层打开
 * @event {Function} close 弹出层收起
 * @example <su-popup v-model:show="show"><text>出淤泥而不染，濯清涟而不妖</text></su-popup>
 */
defineOptions({
  name: 'su-popup',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps({
  ...popupProps,
  ...baseProps
})

const emit = defineEmits(['open', 'close', 'click', 'update:modelValue'])

const overlayDuration = ref(props.duration || 0 + 50)

const { proxy } = getCurrentInstance() as SuUni.Recordable

/**
 * 计算过渡样式
 * 根据不同的模式（left, right, top, bottom, center）设置不同的样式
 */
const transitionStyle = computed(() => {
  const style: CSSProperties = {
    zIndex: props.zIndex,
    position: 'fixed',
    display: 'flex'
  }
  style[props.mode as Exclude<SuPopupProps['mode'], undefined | 'center'>] = 0

  /**
   * 获取通用的样式对象
   * @param topBottom 是否设置 top 和 bottom
   * @param leftRight 是否设置 left 和 right
   * @returns 通用样式对象
   */
  const getCommonStyle = (topBottom: boolean, leftRight: boolean) => {
    const commonStyle: CSSProperties = {}
    if (topBottom) {
      commonStyle.bottom = 0
      commonStyle.top = 0
    }
    if (leftRight) {
      commonStyle.left = 0
      commonStyle.right = 0
    }
    return commonStyle
  }

  if (props.mode === 'left' || props.mode === 'right') {
    return deepMerge(style, getCommonStyle(true, false))
  }

  if (props.mode === 'top' || props.mode === 'bottom') {
    return deepMerge(style, getCommonStyle(false, true))
  }

  if (props.mode === 'center') {
    return deepMerge(style, {
      alignItems: 'center',
      'justify-content': 'center',
      ...getCommonStyle(true, true)
    })
  }

  return style
})

/**
 * 计算内容样式
 * 根据不同的模式和属性设置不同的样式
 */
const contentStyle = computed(() => {
  const style: CSSProperties = {
    boxSizing: 'border-box',
    width: '100%',
    height: '100%'
  }
  if (props.mode !== 'center') {
    style.flex = 1
  }

  if (props.bgColor) {
    style.backgroundColor = props.bgColor
  }
  if (props.round) {
    const value = addUnit(props.round as string)
    if (props.mode === 'top') {
      style.borderBottomLeftRadius = value
      style.borderBottomRightRadius = value
    } else if (props.mode === 'bottom') {
      style.borderTopLeftRadius = value
      style.borderTopRightRadius = value
    } else if (props.mode === 'center') {
      style.borderRadius = value
    }
  }
  return deepMerge(style, addStyle(props.customStyle) as CSSProperties)
})

/**
 * 计算弹出位置的函数
 * 根据不同的模式返回不同的动画类名
 */
const position = computed(() => {
  switch (props.mode) {
    case 'center':
      return props.zoom ? 'fade-zoom' : 'fade'
    case 'left':
      return 'slide-left'
    case 'right':
      return 'slide-right'
    case 'bottom':
      return 'slide-up'
    case 'top':
      return 'slide-down'
    default:
      return ''
  }
})

/**
 * 处理遮罩点击事件的函数
 */
function overlayClick() {
  if (props.closeOnClickOverlay) {
    close()
  }
}

/**
 * 关闭弹出层的函数
 */
function close() {
  emit('update:modelValue', false)
  emit('close')
}

/**
 * 弹出层打开后的回调函数
 */
function afterEnter() {
  emit('open')
}

/**
 * 处理点击事件的函数
 */
function clickHandler() {
  // 由于中部弹出时，其u-transition占据了整个页面相当于遮罩，此时需要发出遮罩点击事件，是否无法通过点击遮罩关闭弹窗
  if (props.mode === 'center') {
    overlayClick()
  }
  emit('click')
}

// #ifdef MP-WEIXIN
/**
 * 递归遍历子组件并重新计算组件矩形的函数
 * @param children 子组件列表
 */
function retryComputedComponentRect(children: SuUni.Recordable) {
  // console.log(children, 'children')
  const names = [
    'su-calendar-month',
    'su-album',
    'su-collapse-item',
    'su-dropdown',
    'su-index-item',
    'su-index-list',
    'su-line-progress',
    'su-list-item',
    'su-rate',
    'su-read-more',
    'su-row',
    'su-row-notice',
    'su-scroll-list',
    'su-skeleton',
    'su-slider',
    'su-steps-item',
    'su-sticky',
    'su-subsection',
    'su-swipe-action-item',
    'su-tabbar',
    'su-tabs',
    'su-tooltip'
  ]
  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    // 拿到子组件的子组件
    const grandChild = child.$children
    // 判断如果在需要重新初始化的组件数组中名中，并且存在init方法的话，则执行
    if (names.includes(child.$options.name) && typeof child?.init === 'function') {
      // 需要进行一定的延时，因为初始化页面需要时间
      sleep(50).then(() => {
        child.init()
      })
    }
    // 如果子组件还有孙组件，进行递归历遍
    if (grandChild.length) {
      retryComputedComponentRect(grandChild)
    }
  }
}
// #endif

/**
 * 监听 show 属性的变化
 */
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue === true) {
      // #ifdef MP-WEIXIN
      const children = proxy.$children
      retryComputedComponentRect(children)
      // #endif
    }
  }
)
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';
$su-popup-flex: 1 !default;
$su-popup-content-background-color: #fff !default;

.su-popup {
  flex: $su-popup-flex;

  &__content {
    background-color: $su-popup-content-background-color;
    position: relative;

    &--round-top {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }

    &--round-left {
      border-top-left-radius: 0;
      border-top-right-radius: 10px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 10px;
    }

    &--round-right {
      border-top-left-radius: 10px;
      border-top-right-radius: 0;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 0;
    }

    &--round-bottom {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    &--round-center {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }

    &__close {
      position: absolute;

      &--hover {
        opacity: 0.4;
      }
    }

    &__close--top-left {
      top: 15px;
      left: 15px;
    }

    &__close--top-right {
      top: 15px;
      right: 15px;
    }

    &__close--bottom-left {
      bottom: 15px;
      left: 15px;
    }

    &__close--bottom-right {
      right: 15px;
      bottom: 15px;
    }
  }
}
</style>
