<template>
  <view ref="su-index-list" class="su-index-list">
    <!-- #ifdef APP-NVUE -->
    <list
      :scrollTop="scrollTop"
      enable-back-to-top
      :offset-accuracy="1"
      :style="{
        maxHeight: addUnit(scrollViewHeight, 'px')
      }"
      @scroll="scrollHandler"
      ref="su-index-list__scroll-view"
      class="su-index-list__scroll-view"
    >
      <cell v-if="$slots.header" ref="header">
        <slot name="header" />
      </cell>
      <slot />
      <cell v-if="$slots.footer">
        <slot name="footer" />
      </cell>
    </list>
    <!-- #endif -->
    <!-- #ifndef APP-NVUE -->
    <scroll-view
      :scrollTop="scrollTop"
      :scrollIntoView="scrollIntoView"
      :offset-accuracy="1"
      :style="{
        maxHeight: addUnit(scrollViewHeight, 'px')
      }"
      scroll-y
      @scroll="scrollHandler"
      ref="su-index-list__scroll-view"
      class="su-index-list__scroll-view"
    >
      <view class="su-index-list__header" v-if="$slots.header">
        <slot name="header" />
      </view>
      <slot />
      <view class="su-index-list__footer" v-if="$slots.footer">
        <slot name="footer" />
      </view>
    </scroll-view>
    <!-- #endif -->
    <view
      class="su-index-list__letter"
      ref="su-index-list__letter"
      :style="{ top: addUnit(letterInfo.top, 'px'), transform: 'translateY(-50%)' }"
      @touchstart.prevent="touchStart"
      @touchmove.prevent="touchMove"
      @touchend.prevent="touchEnd"
      @touchcancel.prevent="touchEnd"
    >
      <view
        class="su-index-list__letter__item"
        v-for="(item, index) in uIndexList"
        :key="index"
        :style="{
          backgroundColor: activeIndex === index ? activeColor : 'transparent'
        }"
      >
        <text class="su-index-list__letter__item__index" :style="{ color: activeIndex === index ? '#fff' : inactiveColor }">{{ item }}</text>
      </view>
    </view>
    <su-transition
      mode="fade"
      :show="touching"
      :customStyle="{
        position: 'absolute',
        right: '50px',
        top: addUnit(indicatorTop, 'px'),
        zIndex: 3
      }"
    >
      <view
        class="su-index-list__indicator"
        :class="['su-index-list__indicator--show']"
        :style="{
          height: addUnit(indicatorHeight),
          width: addUnit(indicatorHeight)
        }"
      >
        <text class="su-index-list__indicator__text">{{ uIndexList[activeIndex] }}</text>
      </view>
    </su-transition>
  </view>
</template>

<script lang="ts" setup>
import { INDEX_LIST_KEY, indexListProps } from './props'
import { addUnit, getWindowInfo, sleep, getPx } from '../../libs/function/index'
import { computed, onMounted, reactive, ref, unref, watch, getCurrentInstance, type ComponentInternalInstance } from 'vue'
import type { SuUni } from '../../types/uni'
import { useSelectorQuery } from '../../hooks/core/useSelectorQuery'
import { useChildren } from '../../hooks/core/useChildren'
import { useSlots } from 'vue'

// #ifdef APP-NVUE
// 由于weex为阿里的KPI业绩考核的产物，所以不支持百分比单位，这里需要通过dom查询组件的宽度
const dom = uni.requireNativePlugin('dom')
// #endif
/**
 * IndexList 索引列表
 * @description  通过折叠面板收纳内容区域
 * @tutorial https://suni.pages.dev/component/indexList.html
 * @property {String}			inactiveColor	右边锚点非激活的颜色 ( 默认 '#606266' )
 * @property {String}			activeColor		右边锚点激活的颜色 ( 默认 '#5677fc' )
 * @property {Array}			indexList		索引字符列表，数组形式
 * @property {Boolean}			sticky			是否开启锚点自动吸顶 ( 默认 true )
 * @property {String | Number}	customNavHeight	自定义导航栏的高度 ( 默认 0 )
 * */

