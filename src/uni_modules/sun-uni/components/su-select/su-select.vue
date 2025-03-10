<template>
  <view class="su-select">
    <su-popup
      :blur="blur"
      :maskCloseAble="maskCloseAble"
      mode="bottom"
      :popup="false"
      v-model="popupValue"
      length="auto"
      :safeAreaInsetBottom="safeAreaInsetBottom"
      @close="close"
      :z-index="zIndex"
    >
      <view class="su-select">
        <view class="su-select__header" @touchmove.stop.prevent="">
          <view
            class="su-select__header__cancel su-select__header__btn"
            :style="{ color: cancelColor }"
            hover-class="su-hover-class"
            :hover-stay-time="150"
            @tap="getResult('cancel')"
          >
            {{ cancelText }}
          </view>
          <view class="su-select__header__title">
            {{ title }}
          </view>
          <view
            class="su-select__header__confirm su-select__header__btn"
            :style="{ color: moving ? cancelColor : confirmColor }"
            hover-class="su-hover-class"
            :hover-stay-time="150"
            @touchmove.stop=""
            @tap.stop="getResult('confirm')"
          >
            {{ confirmText }}
          </view>
        </view>
        <view class="su-select__body">
          <picker-view @change="columnChange" class="su-select__body__picker-view" :value="defaultSelector" @pickstart="pickstart" @pickend="pickend">
            <picker-view-column v-if="showColumnCom" v-for="(item, index) in columnData" :key="index">
              <view class="su-select__body__picker-view__item" v-for="(item1, index1) in item" :key="index1">
                <view class="su-line-1">{{ item1[labelName!] }}</view>
                <slot name="column-item" :item="item1" :index="index1" :colIndex="index"></slot>
              </view>
            </picker-view-column>
          </picker-view>
        </view>
      </view>
    </su-popup>
  </view>
</template>

<script lang="ts" setup>
import { computed, ref, watch, unref } from 'vue'
import { baseProps } from '../../libs/vue'
import { selectProps } from './props'
import { cloneDeep, delay } from 'lodash-es'
import type { SuUni } from '../../types/uni'

/**
 * select 列选择器
 * @description 此选择器用于单列，多列，多列联动的选择场景。(从1.3.0版本起，不建议使用Picker组件的单列和多列模式，Select组件是专门为列选择而构造的组件，更简单易用。)
 * @tutorial https://vkuviewdoc.fsq.pub/components/select.html
 * @property {String} mode 模式选择，"single-column"-单列模式，"mutil-column"-多列模式，"mutil-column-auto"-多列联动模式
 * @property {Array} list 列数据，数组形式，见官网说明
 * @property {Boolean} v-model 布尔值变量，用于控制选择器的弹出与收起
 * @property {Boolean} safe-area-inset-bottom 是否开启底部安全区适配(默认false)
 * @property {String} cancel-color 取消按钮的颜色（默认#606266）
 * @property {String} confirm-color 确认按钮的颜色(默认#2979ff)
 * @property {String} confirm-text 确认按钮的文字
 * @property {String} cancel-text 取消按钮的文字
 * @property {String} default-value 提供的默认选中的下标，见官网说明
 * @property {Boolean} mask-close-able 是否允许通过点击遮罩关闭Picker(默认true)
 * @property {String Number} z-index 弹出时的z-index值(默认10075)
 * @property {String} value-name 自定义list数据的value属性名 1.3.6
 * @property {String} label-name 自定义list数据的label属性名 1.3.6
 * @property {String} child-name 自定义list数据的children属性名，只对多列联动模式有效 1.3.7
 * @event {Function} confirm 点击确定按钮，返回当前选择的值
 * @example <u-select v-model="show" :list="list"></u-select>
 */

defineOptions({
  name: 'su-select',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
})

const emit = defineEmits(['update:modelValue', 'input', 'confirm', 'cancel', 'update:show'])

const props = defineProps({
  ...selectProps,
  ...baseProps
})

