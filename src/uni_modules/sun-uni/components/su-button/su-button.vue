<template>
  <!-- #ifndef APP-NVUE -->
  <button
    :hover-start-time="Number(hoverStartTime)"
    :hover-stay-time="Number(hoverStayTime)"
    :form-type="formType"
    :open-type="getOpenType"
    :app-parameter="appParameter"
    :hover-stop-propagation="hoverStopPropagation"
    :send-message-title="sendMessageTitle"
    :send-message-path="sendMessagePath"
    :lang="lang"
    :data-name="dataName"
    :session-from="sessionFrom"
    :send-message-img="sendMessageImg"
    :show-message-card="showMessageCard"
    @getphonenumber="getphonenumber"
    @getuserinfo="getuserinfo"
    @error="error"
    @opensetting="opensetting"
    @launchapp="launchapp"
    @agreeprivacyauthorization="agreeprivacyauthorization"
    :hover-class="!disabled && !loading ? 'su-button--active' : ''"
    class="su-button su-reset-button"
    :style="[baseColor, addStyle(customStyle)]"
    @tap="clickHandler"
    :class="bemClass"
  >
    <template v-if="loading">
      <su-loading-icon :mode="loadingMode" :size="loadingSize! * 1.15" :color="loadingColor"></su-loading-icon>
      <text class="su-button__loading-text" :style="[{ fontSize: textSize + 'px' }]">{{ loadingText || text }}</text>
    </template>
    <template v-else>
      <su-icon v-if="icon" :name="icon" :color="iconColorCom" :size="textSize * 1.35" :customStyle="{ marginRight: '2px' }"></su-icon>
      <slot>
        <text class="su-button__text" :style="[{ fontSize: textSize + 'px' }]">{{ text }}</text>
      </slot>
    </template>
  </button>
  <!-- #endif -->

  <!-- #ifdef APP-NVUE -->
  <view
    :hover-start-time="Number(hoverStartTime)"
    :hover-stay-time="Number(hoverStayTime)"
    class="su-button"
    :hover-class="getHoverClass"
    @tap="clickHandler"
    :class="bemClass"
    :style="[baseColor, addStyle(customStyle)]"
  >
    <template v-if="loading">
      <su-loading-icon :mode="loadingMode" :size="loadingSize! * 1.15" :color="loadingColor"></su-loading-icon>
      <text class="su-button__loading-text" :style="[nvueTextStyle]" :class="[plain && `su-button__text--plain--${type}`]">
        {{ loadingText || text }}
      </text>
    </template>
    <template v-else>
      <su-icon v-if="icon" :name="icon" :color="iconColorCom" :size="textSize * 1.35"></su-icon>
      <text
        class="su-button__text"
        :style="[
          {
            marginLeft: icon ? '2px' : 0
          },
          nvueTextStyle
        ]"
        :class="[plain && `su-button__text--plain--${type}`]"
      >
        {{ text }}
      </text>
    </template>
  </view>
  <!-- #endif -->
</template>

