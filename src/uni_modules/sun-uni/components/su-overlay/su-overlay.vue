<template>
  <su-transition :show="show" custom-class="su-overlay" :duration="duration" :custom-style="overlayStyle" @click="clickHandler">
    <slot />
  </su-transition>
</template>

<script>
import { props } from './props'
import { mpMixin } from '../../libs/mixin/mpMixin'
import { mixin } from '../../libs/mixin/mixin'
import { addStyle, deepMerge } from '../../libs/function/index'
/**
 * overlay 遮罩
 * @description 创建一个遮罩层，用于强调特定的页面元素，并阻止用户对遮罩下层的内容进行操作，一般用于弹窗场景
 * @tutorial https://suni.pages.dev/sun-uni/component/overlay.html
 * @property {Boolean}			show		是否显示遮罩（默认 false ）
 * @property {String | Number}	zIndex		zIndex 层级（默认 10070 ）
 * @property {String | Number}	duration	动画时长，单位毫秒（默认 300 ）
 * @property {String | Number}	opacity		不透明度值，当做rgba的第四个参数 （默认 0.5 ）
 * @property {Object}			customStyle	定义需要用到的外部样式
 * @event {Function} click 点击遮罩发送事件
 * @example <su-overlay :show="show" @click="show = false"></su-overlay>
 */
export default {
  name: 'su-overlay',
  mixins: [mpMixin, mixin, props],
  computed: {
    overlayStyle() {
      const style = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: this.zIndex,
        bottom: 0,
        'background-color': `rgba(0, 0, 0, ${this.opacity})`
      }
      return deepMerge(style, addStyle(this.customStyle))
    }
  },
  emits: ['click'],
  methods: {
    clickHandler() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';
$su-overlay-top: 0 !default;
$su-overlay-left: 0 !default;
$su-overlay-width: 100% !default;
$su-overlay-height: 100% !default;
$su-overlay-background-color: rgba(0, 0, 0, 0.7) !default;
.su-overlay {
  position: fixed;
  top: $su-overlay-top;
  left: $su-overlay-left;
  width: $su-overlay-width;
  height: $su-overlay-height;
  background-color: $su-overlay-background-color;
}
</style>
