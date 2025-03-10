<template>
  <view class="su-dropdown-item" v-if="active" @touchmove.stop.prevent="() => {}" @tap.stop.prevent="() => {}">
    <block v-if="!$slots.default">
      <scroll-view
        class="su-dropdown-item__scroll"
        :scroll-y="true"
        :style="{
          height: addUnit(height)
        }"
      >
        <view class="su-dropdown-item__options">
          <su-cell-group>
            <su-cell
              v-for="(item, index) in options"
              @click="cellClick(item.value)"
              :arrow="false"
              :title="item.label"
              :key="index"
              :title-style="{
                color: modelValue == item.value ? activeColor : inactiveColor
              }"
            >
              <su-icon v-if="modelValue == item.value" name="checkbox-mark" :color="activeColor" size="32"></su-icon>
            </su-cell>
          </su-cell-group>
        </view>
      </scroll-view>
    </block>
    <slot v-else />
  </view>
</template>

<script lang="ts" setup>
import { dropdownItemProps } from './props'
import { addUnit } from '../../libs/function/index'
import { onMounted, ref, watch } from 'vue'
import { useParent } from '../../hooks/core/useParent'
import { DROPDOWN_KEY } from '../su-dropdown/props'
/**
 * dropdown-item 下拉菜单
 * @description 该组件一般用于向下展开菜单，同时可切换多个选项卡的场景
 * @tutorial https://suni.pages.dev/sun-uni/component/dropdown.html
 * @property {String | Number} v-model 双向绑定选项卡选择值
 * @property {String} title 菜单项标题
 * @property {Array[Object]} options 选项数据，如果传入了默认slot，此参数无效
 * @property {Boolean} disabled 是否禁用此选项卡（默认false）
 * @property {String | Number} duration 选项卡展开和收起的过渡时间，单位ms（默认300）
 * @property {String | Number} height 弹窗下拉内容的高度(内容超出将会滚动)（默认auto）
 * @example <su-dropdown-item title="标题"></su-dropdown-item>
 */

defineOptions({
  name: 'su-dropdown-item',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps(dropdownItemProps)

const emit = defineEmits(['update:modelValue', 'change'])

// 当前项是否处于展开状态
const active = ref(false)
// 激活时左边文字和右边对勾图标的颜色
const activeColor = ref('#2979ff')
// 未激活时左边文字和右边对勾图标的颜色
const inactiveColor = ref('#606266')

const { parent } = useParent(DROPDOWN_KEY)

/**
 * 初始化函数
 * @description 初始化当前下拉菜单项的状态，包括激活颜色、未激活颜色、展开状态，并将菜单项信息添加到父组件的菜单列表中
 */
function init() {
  // 如果存在父组件
  if (parent) {
    // 设置激活时的颜色，从父组件获取
    activeColor.value = parent.activeColor!
    // 设置未激活时的颜色，从父组件获取
    inactiveColor.value = parent.inactiveColor!
    // 如果父组件只有一个子组件，则默认展开该下拉菜单项
    parent.children.length === 1 && (active.value = true)
    // 将当前菜单项的标题和禁用状态添加到父组件的菜单列表中
    parent.setMenuList({
      title: props.title,
      disabled: props.disabled
    })
  }
}

/**
 * 单元格点击处理函数
 * @param {string} value - 点击单元格对应的值
 * @description 当点击下拉菜单项中的某个选项时，更新双向绑定的值，关闭下拉菜单，并触发 change 事件
 */
function cellClick(value: string) {
  // 触发 update:modelValue 事件，更新双向绑定的值
  emit('update:modelValue', value)
  // 调用父组件的关闭方法，关闭下拉菜单
  parent?.close()
  // 触发 change 事件，传递点击的值
  emit('change', value)
}

/**
 * 设置激活状态函数
 * @param {boolean} bool - 要设置的激活状态，true 表示激活，false 表示未激活
 * @description 设置当前下拉菜单项的展开状态
 */
function setActive(bool: boolean) {
  // 设置当前下拉菜单项的激活状态
  active.value = bool
}


watch(
  () => [props.title, props.disabled],
  () => {
    if (parent) parent.init()
  }
)

onMounted(() => {
  init()
})

defineExpose({
  init,
  setActive
})
</script>

<style scoped lang="scss">
@import '../../libs/css/components.scss';
.su-dropdown-item__scroll {
  background: #ffffff;
}
</style>
