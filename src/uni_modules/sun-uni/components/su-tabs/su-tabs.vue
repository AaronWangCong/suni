<script setup lang="ts">
// #ifdef APP-NVUE
const animation = uni.requireNativePlugin('animation')
// const dom = uni.requireNativePlugin('dom')
// #endif
import { tabsProps } from './props'
import { mpMixin } from '../../libs/mixin/mpMixin'
import defProps from '../../libs/config/props'
import { computed, nextTick, reactive, ref, unref, watch, getCurrentInstance, type CSSProperties } from 'vue'
import { addStyle, deepMerge, addUnit, getPx, sleep } from '../../libs/function'
import type { SuUni } from '../../types/uni'
import { useSelectorQuery } from '../../hooks/core/useSelectorQuery'
import { baseProps } from '../../libs/vue'

defineOptions({
  name: 'su-tabs',
  mixins: [mpMixin]
})

/** 合并 tabsProps 和 baseProps 以定义组件的属性 */
const props = defineProps({
  ...tabsProps,
  ...baseProps
})

const emit = defineEmits(['click', 'longPress', 'change', 'update:current'])

/** 初始化状态变量 */
const firstTime = ref(false)
/** 左移动的距离 */
const scrollLeft = ref(0)
/** 左移动的 view 的宽度  */
const scrollViewWidth = ref(0)
/** 移动的线距离左边的距离 */
const lineOffsetLeft = ref(0)
/**  tabs 容器的布局信息  */
const tabsRect = reactive<UniApp.NodeInfo>({
  left: 0
})
/** 当前选中的哪一项 */
const innerCurrent = ref(0)
const tabsList = ref<SuUni.Recordable[]>(props.list || [])

/** 获取当前组件实例的代理对象 */
const { proxy } = getCurrentInstance() as any

/** 获取节点布局信息的方法 */
const { getBoundingClientRect } = useSelectorQuery()

/** 计算文本样式的函数 */
const textStyle = computed(() => {
  return (index: number) => {
    const style: CSSProperties = {}
    // 取当期是否激活的样式
    const customeStyle = index === innerCurrent.value ? addStyle(props.activeStyle!) : addStyle(props.inactiveStyle!)
    // 如果当前菜单被禁用，则加上对应颜色，需要在此做处理，是因为nvue下，无法在style样式中通过!import覆盖标签的内联样式
    if (unref(tabsList)[index].disabled) {
      style.color = '#c8c9cc'
    }
    return deepMerge(customeStyle as CSSProperties, style)
  }
})

/** 计算徽标样式的函数 */
const propsBadge = computed(() => defProps.badge)

/** 设置滑动线左边距的函数 */
function setLineLeft() {
  const tabItem = unref(tabsList)[unref(innerCurrent)]
  if (!tabItem) return
  let lOfferLeft = unref(tabsList)
    .slice(0, unref(innerCurrent))
    .reduce((total, curr) => total + curr.rect.width, 0)
  const lwidth = getPx(`${props.lineWidth}`)
  lineOffsetLeft.value = lOfferLeft + (tabItem.rect.width - +lwidth) / 2
  // #ifdef APP-NVUE

  // 第一次移动滑块，无需过渡时间
  animatioFunc(unref(lineOffsetLeft), unref(firstTime) ? 0 : parseInt(`${props.duration}`))
  // #endif
  if (unref(firstTime)) {
    setTimeout(() => {
      firstTime.value = false
    }, 10)
  }
}

/** 执行动画的函数 */
function animatioFunc(left: number, duration = 0) {
  // #ifdef APP-NVUE
  const ref = proxy.$refs['su-tabs__wrapper__nav__line']
  animation.transition(ref, {
    styles: {
      transform: `translateX(${left}px)`
    },
    duration
  })
  // #endif
}

/** 处理点击事件的函数 */
function clickHandler(item: SuUni.Recordable, index: number) {
  const opt = {
    ...item,
    index
  }
  emit('click', opt, index)
  if (item.disabled) return
  innerCurrent.value = index
  emit('change', opt, index)
  emit('update:current', index)
  resize()
}

