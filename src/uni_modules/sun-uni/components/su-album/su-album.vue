<template>
  <view class="su-album">
    <view
      class="su-album__row"
      ref="su-album__row"
      v-for="(arr, index) in showUrls"
      :forComputedUse="albumWidth"
      :key="index"
      :style="{ flexWrap: autoWrap ? 'wrap' : 'nowrap' }"
    >
      <view
        class="su-album__row__wrapper"
        v-for="(item, index1) in arr"
        :key="index1"
        :style="[imageStyle(index + 1, +index1 + 1)]"
        @tap="previewFullImage ? onPreviewTap(getSrc(item)) : ''"
      >
        <image
          :src="getSrc(item)"
          :mode="urls.length === 1 ? (singleHeight > 0 ? singleMode : 'widthFix') : multipleMode"
          :style="[
            {
              width: imageWidth,
              height: imageHeight,
              borderRadius: shape == 'circle' ? '10000px' : addUnit(radius)
            }
          ]"
        ></image>
        <view
          v-if="
            showMore &&
            urls!.length > Number(rowCount) * showUrls.length &&
            index === showUrls.length - 1 &&
            index1 === showUrls[showUrls.length - 1].length - 1
          "
          class="su-album__row__wrapper__text"
          :style="{
            borderRadius: shape == 'circle' ? '50%' : addUnit(radius)
          }"
        >
          <su-text
            :text="`+${urls!.length - Number(maxCount)}`"
            color="#fff"
            :size="Number(multipleSize) * 0.3"
            align="center"
            customStyle="justify-content: center"
          ></su-text>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { albumProps } from './props'
import { addUnit, sleep } from '../../libs/function/index'
import test from '../../libs/function/test'
import { computed, getCurrentInstance, ref, unref, watch, type ComponentInternalInstance, type CSSProperties } from 'vue'
import type { SuUni } from '../../types/uni'
import { useSelectorQuery } from '../../hooks/core/useSelectorQuery'
// #ifdef APP-NVUE
// 由于weex为阿里的KPI业绩考核的产物，所以不支持百分比单位，这里需要通过dom查询组件的宽度
const dom = uni.requireNativePlugin('dom')
// #endif

/**
 * Album 相册
 * @description 本组件提供一个类似相册的功能，让开发者开发起来更加得心应手。减少重复的模板代码
 * @tutorial https://suni.pages.dev/sun-uni/component/album.html
 *
 * @property {Array}           urls             图片地址列表 Array<String>|Array<Object>形式
 * @property {String}          keyName          指定从数组的对象元素中读取哪个属性作为图片地址
 * @property {String | Number} singleSize       单图时，图片长边的长度  （默认 180 ）
 * @property {String | Number} multipleSize     多图时，图片边长 （默认 70 ）
 * @property {String | Number} space            多图时，图片水平和垂直之间的间隔 （默认 6 ）
 * @property {String}          singleMode       单图时，图片缩放裁剪的模式 （默认 'scaleToFill' ）
 * @property {String}          multipleMode     多图时，图片缩放裁剪的模式 （默认 'aspectFill' ）
 * @property {String | Number} maxCount         取消按钮的提示文字 （默认 9 ）
 * @property {Boolean}         previewFullImage 是否可以预览图片 （默认 true ）
 * @property {String | Number} rowCount         每行展示图片数量，如设置，singleSize和multipleSize将会无效	（默认 3 ）
 * @property {Boolean}         showMore         超出maxCount时是否显示查看更多的提示 （默认 true ）
 * @property {String}          shape            图片形状，circle-圆形，square-方形 （默认 'square' ）
 * @property {String | Number} radius           圆角值，单位任意，如果为数值，则为px单位 （默认 0 ）
 * @property {Boolean}         autoWrap         自适应换行模式，不受rowCount限制，图片会自动换行 （默认 false ）
 * @property {String}          unit             图片单位 （默认 px ）
 * @event    {Function}        albumWidth       某些特殊的情况下，需要让文字与相册的宽度相等，这里事件的形式对外发送  （回调参数 width ）
 * @example <su-album :urls="urls2" @albumWidth="width => albumWidth = width" multipleSize="68" ></su-album>
 */