<script lang="ts" setup>
// import { openType } from '../../libs/mixin/openType'
import { buttonProps, buttonMixinProps } from './props'
import { addStyle } from '../../libs/function/index'
import color from '../../libs/config/color'
import { openProps } from '../../hooks/core/useOpenType'
import { computed, unref } from 'vue'
import { baseProps, bem } from '../../libs/vue'
import type { SuUni } from '../../types/uni'
import type { CSSProperties } from 'vue'
import { useThrottleFn } from '../../hooks'
/**
 * button 按钮
 * @description Button 按钮
 * @tutorial https://suni.pages.dev/component/button.html
 *
 * @property {Boolean}			hairline				是否显示按钮的细边框 (默认 true )
 * @property {String}			type					按钮的预置样式，info，primary，error，warning，success (默认 'info' )
 * @property {String}			size					按钮尺寸，large，normal，mini （默认 normal）
 * @property {String}			shape					按钮形状，circle（两边为半圆），square（带圆角） （默认 'square' ）
 * @property {Boolean}			plain					按钮是否镂空，背景色透明 （默认 false）
 * @property {Boolean}			disabled				是否禁用 （默认 false）
 * @property {Boolean}			loading					按钮名称前是否带 loading 图标(App-nvue 平台，在 ios 上为雪花，Android上为圆圈) （默认 false）
 * @property {String | Number}	loadingText				加载中提示文字
 * @property {String}			loadingMode				加载状态图标类型 （默认 'spinner' ）
 * @property {Number}	loadingSize				加载图标大小 （默认 15 ）
 * @property {String}			openType				开放能力，具体请看uniapp稳定关于button组件部分说明
 * @property {String}			formType				用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件
 * @property {String}			appParameter			打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效 （注：只微信小程序、QQ小程序有效）
 * @property {Boolean}			hoverStopPropagation	指定是否阻止本节点的祖先节点出现点击态，微信小程序有效（默认 true ）
 * @property {String}			lang					指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文（默认 en ）
 * @property {String}			sessionFrom				会话来源，openType="contact"时有效
 * @property {String}			sendMessageTitle		会话内消息卡片标题，openType="contact"时有效
 * @property {String}			sendMessagePath			会话内消息卡片点击跳转小程序路径，openType="contact"时有效
 * @property {String}			sendMessageImg			会话内消息卡片图片，openType="contact"时有效
 * @property {Boolean}			showMessageCard			是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，openType="contact"时有效（默认false）
 * @property {String}			dataName				额外传参参数，用于小程序的data-xxx属性，通过target.dataset.name获取
 * @property {String | Number}	throttleTime			节流，一定时间内只能触发一次 （默认 0 )
 * @property {String | Number}	hoverStartTime			按住后多久出现点击态，单位毫秒 （默认 0 )
 * @property {String | Number}	hoverStayTime			手指松开后点击态保留时间，单位毫秒 （默认 200 )
 * @property {String | Number}	text					按钮文字，之所以通过props传入，是因为slot传入的话（注：nvue中无法控制文字的样式）
 * @property {String}			icon					按钮图标
 * @property {String}			iconColor				按钮图标颜色
 * @property {String}			color					按钮颜色，支持传入linear-gradient渐变色
 * @property {Object}			customStyle				定义需要用到的外部样式
 *
 * @event {Function}	click			非禁止并且非加载中，才能点击
 * @event {Function}	getphonenumber	open-type="getPhoneNumber"时有效
 * @event {Function}	getuserinfo		用户点击该按钮时，会返回获取到的用户信息，从返回参数的detail中获取到的值同uni.getUserInfo
 * @event {Function}	error			当使用开放能力时，发生错误的回调
 * @event {Function}	opensetting		在打开授权设置页并关闭后回调
 * @event {Function}	launchapp		打开 APP 成功的回调
 * @event {Function}	agreeprivacyauthorization	用户同意隐私协议事件回调
 * @example <su-button>月落</su-button>
 */

defineOptions({
  name: 'su-button',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
})

const emit = defineEmits(['click', 'getphonenumber', 'getuserinfo', 'error', 'opensetting', 'launchapp', 'agreeprivacyauthorization'])

const props = defineProps({
  ...buttonProps,
  ...baseProps,
  // #ifdef MP
  ...buttonMixinProps,
  ...openProps
  // #endif
})

const getOpenType = computed(() => props.openType as UniHelper.ButtonOpenType)

const getHoverClass = computed(() => {
  if (!props.disabled && !props.loading && !color && (props.plain || props.type === 'info')) {
    return 'su-button--active--plain'
  }
  if (!props.disabled && !props.loading && !props.plain) return 'su-button--active'
  return ''
})

const bemClass = computed(() => {
  if (!props.color) {
    return bem('button', ['type', 'shape', 'size'], ['disabled', 'plain', 'hairline'], props)
  }
  return bem('button', ['shape', 'size'], ['disabled', 'plain', 'hairline'], props)
})

const loadingColor = computed(() => {
  if (props.plain) return props.color ? props.color : (color as SuUni.Recordable)[props.type!]
  if (props.type === 'info') return '#c9c9c9'
  return 'rgb(200, 200, 200)'
})

const iconColorCom = computed(() => {
  if (props.iconColor) return props.iconColor
  if (props.plain) return props.color ? props.color : props.type
  return props.type === 'info' ? '#000000' : '#ffffff'
})

