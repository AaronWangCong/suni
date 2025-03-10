<template>
  <view
    class="su-search"
    @tap="clickHandler"
    :style="[
      {
        margin: margin
      },
      addStyle(customStyle)
    ]"
  >
    <view
      class="su-search__content"
      :style="{
        backgroundColor: bgColor,
        borderRadius: shape && shape === 'round' ? '100px' : '4px',
        borderColor: borderColor
      }"
    >
      <template v-if="$slots.label || label !== null">
        <slot name="label">
          <text class="su-search__content__label">{{ label }}</text>
        </slot>
      </template>
      <view class="su-search__content__icon">
        <su-icon @tap="clickIcon" :size="searchIconSize" :name="searchIcon" :color="searchIconColor ? searchIconColor : color"></su-icon>
      </view>
      <input
        confirm-type="search"
        @blur="blur"
        :value="keyword"
        @confirm="search"
        @input="inputChange"
        :disabled="disabled"
        @focus="getFocus"
        :focus="focus"
        :maxlength="Number(maxlength)"
        :adjust-position="adjustPosition"
        :auto-blur="autoBlur"
        placeholder-class="su-search__content__input--placeholder"
        :placeholder="placeholder"
        :placeholder-style="`color: ${placeholderColor}`"
        class="su-search__content__input"
        type="text"
        :style="[
          {
            textAlign: inputAlign,
            color: color,
            backgroundColor: bgColor,
            height: addUnit(height)
          },
          inputStyle
        ]"
      />
      <view class="su-search__content__icon su-search__content__close" v-if="keyword && clearable && focused" @click="clear">
        <su-icon name="close" size="11" color="#ffffff" customStyle="line-height: 12px"></su-icon>
      </view>
    </view>
    <text
      :style="[actionStyle]"
      class="su-search__action"
      :class="[(showActionBtn || show) && 'su-search__action--active']"
      @tap.stop.prevent="custom"
    >
      {{ actionText }}
    </text>
  </view>
</template>

<script lang="ts" setup>
import { searchProps } from './props'
import { addUnit, addStyle } from '../../libs/function/index'
import { baseProps } from '../../libs/vue'
import { computed, ref, watch } from 'vue'
import { watchEffect } from 'vue'
/**
 * search 搜索框
 * @description 搜索组件，集成了常见搜索框所需功能，用户可以一键引入，开箱即用。
 * @tutorial https://suni.pages.dev/sun-uni/component/search.html
 * @property {String}			shape				搜索框形状，round-圆形，square-方形（默认 'round' ）
 * @property {String}			bgColor				搜索框背景颜色（默认 '#f2f2f2' ）
 * @property {String}			placeholder			占位文字内容（默认 '请输入关键字' ）
 * @property {Boolean}			clearabled			是否启用清除控件（默认 true ）
 * @property {Boolean}			focus				是否自动获得焦点（默认 false ）
 * @property {Boolean}			showAction			是否显示右侧控件（默认 true ）
 * @property {Object}			actionStyle			右侧控件的样式，对象形式
 * @property {String}			actionText			右侧控件文字（默认 '搜索' ）
 * @property {String}			inputAlign			输入框内容水平对齐方式 （默认 'left' ）
 * @property {Object}			inputStyle			自定义输入框样式，对象形式
 * @property {Boolean}			disabled			是否启用输入框（默认 false ）
 * @property {String}			borderColor			边框颜色，配置了颜色，才会有边框 (默认 'transparent' )
 * @property {String}			searchIconColor		搜索图标的颜色，默认同输入框字体颜色 (默认 '#909399' )
 * @property {Number | String}	searchIconSize 搜索图标的字体，默认22
 * @property {String}			color				输入框字体颜色（默认 '#606266' ）
 * @property {String}			placeholderColor	placeholder的颜色（默认 '#909399' ）
 * @property {String}			searchIcon			输入框左边的图标，可以为uView图标名称或图片路径  (默认 'search' )
 * @property {String}			margin				组件与其他上下左右元素之间的距离，带单位的字符串形式，如"30px"   (默认 '0' )
 * @property {Boolean} 			animation			是否开启动画，见上方说明（默认 false ）
 * @property {String}			value				输入框初始值
 * @property {String | Number}	maxlength			输入框最大能输入的长度，-1为不限制长度  (默认 '-1' )
 * @property {String | Number}	height				输入框高度，单位px（默认 64 ）
 * @property {String | Number}	label				搜索框左边显示内容
 * @property {Boolean}	        adjustPosition	    键盘弹起时，是否自动上推页面
 * @property {Boolean}	        autoBlur	        键盘收起时，是否自动失去焦点
 * @property {Object}			customStyle			定义需要用到的外部样式
 *
 * @event {Function} change 输入框内容发生变化时触发
 * @event {Function} search 用户确定搜索时触发，用户按回车键，或者手机键盘右下角的"搜索"键时触发
 * @event {Function} custom 用户点击右侧控件时触发
 * @event {Function} clear 用户点击清除按钮时触发
 * @example <su-search placeholder="日照香炉生紫烟" v-model="keyword"></su-search>
 */