defineOptions({
  name: 'su-album',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps({
  ...albumProps
})

const emit = defineEmits(['albumWidth'])

// 单图的宽度
const singleWidth = ref(0)
// 单图的高度
const singleHeight = ref(0)
// 单图时，如果无法获取图片的尺寸信息，让图片宽度默认为容器的一定百分比
const singlePercent = ref(0.6)

/** 获取当前组件实例的代理对象 */
const { proxy } = getCurrentInstance() as ComponentInternalInstance
/** 获取节点布局信息的方法 */
const { getBoundingClientRect } = useSelectorQuery()

// 将数组划分为二维数组
const showUrls = computed(() => {
  if (props.autoWrap) {
    return [props.urls?.slice(0, +props.maxCount!)]
  }
  const arr: any[] = []
  props.urls?.map((item, index) => {
    // 限制最大展示数量
    if (index + 1 <= +props.maxCount!) {
      // 计算该元素为第几个素组内
      const itemIndex = Math.floor(index / +props.rowCount!)
      // 判断对应的索引是否存在
      if (!arr[itemIndex]) {
        arr[itemIndex] = []
      }
      arr[itemIndex].push(item)
    }
  })
  return arr
})

const imageStyle = computed(() => {
  return (index1: number, index2: number) => {
    const { space, rowCount } = props
    const rowLen = unref(showUrls).length
    const style: CSSProperties = {
      marginRight: addUnit(space),
      marginBottom: addUnit(space)
    }
    // 如果为最后一行，则每个图片都无需下边框
    if (index1 === rowLen && !props.autoWrap) style.marginBottom = 0
    // 每行的最右边一张和总长度的最后一张无需右边框
    if (!props.autoWrap) {
      if (index2 === rowCount || (index1 === rowLen && index2 === unref(showUrls)[index1 - 1]!.length)) style.marginRight = 0
    }
    return style
  }
})

const imageWidth = computed(() => {
  return addUnit(props.urls!.length === 1 ? unref(singleWidth) : props.multipleSize, props.unit)
})

const imageHeight = computed(() => {
  return addUnit(props.urls!.length === 1 ? unref(singleHeight) : props.multipleSize, props.unit)
})

// 此变量无实际用途，仅仅是为了利用computed特性，让其在urls长度等变化时，重新计算图片的宽度
// 因为用户在某些特殊的情况下，需要让文字与相册的宽度相等，所以这里事件的形式对外发送
const albumWidth = computed(() => {
  let width = 0
  if (props.urls!.length === 1) {
    width = unref(singleWidth)
  } else {
    width = unref(showUrls)[0]!.length * Number(props.multipleSize) + Number(props.space) * (unref(showUrls)[0]!.length - 1)
  }
  emit('albumWidth', width)
  return width
})

// 单图时，获取图片的尺寸
// 在小程序中，需要将网络图片的的域名添加到小程序的download域名才可能获取尺寸
// 在没有添加的情况下，让单图宽度默认为盒子的一定宽度(singlePercent)
function getImageRect() {
  const src = getSrc(props.urls![0] as SuUni.Recordable)
  uni.getImageInfo({
    src,
    success: (res) => {
      // 判断图片横向还是竖向展示方式
      const isHorizotal = res.width >= res.height
      singleWidth.value = isHorizotal ? Number(props.singleSize) : (res.width / res.height) * Number(props.singleSize)
      singleHeight.value = !isHorizotal ? Number(props.singleSize) : (res.height / res.width) * Number(singleWidth.value)
    },
    fail: () => {
      getComponentWidth()
    }
  })
}

/** 预览图片 */
function onPreviewTap(url: string) {
  const urls: string[] = props.urls!.map((item) => {
    return getSrc(item as SuUni.Recordable)
  })
  uni.previewImage({
    current: url,
    urls
  })
}

/** 获取图片的路径 */
function getSrc(item: SuUni.Recordable) {
  return test.object(item) ? (this.keyName && item[this.keyName]) || item.src : item
}

async function getComponentWidth() {
  // 延时一定时间，以获取dom尺寸
  await sleep(30)
  // #ifndef APP-NVUE
  uni
    .createSelectorQuery()
    .in(proxy)
    .select('.su-album__row')
    .boundingClientRect((size) => {
      singleWidth.value = (size as UniApp.NodeInfo).width! * unref(singlePercent)
    })
    .exec()
  // #endif

  // #ifdef APP-NVUE
  // 这里ref="su-album__row"所在的标签为通过for循环出来，导致this.$refs['su-album__row']是一个数组
  const ref = proxy!.$refs['su-album__row'] as UniApp.NodesRef
  getBoundingClientRect(ref).then((data) => {
    singleWidth.value = (data as UniApp.NodeInfo).width! * unref(singlePercent)
  })
  // #endif
}

watch(
  () => props.urls,
  (val) => {
    if (val && val.length === 1) {
      getImageRect()
    }
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';

.su-album {
  @include flex(column);

  &__row {
    @include flex(row);

    &__wrapper {
      position: relative;

      &__text {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.3);
        @include flex(row);
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
