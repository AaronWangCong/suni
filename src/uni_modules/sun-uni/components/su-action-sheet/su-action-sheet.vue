<template>
  <su-popup :modelValue="show" mode="bottom" @close="closeHandler" :safeAreaInsetBottom="safeAreaInsetBottom" :round="round">
    <view class="su-action-sheet">
      <view class="su-action-sheet__header" v-if="title">
        <text class="su-action-sheet__header__title su-line-1">{{ title }}</text>
        <view class="su-action-sheet__header__icon-wrap" @tap.stop="cancel">
          <su-icon name="close" size="17" color="#c8c9cc" bold></su-icon>
        </view>
      </view>
      <text
        class="su-action-sheet__description"
        :style="[
          {
            marginTop: `${title && description ? 0 : '18px'}`
          }
        ]"
        v-if="description"
      >
        {{ description }}
      </text>
      <slot>
        <su-line v-if="description"></su-line>
        <scroll-view scroll-y class="su-action-sheet__item-wrap" :style="{ maxHeight: wrapMaxHeight }">
          <view :key="index" v-for="(item, index) in actions">
            <!-- #ifdef MP -->
            <button
              class="su-reset-button"
              :openType="item.openType"
              @getuserinfo="onGetUserInfo"
              @contact="onContact"
              @getphonenumber="onGetPhoneNumber"
              @error="onError"
              @launchapp="onLaunchApp"
              @opensetting="onOpenSetting"
              :lang="lang"
              :session-from="sessionFrom"
              :send-message-title="sendMessageTitle"
              :send-message-path="sendMessagePath"
              :send-message-img="sendMessageImg"
              :show-message-card="showMessageCard"
              :app-parameter="appParameter"
              @tap="selectHandler(index)"
              :hover-class="!item.disabled && !item.loading ? 'su-action-sheet--hover' : ''"
            >
              <!-- #endif -->
              <view
                class="su-action-sheet__item-wrap__item"
                @tap.stop="selectHandler(index)"
                :hover-class="!item.disabled && !item.loading ? 'su-action-sheet--hover' : ''"
                :hover-stay-time="150"
              >
                <template v-if="!item.loading">
                  <text class="su-action-sheet__item-wrap__item__name" :style="[itemStyle(index)]">{{ item.name }}</text>
                  <text v-if="item.subname" class="su-action-sheet__item-wrap__item__subname">{{ item.subname }}</text>
                </template>
                <su-loading-icon v-else custom-class="van-action-sheet__loading" size="18" mode="circle" />
              </view>
              <!-- #ifdef MP -->
            </button>
            <!-- #endif -->
            <su-line v-if="index !== actions!.length - 1"></su-line>
          </view>
        </scroll-view>
      </slot>
      <su-gap bgColor="#eaeaec" height="6" v-if="cancelText"></su-gap>
      <view class="su-action-sheet__item-wrap__item su-action-sheet__cancel" hover-class="su-action-sheet--hover" @tap="cancel" v-if="cancelText">
        <text @touchmove.stop.prevent :hover-stay-time="150" class="su-action-sheet__cancel-text">{{ cancelText }}</text>
      </view>
    </view>
  </su-popup>
</template>

<script setup lang="ts">
import { openProps, openEmit, useOpenType } from '../../hooks/core/useOpenType'
import { actionSheetProps } from './props'
import { addUnit } from '../../libs/function/index'
import { buttonMixinProps } from '../su-button/props'
import { computed, type CSSProperties } from 'vue'

/**
 * ActionSheet 操作菜单
 * @description 本组件用于从底部弹出一个操作菜单，供用户选择并返回结果。本组件功能类似于uni的uni.showActionSheetAPI，配置更加灵活，所有平台都表现一致。
 * @tutorial https://suni.pages.dev/sun-uni/component/actionSheet.html
 *
 * @property {Boolean}			show				操作菜单是否展示 （默认 false ）
 * @property {String}			title				操作菜单标题
 * @property {String}			description			选项上方的描述信息
 * @property {Array<Object>}	actions				按钮的文字数组，见官方文档示例
 * @property {String}			cancelText			取消按钮的提示文字,不为空时显示按钮
 * @property {Boolean}			closeOnClickAction	点击某个菜单项时是否关闭弹窗 （默认 true ）
 * @property {Boolean}			safeAreaInsetBottom	处理底部安全区 （默认 true ）
 * @property {String}			openType			小程序的打开方式 (contact | launchApp | getUserInfo | openSetting ｜getPhoneNumber ｜error )
 * @property {Boolean}			closeOnClickOverlay	点击遮罩是否允许关闭  (默认 true )
 * @property {Number|String}	round				圆角值，默认无圆角  (默认 0 )
 * @property {String}			lang				指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文
 * @property {String}			sessionFrom			会话来源，openType="contact"时有效
 * @property {String}			sendMessageTitle	会话内消息卡片标题，openType="contact"时有效
 * @property {String}			sendMessagePath		会话内消息卡片点击跳转小程序路径，openType="contact"时有效
 * @property {String}			sendMessageImg		会话内消息卡片图片，openType="contact"时有效
 * @property {Boolean}			showMessageCard		是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，openType="contact"时有效 （默认 false ）
 * @property {String}			appParameter		打开 APP 时，向 APP 传递的参数，openType=launchApp 时有效
 *
 * @event {Function} select			点击ActionSheet列表项时触发
 * @event {Function} close			点击取消按钮时触发
 * @event {Function} getuserinfo	用户点击该按钮时，会返回获取到的用户信息，回调的 detail 数据与 wx.getUserInfo 返回的一致，openType="getUserInfo"时有效
 * @event {Function} contact		客服消息回调，openType="contact"时有效
 * @event {Function} getphonenumber	获取用户手机号回调，openType="getPhoneNumber"时有效
 * @event {Function} error			当使用开放能力时，发生错误的回调，openType="error"时有效
 * @event {Function} launchapp		打开 APP 成功的回调，openType="launchApp"时有效
 * @event {Function} opensetting	在打开授权设置页后回调，openType="openSetting"时有效
 * @example <su-action-sheet :actions="list" :title="title" :show="show"></su-action-sheet>
 */