//
const popupValue = ref(false)
// 用于列改变时，保存当前的索引，下一次变化时比较得出是哪一列发生了变化
const defaultSelector = ref<number[]>([])
// picker-view的数据
const columnData = ref<SuUni.Recordable[]>([])
//  每次队列发生变化时，保存选择的结果
const selectValue = ref<SuUni.Recordable[]>([])
// 上一次列变化时的index
const lastSelectIndex = ref<number[]>([])
// 列数
const columnNum = ref(0)
const moving = ref(false)
const reset = ref(false)

const showColumnCom = computed(() => {
  // #ifdef MP
  return !reset.value
  // #endif
  // #ifndef MP
  return true
  // #endif
})

/** 标识滑动开始，只有微信小程序才有这样的事件 */
function pickstart() {
  // #ifdef MP-WEIXIN
  moving.value = true
  // #endif
}

function pickend() {
  // #ifdef MP-WEIXIN
  moving.value = false
  // #endif
}

/** 初始化 */
function init() {
  reset.value = false
  setColumnNum()
  setDefaultSelector()
  setColumnData()
  setSelectValue()
}

/** 获取默认选中列下标 */
function setDefaultSelector() {
  console.log(unref(defaultSelector), 'setDefaultSelector')
  defaultSelector.value = unref(defaultSelector).length === columnNum.value ? props.defaultValue || [0] : Array(columnNum.value).fill(0)
  lastSelectIndex.value = cloneDeep(defaultSelector.value)
}

/** 计算列数 */
function setColumnNum() {
  // 单列的列数为1
  if (props.mode === 'single-column') {
    columnNum.value = 1
  }
  // 多列时，this.list数组长度就是列数
  if (props.mode === 'mutil-column') columnNum.value = props.list.length

  // 多列联动时，通过历遍this.list的第一个元素，得出有多少列
  if (props.mode === 'mutil-column-auto') {
    let num = 1
    let column: SuUni.Recordable = props.list
    // 只要有元素并且第一个元素有children属性，继续历遍
    while (column[0][props.childName!]) {
      column = column[0] ? column[0][props.childName!] : {}
      num++
    }
    columnNum.value = num
  }
}

function setColumnData() {
  let data: SuUni.Recordable[] = []
  selectValue.value = []
  // 多列联动
  if (props.mode === 'mutil-column-auto') {
    let column = props.list[defaultSelector.value.length ? defaultSelector.value[0] : 0] as SuUni.Recordable
    for (let i = 0; i < unref(columnNum); i++) {
      // 第一列默认为整个list数组
      if (i == 0) {
        data[i] = props.list
        column = column[props.childName!]
      } else {
        // 大于第一列时，判断是否有默认选中的，如果没有就用该列的第一项
        console.log(unref(defaultSelector), '[unref(defaultSelector)')
        data[i] = column
        column = column[unref(defaultSelector)[i]][props.childName!]
      }
    }
  }

  // 单列
  if (props.mode === 'single-column') {
    data[0] = props.list
  }

  // 多列
  if (props.mode === 'mutil-column') {
    data = props.list
  }

  columnData.value = data || []
}

/** 获取默认选中的值，如果没有设置defaultValue，就默认选中每列的第一个 */
function setSelectValue() {
  let tmp = null
  const select = []
  for (let i = 0; i < columnNum.value; i++) {
    tmp = unref(columnData)[i][unref(defaultSelector)[i]]
    let data = {
      index: unref(defaultSelector)[i],
      value: tmp ? tmp[props.valueName!] : null,
      label: tmp ? tmp[props.labelName!] : null,
      ...tmp
    }
    select.push(data)
  }
  selectValue.value = select
}