/** 处理长按事件的函数 */
function longPressHandler(item: SuUni.Recordable, index: number) {
  const opt = {
    ...item,
    index
  }
  emit('longPress', opt, index)
}
/** 设置滚动左边距的函数 */
function setScrollLeft() {
  if (unref(innerCurrent) < 0) innerCurrent.value = 0
  const tabItemRect = unref(tabsList)[innerCurrent.value]
  const OffLeft = unref(tabsList)
    .slice(0, unref(innerCurrent))
    .reduce((total, curr) => total + curr.rect.width, 0)

  const windowWidth = uni.getSystemInfoSync().windowWidth
  let sLeft = OffLeft - (tabsRect.width! - tabItemRect.rect.width) / 2 - (windowWidth - tabsRect.right!) / 2 + tabsRect.left! / 2
  sLeft = Math.min(sLeft, unref(scrollViewWidth) - tabsRect.width!)
  scrollLeft.value = Math.max(0, sLeft)
}

/** 监听窗口变化 */
function resize() {
  if (unref(tabsList).length === 0) return
  Promise.all([getTabsRect(), getAllItemRect()]).then((data) => {
    const [tRect, itemRect = []] = data
    if (tRect.left! > tRect.width!) {
      tRect.right = tRect.right! - Math.floor(tRect.left! / tRect.width!) * tRect.width!
      tRect.left = tRect.left! % tRect.width!
    }
    Object.assign(tabsRect, tRect)
    scrollViewWidth.value = 0

    itemRect.map((item, index) => {
      // 计算scroll-view的宽度，这里
      scrollViewWidth.value += item.width! || 0
      // 另外计算每一个item的中心点X轴坐标
      unref(tabsList)[index].rect = item
    })

    setLineLeft()
    setScrollLeft()
  })
}
/** 获取 tabs 容器的布局信息的函数 */
function getTabsRect(): Promise<UniApp.NodeInfo> {
  return new Promise((resolve) => {
    // #ifndef APP-NVUE
    uni
      .createSelectorQuery()
      .in(proxy)
      .select('.su-tabs__wrapper__scroll-view')
      .boundingClientRect((size) => {
        resolve(size as UniApp.NodeInfo)
      })
      .exec()
    // #endif

    // #ifdef APP-NVUE
    const ref = proxy.$refs['su-tabs__wrapper__scroll-view']
    getBoundingClientRect(ref).then((data) => {
      resolve(data as UniApp.NodeInfo)
    })
    // #endif
  })
}
/** 获取所有tab的布局信息的函数 */
function getAllItemRect(): Promise<UniApp.NodeInfo[]> {
  return new Promise((resolve) => {
    // #ifndef APP-NVUE
    uni
      .createSelectorQuery()
      .in(proxy)
      .selectAll('.su-tabs__wrapper__nav__item')
      .boundingClientRect((sizes) => {
        resolve(sizes as UniApp.NodeInfo[])
      })
      .exec()
    // #endif

    // #ifdef APP-NVUE
    const promiseArr = unref(tabsList).map((_, index) => {
      const ref = proxy.$refs[`su-tabs__wrapper__nav__item-${index}`][0]
      return getBoundingClientRect(ref)
    })
    Promise.all(promiseArr).then((data) => {
      resolve(data as UniApp.NodeInfo[])
    })
    // #endif
  })
}

/** 初始化 */
function init() {
  sleep().then(() => {
    resize()
  })
}

watch(
  () => props.list,
  () => {
    tabsList.value = props.list || []
    nextTick(() => {
      resize()
    })
  }
)

watch(
  () => props.current,
  (newValue) => {
    if (newValue !== innerCurrent.value) {
      if (typeof newValue == 'string') {
        innerCurrent.value = parseInt(newValue)
      } else {
        innerCurrent.value = newValue!
      }

      nextTick(() => {
        resize()
      })
    }
  },
  { immediate: true }
)

nextTick(() => {
  init()
})
</script>