defineOptions({
  name: 'su-action-sheet',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps({
  ...actionSheetProps,
  // #ifdef MP
  ...openProps,
  ...buttonMixinProps
  // #endif
})

const emit = defineEmits(['close', 'select', 'update:show', 'update:modelValue', ...openEmit])

const { onGetUserInfo, onContact, onGetPhoneNumber, onError, onLaunchApp, onOpenSetting } = useOpenType(emit)

/** 计算属性，用于动态设置每个 action 项的样式 */
const itemStyle = computed(() => {
  return (index: number) => {
    const style: CSSProperties = {}
    const actionItem = props.actions?.find((_, idx) => idx === index)
    if (actionItem) {
      if (actionItem.color) style.color = actionItem.color
      if (actionItem.fontSize) style.fontSize = addUnit(actionItem.fontSize)
      if (actionItem.disabled) style.fontSize = '#c0c4cc'
    }
    return style
  }
})

/**
 * 点击处理函数
 * 如果允许点击遮罩关闭，则调用 cancel 函数关闭弹窗
 */
function closeHandler() {
  if (props.closeOnClickOverlay) {
    cancel()
  }
}

/**
 * 取消处理函数
 * 触发 update:show 和 update:modelValue 事件，更新组件的显示状态
 * 并触发 close 事件，通知父组件弹窗已关闭
 */
function cancel() {
  emit('update:show', false)
  emit('update:modelValue', false)
  emit('close')
}

/**
 * 选择处理函数
 * 当用户点击某个 action 项时，触发 select 事件，并根据 closeOnClickAction 属性决定是否关闭弹窗
 */
function selectHandler(index: number) {
  const item = props.actions![index]
  if (item && !item.disabled && !item.loading) {
    emit('select', item)
    if (props.closeOnClickAction) {
      cancel()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';
$su-action-sheet-reset-button-width: 100% !default;
$su-action-sheet-title-font-size: 16px !default;
$su-action-sheet-title-padding: 12px 30px !default;
$su-action-sheet-title-color: $su-main-color !default;
$su-action-sheet-header-icon-wrap-right: 15px !default;
$su-action-sheet-header-icon-wrap-top: 15px !default;
$su-action-sheet-description-font-size: 13px !default;
$su-action-sheet-description-color: 14px !default;
$su-action-sheet-description-margin: 18px 15px !default;
$su-action-sheet-item-wrap-item-padding: 17px !default;
$su-action-sheet-item-wrap-name-font-size: 16px !default;
$su-action-sheet-item-wrap-subname-font-size: 13px !default;
$su-action-sheet-item-wrap-subname-color: #c0c4cc !default;
$su-action-sheet-item-wrap-subname-margin-top: 10px !default;
$su-action-sheet-cancel-text-font-size: 16px !default;
$su-action-sheet-cancel-text-color: $su-content-color !default;
$su-action-sheet-cancel-text-font-size: 15px !default;
$su-action-sheet-cancel-text-hover-background-color: rgb(242, 243, 245) !default;

.su-reset-button {
  width: $su-action-sheet-reset-button-width;
}

.su-action-sheet {
  text-align: center;
  &__header {
    position: relative;
    padding: $su-action-sheet-title-padding;
    &__title {
      font-size: $su-action-sheet-title-font-size;
      color: $su-action-sheet-title-color;
      font-weight: bold;
      text-align: center;
    }

    &__icon-wrap {
      position: absolute;
      right: $su-action-sheet-header-icon-wrap-right;
      top: $su-action-sheet-header-icon-wrap-top;
    }
  }

  &__description {
    font-size: $su-action-sheet-description-font-size;
    color: $su-tips-color;
    margin: $su-action-sheet-description-margin;
    text-align: center;
  }

  &__item-wrap {
    &__item {
      padding: $su-action-sheet-item-wrap-item-padding;
      @include flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      &__name {
        font-size: $su-action-sheet-item-wrap-name-font-size;
        color: $su-main-color;
        text-align: center;
      }

      &__subname {
        font-size: $su-action-sheet-item-wrap-subname-font-size;
        color: $su-action-sheet-item-wrap-subname-color;
        margin-top: $su-action-sheet-item-wrap-subname-margin-top;
        text-align: center;
      }
    }
  }

  &__cancel-text {
    font-size: $su-action-sheet-cancel-text-font-size;
    color: $su-action-sheet-cancel-text-color;
    text-align: center;
    // padding: $su-action-sheet-cancel-text-font-size;
  }

  &--hover {
    background-color: $su-action-sheet-cancel-text-hover-background-color;
  }
}
</style>
