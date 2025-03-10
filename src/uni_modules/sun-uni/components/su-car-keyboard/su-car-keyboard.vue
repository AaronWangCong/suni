<template>
  <view :class="[prefixCls, customClass]" :style="customStyle">
    <view :class="`${prefixCls}-input-box`">
      <slot name="input-box" :values="inputValues">
        <view
          v-for="(item, index) in inputValues"
          :key="index"
          :class="{
            [`${prefixCls}-input-box-item`]: true,
            [`${prefixCls}-input-box-item-current`]: index === currentIndex,
            [`${prefixCls}-input-box-item-pointer`]: true
          }"
          :style="{
            maxWidth: inputSize + 'px',
            maxHeight: inputSize + 'px'
          }"
          @click="handleChangeCur(index)"
        >
          <view :style="{ paddingBottom: '100%' }" :class="`${prefixCls}-input-box-square`">
            <view :class="`${prefixCls}-input-box-square-content`">
              <view
                :class="{
                  [`${prefixCls}-input-box-square-cnt`]: true,
                  [`${prefixCls}-input-box-square-cursor`]: showCursor && currentIndex === index && !item
                }"
                :style="{
                  maxWidth: inputSize + 'px',
                  maxHeight: inputSize + 'px'
                }"
              >
                {{ item }}
              </view>
            </view>
          </view>
        </view>
      </slot>
    </view>
    <view :class="`${prefixCls}-content`">
      <view
        :class="`${prefixCls}-content-line`"
        v-for="(carItem, index) in carList[keyboardModel.mode]"
        :key="index"
        :style="{
          marginLeft: addUnit(diffSize(carItem.diff), 'px'),
          marginRight: addUnit(diffSize(carItem.diff) / -1, 'px')
        }"
      >
        <view
          v-for="(item, itIndex) in carItem.list"
          :key="itIndex"
          :class="{
            [`${prefixCls}-content-item`]: true,
            [`${prefixCls}-content-item-empty`]: item === ''
          }"
          :style="{
            width: addUnit(keyboardModel.width, 'px'),
            height: addUnit(keyboardModel.height, 'px')
          }"
          @click="hendleItemClick(item)"
        >
          {{ item }}
        </view>
      </view>
      <view :class="`${prefixCls}-content-toolbar`">
        <template v-for="(item, index) in toolbarList" :key="index">
          <view
            v-if="item.ifShow"
            :class="[`${prefixCls}-content-item`, `${prefixCls}-content-btn`, item.class]"
            :style="{
              marginRight: keyboardModel.width / keyboardModel.ratio + 'px',
              height: keyboardModel.height + 'px'
            }"
            @click="item.onClick"
          >
            {{ item.text }}
          </view>
        </template>
        <view
          :class="[`${prefixCls}-content-item`, `${prefixCls}-content-btn`, `${prefixCls}-content-btn-change`]"
          :style="{
            width: keyboardModel.handlerWidth + 'px',
            height: keyboardModel.height + 'px',
            bottom: 'calc(10px + ' + keyboardModel.height + 'px)'
          }"
          @click="handleChangeMode()"
        >
          <image :src="keyboard" mode="scaleToFill" style="width: 22px; height: 22px" />
        </view>
        <view
          :class="[`${prefixCls}-content-item`, `${prefixCls}-content-btn`, `${prefixCls}-content-btn-delete`]"
          :style="{
            width: keyboardModel.handlerWidth + 'px',
            height: keyboardModel.height + 'px',
            bottom: 'calc(10px + ' + keyboardModel.height + 'px)'
          }"
          @click="handleDelete()"
        >
          <su-icon name="backspace" size="30" color="#303133"></su-icon>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, unref } from 'vue'
import { useDesign } from '../../hooks'
import { baseProps } from '../../libs/vue'
import { carKeyboardProps } from './props'
import { addUnit } from '../../libs/function/index'
import keyboard from './keyboard.svg'

