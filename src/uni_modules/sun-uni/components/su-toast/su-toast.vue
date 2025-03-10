<template>
  <view class="su-toast">
    <su-overlay :show="isShow" :zIndex="tmpConfig.overlay ? tmpConfig.zIndex || 10090 : -1" :custom-style="overlayStyle">
      <view
        class="su-toast__content"
        :style="[contentStyle]"
        :class="['su-type-' + tmpConfig.type, tmpConfig.type === 'loading' || tmpConfig.loading ? 'su-toast__content--loading' : '']"
      >
        <su-loading-icon
          v-if="tmpConfig.type === 'loading'"
          mode="circle"
          color="rgb(255, 255, 255)"
          inactiveColor="rgb(120, 120, 120)"
          size="25"
        ></su-loading-icon>
        <su-icon
          v-else-if="tmpConfig.type !== 'defalut' && iconName"
          :name="iconName"
          size="17"
          :color="tmpConfig.type"
          :customStyle="iconStyle"
        ></su-icon>
        <su-gap v-if="tmpConfig.type === 'loading' || tmpConfig.loading" height="12" bgColor="transparent"></su-gap>
        <text class="su-toast__content__text" :class="['su-toast__content__text--' + tmpConfig.type]" style="max-width: 400rpx">
          {{ tmpConfig.message }}
        </text>
      </view>
    </su-overlay>
  </view>
</template>

<script lang="ts" setup>
import { os, sys, deepMerge, type2icon } from '../../libs/function/index'
import color from '../../libs/config/color'
import { hexToRgb } from '../../libs/function/colorGradient'
import { computed, inject, reactive, ref, watch, type CSSProperties } from 'vue'
import type { SuToastOptions } from './type'
import type { SuUni } from '../../types/uni'
import { defaultOptions, toastDefaultOptionKey } from '.'
import { isUndefined } from 'lodash-es'

/**
 * toast 消息提示
 * @description 此组件表现形式类似uni的uni.showToastAPI，但也有不同的地方。
 * @tutorial https://suni.pages.dev/sun-uni/component/toast.html
 * @property {String | Number}	zIndex		toast展示时的zIndex值 (默认 10090 )
 * @property {Boolean}			loading		是否加载中 （默认 false ）
 * @property {String | Number}	message		显示的文字内容
 * @property {String}			icon		图标，或者绝对路径的图片
 * @property {String}			type		主题类型 （默认 default）
 * @property {Boolean}			show		是否显示该组件 （默认 false）
 * @property {Boolean}			overlay		是否显示透明遮罩，防止点击穿透 （默认 true ）
 * @property {String}			position	位置 （默认 'center' ）
 * @property {Object}			params		跳转的参数
 * @property {String | Number}  duration	展示时间，单位ms （默认 2000 ）
 * @property {Boolean}			isTab		是否返回的为tab页面 （默认 false ）
 * @property {String}			url			toast消失后是否跳转页面，有则跳转，优先级高于back参数
 * @property {Function}			complete	执行完后的回调函数
 * @property {Boolean}			back		结束toast是否自动返回上一页 （默认 false ）
 * @property {Object}			customStyle	组件的样式，对象形式
 * @event {Function} show 显示toast，如需一进入页面就显示toast，请在onReady生命周期调用
 * @example <su-toast ref="uToast" />
 */