<template>
  <view class="su-tabs" :class="[customClass]">
    <view class="su-tabs__wrapper">
      <slot name="left" />
      <view class="su-tabs__wrapper__scroll-view-wrapper">
        <scroll-view
          :scroll-x="scrollable"
          :scroll-left="scrollLeft"
          scroll-with-animation
          class="su-tabs__wrapper__scroll-view"
          :show-scrollbar="false"
          ref="su-tabs__wrapper__scroll-view"
        >
          <view class="su-tabs__wrapper__nav" ref="su-tabs__wrapper__nav">
            <view
              class="su-tabs__wrapper__nav__item"
              v-for="(item, index) in list"
              :key="index"
              @tap="clickHandler(item, index)"
              @longpress="longPressHandler(item, index)"
              :ref="`su-tabs__wrapper__nav__item-${index}`"
              :style="[addStyle(itemStyle!), { flex: scrollable ? '' : 1 }]"
              :class="[`su-tabs__wrapper__nav__item-${index}`, item.disabled && 'su-tabs__wrapper__nav__item--disabled']"
            >
              <slot v-if="$slots.content" name="content" :item="item" :keyName="keyName" :index="index" />
              <slot v-else-if="!$slots.content && ($slots.default || $slots.$default)" :item="item" :keyName="keyName" :index="index" />
              <text
                v-else
                :class="[item.disabled && 'su-tabs__wrapper__nav__item__text--disabled']"
                class="su-tabs__wrapper__nav__item__text"
                :style="[textStyle(index)]"
              >
                {{ item[keyName!] }}
              </text>
              <su-badge
                :show="!!(item.badge && (item.badge.show || item.badge.isDot || item.badge.value))"
                :isDot="(item.badge && item.badge.isDot) || propsBadge.isDot"
                :value="(item.badge && item.badge.value) || propsBadge.value"
                :max="(item.badge && item.badge.max) || propsBadge.max"
                :type="(item.badge && item.badge.type) || propsBadge.type"
                :showZero="(item.badge && item.badge.showZero) || propsBadge.showZero"
                :bgColor="(item.badge && item.badge.bgColor) || propsBadge.bgColor"
                :color="(item.badge && item.badge.color) || propsBadge.color"
                :shape="(item.badge && item.badge.shape) || propsBadge.shape"
                :numberType="(item.badge && item.badge.numberType) || propsBadge.numberType"
                :inverted="(item.badge && item.badge.inverted) || propsBadge.inverted"
                customStyle="margin-left: 4px;"
              ></su-badge>
            </view>
            <!-- #ifdef APP-NVUE -->
            <view
              class="su-tabs__wrapper__nav__line"
              ref="su-tabs__wrapper__nav__line"
              :style="[
                {
                  width: addUnit(lineWidth),
                  height: addUnit(lineHeight),
                  background: lineColor,
                  backgroundSize: lineBgSize
                }
              ]"
            ></view>
            <!-- #endif -->
            <!-- #ifndef APP-NVUE -->
            <view
              class="su-tabs__wrapper__nav__line"
              ref="su-tabs__wrapper__nav__line"
              :style="[
                {
                  width: addUnit(lineWidth),
                  transform: `translate(${lineOffsetLeft}px)`,
                  transitionDuration: `${firstTime ? 0 : duration}ms`,
                  height: addUnit(lineHeight),
                  background: lineColor,
                  backgroundSize: lineBgSize
                }
              ]"
            ></view>
            <!-- #endif -->
          </view>
        </scroll-view>
      </view>
      <slot name="right" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';

.su-tabs {
  &__wrapper {
    @include flex;
    align-items: center;

    &__scroll-view-wrapper {
      flex: 1;
      /* #ifndef APP-NVUE */
      overflow: auto hidden;
      /* #endif */
    }

    &__scroll-view {
      @include flex;
      flex: 1;
    }

    &__nav {
      @include flex;
      position: relative;

      &__item {
        padding: 0 11px;
        @include flex;
        align-items: center;
        justify-content: center;
        /* #ifdef H5 */
        cursor: pointer;
        /* #endif */

        &--disabled {
          /* #ifdef H5 */
          cursor: not-allowed;
          /* #endif */
        }

        &__text {
          font-size: 15px;
          color: $su-content-color;
          white-space: nowrap !important;

          &--disabled {
            color: $su-disabled-color !important;
          }
        }
      }

      &__line {
        height: 3px;
        background: $su-primary;
        width: 30px;
        position: absolute;
        bottom: 2px;
        border-radius: 100px;
        transition-property: transform;
        transition-duration: 300ms;
      }
    }
  }
}
</style>