defineOptions({
  name: 'su-car-keyboard',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps({
  ...carKeyboardProps,
  ...baseProps
})

const emit = defineEmits(['change', 'update:modelValue', 'cancel', 'confirm'])

const { prefixCls } = useDesign('car-keyboard')

const carList = [
  [
    {
      list: ['京', '沪', '浙', '苏', '粤', '鲁', '晋', '冀', '豫', '川'],
      diff: 0
    },
    {
      list: ['渝', '辽', '吉', '黑', '皖', '鄂', '津', '贵', '云', '桂'],
      diff: 0
    },
    {
      list: ['琼', '青', '新', '藏', '蒙', '宁', '甘', '陕', '闽', '赣'],
      diff: 0
    },
    {
      list: ['湘', '使', '领', '警', '学', '港', '澳', '', '', ''],
      diff: 3
    }
  ],
  [
    {
      list: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      diff: 0
    },
    {
      list: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      diff: 0
    },
    {
      list: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ''],
      diff: 1
    },
    {
      list: ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '', '', ''],
      diff: 3
    }
  ]
]

const toolbarList = [
  {
    ifShow: props.showCancelBtn,
    text: uni.$u.config.i18n('取消'),
    class: `${prefixCls}-content-btn-cancel`,
    onClick: handleCancel
  },
  {
    ifShow: true,
    text: uni.$u.config.i18n('清空'),
    class: `${prefixCls}-content-btn-clear`,
    onClick: handleClear
  },
  {
    ifShow: true,
    text: uni.$u.config.i18n('完成'),
    class: `${prefixCls}-content-btn-confirm`,
    onClick: handleConfirm
  }
]

/** 选择的值 */
const inputValues = ref<string[]>([])
const inputSize = 38
// 当前的索引
const currentIndex = ref(0)

// 键盘的数据
const keyboardModel = reactive({
  // 键盘的模式 0 省份 1 为英文
  mode: 0,
  // 键盘按钮的间距
  gutter: 10,
  // 按钮的宽度
  width: 10,
  // 按钮的高度
  height: 10,
  max: 10,
  handlerWidth: 10,
  ratio: 8
})

/**
 * 计算差异尺寸
 * @param pos - 位置差异值
 * @returns 计算后的差异尺寸
 */
function diffSize(pos: number) {
  // 如果位置差异值为 0，则直接返回 0
  if (pos == 0) {
    return 0
  }
  // 根据键盘模型的宽度和比率计算差异尺寸
  return (pos * keyboardModel.width + (pos * keyboardModel.width) / keyboardModel.ratio) / 2
}

/**
 * 处理当前输入框的切换
 * @param index - 切换到的输入框索引
 */
function handleChangeCur(index: number) {
  // 更新当前索引
  currentIndex.value = index
  // 根据当前索引设置键盘模式
  keyboardModel.mode = unref(currentIndex) === 0 ? 0 : 1
}

/**
 * 处理键盘项的点击事件
 * @param item - 点击的键盘项内容
 */
function hendleItemClick(item: string) {
  // 如果点击的项为空，则直接返回
  if (item === '') {
    return
  }
  // 将点击的项内容赋值给当前输入框
  inputValues.value[unref(currentIndex)] = item
  // 如果当前索引小于最大长度 - 1
  if (unref(currentIndex) < props.maxLength! - 1) {
    // 增加当前索引
    currentIndex.value += 1
    // 根据当前索引设置键盘模式
    keyboardModel.mode = unref(currentIndex) === 0 ? 0 : 1
    // 触发变更函数
    changeFunc(item)
  }
}

/**
 * 处理取消操作
 */
function handleCancel() {
  // 初始化状态
  initState()
  // 触发取消事件
  emit('cancel')
}

/**
 * 处理清空操作
 */
function handleClear() {
  // 初始化状态
  initState()
  // 触发变更函数，传入空字符串
  changeFunc('')
}

