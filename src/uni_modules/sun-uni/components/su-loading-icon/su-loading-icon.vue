<template>
  <view class="su-loading-icon" :style="[addStyle(customStyle)]" :class="[vertical && 'su-loading-icon--vertical']" v-if="show">
    <view
      v-if="!webviewHide"
      class="su-loading-icon__spinner"
      :class="[`su-loading-icon__spinner--${mode}`]"
      ref="ani"
      :style="{
        color: color,
        width: addUnit(size),
        height: addUnit(size),
        borderTopColor: color,
        borderBottomColor: otherBorderColor,
        borderLeftColor: otherBorderColor,
        borderRightColor: otherBorderColor,
        'animation-duration': `${duration}ms`,
        'animation-timing-function': mode === 'semicircle' || mode === 'circle' ? timingFunction : ''
      }"
    >
      <block v-if="mode === 'spinner'">
        <!-- #ifndef APP-NVUE -->
        <view v-for="(item, index) in array12" :key="index" class="su-loading-icon__dot"></view>
        <!-- #endif -->
        <!-- #ifdef APP-NVUE -->
        <!-- 此组件内部图标部分无法设置宽高，即使通过width和height配置了也无效 -->
        <loading-indicator
          v-if="!webviewHide"
          class="su-loading-indicator"
          :animating="true"
          :style="{
            color: color,
            width: addUnit(size),
            height: addUnit(size)
          }"
        />
        <!-- #endif -->
      </block>
    </view>
    <text
      v-if="text"
      class="su-loading-icon__text"
      :style="{
        fontSize: addUnit(textSize),
        color: textColor
      }"
    >
      {{ text }}
    </text>
  </view>
</template>

<script>
import { props } from './props'
import { mpMixin } from '../../libs/mixin/mpMixin'
import { mixin } from '../../libs/mixin/mixin'
import { addUnit, addStyle } from '../../libs/function/index'
import { colorGradient } from '../../libs/function/colorGradient'
// #ifdef APP-NVUE
const animation = weex.requireModule('animation')
// #endif
/**
 * loading 加载动画
 * @description 警此组件为一个小动画，目前用在uView的loadmore加载更多和switch开关等组件的正在加载状态场景。
 * @tutorial https://suni.pages.dev/sun-uni/component/loading.html
 * @property {Boolean}			show			是否显示组件  (默认 true)
 * @property {String}			color			动画活动区域的颜色，只对 mode = flower 模式有效（默认color['su-tips-color']）
 * @property {String}			textColor		提示文本的颜色（默认color['su-tips-color']）
 * @property {Boolean}			vertical		文字和图标是否垂直排列 (默认 false )
 * @property {String}			mode			模式选择，见官网说明（默认 'circle' ）
 * @property {String | Number}	size			加载图标的大小，单位px （默认 24 ）
 * @property {String | Number}	textSize		文字大小（默认 15 ）
 * @property {String | Number}	text			文字内容
 * @property {String}			timingFunction	动画模式 （默认 'ease-in-out' ）
 * @property {String | Number}	duration		动画执行周期时间（默认 1200）
 * @property {String}			inactiveColor	mode=circle时的暗边颜色
 * @property {Object}			customStyle		定义需要用到的外部样式
 * @example <su-loading mode="circle"></su-loading>
 */
