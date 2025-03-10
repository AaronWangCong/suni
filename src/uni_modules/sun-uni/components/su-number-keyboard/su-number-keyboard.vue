<template>
  <view class="su-keyboard" @touchmove.stop.prevent="noop">
    <view class="su-keyboard__button-wrapper" v-for="(item, index) in numList" :key="index">
      <view
        class="su-keyboard__button-wrapper__button"
        :style="[itemStyle(index)]"
        @tap="keyboardClick(item)"
        hover-class="su-hover-class"
        :hover-stay-time="200"
      >
        <text class="su-keyboard__button-wrapper__button__text">{{ item }}</text>
      </view>
    </view>
    <view class="su-keyboard__button-wrapper">
      <view
        class="su-keyboard__button-wrapper__button su-keyboard__button-wrapper__button--gray"
        hover-class="su-hover-class"
        :hover-stay-time="200"
        @touchstart.stop="backspaceClick"
        @touchend="clearTimer"
      >
        <su-icon name="backspace" color="#303133" size="28"></su-icon>
      </view>
    </view>
  </view>
</template>

<script>
import { props } from './props'
import { mpMixin } from '../../libs/mixin/mpMixin'
import { mixin } from '../../libs/mixin/mixin'
import { randomArray } from '../../libs/function/index'
/**
 * keyboard 键盘组件
 * @description
 * @tutorial
 * @property {String}	mode		键盘的类型，number-数字键盘，card-身份证键盘
 * @property {Boolean}	dotDisabled	是否显示键盘的"."符号
 * @property {Boolean}	random		是否打乱键盘按键的顺序
 * @event {Function} change		点击键盘触发
 * @event {Function} backspace	点击退格键触发
 * @example
 */
export default {
  name: 'su-number-keyboard',
  mixins: [mpMixin, mixin, props],
  data() {
    return {
      backspace: 'backspace', // 退格键内容
      dot: '.', // 点
      timer: null, // 长按多次删除的事件监听
      cardX: 'X' // 身份证的X符号
    }
  },
  computed: {
    // 键盘需要显示的内容
    numList() {
      let tmp = []
      if (this.dotDisabled && this.mode == 'number') {
        if (!this.random) {
          return [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
        } else {
          return randomArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])
        }
      } else if (!this.dotDisabled && this.mode == 'number') {
        if (!this.random) {
          return [1, 2, 3, 4, 5, 6, 7, 8, 9, this.dot, 0]
        } else {
          return randomArray([1, 2, 3, 4, 5, 6, 7, 8, 9, this.dot, 0])
        }
      } else if (this.mode == 'card') {
        if (!this.random) {
          return [1, 2, 3, 4, 5, 6, 7, 8, 9, this.cardX, 0]
        } else {
          return randomArray([1, 2, 3, 4, 5, 6, 7, 8, 9, this.cardX, 0])
        }
      }
    },
    // 按键的样式，在非乱序&&数字键盘&&不显示点按钮时，index为9时，按键占位两个空间
    itemStyle() {
      return (index) => {
        let style = {}
        if (this.mode == 'number' && this.dotDisabled && index == 9) style.width = '464rpx'
        return style
      }
    },
    // 是否让按键显示灰色，只在非乱序&&数字键盘&&且允许点按键的时候
    btnBgGray() {
      return (index) => {
        if (!this.random && index == 9 && (this.mode != 'number' || (this.mode == 'number' && !this.dotDisabled))) return true
        else return false
      }
    }
  },
  created() {},
  emits: ['backspace', 'change'],
  methods: {
    // 点击退格键
    backspaceClick() {
      this.$emit('backspace')
      clearInterval(this.timer) //再次清空定时器，防止重复注册定时器
      this.timer = null
      this.timer = setInterval(() => {
        this.$emit('backspace')
      }, 250)
    },
    clearTimer() {
      clearInterval(this.timer)
      this.timer = null
    },
    // 获取键盘显示的内容
    keyboardClick(val) {
      // 允许键盘显示点模式和触发非点按键时，将内容转为数字类型
      if (!this.dotDisabled && val != this.dot && val != this.cardX) val = Number(val)
      this.$emit('change', val)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';
$su-number-keyboard-background-color: rgb(224, 228, 230) !default;
$su-number-keyboard-padding: 8px 10rpx 8px 10rpx !default;
$su-number-keyboard-button-width: 222rpx !default;
$su-number-keyboard-button-margin: 4px 6rpx !default;
$su-number-keyboard-button-border-top-left-radius: 4px !default;
$su-number-keyboard-button-border-top-right-radius: 4px !default;
$su-number-keyboard-button-border-bottom-left-radius: 4px !default;
$su-number-keyboard-button-border-bottom-right-radius: 4px !default;
$su-number-keyboard-button-height: 90rpx !default;
$su-number-keyboard-button-background-color: #ffffff !default;
$su-number-keyboard-button-box-shadow: 0 2px 0px #bbbcbe !default;
$su-number-keyboard-text-font-size: 20px !default;
$su-number-keyboard-text-font-weight: 500 !default;
$su-number-keyboard-text-color: $su-main-color !default;
$su-number-keyboard-gray-background-color: rgb(200, 202, 210) !default;
$su-number-keyboard-su-hover-class-background-color: #bbbcc6 !default;

.su-keyboard {
  @include flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: $su-number-keyboard-background-color;
  flex-wrap: wrap;
  padding: $su-number-keyboard-padding;

  &__button-wrapper {
    box-shadow: $su-number-keyboard-button-box-shadow;
    margin: $su-number-keyboard-button-margin;
    border-top-left-radius: $su-number-keyboard-button-border-top-left-radius;
    border-top-right-radius: $su-number-keyboard-button-border-top-right-radius;
    border-bottom-left-radius: $su-number-keyboard-button-border-bottom-left-radius;
    border-bottom-right-radius: $su-number-keyboard-button-border-bottom-right-radius;

    &__button {
      width: $su-number-keyboard-button-width;
      height: $su-number-keyboard-button-height;
      background-color: $su-number-keyboard-button-background-color;
      @include flex;
      justify-content: center;
      align-items: center;
      border-top-left-radius: $su-number-keyboard-button-border-top-left-radius;
      border-top-right-radius: $su-number-keyboard-button-border-top-right-radius;
      border-bottom-left-radius: $su-number-keyboard-button-border-bottom-left-radius;
      border-bottom-right-radius: $su-number-keyboard-button-border-bottom-right-radius;

      &__text {
        font-size: $su-number-keyboard-text-font-size;
        font-weight: $su-number-keyboard-text-font-weight;
        color: $su-number-keyboard-text-color;
      }

      &--gray {
        background-color: $su-number-keyboard-gray-background-color;
      }
    }
  }
}

.su-hover-class {
  background-color: $su-number-keyboard-su-hover-class-background-color;
}
</style>
