<template>
  <view class="su-picker-warrper">
    <view v-if="hasInput" class="su-picker-input cursor-pointer" @click="onShowByClickInput">
      <slot>
        <up-input
          :disabled="disabled"
          :disabledColor="disabledColor"
          :placeholder="placeholder"
          :readonly="true"
          border="surround"
          v-model="inputLabel"
        ></up-input>
        <div class="input-cover"></div>
      </slot>
    </view>
    <su-popup :modelValue="show || (hasInput && showByClickInput)" :mode="popupMode" @close="closeHandler">
      <view class="su-picker">
        <su-toolbar
          v-if="showToolbar"
          :cancelColor="cancelColor"
          :confirmColor="confirmColor"
          :cancelText="cancelText"
          :confirmText="confirmText"
          :title="title"
          :rightSlot="toolbarRightSlot ? true : false"
          @cancel="cancel"
          @confirm="confirm"
        >
          <template #right>
            <slot name="toolbar-right"></slot>
          </template>
        </su-toolbar>
        <slot name="toolbar-bottom"></slot>
        <picker-view
          class="su-picker__view"
          :indicatorStyle="`height: ${addUnit(itemHeight)}`"
          :value="innerIndex"
          :immediateChange="immediateChange"
          :style="{
            height: `${addUnit(Number(visibleItemCount) * Number(itemHeight))}`
          }"
          @change="changeHandler"
        >
          <picker-view-column v-for="(item, index) in innerColumns" :key="index" class="su-picker__view__column">
            <view
              v-if="testArray(item)"
              class="su-picker__view__column__item su-line-1"
              :class="[index1 === innerIndex[index] && 'su-picker__view__column__item--selected']"
              v-for="(item1, index1) in item"
              :key="index1"
              :style="getPickViewStyle(index, index1)"
            >
              {{ getItemText(item1) }}
            </view>
          </picker-view-column>
        </picker-view>
        <view v-if="loading" class="su-picker--loading">
          <su-loading-icon mode="circle"></su-loading-icon>
        </view>
      </view>
    </su-popup>
  </view>
</template>

<script lang="ts" setup>
/**
 * su-picker
 * @description 选择器
 * @property {Boolean}			show				是否显示picker弹窗（默认 false ）
 * @property {Boolean}			showToolbar			是否显示顶部的操作栏（默认 true ）
 * @property {String}			title				顶部标题
 * @property {Array}			columns				对象数组，设置每一列的数据
 * @property {Boolean}			loading				是否显示加载中状态（默认 false ）
 * @property {String | Number}	itemHeight			各列中，单个选项的高度（默认 44 ）
 * @property {String}			cancelText			取消按钮的文字（默认 '取消' ）
 * @property {String}			confirmText			确认按钮的文字（默认 '确定' ）
 * @property {String}			cancelColor			取消按钮的颜色（默认 '#909193' ）
 * @property {String}			confirmColor		确认按钮的颜色（默认 '#3c9cff' ）
 * @property {String | Number}	visibleItemCount	每列中可见选项的数量（默认 5 ）
 * @property {String}			keyName				选项对象中，需要展示的属性键名（默认 'text' ）
 * @property {Boolean}			closeOnClickOverlay	是否允许点击遮罩关闭选择器（默认 false ）
 * @property {Array}			defaultIndex		各列的默认索引
 * @property {Boolean}			immediateChange		是否在手指松开时立即触发change事件（默认 true ）
 * @event {Function} close		关闭选择器时触发
 * @event {Function} cancel		点击取消按钮触发
 * @event {Function} change		当选择值变化时触发
 * @event {Function} confirm	点击确定按钮，返回当前选择的值
 */
import { pickerProps } from './props'
import { addUnit, deepClone, sleep } from '../../libs/function/index'
import test from '../../libs/function/test'
import { baseProps } from '../../libs/vue'
import { computed, ref, unref, watch } from 'vue'
import type { SuUni } from '../../types/uni'

