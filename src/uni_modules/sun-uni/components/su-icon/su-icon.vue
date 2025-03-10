<template>
  <view class="su-icon" @tap="clickHandler" :class="['su-icon--' + labelPos]">
    <image class="su-icon__img" v-if="isImg" :src="name" :mode="imgMode" :style="[imgStyle, addStyle(customStyle)]"></image>
    <text v-else class="su-icon__icon" :class="uClasses" :style="[iconStyle, addStyle(customStyle)]" :hover-class="hoverClass">{{ icon }}</text>
    <!-- 这里进行空字符串判断，如果仅仅是v-if="label"，可能会出现传递0的时候，结果也无法显示 -->
    <text
      v-if="label !== ''"
      class="su-icon__label"
      :style="{
        color: labelColor,
        fontSize: addUnit(labelSize),
        marginLeft: labelPos == 'right' ? addUnit(space) : 0,
        marginTop: labelPos == 'bottom' ? addUnit(space) : 0,
        marginRight: labelPos == 'left' ? addUnit(space) : 0,
        marginBottom: labelPos == 'top' ? addUnit(space) : 0
      }"
    >
      {{ label }}
    </text>
  </view>
</template>

<script lang="ts" setup>
// #ifdef APP-NVUE
// nvue通过weex的dom模块引入字体，相关文档地址如下：
// https://weex.apache.org/zh/docs/modules/dom.html#addrule
const fontUrl = 'https://ylw-common.oss-cn-shenzhen.aliyuncs.com/sun_uni_iconfont.ttf'
// @ts-ignore
const domModule = weex.requireModule('dom')
domModule.addRule('fontFace', {
  fontFamily: 'uicon-iconfont',
  src: `url('${fontUrl}')`
})
// #endif

// 引入图标名称，已经对应的unicode
import icons from './icons'
import { iconProps } from './props'
import { addUnit, addStyle } from '../../libs/function/index'
import config from '../../libs/config/config'
import { baseProps } from '../../libs/vue'
import { computed, type CSSProperties, getCurrentInstance } from 'vue'
import type { SuUni } from '../../types/uni';

/**
 * icon 图标
 * @description 基于字体的图标集，包含了大多数常见场景的图标。
 * @tutorial https://suni.pages.dev/sun-uni/component/icon.html
 * @property {String}			name			图标名称，见示例图标集
 * @property {String}			color			图标颜色,可接受主题色 （默认 color['su-content-color'] ）
 * @property {String | Number}	size			图标字体大小，单位px （默认 '16px' ）
 * @property {Boolean}			bold			是否显示粗体 （默认 false ）
 * @property {String | Number}	index			点击图标的时候传递事件出去的index（用于区分点击了哪一个）
 * @property {String}			hoverClass		图标按下去的样式类，用法同uni的view组件的hoverClass参数，详情见官网
 * @property {String}			customPrefix	自定义扩展前缀，方便用户扩展自己的图标库 （默认 'uicon' ）
 * @property {String | Number}	label			图标右侧的label文字
 * @property {String}			labelPos		label相对于图标的位置，只能right或bottom （默认 'right' ）
 * @property {String | Number}	labelSize		label字体大小，单位px （默认 '15px' ）
 * @property {String}			labelColor		图标右侧的label文字颜色 （ 默认 color['su-content-color'] ）
 * @property {String | Number}	space			label与图标的距离，单位px （默认 '3px' ）
 * @property {String}			imgMode			图片的mode
 * @property {String | Number}	width			显示图片小图标时的宽度
 * @property {String | Number}	height			显示图片小图标时的高度
 * @property {String | Number}	top				图标在垂直方向上的定位 用于解决某些情况下，让图标垂直居中的用途  （默认 0 ）
 * @property {Boolean}			stop			是否阻止事件传播 （默认 false ）
 * @property {Object}			customStyle		icon的样式，对象形式
 * @event {Function} click 点击图标时触发
 * @event {Function} touchstart 事件触摸时触发
 * @example <su-icon name="photo" color="#2979ff" size="28"></su-icon>
 */