/** 列选择 */
function columnChange(e: UniHelper.BaseEvent) {
  let index = 0
  let columnIndex = e.detail.value
  selectValue.value = []
  if (props.mode === 'mutil-column-auto') {
    // 对比前后两个数组，寻找变更的是哪一列，如果某一个元素不同，即可判定该列发生了变化
    lastSelectIndex.value.map((val, idx) => {
      if (val != columnIndex[idx]) index = idx
    })
    defaultSelector.value = columnIndex

    for (let i = index + 1; i < unref(columnNum); i++) {
      // 当前变化列的下一列的数据，需要获取上一列的数据，同时需要指定是上一列的第几个的children，再往后的
      // 默认是队列的第一个为默认选项
      columnData.value[i] = columnData.value[i - 1][i - 1 == index ? columnIndex[index] : 0][props.childName!]
      // 改变的列之后的所有列，默认选中第一个
      defaultSelector.value[i] = 0
    }
    // 在历遍的过程中，可能由于上一步修改this.columnData，导致产生连锁反应，程序触发columnChange，会有多次调用
    // 只有在最后一次数据稳定后的结果是正确的，此前的历遍中，可能会产生undefined，故需要判断
    const selectData: SuUni.Recordable[] = []
    columnIndex.map((_: number, i: number) => {
      let data = columnData.value[i][columnIndex[i]]
      let tmp = {
        index: columnIndex[i],
        value: data ? data[props.valueName!] : null,
        label: data ? data[props.labelName!] : null,
        ...data
      }
      selectData.push(tmp)
    })
    selectValue.value = selectData
    lastSelectIndex.value = columnIndex
  }

  if (props.mode === 'single-column') {
    let data = unref(columnData)[0][columnIndex[0]]
    let tmp = {
      index: columnIndex[0],
      value: data ? data[props.valueName!] : null,
      label: data ? data[props.labelName!] : null,
      ...data
    }
    selectValue.value.push(tmp)
    lastSelectIndex.value = columnIndex
  }

  if (props.mode === 'mutil-column') {
    // 初始默认选中值
    const selectData: SuUni.Recordable[] = []
    columnIndex.map((_: number, i: number) => {
      let data = this.columnData[index][columnIndex[i]]
      // 初始默认选中值
      let tmp = {
        index: columnIndex[i],
        value: data ? data[props.valueName!] : null,
        label: data ? data[props.labelName!] : null,
        ...data
      }
      selectData.push(tmp)
    })
    selectValue.value = selectData
    lastSelectIndex.value = columnIndex
  }
}

function close() {
  emit('input', false)
  emit('update:show', false)
}

/** 点击确定或者取消 */
function getResult(event: 'confirm' | 'cancel' | null = null) {
  // #ifdef MP-WEIXIN
  if (moving.value) return
  // #endif
  if (event) emit(event, selectValue.value)
  if (event === 'confirm') emit('update:modelValue', selectValue.value)
  close()
}

watch(
  () => props.show,
  (val) => {
    if (val) {
      reset.value
      delay(() => {
        init()
      }, 30)
    }
    popupValue.value = val || false
    emit('update:show', val)
  },
  {
    immediate: true
  }
)
</script>

<style scoped lang="scss">
@import '../../libs/css/components.scss';

.su-select {
  $su-select-height: 70rpx;

  &__action {
    position: relative;
    line-height: $su-select-height;
    height: $su-select-height;

    &__icon {
      position: absolute;
      right: 20rpx;
      top: 50%;
      transition: transform 0.4s;
      transform: translateY(-50%);
      z-index: 1;

      &--reverse {
        transform: rotate(-180deg) translateY(50%);
      }
    }
  }

  &__hader {
    &__title {
      color: $su-content-color;
    }
  }

  &--border {
    border-radius: 6rpx;
    border-radius: 4px;
    border: 1px solid $su-border-color;
  }

  &__header {
    @include flex;
    align-items: center;
    justify-content: space-between;
    height: 80rpx;
    padding: 0 40rpx;
  }

  &__body {
    width: 100%;
    height: 500rpx;
    overflow: hidden;
    background-color: #fff;

    &__picker-view {
      height: 100%;
      box-sizing: border-box;

      &__item {
        @include flex;
        align-items: center;
        justify-content: center;
        font-size: 32rpx;
        color: $su-main-color;
        padding: 0 8rpx;
      }
    }
  }
}
</style>