/**
 * 处理确认操作
 */
function handleConfirm() {
  // 将输入值数组拼接成字符串
  let value = unref(inputValues).join('')
  // 触发更新模型值事件
  emit('update:modelValue', value)
  // 触发确认事件
  emit('confirm', value)
}

/**
 * 处理值变更操作
 * @param val - 变更的值
 */
function changeFunc(val: string) {
  // 根据当前索引设置键盘模式
  keyboardModel.mode = unref(currentIndex) === 0 ? 0 : 1
  // 触发变更事件
  emit('change', val)
}

/**
 * 初始化状态
 */
function initState() {
  // 将当前索引重置为 0
  currentIndex.value = 0
  // 初始化值
  initValue('')
}

/**
 * 初始化输入值
 * @param val - 初始值
 */
function initValue(val: string) {
  // 计算最大长度
  let max = Math.max(val.length, props.maxLength || 8)
  // 遍历最大长度，将初始值赋值给输入值数组
  for (let i = 0; i < max; i++) {
    inputValues.value[i] = val.charAt(i)
  }
  // 查找第一个空值的索引
  const cur = unref(inputValues).findIndex((x) => !x)
  // 根据查找结果设置当前索引
  currentIndex.value = cur === -1 ? (props.maxLength || 8) - 1 : cur
  // 根据当前索引设置键盘模式
  keyboardModel.mode = unref(currentIndex) === 0 ? 0 : 1
}

/**
 * 初始化键盘按钮宽度计算
 */
function initCalcWidth() {
  // 获取系统信息中的窗口宽度
  const { windowWidth } = uni.getSystemInfoSync()
  // 计算按钮宽度
  let _width = ((windowWidth - keyboardModel.gutter * 6) * keyboardModel.ratio) / (keyboardModel.max * keyboardModel.ratio + length - 1)
  // 设置键盘按钮宽度
  keyboardModel.width = Number(_width.toFixed(2))
  // 设置键盘按钮高度
  keyboardModel.height = Number(((_width / 3) * 4).toFixed(2))
  // 设置键盘操作按钮宽度
  keyboardModel.handlerWidth = Number((_width * 1.5 + _width / (keyboardModel.ratio * 2)).toFixed(2))
}

/**
 * 处理键盘模式切换
 */
function handleChangeMode() {
  // 切换键盘模式
  keyboardModel.mode = keyboardModel.mode === 0 ? 1 : 0
}

/**
 * 处理删除操作
 */
function handleDelete() {
  // 如果当前索引是最大长度 - 1 且当前输入框有值，或者当前输入框有值
  if ((unref(currentIndex) === (props.maxLength || 8) - 1 && unref(inputValues)[unref(currentIndex)]) || unref(inputValues)[unref(currentIndex)]) {
    // 将当前输入框的值清空
    unref(inputValues)[unref(currentIndex)] = ''
    // 触发变更函数，传入空字符串
    changeFunc('')
    return
  }
  // 如果当前索引小于等于 0
  if (unref(currentIndex) <= 0) {
    // 将当前索引重置为 0
    currentIndex.value = 0
  } else {
    // 减少当前索引
    currentIndex.value -= 1
    // 将当前输入框的值清空
    unref(inputValues)[unref(currentIndex)] = ''
    // 触发变更函数，传入空字符串
    changeFunc('')
  }
}


onMounted(() => {
  initState()
  initValue(props.modelValue)
  initCalcWidth()
})
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';
$su-car-keyboard-background-color: rgb(224, 228, 230) !default;
$su-car-keyboard-gutter: 10px !default;
$su-car-keyboard-primary-color: $su-primary !default;
$su-car-keyboard-font-size: 15px !default;
$su-car-keyboard-input-padding: 4px 10px !default;
$su-car-keyboard-input-border: 1px solid $su-border-color !default;
$su-car-keyboard-input-last-child-border-color: $su-success !default;
$su-car-keyboard-content-item-background-color: #fff !default;
$su-car-keyboard-content-item-active-background-color: #bbbcc6 !default;
$su-car-keyboard-content-item-box-shadow: 0 1px 0px #999992 !default;
$su-car-keyboard-content-item-border-radius: 4px !default;
$prefix-cls: 'su-car-keyboard';