const baseColor = computed(() => {
  let style: CSSProperties = {}
  if (props.color) {
    style.color = props.plain ? props.color : 'white'
    if (!props.plain) {
      // 非镂空，背景色使用自定义的颜色
      style['background-color'] = props.color
    }
    if (props.color.indexOf('gradient') !== -1) {
      style.borderTopWidth = 0
      style.borderRightWidth = 0
      style.borderBottomWidth = 0
      style.borderLeftWidth = 0
      if (!props.plain) {
        style.backgroundImage = props.color
      }
    } else {
      style.borderColor = props.color
      style.borderWidth = '1px'
      style.borderStyle = 'solid'
    }
  }
  return style
})

const nvueTextStyle = computed(() => {
  let style: CSSProperties = {}
  if (props.type === 'info') {
    style.color = '#323233'
  }

  if (props.color) {
    style.color = props.plain ? props.color : 'white'
  }
  style.fontSize = unref(textSize) + 'px'
  return style
})

const textSize = computed(() => {
  let fontSize = 14
  const { size } = props
  if (size === 'large') fontSize = 16
  if (size === 'normal') fontSize = 14
  if (size === 'small') fontSize = 12
  if (size === 'mini') fontSize = 10
  return fontSize
})

const clickHandler = useThrottleFn(() => {
  if (!props.disabled && !props.loading) {
    emit('click')
  }
}, props.throttleTime || 0)

function getphonenumber(res: UniHelper.ButtonOnGetphonenumberEvent) {
  emit('getphonenumber', res)
}

function getuserinfo(res: UniHelper.ButtonOnLoginEvent) {
  emit('getuserinfo', res)
}

function error(res: UniHelper.ButtonOnErrorEvent) {
  emit('error', res)
}

function opensetting(res: UniHelper.ButtonOnOpensettingEvent) {
  emit('opensetting', res)
}

function launchapp(res: UniHelper.ButtonOnLaunchappEvent) {
  emit('launchapp', res)
}

