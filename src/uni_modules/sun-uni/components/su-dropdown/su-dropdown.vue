<template>
  <view class="su-dropdown">
    <view
      class="su-dropdown__menu"
      :style="{
        height: addUnit(height)
      }"
      :class="{
        'su-border-bottom': borderBottom
      }"
      ref="dropdownMenuRef"
    >
      <view class="su-dropdown__menu__item" v-for="(item, index) in menuList" :key="index" @tap.stop="menuClick(index)">
        <view class="su-flex su-flex-row">
          <text
            class="su-dropdown__menu__item__text"
            :style="{
              color: item.disabled ? '#c0c4cc' : index === current || highlightIndex == index ? activeColor : inactiveColor,
              fontSize: addUnit(titleSize)
            }"
          >
            {{ item.title }}
          </text>
          <view
            class="su-dropdown__menu__item__arrow"
            :class="{
              'su-dropdown__menu__item__arrow--rotate': index === current
            }"
          >
            <su-icon
              :custom-style="{ display: 'flex' }"
              :name="menuIcon"
              :size="addUnit(menuIconSize)"
              :color="index === current || highlightIndex == index ? activeColor : '#c0c4cc'"
            ></su-icon>
          </view>
        </view>
      </view>
    </view>
    <view
      class="su-dropdown__content"
      :style="[
        contentStyle,
        {
          transition: `opacity ${Number(duration) / 1000}s linear`,
          top: addUnit(height),
          height: contentHeight + 'px'
        }
      ]"
      @tap="maskClick"
      @touchmove.stop.prevent
    >
      <view @tap.stop.prevent class="su-dropdown__content__popup" :style="[popupStyle]">
        <slot></slot>
      </view>
      <view class="su-dropdown__content__mask"></view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { DROPDOWN_KEY, dropdownProps } from './props'
import { addUnit, getWindowInfo } from '../../libs/function/index'
import { computed, onMounted, ref, unref, type CSSProperties, getCurrentInstance } from 'vue'
import { useChildren } from '../../hooks/core/useChildren'
import type { SuUni } from '../../types/uni'
import { useSelectorQuery } from '../../hooks/core/useSelectorQuery'
/**
 * dropdown 下拉菜单
 * @description 该组件一般用于向下展开菜单，同时可切换多个选项卡的场景
 * @tutorial https://suni.pages.dev/sun-uni/component/dropdown.html
 * @property {String} active-color 标题和选项卡选中的颜色（默认#2979ff）
 * @property {String} inactive-color 标题和选项卡未选中的颜色（默认#606266）
 * @property {Boolean} close-on-click-mask 点击遮罩是否关闭菜单（默认true）
 * @property {Boolean} close-on-click-self 点击当前激活项标题是否关闭菜单（默认true）
 * @property {String | Number} duration 选项卡展开和收起的过渡时间，单位ms（默认300）
 * @property {String | Number} height 标题菜单的高度，单位任意（默认80）
 * @property {String | Number} border-radius 菜单展开内容下方的圆角值，单位任意（默认0）
 * @property {Boolean} border-bottom 标题菜单是否显示下边框（默认false）
 * @property {String | Number} title-size 标题的字体大小，单位任意，数值默认为rpx单位（默认28）
 * @event {Function} open 下拉菜单被打开时触发
 * @event {Function} close 下拉菜单被关闭时触发
 * @example <su-dropdown></su-dropdown>
 */