defineOptions({
  name: 'su-index-list',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps(indexListProps)
// 当前正在被选中的字母索引
const activeIndex = ref(-1)
// 当前正在被触摸的字母索引
const touchmoveIndex = ref(-1)
// 索引字母的信息
const letterInfo = reactive({
  height: 0,
  itemHeight: 0,
  top: 0
})
// 设置字母指示器的高度，后面为了让指示器跟随字母，并将尖角部分指向字母的中部，需要依赖此值
const indicatorHeight = ref(50)
// 当前是否正在被触摸状态
const touching = ref(false)
// 滚动条顶部top值
const scrollTop = ref(0)
// scroll-view的高度
const scrollViewHeight = ref(0)
const sysInfo = ref<ReturnType<typeof getWindowInfo>>({})
const scrolling = ref(false)
const scrollIntoView = ref('')
const pageY = ref(0)
const topOffset = ref(0)
// 锚点列表的实例列表
const anchorsInstanceList = ref<ComponentInternalInstance[]>([])

const listInstance = getCurrentInstance()

const slots = useSlots()

/** 获取节点布局信息的方法 */
const { getBoundingClientRect } = useSelectorQuery()

const { internalChildren } = useChildren(INDEX_LIST_KEY)

// 如果有传入外部的indexList锚点数组则使用，否则使用内部生成A-Z字母
const uIndexList = computed(() => (props.indexList?.length ? props.indexList : indexList()))

// 字母放大指示器的top值，为了让其指向当前激活的字母
const indicatorTop = computed(() => {
  const { top, height, itemHeight } = unref(letterInfo)
  return Math.floor(top - height / 2 + itemHeight * unref(activeIndex) + itemHeight - 70 / 2)
})

const indexList = () => {
  const indexList = []
  const charCodeOfA = 'A'.charCodeAt(0)
  for (let i = 0; i < 26; i++) {
    indexList.push(String.fromCharCode(charCodeOfA + i))
  }
  return indexList
}

function setAnchorsInstance(instance: ComponentInternalInstance) {
  if (!unref(anchorsInstanceList).some((ins) => ins.uid === instance.uid)) {
    anchorsInstanceList.value.push(instance as any)
  }
}

function init() {
  // 设置列表的高度为整个屏幕的高度
  // 减去customNavHeight，并将scrollViewHeight设置为maxHeight
  // 解决当su-index-list组件放在tabbar页面时,scroll-view内容较少时，还能滚动
  let customNavHeight = getPx(`${props.customNavHeight}`) as number
  getNodeRect('su-index-list').then((size) => {
    scrollViewHeight.value = size.height ? size.height : (unref(sysInfo).windowHeight || 0) - customNavHeight
    topOffset.value = (unref(sysInfo).windowHeight || 0) - unref(scrollViewHeight)
  })
}

function touchStart(e: SuUni.Recordable) {
  // 获取触摸点信息
  const touchStartData = e.changedTouches[0]
  if (!touchStartData) return
  touching.value = true
  const { pageY, screenY } = touchStartData
  // 根据当前触摸点的坐标，获取当前触摸的为第几个字母
  let currentIndex = 0
  // #ifdef APP-NVUE
  // 使用screenY要减去导航栏44和状态栏24高度
  currentIndex = getIndexListLetter(screenY - 68)
  // #endif
  // #ifndef APP-NVUE
  currentIndex = getIndexListLetter(pageY)
  // #endif
  setValueForTouch(currentIndex)
}

function touchMove(e: SuUni.Recordable) {
  // 获取触摸点信息
  const touchMoveData = e.changedTouches[0]
  if (!touchMoveData) return
  // 滑动结束后迅速开始第二次滑动时候 touching 为 false 造成不显示 indicator 问题
  if (!unref(touching)) touching.value = true
  const { pageY, screenY } = touchMoveData
  // 根据当前触摸点的坐标，获取当前触摸的为第几个字母
  let currentIndex = 0
  // #ifdef APP-NVUE
  // 使用screenY要减去导航栏44和状态栏24高度
  currentIndex = getIndexListLetter(screenY - 68)
  // #endif
  // #ifndef APP-NVUE
  currentIndex = getIndexListLetter(pageY)
  // #endif
  setValueForTouch(currentIndex)
}

function touchEnd(e: SuUni.Recordable) {
  // 延时一定时间后再隐藏指示器，为了让用户看的更直观，同时也是为了消除快速切换u-transition的show带来的影响
  sleep(300).then(() => {
    touching.value = false
  })
}

function getNodeRect(key: string) {
  return new Promise<UniApp.NodeInfo>((resolve) => {
    // #ifndef APP-NVUE
    uni
      .createSelectorQuery()
      .in(listInstance?.proxy)
      .select(`.${key}`)
      .boundingClientRect((size) => {
        resolve(size as UniApp.NodeInfo)
      })
      .exec()
    // #endif
    // #ifdef APP-NVUE
    // nvue的dom模块用于获取节点
    const ref = listInstance?.proxy?.$refs[key]
    getBoundingClientRect(ref as UniApp.NodesRef).then((data) => {
      resolve(data as UniApp.NodeInfo)
    })
    // #endif
  })
}

function setIndexListLetterInfo() {
  getNodeRect('su-index-list__letter').then((size) => {
    const { height } = size
    const sysData = getWindowInfo()
    // const windowHeight = sysData.windowHeight
    let customNavHeight = 0
    // 消除各端导航栏非原生和原生导致的差异，让索引列表字母对屏幕垂直居中
    if (props.customNavHeight === 0) {
      // #ifdef H5
      customNavHeight = sysData.windowTop || 0
      // #endif
      // #ifndef H5
      // 在非H5中，为原生导航栏，其高度不算在windowHeight内，这里设置为负值，后面相加时变成减去其高度的一半
      customNavHeight = -(sysData.statusBarHeight || 0 + 44)
      // #endif
    } else {
      customNavHeight = getPx(`${props.customNavHeight}`) as number
    }
    getNodeRect('su-index-list__scroll-view').then((sizeScroll) => {
      letterInfo.height = height || 0
      letterInfo.top = (sizeScroll.height || 0) / 2
      letterInfo.itemHeight = Math.floor((height || 0) / unref(uIndexList).length)
    })
  })
}

function getIndexListLetter(pageYHeight: number): number {
  pageY.value = pageYHeight
  // let { top, height, itemHeight } = letterInfo
  let index = unref(touchmoveIndex)
  const top = letterInfo.top - letterInfo.height / 2
  console.log(letterInfo, 'letterInfo')
  pageYHeight = pageYHeight - unref(topOffset)

  if (pageYHeight < top) {
    index = 0
  } else if (pageYHeight >= (top + letterInfo.height)) {
    // 如果超出了，取最后一个字母
    index = unref(uIndexList).length - 1
  } else {
    // 将触摸点的Y轴偏移值，减去索引字母的top值，除以每个字母的高度，即可得到当前触摸点落在哪个字母上
    index = Math.floor((pageYHeight - top) / letterInfo.itemHeight)
  }

  return index
}

// 设置各项由触摸而导致变化的值
async function setValueForTouch(index: number) {
  // 如果偏移量太小，前后得出的会是同一个索引字母，为了防抖，进行返回
  if (index === unref(activeIndex)) return
  activeIndex.value = index
  // #ifndef APP-NVUE || MP-WEIXIN
  // 在非nvue中，由于anchor和item都在u-index-item中，所以需要对index-item进行偏移
  scrollIntoView.value = `su-index-item-${unref(uIndexList)[index].charCodeAt(0)}`
  // #endif

  // #ifdef MP-WEIXIN
  // 微信小程序下，scroll-view的scroll-into-view属性无法对slot中的内容的id生效，只能通过设置scrollTop的形式去移动滚动条
  const header = await getHeaderRect()
  // item的top值，在nvue下，模拟出的anchor的top，类似非nvue下的index-item的top
  let top = header.height
  const children = internalChildren.map((item, index) => {
    const child = {
      height: item.proxy?.$el.height,
      top: top
    }
    // 进行累加，给下一个item提供计算依据
    top = top + item.proxy?.$el.height
    // #ifdef APP-NVUE
    // 只有nvue下，需要将锚点的高度也累加，非nvue下锚点高度是包含在index-item中的。
    top = top + unref(anchorsInstanceList)[index].proxy?.$el.height
    // #endif
    return child
  })
  if (children[index]?.top) {
    scrollTop.value = (children[index].top as number) - Number(getPx(`${props.customNavHeight}`))
  }
  // #endif

  // #ifdef APP-NVUE
  // 在nvue中，由于cell和header为同级元素，所以实际是需要对header(anchor)进行偏移
  const anchor = `su-index-anchor-${unref(uIndexList)[index]}`
  // console.log(anchor)
  dom.scrollToElement(unref(anchorsInstanceList)[index].proxy?.$refs[anchor], {
    offset: 0,
    animated: false
  })
  // #endif
}

function getHeaderRect() {
  return new Promise<UniApp.NodeInfo>((resolve) => {
    if (!slots.header) {
      resolve({
        width: 0,
        height: 0
      })
    }

    // #ifndef APP-NVUE
    uni
      .createSelectorQuery()
      .in(listInstance?.proxy)
      .select('.su-index-list__header')
      .boundingClientRect((size) => {
        resolve(size as UniApp.NodeInfo)
      })
      .exec()
    // #endif
    // #ifdef APP-NVUE
    // nvue的dom模块用于获取节点
    const headerRef = listInstance?.proxy?.$refs['header']
    if (!headerRef) {
      resolve({
        width: 0,
        height: 0
      })
    }
    getBoundingClientRect(headerRef as UniApp.NodesRef).then((data) => {
      resolve(data as UniApp.NodeInfo)
    })
    // #endif
  })
}

async function scrollHandler(e: UniHelper.ScrollViewOnScrollEvent) {
  if (unref(touching) || unref(scrolling)) return
  scrolling.value = true
  // 每过一定时间取样一次，减少资源损耗以及可能带来的卡顿
  sleep(10).then(() => {
    scrolling.value = false
  })

  let scrollTop = 0
  const len = internalChildren.length

  // #ifdef APP-NVUE
  let sys = getWindowInfo()
  scrollTop = Math.abs(e.contentOffset.y) / 10
  // #endif

  // 获取header slot的尺寸信息
  const header = await getHeaderRect()
  // item的top值，在nvue下，模拟出的anchor的top，类似非nvue下的index-item的top
  let top = header.height
  // 由于list组件无法获取cell的top值，这里通过header slot和各个item之间的height，模拟出类似非nvue下的位置信息
  const children = internalChildren.map((item, index) => {
    const child = {
      height: item.proxy?.$el.height,
      top: top
    }
    // 进行累加，给下一个item提供计算依据
    top = top + item.proxy?.$el.height
    // #ifdef APP-NVUE
    // 只有nvue下，需要将锚点的高度也累加，非nvue下锚点高度是包含在index-item中的。
    top = top + unref(anchorsInstanceList)[index].proxy?.$el.height
    // #endif
    return child
  })

  // #ifndef APP-NVUE
  // 非nvue通过detail获取滚动条位移
  scrollTop = e.detail.scrollTop
  // #endif
  scrollTop = scrollTop + Number(getPx(`${props.customNavHeight}`))
  for (let i = 0; i < len; i++) {
    const item = children[i],
      nextItem = children[i + 1]
    // 如果滚动条高度小于第一个item的top值，此时无需设置任意字母为高亮
    if (scrollTop <= (children[0].top || 0) || scrollTop >= children[len - 1].top + children[len - 1].height) {
      activeIndex.value = -1
      break
    } else if (!nextItem) {
      // 当不存在下一个item时，意味着历遍到了最后一个
      activeIndex.value = len - 1
      break
    } else if (scrollTop > (item.top || 0) && scrollTop < (nextItem.top || 0)) {
      activeIndex.value = i
      break
    }
  }
}

watch(
  () => uIndexList.value,
  () => {
    sleep(30).then(() => {
      setIndexListLetterInfo()
    })
  },
  { deep: true }
)

onMounted(() => {
  anchorsInstanceList.value = []
  sysInfo.value = getWindowInfo()
  init()
  sleep(50).then(() => {
    setIndexListLetterInfo()
  })
})

defineExpose({
  setAnchorsInstance
})
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';

.su-index-list {
  &__letter {
    position: absolute;
    right: 0;
    text-align: center;
    z-index: 3;
    padding: 0 6px;
    width: 30px;

    &__item {
      width: 16px;
      height: 16px;
      border-radius: 100px;
      margin: 1px 0;
      @include flex;
      align-items: center;
      justify-content: center;

      &--active {
        background-color: $su-primary;
      }

      &__index {
        font-size: 12px;
        text-align: center;
        line-height: 12px;
      }
    }
  }

  &__indicator {
    width: 50px;
    height: 50px;
    border-radius: 100px 100px 0 100px;
    text-align: center;
    color: #ffffff;
    background-color: #c9c9c9;
    transform: rotate(-45deg);
    @include flex;
    justify-content: center;
    align-items: center;

    &__text {
      font-size: 28px;
      line-height: 28px;
      font-weight: bold;
      color: #fff;
      transform: rotate(45deg);
      text-align: center;
    }
  }
}
</style>