defineOptions({
  name: 'su-search',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps({
  ...searchProps,
  ...baseProps
})

const emit = defineEmits(['clear', 'search', 'custom', 'input', 'focus', 'blur', 'click', 'clickIcon', 'update:modelValue', 'change'])
/**
 * 用于存储搜索框的关键字
 */
const keyword = ref('')
/**
 * 用于控制搜索框的显示状态
 */
const show = ref(false)
/**
 * 用于控制搜索框是否获得焦点
 */
const focused = ref(false)

/**
 * 计算属性，用于判断是否显示右侧控件
 * @returns {Boolean} 如果没有动画且显示右侧控件，则返回true，否则返回false
 */
const showActionBtn = computed(() => !props.animation && props.showAction)

/**
 * 监听关键字的变化
 * @param {String} val - 关键字的值
 */
watch(
  () => keyword.value,
  (val) => {
    // #ifdef VUE3
    emit('update:modelValue', val)
    // #endif
    // #ifdef VUE2
    emit('input', val)
    // #endif
    // 触发change事件，事件效果和v-model双向绑定的效果一样，让用户多一个选择
    emit('change', val)
  }
)

watchEffect(() => {
  // #ifdef VUE3
  keyword.value = props.modelValue || ''
  // #endif
  // #ifdef VUE2
  keyword.value = props.value || ''
  // #endif
})

/**
 * 目前HX2.6.9 v-model双向绑定无效，故监听input事件获取输入框内容的变化
 * @param {UniHelper.InputOnInputEvent} e - 输入框的输入事件
 */
function inputChange(e: UniHelper.InputOnInputEvent) {
  keyword.value = e.detail!.value
}

/**
 * 清除输入框的内容
 */
function clear() {
  keyword.value = ''
  emit('clear')
}

/**
 * 执行搜索操作
 */
function search() {
  emit('search', keyword.value)
  try {
    // 收起键盘
    uni.hideKeyboard()
  } catch (e) {}
}

/**
 * 执行自定义操作
 */
function custom() {
  emit('custom', keyword.value)
  try {
    // 收起键盘
    uni.hideKeyboard()
  } catch (e) {}
}

/**
 * 获取焦点
 */
function getFocus() {
  focused.value = true
  if (props.animation && props.showAction) show.value = true
  emit('focus', keyword.value)
}

/**
 * 失去焦点
 */
function blur() {
  // 最开始使用的是监听图标@touchstart事件，自从hx2.8.4后，此方法在微信小程序出错
  // 这里改为监听点击事件，手点击清除图标时，同时也发生了@blur事件，导致图标消失而无法点击，这里做一个延时
  setTimeout(() => {
    focused.value = false
  }, 100)
  show.value = false
  emit('blur', keyword.value)
}

/**
 * 处理点击事件
 */
function clickHandler() {
  if (props.disabled) emit('click')
}

/**
 * 处理点击图标事件
 */
function clickIcon() {
  emit('clickIcon', keyword.value)
  try {
    // 收起键盘
    uni.hideKeyboard()
  } catch (e) {}
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';
$su-search-content-padding: 0 10px !default;
$su-search-label-color: $su-main-color !default;
$su-search-label-font-size: 14px !default;
$su-search-label-margin: 0 4px !default;
$su-search-close-size: 20px !default;
$su-search-close-radius: 100px !default;
$su-search-close-bgColor: #c6c7cb !default;
$su-search-close-transform: scale(0.82) !default;
$su-search-input-font-size: 14px !default;
$su-search-input-margin: 0 5px !default;
$su-search-input-color: $su-main-color !default;
$su-search-input-placeholder-color: $su-tips-color !default;
$su-search-action-font-size: 14px !default;
$su-search-action-color: $su-main-color !default;
$su-search-action-width: 0 !default;
$su-search-action-active-width: 40px !default;
$su-search-action-margin-left: 5px !default;

/* #ifdef H5 */
// iOS15在H5下，hx的某些版本，input type=search时，会多了一个搜索图标，进行移除
[type='search']::-webkit-search-decoration {
  display: none;
}
/* #endif */

.su-search {
  @include flex(row);
  align-items: center;
  flex: 1;

  &__content {
    @include flex;
    align-items: center;
    padding: $su-search-content-padding;
    flex: 1;
    justify-content: space-between;
    border-width: 1px;
    border-color: transparent;
    border-style: solid;
    overflow: hidden;

    &__icon {
      @include flex;
      align-items: center;
    }

    &__label {
      color: $su-search-label-color;
      font-size: $su-search-label-font-size;
      margin: $su-search-label-margin;
    }

    &__close {
      width: $su-search-close-size;
      height: $su-search-close-size;
      border-top-left-radius: $su-search-close-radius;
      border-top-right-radius: $su-search-close-radius;
      border-bottom-left-radius: $su-search-close-radius;
      border-bottom-right-radius: $su-search-close-radius;
      background-color: $su-search-close-bgColor;
      @include flex(row);
      align-items: center;
      justify-content: center;
      transform: $su-search-close-transform;
    }

    &__input {
      flex: 1;
      font-size: $su-search-input-font-size;
      line-height: 1;
      margin: $su-search-input-margin;
      color: $su-search-input-color;

      &--placeholder {
        color: $su-search-input-placeholder-color;
      }
    }
  }

  &__action {
    font-size: $su-search-action-font-size;
    color: $su-search-action-color;
    width: $su-search-action-width;
    overflow: hidden;
    transition-property: width;
    transition-duration: 0.3s;
    /* #ifndef APP-NVUE */
    white-space: nowrap;
    /* #endif */
    text-align: center;

    &--active {
      width: $su-search-action-active-width;
      margin-left: $su-search-action-margin-left;
    }
  }
}
</style>