defineOptions({
  name: 'su-toast',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps({
  selector: String
})

const isShow = ref(false)
const timer = ref<null | ReturnType<typeof setTimeout>>(null)
const config = reactive<SuToastOptions>(defaultOptions)
// 将用户配置和内置配置合并后的临时配置变量
const tmpConfig = reactive<SuToastOptions>({})

const toastOptionKey = props.selector ? toastDefaultOptionKey + props.selector : toastDefaultOptionKey
const toastOption = inject(toastOptionKey, ref(defaultOptions)) // toast选项

const event = ['primary', 'success', 'error', 'warning', 'loading'].reduce((ev: SuUni.Recordable, item: string) => {
  if (item) {
    ev[item] = (message: string) => {
      show({
        type: item as SuToastOptions['type'],
        message
      })
    }
  }
  return ev
}, {} as SuUni.Recordable)

const iconName = computed(() => {
  if (!tmpConfig.icon || tmpConfig.icon === 'none') {
    return ''
  }
  if (tmpConfig.icon === true) {
    if (['error', 'warning', 'success', 'primary'].includes(tmpConfig.type!)) {
      return type2icon(tmpConfig.type)
    }
    return ''
  }
  return tmpConfig.icon
})

const overlayStyle = computed(() => {
  const style: CSSProperties = {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  }
  // 将遮罩设置为100%透明度，避免出现灰色背景
  style.backgroundColor = 'rgba(0, 0, 0, 0)'
  return style
})

const iconStyle = computed(() => {
  const style: CSSProperties = {}
  // 图标需要一个右边距，以跟右边的文字有隔开的距离
  style.marginRight = '4px'
  // #ifdef APP-NVUE
  // iOSAPP下，图标有1px的向下偏移，这里进行修正
  if (os() === 'ios') {
    style.marginTop = '-1px'
  }
  // #endif
  return style
})

const loadingIconColor = computed(() => {
  let colorTmp = 'rgb(255, 255, 255)'
  if (['error', 'warning', 'success', 'primary'].includes(tmpConfig.type!)) {
    // loading-icon组件内部会对color参数进行一个透明度处理，该方法要求传入的颜色值
    // 必须为rgb格式的，所以这里做一个处理
    colorTmp = hexToRgb((color as SuUni.Recordable)[tmpConfig.type!]) as string
  }
  return colorTmp
})

const contentStyle = computed(() => {
  const windowHeight = sys().windowHeight
  const style: CSSProperties = {}
  let value = 0
  if (tmpConfig.position === 'top') {
    value = -windowHeight * 0.25
  } else if (tmpConfig.position === 'bottom') {
    value = windowHeight * 0.25
  }
  style.transform = `translateY(${value}px)`
  return style
})

function show(options: SuToastOptions) {
  Object.assign(tmpConfig, deepMerge(config, options))
  clearTimer()
  isShow.value = true
  if (tmpConfig.duration !== -1) {
    timer.value = setTimeout(() => {
      // 倒计时结束，清除定时器，隐藏toast组件
      clearTimer()
      // 判断是否存在callback方法，如果存在就执行
      if (tmpConfig.complete && typeof tmpConfig.complete === 'function') {
        tmpConfig.complete()
      }
    }, tmpConfig.duration)
  }
}

function reset(option: SuToastOptions) {
  if (option) {
    isShow.value = !isUndefined(option.show) ? option.show : false
    if (isShow.value) {
      Object.assign(tmpConfig, deepMerge(config, option))
    }
  }
}

function hide() {
  clearTimer()
}

function clearTimer() {
  clearTimeout(timer.value!)
  isShow.value = false
  timer.value = null
}

// 监听options变化展示
watch(
  () => toastOption.value,
  (newVal: SuToastOptions) => {
    reset(newVal)
  },
  {
    deep: true,
    immediate: true
  }
)

defineExpose({
  show,
  hide,
  ...event
})
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';

$su-toast-color: #fff !default;
$su-toast-border-radius: 4px !default;
$su-toast-border-background-color: #585858 !default;
$su-toast-border-font-size: 14px !default;
$su-toast-border-padding: 12px 20px !default;
$su-toast-loading-border-padding: 20px 20px !default;
$su-toast-content-text-color: #fff !default;
$su-toast-content-text-font-size: 15px !default;
$su-toast-su-icon: 10rpx !default;
$su-toast-su-type-primary-color: $su-primary !default;
$su-toast-su-type-primary-background-color: #ecf5ff !default;
$su-toast-su-type-primary-border-color: rgb(215, 234, 254) !default;
$su-toast-su-type-primary-border-width: 1px !default;
$su-toast-su-type-success-color: $su-success !default;
$su-toast-su-type-success-background-color: #dbf1e1 !default;
$su-toast-su-type-success-border-color: #bef5c8 !default;
$su-toast-su-type-success-border-width: 1px !default;
$su-toast-su-type-error-color: $su-error !default;
$su-toast-su-type-error-background-color: #fef0f0 !default;
$su-toast-su-type-error-border-color: #fde2e2 !default;
$su-toast-su-type-error-border-width: 1px !default;
$su-toast-su-type-warning-color: $su-warning !default;
$su-toast-su-type-warning-background-color: #fdf6ec !default;
$su-toast-su-type-warning-border-color: #faecd8 !default;
$su-toast-su-type-warning-border-width: 1px !default;
$su-toast-su-type-default-color: #fff !default;
$su-toast-su-type-default-background-color: #585858 !default;

.su-toast {
  &__content {
    @include flex;
    padding: $su-toast-border-padding;
    border-radius: $su-toast-border-radius;
    background-color: $su-toast-border-background-color;
    color: $su-toast-color;
    align-items: center;
    /* #ifndef APP-NVUE */
    max-width: 600rpx;
    /* #endif */
    position: relative;

    &--loading {
      flex-direction: column;
      padding: $su-toast-loading-border-padding;
    }

    &__text {
      color: $su-toast-content-text-color;
      font-size: $su-toast-content-text-font-size;
      line-height: $su-toast-content-text-font-size;

      &--default {
        color: $su-toast-content-text-color;
      }

      &--error {
        color: $su-error;
      }

      &--primary {
        color: $su-primary;
      }

      &--success {
        color: $su-success;
      }

      &--warning {
        color: $su-warning;
      }
    }
  }
}

.su-type-primary {
  color: $su-toast-su-type-primary-color;
  background-color: $su-toast-su-type-primary-background-color;
  border-color: $su-toast-su-type-primary-border-color;
  border-width: $su-toast-su-type-primary-border-width;
}

.su-type-success {
  color: $su-toast-su-type-success-color;
  background-color: $su-toast-su-type-success-background-color;
  border-color: $su-toast-su-type-success-border-color;
  border-width: 1px;
}

.su-type-error {
  color: $su-toast-su-type-error-color;
  background-color: $su-toast-su-type-error-background-color;
  border-color: $su-toast-su-type-error-border-color;
  border-width: $su-toast-su-type-error-border-width;
}

.su-type-warning {
  color: $su-toast-su-type-warning-color;
  background-color: $su-toast-su-type-warning-background-color;
  border-color: $su-toast-su-type-warning-border-color;
  border-width: 1px;
}

.su-type-default {
  color: $su-toast-su-type-default-color;
  background-color: $su-toast-su-type-default-background-color;
}
</style>