defineOptions({
  name: 'su-picker',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps({
  ...pickerProps,
  ...baseProps
})

const emit = defineEmits(['close', 'cancel', 'confirm', 'change', 'update:modelValue', 'update:show'])

// 上一次选择的列索引
const lastIndex = ref<number[]>([])
// 索引值 ，对应picker-view的value
const innerIndex = ref<number[]>([])
// 各列的值
const innerColumns = ref<SuUni.Recordable[][]>([])
// 上一次的变化列索引
const columnIndex = ref(0)
// 显示点击的input
const showByClickInput = ref(false)
// 当前用户选中，但是还没确认的值，用户没做change操作时候，点击确认可以默认选中第一个
const currentActiveValue = ref<UniHelper.PickerValue[]>([])

// 已选&&已确认的值显示在input上面的文案
const inputLabel = computed(() => {
  let firstItem = unref(innerColumns)[0] && unref(innerColumns)[0][0]
  // 区分是不是对象数组
  if (firstItem && Object.prototype.toString.call(firstItem) === '[object Object]') {
    let res = (unref(innerColumns)[0] as any).filter((item: { [x: string]: any }) => props.modelValue.includes(item['id']))
    res = res.map((item: { [x: string]: any }) => item[props.keyName!])
    return res.join('/')
  } else {
    //用户确定的值，才显示到输入框
    return props.modelValue.join('/')
  }
})

const inputValue = computed(() => {
  let items = unref(innerColumns).map((item, index: number) => item[unref(innerIndex)[index]])
  let res: any[] = []
  //区分是不是对象数组
  if (items[0] && Object.prototype.toString.call(items[0]) === '[object Object]') {
    //对象数组返回id集合
    items.forEach((element) => {
      res.push(element && element['id'])
    })
  } else {
    //非对象数组返回元素集合
    items.forEach((element) => {
      res.push(element)
    })
  }
  return res
})

const testArray = test.array

function onShowByClickInput() {
  if (!props.disabled) {
    showByClickInput.value = !showByClickInput.value
  }
}

// 获取item需要显示的文字，判别为对象还是文本
function getItemText(item: { [x: string]: any }) {
  if (test.object(item)) {
    return item[props.keyName!]
  } else {
    return item
  }
}

// 关闭选择器
function closeHandler() {
  if (props.closeOnClickOverlay) {
    if (props.hasInput) {
      showByClickInput.value = false
    }
    emit('update:show', false)
    emit('close')
  }
}

/** 点击工具栏的取消按钮 */
function cancel() {
  if (props.hasInput) {
    showByClickInput.value = false
  }
  emit('update:show', false)
  emit('cancel')
}

/** 点击工具栏的确定按钮 */
function confirm() {
  if (!unref(currentActiveValue).length) {
    let arr = [0]
    if (Array.isArray(props.defaultIndex) && props.defaultIndex.length === unref(innerColumns).length) {
      arr = [...props.defaultIndex] as number[]
    } else {
      // 否则默认都选中第一个
      arr = Array(unref(innerColumns).length).fill(0)
    }
    setLastIndex(arr)
    setIndexs(arr)
  }
  emit('update:modelValue', unref(inputValue))
  if (props.hasInput) {
    showByClickInput.value = false
  }
  emit('update:show', false)
  emit('confirm', {
    indexs: unref(innerIndex),
    value: unref(innerColumns).map((item, index: number) => item[unref(innerIndex)[index]]),
    values: unref(innerColumns)
  })
}

/** 选择器某一列的数据发生变化时触发 */
function changeHandler(e: UniHelper.PickerViewOnChangeEvent) {
  const { value } = e.detail
  let index = 0
  let columnIdx = 0
  currentActiveValue.value = value
  for (let i = 0; i < value.length; i++) {
    const item = value[i]
    if (item !== (unref(lastIndex)[i] || 0)) {
      // 把undefined转为合法假值0
      // 设置columnIndex为当前变化列的索引
      columnIdx = i
      // index则为变化列中的变化项的索引
      index = item
      break // 终止循环，即使少一次循环，也是性能的提升
    }
  }
  columnIndex.value = columnIdx
  const values = unref(innerColumns)
  setLastIndex(value)
  setIndexs(value)
  if (!props.hasInput) {
    emit('update:modelValue', unref(inputValue))
  }
  emit('change', {
    // #ifndef MP-WEIXIN || MP-LARK
    // 微信小程序不能传递this，会因为循环引用而报错
    // picker: this,
    // #endif
    value: unref(innerColumns).map((item, index) => item[value[index]]),
    index,
    indexs: value,
    // values为当前变化列的数组内容
    values,
    columnIndex: columnIdx
  })
}

/** 设置index索引，此方法可被外部调用设置 */
function setIndexs(index: number[], bool?: boolean) {
  innerIndex.value = deepClone(index)
  if (bool) {
    setLastIndex(index)
  }
}

/** 记录上一次的各列索引位置 */
function setLastIndex(index: number[]) {
  // 当能进入此方法，意味着当前设置的各列默认索引，即为“上一次”的选中值，需要记录，是因为changeHandler中
  // 需要拿前后的变化值进行对比，得出当前发生改变的是哪一列
  lastIndex.value = deepClone(index)
}

function setColumnValues(colIndex: number, values: SuUni.Recordable[][]) {
  // 替换innerColumns数组中columnIndex索引的值为values，使用的是数组的splice方法
  innerColumns.value.splice(colIndex, 1, values)
  // 替换完成之后将修改列之后的已选值置空
  setLastIndex(unref(innerIndex).slice(0, colIndex))
  // 拷贝一份原有的innerIndex做临时变量，将大于当前变化列的所有的列的默认索引设置为0
  let tmpIndex = deepClone(unref(innerIndex))
  for (let i = 0; i < unref(innerColumns).length; i++) {
    if (i > unref(columnIndex)) {
      tmpIndex[i] = 0
    }
  }
  // 一次性赋值，不能单个修改，否则无效
  setIndexs(tmpIndex)
}

// 获取对应列的所有选项
function getColumnValues(colIndex: number) {
  // 进行同步阻塞，因为外部得到change事件之后，可能需要执行setColumnValues更新列的值
  // 索引如果在外部change的回调中调用getColumnValues的话，可能无法得到变更后的列值，这里进行一定延时，保证值的准确性
  ;(async () => {
    await sleep()
  })()
  return unref(innerColumns)[colIndex]
}

// 设置整体各列的columns的值
function setColumns(columns: SuUni.Recordable[]) {
  innerColumns.value = deepClone(columns)
  // 如果在设置各列数据时，没有被设置默认的各列索引defaultIndex，那么用0去填充它，数组长度为列的数量
  if (unref(innerIndex).length === 0) {
    innerIndex.value = new Array(columns.length).fill(0)
  }
}

// 获取各列选中值对应的索引
function getIndexs() {
  return innerIndex.value
}

// 获取各列选中的值
function getValues() {
  // 进行同步阻塞，因为外部得到change事件之后，可能需要执行setColumnValues更新列的值
  // 索引如果在外部change的回调中调用getValues的话，可能无法得到变更后的列值，这里进行一定延时，保证值的准确性
  ;(async () => {
    await sleep()
  })()
  return unref(innerColumns).map((item, index) => item[unref(innerIndex)[index]])
}

function getPickViewStyle(index: number, index1: number) {
  return {
    height: addUnit(Number(props.itemHeight)),
    lineHeight: addUnit(Number(props.itemHeight)),
    fontWeight: index1 === unref(innerIndex)[index] ? 'bold' : 'normal',
    display: 'block'
  }
}

watch(
  () => props.defaultIndex,
  (val, oVal) => {
    if (!oVal || (val && val.join('/') !== oVal.join('/'))) {
      setIndexs(val!, true)
    }
  },
  {
    immediate: true,
    deep: true
  }
)

watch(
  () => props.columns,
  (val) => {
    val && setColumns(val!)
  },
  {
    immediate: true,
    deep: true
  }
)

defineExpose({
  getValues,
  getIndexs,
  getColumnValues,
  setColumnValues
})
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';

.su-picker {
  position: relative;

  &-input {
    position: relative;
    .input-cover {
      opacity: 0;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1;
    }
  }

  &__view {
    &__column {
      @include flex;
      flex: 1;
      justify-content: center;

      &__item {
        @include flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        text-align: center;
        /* #ifndef APP-NVUE */
        display: block;
        /* #endif */
        color: $su-main-color;

        &--disabled {
          /* #ifndef APP-NVUE */
          cursor: not-allowed;
          /* #endif */
          opacity: 0.35;
        }
      }
    }
  }

  &--loading {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    @include flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.87);
    z-index: 1000;
  }
}
</style>