defineOptions({
  name: 'su-icon',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps({
  ...iconProps,
  ...baseProps
})

const emit = defineEmits(['click'])

/** 获取class */
const uClasses = computed(() => {
  let classes: string[] = []
  classes.push(props.customPrefix + '-' + props.name)

  // sun-uni的自定义图标类名为u-iconfont
  if (props.customPrefix === 'uicon') {
    classes.push('su-iconfont')
  } else {
    // 不能缺少这一步，否则自定义图标会无效
    classes.push(props.customPrefix!)
  }

  // 主题色，通过类配置
  if (props.color && config.type.includes(props.color)) {
    classes.push('su-icon__icon--' + props.color)
  }

  // 阿里，头条，百度小程序通过数组绑定类名时，无法直接使用[a, b, c]的形式，否则无法识别
  // 故需将其拆成一个字符串的形式，通过空格隔开各个类名
  //#ifdef MP-ALIPAY || MP-TOUTIAO || MP-BAIDU
  return classes.join(' ')
  //#endif

  return classes
})

/** icon 样式 */
const iconStyle = computed(() => {
  let style: CSSProperties = {
    fontSize: addUnit(props.size),
    lineHeight: addUnit(props.size),
    fontWeight: props.bold ? 'bold' : 'normal',
    // 某些特殊情况需要设置一个到顶部的距离，才能更好的垂直居中
    top: addUnit(props.top)
  }

  // 非主题色值时，才当作颜色值
  if (props.color && !config.type.includes(props.color)) style.color = props.color
  return style
})

/** 判断传入的name属性，是否图片路径，只要带有"/"均认为是图片形式 */
const isImg = computed(() => props.name?.indexOf('/') !== -1)

/** img 样式 */
const imgStyle = computed(() => {
  let style: CSSProperties = {}
  // 如果设置width和height属性，则优先使用，否则使用size属性
  style.width = props.width ? addUnit(props.width) : addUnit(props.size)
  style.height = props.height ? addUnit(props.height) : addUnit(props.size)
  return style
})

/** icon */
const icon = computed(() => {
  // 使用自定义图标的时候页面上会把name属性也展示出来，所以在这里处理一下
  if (props.customPrefix !== 'uicon') return ''
  // 如果内置的图标中找不到对应的图标，就直接返回name值，因为用户可能传入的是unicode代码
  return (icons as SuUni.Recordable)['uicon-' + props.name!] || props.name
})

/** 点击事件 */
function clickHandler(e: SuUni.Recordable) {
  emit('click', props.index)
  props.stop && e.stopPropagation()
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';

// 变量定义
$su-icon-primary: $su-primary !default;
$su-icon-success: $su-success !default;
$su-icon-info: $su-info !default;
$su-icon-warning: $su-warning !default;
$su-icon-error: $su-error !default;
$su-icon-label-line-height: 1 !default;

/* #ifndef APP-NVUE */
// 非nvue下加载字体
@font-face {
  font-family: 'uicon-iconfont';
  src: url('https://ylw-common.oss-cn-shenzhen.aliyuncs.com/sun_uni_iconfont.ttf') format('truetype');
}

/* #endif */

.su-icon {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  align-items: center;

  &--left {
    flex-direction: row-reverse;
    align-items: center;
  }

  &--right {
    flex-direction: row;
    align-items: center;
  }

  &--top {
    flex-direction: column-reverse;
    justify-content: center;
  }

  &--bottom {
    flex-direction: column;
    justify-content: center;
  }

  &__icon {
    font-family: uicon-iconfont;
    position: relative;
    @include flex;
    align-items: center;

    &--primary {
      color: $su-icon-primary;
    }

    &--success {
      color: $su-icon-success;
    }

    &--error {
      color: $su-icon-error;
    }

    &--warning {
      color: $su-icon-warning;
    }

    &--info {
      color: $su-icon-info;
    }
  }

  &__img {
    /* #ifndef APP-NVUE */
    height: auto;
    will-change: transform;
    /* #endif */
  }

  &__label {
    /* #ifndef APP-NVUE */
    line-height: $su-icon-label-line-height;
    /* #endif */
  }
}
</style>