export default {
  name: 'su-loading-icon',
  mixins: [mpMixin, mixin, props],
  data() {
    return {
      // Array.form可以通过一个伪数组对象创建指定长度的数组
      // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from
      array12: Array.from({
        length: 12
      }),
      // 这里需要设置默认值为360，否则在安卓nvue上，会延迟一个duration周期后才执行
      // 在iOS nvue上，则会一开始默认执行两个周期的动画
      aniAngel: 360, // 动画旋转角度
      webviewHide: false, // 监听webview的状态，如果隐藏了页面，则停止动画，以免性能消耗
      loading: false // 是否运行中，针对nvue使用
    }
  },
  computed: {
    // 当为circle类型时，给其另外三边设置一个更轻一些的颜色
    // 之所以需要这么做的原因是，比如父组件传了color为红色，那么需要另外的三个边为浅红色
    // 而不能是固定的某一个其他颜色(因为这个固定的颜色可能浅蓝，导致效果没有那么细腻良好)
    otherBorderColor() {
      const lightColor = colorGradient(this.color, '#ffffff', 100)[80]
      if (this.mode === 'circle') {
        return this.inactiveColor ? this.inactiveColor : lightColor
      } else {
        return 'transparent'
      }
      // return this.mode === 'circle' ? this.inactiveColor ? this.inactiveColor : lightColor : 'transparent'
    }
  },
  watch: {
    show(n) {
      // nvue中，show为true，且为非loading状态，就重新执行动画模块
      // #ifdef APP-NVUE
      if (n && !this.loading) {
        setTimeout(() => {
          this.startAnimate()
        }, 30)
      }
      // #endif
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    addUnit,
    addStyle,
    init() {
      setTimeout(() => {
        // #ifdef APP-NVUE
        this.show && this.nvueAnimate()
        // #endif
        // #ifdef APP-PLUS
        this.show && this.addEventListenerToWebview()
        // #endif
      }, 20)
    },
    // 监听webview的显示与隐藏
    addEventListenerToWebview() {
      // webview的堆栈
      const pages = getCurrentPages()
      // 当前页面
      const page = pages[pages.length - 1]
      // 当前页面的webview实例
      const currentWebview = page.$getAppWebview()
      // 监听webview的显示与隐藏，从而停止或者开始动画(为了性能)
      currentWebview.addEventListener('hide', () => {
        this.webviewHide = true
      })
      currentWebview.addEventListener('show', () => {
        this.webviewHide = false
      })
    },
    // #ifdef APP-NVUE
    nvueAnimate() {
      // nvue下，非spinner类型时才需要旋转，因为nvue的spinner类型，使用了weex的
      // loading-indicator组件，自带旋转功能
      this.mode !== 'spinner' && this.startAnimate()
    },
    // 执行nvue的animate模块动画
    startAnimate() {
      this.loading = true
      const ani = this.$refs.ani
      if (!ani) return
      animation.transition(
        ani,
        {
          // 进行角度旋转
          styles: {
            transform: `rotate(${this.aniAngel}deg)`,
            transformOrigin: 'center center'
          },
          duration: this.duration,
          timingFunction: this.timingFunction
          // delay: 10
        },
        () => {
          // 每次增加360deg，为了让其重新旋转一周
          this.aniAngel += 360
          // 动画结束后，继续循环执行动画，需要同时判断webviewHide变量
          // nvue安卓，页面隐藏后依然会继续执行startAnimate方法
          this.show && !this.webviewHide ? this.startAnimate() : (this.loading = false)
        }
      )
    }
    // #endif
  }
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';
$su-loading-icon-color: #c8c9cc !default;
$su-loading-icon-text-margin-left: 4px !default;
$su-loading-icon-text-color: $su-content-color !default;
$su-loading-icon-text-font-size: 14px !default;
$su-loading-icon-text-line-height: 20px !default;
$su-loading-width: 30px !default;
$su-loading-height: 30px !default;
$su-loading-max-width: 100% !default;
$su-loading-max-height: 100% !default;
$su-loading-semicircle-border-width: 2px !default;
$su-loading-semicircle-border-color: transparent !default;
$su-loading-semicircle-border-top-right-radius: 100px !default;
$su-loading-semicircle-border-top-left-radius: 100px !default;
$su-loading-semicircle-border-bottom-left-radius: 100px !default;
$su-loading-semicircle-border-bottom-right-radiu: 100px !default;
$su-loading-semicircle-border-style: solid !default;
$su-loading-circle-border-top-right-radius: 100px !default;
$su-loading-circle-border-top-left-radius: 100px !default;
$su-loading-circle-border-bottom-left-radius: 100px !default;
$su-loading-circle-border-bottom-right-radiu: 100px !default;
$su-loading-circle-border-width: 2px !default;
$su-loading-circle-border-top-color: #e5e5e5 !default;
$su-loading-circle-border-right-color: $su-loading-circle-border-top-color !default;
$su-loading-circle-border-bottom-color: $su-loading-circle-border-top-color !default;
$su-loading-circle-border-left-color: $su-loading-circle-border-top-color !default;
$su-loading-circle-border-style: solid !default;
$su-loading-icon-host-font-size: 0px !default;
$su-loading-icon-host-line-height: 1 !default;
$su-loading-icon-vertical-margin: 6px 0 0 !default;
$su-loading-icon-dot-top: 0 !default;
$su-loading-icon-dot-left: 0 !default;
$su-loading-icon-dot-width: 100% !default;
$su-loading-icon-dot-height: 100% !default;
$su-loading-icon-dot-before-width: 2px !default;
$su-loading-icon-dot-before-height: 25% !default;
$su-loading-icon-dot-before-margin: 0 auto !default;
$su-loading-icon-dot-before-background-color: currentColor !default;
$su-loading-icon-dot-before-border-radius: 40% !default;

.su-loading-icon {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: $su-loading-icon-color;

  &__text {
    margin-left: $su-loading-icon-text-margin-left;
    color: $su-loading-icon-text-color;
    font-size: $su-loading-icon-text-font-size;
    line-height: $su-loading-icon-text-line-height;
  }

  &__spinner {
    width: $su-loading-width;
    height: $su-loading-height;
    position: relative;
    /* #ifndef APP-NVUE */
    box-sizing: border-box;
    max-width: $su-loading-max-width;
    max-height: $su-loading-max-height;
    animation: su-rotate 1s linear infinite;
    /* #endif */
  }

  &__spinner--semicircle {
    border-width: $su-loading-semicircle-border-width;
    border-color: $su-loading-semicircle-border-color;
    border-top-right-radius: $su-loading-semicircle-border-top-right-radius;
    border-top-left-radius: $su-loading-semicircle-border-top-left-radius;
    border-bottom-left-radius: $su-loading-semicircle-border-bottom-left-radius;
    border-bottom-right-radius: $su-loading-semicircle-border-bottom-right-radiu;
    border-style: $su-loading-semicircle-border-style;
  }

  &__spinner--circle {
    border-top-right-radius: $su-loading-circle-border-top-right-radius;
    border-top-left-radius: $su-loading-circle-border-top-left-radius;
    border-bottom-left-radius: $su-loading-circle-border-bottom-left-radius;
    border-bottom-right-radius: $su-loading-circle-border-bottom-right-radiu;
    border-width: $su-loading-circle-border-width;
    border-top-color: $su-loading-circle-border-top-color;
    border-right-color: $su-loading-circle-border-right-color;
    border-bottom-color: $su-loading-circle-border-bottom-color;
    border-left-color: $su-loading-circle-border-left-color;
    border-style: $su-loading-circle-border-style;
  }

  &--vertical {
    flex-direction: column;
  }
}

/* #ifndef APP-NVUE */
:host {
  font-size: $su-loading-icon-host-font-size;
  line-height: $su-loading-icon-host-line-height;
}

.su-loading-icon {
  &__spinner--spinner {
    animation-timing-function: steps(12);
  }

  &__text:empty {
    display: none;
  }

  &--vertical &__text {
    margin: $su-loading-icon-vertical-margin;
    color: $su-content-color;
  }

  &__dot {
    position: absolute;
    top: $su-loading-icon-dot-top;
    left: $su-loading-icon-dot-left;
    width: $su-loading-icon-dot-width;
    height: $su-loading-icon-dot-height;

    &:before {
      /* #ifndef APP-NVUE */
      display: block;
      /* #endif */
      width: $su-loading-icon-dot-before-width;
      height: $su-loading-icon-dot-before-height;
      margin: $su-loading-icon-dot-before-margin;
      background-color: $su-loading-icon-dot-before-background-color;
      border-radius: $su-loading-icon-dot-before-border-radius;
      content: ' ';
    }
  }
}

@for $i from 1 through 12 {
  .su-loading-icon__dot:nth-of-type(#{$i}) {
    transform: rotate($i * 30deg);
    opacity: 1 - 0.0625 * ($i - 1);
  }
}

@keyframes su-rotate {
  0% {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(1turn);
  }
}

/* #endif */
</style>