function agreeprivacyauthorization(res: UniHelper.ButtonOnAgreeprivacyauthorizationEvent) {
  emit('agreeprivacyauthorization', res)
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';

/* #ifndef APP-NVUE */
@import './vue.scss';
/* #endif */

/* #ifdef APP-NVUE */
@import './nvue.scss';
/* #endif */

$su-button-su-button-height: 40px !default;
$su-button-text-font-size: 15px !default;
$su-button-loading-text-font-size: 15px !default;
$su-button-loading-text-margin-left: 4px !default;
$su-button-large-width: 100% !default;
$su-button-large-height: 50px !default;
$su-button-normal-padding: 0 12px !default;
$su-button-large-padding: 0 15px !default;
$su-button-normal-font-size: 14px !default;
$su-button-small-min-width: 60px !default;
$su-button-small-height: 30px !default;
$su-button-small-padding: 0px 8px !default;
$su-button-mini-padding: 0px 8px !default;
$su-button-small-font-size: 12px !default;
$su-button-mini-height: 22px !default;
$su-button-mini-font-size: 10px !default;
$su-button-mini-min-width: 50px !default;
$su-button-disabled-opacity: 0.5 !default;
$su-button-info-color: #323233 !default;
$su-button-info-background-color: #fff !default;
$su-button-info-border-color: #ebedf0 !default;
$su-button-info-border-width: 1px !default;
$su-button-info-border-style: solid !default;
$su-button-success-color: #fff !default;
$su-button-success-background-color: $su-success !default;
$su-button-success-border-color: $su-button-success-background-color !default;
$su-button-success-border-width: 1px !default;
$su-button-success-border-style: solid !default;
$su-button-primary-color: #fff !default;
$su-button-primary-background-color: $su-primary !default;
$su-button-primary-border-color: $su-button-primary-background-color !default;
$su-button-primary-border-width: 1px !default;
$su-button-primary-border-style: solid !default;
$su-button-error-color: #fff !default;
$su-button-error-background-color: $su-error !default;
$su-button-error-border-color: $su-button-error-background-color !default;
$su-button-error-border-width: 1px !default;
$su-button-error-border-style: solid !default;
$su-button-warning-color: #fff !default;
$su-button-warning-background-color: $su-warning !default;
$su-button-warning-border-color: $su-button-warning-background-color !default;
$su-button-warning-border-width: 1px !default;
$su-button-warning-border-style: solid !default;
$su-button-block-width: 100% !default;
$su-button-circle-border-top-right-radius: 100px !default;
$su-button-circle-border-top-left-radius: 100px !default;
$su-button-circle-border-bottom-left-radius: 100px !default;
$su-button-circle-border-bottom-right-radius: 100px !default;
$su-button-square-border-top-right-radius: 3px !default;
$su-button-square-border-top-left-radius: 3px !default;
$su-button-square-border-bottom-left-radius: 3px !default;
$su-button-square-border-bottom-right-radius: 3px !default;
$su-button-icon-min-width: 1em !default;
$su-button-plain-background-color: #fff !default;
$su-button-hairline-border-width: 0.5px !default;

.su-button {
  height: $su-button-su-button-height;
  position: relative;
  align-items: center;
  justify-content: center;
  @include flex;
  /* #ifndef APP-NVUE */
  box-sizing: border-box;
  /* #endif */
  flex-direction: row;

  &__text {
    font-size: $su-button-text-font-size;
  }

  &__loading-text {
    font-size: $su-button-loading-text-font-size;
    margin-left: $su-button-loading-text-margin-left;
  }

  &--large {
    /* #ifndef APP-NVUE */
    width: $su-button-large-width;
    /* #endif */
    height: $su-button-large-height;
    padding: $su-button-large-padding;
  }

  &--normal {
    padding: $su-button-normal-padding;
    font-size: $su-button-normal-font-size;
  }

  &--small {
    /* #ifndef APP-NVUE */
    min-width: $su-button-small-min-width;
    /* #endif */
    height: $su-button-small-height;
    padding: $su-button-small-padding;
    font-size: $su-button-small-font-size;
  }

  &--mini {
    height: $su-button-mini-height;
    font-size: $su-button-mini-font-size;
    /* #ifndef APP-NVUE */
    min-width: $su-button-mini-min-width;
    /* #endif */
    padding: $su-button-mini-padding;
  }

  &--disabled {
    opacity: $su-button-disabled-opacity;
  }

  &--info {
    color: $su-button-info-color;
    background-color: $su-button-info-background-color;
    border-color: $su-button-info-border-color;
    border-width: $su-button-info-border-width;
    border-style: $su-button-info-border-style;
  }

  &--success {
    color: $su-button-success-color;
    background-color: $su-button-success-background-color;
    border-color: $su-button-success-border-color;
    border-width: $su-button-success-border-width;
    border-style: $su-button-success-border-style;
  }

  &--primary {
    color: $su-button-primary-color;
    background-color: $su-button-primary-background-color;
    border-color: $su-button-primary-border-color;
    border-width: $su-button-primary-border-width;
    border-style: $su-button-primary-border-style;
  }

  &--error {
    color: $su-button-error-color;
    background-color: $su-button-error-background-color;
    border-color: $su-button-error-border-color;
    border-width: $su-button-error-border-width;
    border-style: $su-button-error-border-style;
  }

  &--warning {
    color: $su-button-warning-color;
    background-color: $su-button-warning-background-color;
    border-color: $su-button-warning-border-color;
    border-width: $su-button-warning-border-width;
    border-style: $su-button-warning-border-style;
  }

  &--block {
    @include flex;
    width: $su-button-block-width;
  }

  &--circle {
    border-top-right-radius: $su-button-circle-border-top-right-radius;
    border-top-left-radius: $su-button-circle-border-top-left-radius;
    border-bottom-left-radius: $su-button-circle-border-bottom-left-radius;
    border-bottom-right-radius: $su-button-circle-border-bottom-right-radius;
  }

  &--square {
    border-bottom-left-radius: $su-button-square-border-top-right-radius;
    border-bottom-right-radius: $su-button-square-border-top-left-radius;
    border-top-left-radius: $su-button-square-border-bottom-left-radius;
    border-top-right-radius: $su-button-square-border-bottom-right-radius;
  }

  &__icon {
    /* #ifndef APP-NVUE */
    min-width: $su-button-icon-min-width;
    line-height: inherit !important;
    vertical-align: top;
    /* #endif */
  }

  &--plain {
    background-color: $su-button-plain-background-color;
  }

  &--hairline {
    border-width: $su-button-hairline-border-width !important;
  }
}
</style>