.#{$prefix-cls} {
  font-size: $su-car-keyboard-font-size;

  &-input-box {
    @include flex;
    background-color: $su-car-keyboard-content-item-background-color;
    padding: $su-car-keyboard-input-padding;
    justify-content: space-between;

    @keyframes input-blink {
      0% {
        opacity: 0;
      }

      50% {
        opacity: 1;
      }

      100% {
        opacity: 0;
      }
    }

    &-item {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border: $su-car-keyboard-input-border;
      border-radius: $su-car-keyboard-content-item-border-radius;
      font-size: $su-car-keyboard-font-size;

      &:first-child {
        margin-left: 0;
      }

      &.#{$prefix-cls}-input-box-item-pointer:nth-child(8) {
        border-style: solid;
      }

      &.#{$prefix-cls}-input-box-item-pointer:nth-child(2) {
        position: relative;
        margin-right: 5px;

        &::after {
          content: ' ';
          position: absolute;
          right: -12px;
          top: calc(50% - 3px);
          display: flex;
          align-items: center;
          width: 6px;
          height: 6px;
          background-color: #ccc;
          border-radius: 100%;
        }
      }

      &.#{$prefix-cls}-input-box-item-pointer:nth-child(8) {
        border-style: dashed;
        border-color: $su-car-keyboard-input-last-child-border-color;
        background-color: #e9faf2;
        color: $su-car-keyboard-input-last-child-border-color;
      }

      &-current {
        border-color: $su-car-keyboard-primary-color;
        transition: 0.1s;
      }
    }

    &-square {
      width: 100%;
      height: 0;
      position: relative;

      &-content {
        position: absolute;
        width: 100%;
        height: 100%;
      }

      &-cursor {
        &::after {
          color: $su-car-keyboard-primary-color;
          content: '|';
          animation: input-blink 1s infinite;
        }
      }

      &-cnt {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      }
    }
  }

  &-content {
    background-color: $su-car-keyboard-background-color;
    padding: $su-car-keyboard-gutter;
    position: relative;

    &-line {
      @include flex;
      width: 100%;
      justify-content: space-between;
      margin-bottom: $su-car-keyboard-gutter;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &-item {
      @include flex(column);
      position: relative;
      align-items: center;
      justify-content: center;
      background-color: $su-car-keyboard-content-item-background-color;
      border-radius: $su-car-keyboard-content-item-border-radius;
      box-shadow: $su-car-keyboard-content-item-box-shadow;
      font-size: $su-car-keyboard-font-size;

      &:active {
        background-color: $su-car-keyboard-content-item-active-background-color;
      }

      &-empty {
        background-color: unset;
        box-shadow: unset;

        &:active {
          background-color: unset;
        }
      }
    }

    &-btn {
      background-color: #b6bcc4;

      &:active {
        background-color: rgba(182, 188, 196, 0.8);
      }

      &-delete {
        position: absolute;
        right: 0;
      }

      &-change {
        position: absolute;
        left: 0;
      }

      &-confirm {
        // position: absolute;
        background-color: $su-car-keyboard-primary-color;
        color: #fff;

        &:active {
          background-color: $su-car-keyboard-primary-color;
        }
      }
    }

    &-toolbar {
      @include flex;
      margin-bottom: 0;
      font-size: $su-car-keyboard-font-size;

      .#{$prefix-cls}-content-item {
        flex: 1;

        &:last-child {
          margin-right: 0 !important;
        }
      }
    }
  }
}
</style>