defineOptions({
  name: 'su-dropdown',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps(dropdownProps)
const emit = defineEmits(['open', 'close'])

// 显示的菜单
const menuList = ref<SuUni.Recordable[]>([])
// 下拉菜单的状态
const active = ref(false)
// 当前是第几个菜单处于激活状态，小程序中此处不能写成false或者""，否则后续将current赋值为0，
// 无能的TX没有使用===而是使用==判断，导致程序认为前后二者没有变化，从而不会触发视图更新
const current = ref(99999)
// 外层内容的样式，初始时处于底层，且透明
const contentStyle = ref<CSSProperties>({
  zIndex: -1,
  opacity: 0
})
// 让某个菜单保持高亮的状态
const highlightIndex = ref(9999)
// 内容高度
const contentHeight = ref(0)
const dropdownMenuRef = ref<UniApp.NodesRef>()

const { internalChildren, linkChildren } = useChildren(DROPDOWN_KEY)
const instance = getCurrentInstance()

/** 获取节点布局信息的方法 */
const { getBoundingClientRect } = useSelectorQuery()

linkChildren({
  init,
  activeColor: props.activeColor,
  inactiveColor: props.inactiveColor,
  setMenuList,
  close
})

const popupStyle = computed(() => {
  let style: CSSProperties = {}
  // 进行Y轴位移，展开状态时，恢复原位。收齐状态时，往上位移100%，进行隐藏
  style.transform = `translateY(${unref(active) ? 0 : '-100%'})`
  style['transition-duration'] = Number(props.duration) / 1000 + 's'
  style.borderRadius = `0 0 ${addUnit(props.borderRadius)} ${addUnit(props.borderRadius)}`
  return style
})

/**
 * 初始化函数
 * @description 当某个子组件内容变化时，触发父组件的init，父组件再让每一个子组件重新初始化一遍，以保证数据的正确性
 */
function init() {
  // 清空菜单列表
  menuList.value = []
  // 遍历所有子组件，调用子组件的 init 方法进行初始化
  internalChildren.forEach((child) => {
    child.exposed && child.exposed.init()
  })
}

/**
 * 菜单点击事件处理函数
 * @param {number} index - 点击的菜单索引
 * @description 判断点击的菜单是否被禁用，若点击的是当前激活项且允许点击自身关闭菜单，则关闭菜单；否则打开菜单
 */
function menuClick(index: number) {
  // 判断是否被禁用
  if (unref(menuList)[index].disabled) return
  // 如果点击时的索引和当前激活项索引相同，意味着点击了激活项，需要收起下拉菜单
  if (index === unref(current) && props.closeOnClickSelf) {
    // 关闭菜单
    close()
    // 等动画结束后，再移除下拉菜单中的内容，否则直接移除，也就没有下拉菜单收起的效果了
    setTimeout(() => {
      // 设置对应子组件的激活状态为 false
      internalChildren[index].exposed && internalChildren[index].exposed.setActive(false)
    }, Number(props.duration))
    return
  }
  // 打开指定索引的菜单
  open(index)
}

/**
 * 打开菜单函数
 * @param {number} index - 要打开的菜单索引
 * @description 展开指定索引的菜单，设置下拉内容的样式，更新激活状态和当前激活项索引，并触发 open 事件
 */
function open(index: number) {
  // 嵌套popup使用时可能获取不到正确的高度，重新计算
  if (unref(contentHeight) < 1) getContentHeight()
  // 展开时，设置下拉内容的样式
  contentStyle.value = {
    zIndex: 11
  }
  // 设置菜单为激活状态
  active.value = true
  // 更新当前激活的菜单索引
  current.value = index
  // 遍历所有子组件，设置对应子组件的激活状态
  internalChildren.forEach((child, idx) => {
    child.exposed && child.exposed.setActive(index == idx ? true : false)
  })
  // 触发 open 事件，传递当前激活的菜单索引
  emit('open', current.value)
}

/**
 * 关闭菜单函数
 * @description 关闭菜单，更新激活状态和当前激活项索引，设置下拉内容的样式，并触发 close 事件
 */
function close() {
  // 触发 close 事件，传递当前激活的菜单索引
  emit('close', current.value)
  // 设置菜单为非激活状态
  active.value = false
  // 将当前激活的菜单索引重置为一个较大的值
  current.value = 99999
  // 设置下拉内容的样式，使其隐藏
  contentStyle.value = {
    zIndex: -1,
    opacity: 0
  }
}

/**
 * 遮罩层点击事件处理函数
 * @description 若允许点击遮罩层关闭菜单，则关闭菜单
 */
function maskClick() {
  // 如果不允许点击遮罩关闭菜单，则直接返回
  if (!props.closeOnClickMask) return
  // 关闭菜单
  close()
}

/**
 * 外部手动设置某个菜单高亮函数
 * @param {number|undefined} index - 要高亮的菜单索引，默认为 undefined
 * @description 外部手动设置某个菜单高亮，若未传入索引，则取消高亮
 */
function highlight(index = undefined) {
  // 设置高亮索引，若未传入索引则设置为一个较大的值
  highlightIndex.value = index !== undefined ? index : 99999
}

/**
 * 获取下拉菜单内容的高度函数
 * @description 计算下拉菜单内容的高度，使遮罩层能占满菜单以下直到屏幕底部的高度
 */
function getContentHeight() {
  // 这里的原理为，因为dropdown组件是相对定位的，它的下拉出来的内容，必须给定一个高度
  // 才能让遮罩占满菜单一下，直到屏幕底部的高度
  // getWindowInfo()为uview-plus封装的获取设备信息的方法
  let windowHeight = getWindowInfo().windowHeight || 0
  // #ifndef APP-NVUE
  // 在非 APP-NVUE 环境下，使用 uni.createSelectorQuery 获取菜单的位置信息
  uni
    .createSelectorQuery()
    .in(instance?.proxy)
    .select('.su-dropdown__menu')
    .boundingClientRect((size) => {
      // 计算并设置下拉内容的高度
      contentHeight.value = windowHeight - ((size as UniApp.NodeInfo).bottom || 0)
    })
    .exec()

  // #endif
  // #ifdef APP-NVUE
  // 在 APP-NVUE 环境下，使用 getBoundingClientRect 获取菜单的位置信息
  getBoundingClientRect(unref(dropdownMenuRef)!).then((data) => {
    // 计算并设置下拉内容的高度
    contentHeight.value = windowHeight - (data.bottom || 0)
  })
  // #endif
}

/**
 * 设置菜单列表函数
 * @param {SuUni.Recordable} opt - 要添加到菜单列表的选项
 * @description 向菜单列表中添加一个选项
 */
function setMenuList(opt: SuUni.Recordable) {
  // 将选项添加到菜单列表中
  menuList.value.push(opt)
}

onMounted(() => {
  getContentHeight()
})

defineExpose({
  close,
  highlight,
})
</script>

<style scoped lang="scss">
@import '../../libs/css/components.scss';

.su-dropdown {
  flex: 1;
  width: 100%;
  position: relative;

  &__menu {
    @include flex;
    position: relative;
    z-index: 11;
    height: 80rpx;

    &__item {
      flex: 1;
      @include flex;
      justify-content: center;
      align-items: center;

      .su-flex-row {
        flex-direction: row;
      }

      &__text {
        font-size: 28rpx;
        color: $su-content-color;
      }

      &__arrow {
        margin-left: 6rpx;
        transition: transform 0.3s;
        align-items: center;
        @include flex;

        &--rotate {
          transform: rotate(180deg);
        }
      }
    }
  }

  &__content {
    position: absolute;
    z-index: 8;
    width: 100%;
    left: 0px;
    bottom: 0;
    overflow: hidden;

    &__mask {
      position: absolute;
      z-index: 9;
      background: rgba(0, 0, 0, 0.3);
      width: 100%;
      left: 0;
      top: 0;
      bottom: 0;
    }

    &__popup {
      position: relative;
      z-index: 10;
      transition: transform 0.3s;
      transform: translate3D(0, -100%, 0);
      overflow: hidden;
    }
  }
}
</style>
