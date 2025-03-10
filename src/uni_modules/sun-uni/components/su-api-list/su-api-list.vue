<script setup lang="ts">
import { computed, ref, unref, watch } from 'vue'
import { useDesign } from '../../hooks'
import { baseProps } from '../../libs/vue'
import { apiListProps, type SuApiListProps } from './props'
import defProps from '../../libs/config/props'
import { useDataSource } from './hooks/useDataSource'
import { usePagination } from './hooks/usePagination'
import { useLoading } from './hooks/useLoading'
import { useScrollEvent } from './hooks/useScrollEvent'
import { useSeaech } from './hooks/useSeaech'
import type { SuUni } from '../../types/uni'

const { prefixCls } = useDesign('api-list')

const emit = defineEmits(['search', 'scroll', 'fetch-success', 'fetch-error', 'item-click', 'scrolltolower', 'update:modelValue'])

const props = defineProps({
  ...apiListProps,
  ...baseProps
})

const modelValue = ref<SuApiListProps['modelValue']>(props.modelValue)

const { setPagination, getPagination, hasMoreRef, getPaginationInfo } = usePagination(props)

const { getLoading, setLoading } = useLoading(props)

const { keyWord, handleSearch, searchDataSource } = useSeaech(props, {
  reload: () => reload(),
  getDataSource: () => getDataSource(),
  setPagination
})

const { dataSource, reload, getDataSource, setDataSource } = useDataSource(
  props,
  {
    setPagination,
    getPaginationInfo,
    setLoading,
    keyWord
  },
  emit
)

const { handleScroll, handleScrollToLower } = useScrollEvent(
  props,
  {
    setPagination,
    getPaginationInfo,
    reload
  },
  emit
)

// 计算属性，返回su-list列表组件的属性
const getListProps = computed(() => {
  return {
    ...defProps.list,
    lowerThreshold: 100,
    height: 'auto',
    ...props.listProps
  }
})

// 计算属性，返回su-search组件的属性
const getSearchProps = computed(() => {
  return {
    ...defProps.search,
    showAction: false,
    placeholder: '请输入关键字',
    ...props.searchProps
  }
})

// 计算属性，返回加载更多组件的属性
const getLoadmoreProps = computed(() => {
  return {
    ...defProps.loadmore,
    loadmoreText: '上拉加载更多',
    loadingText: '正在加载中，请稍后...',
    line: true,
    dashed: true,
    ...props.loadmoreProps,
    status: getLoadMoreStatus.value
  }
})

// 计算属性，返回加载更多组件的状态
const getLoadMoreStatus = computed(() => {
  if (getLoading.value) {
    return 'loading'
  }
  if (unref(hasMoreRef)) {
    return 'loadmore'
  }
  return 'nomore'
})

// 计算属性，返回列表数据
const getListData = computed(() => {
  if (props.showSearch && !props.remoteSearch && keyWord.value) {
    return searchDataSource.value
  }

  return dataSource.value
})

/**
 * 判断是否显示选中状态
 * @param item - 列表项数据
 * @returns 是否显示选中状态
 */
function onShowItemChecked(item: SuUni.Recordable) {
  if (props.multiple) {
    const model = (unref(modelValue) as SuUni.Recordable[]) || []
    return model.includes(item[props.valueField!])
  }
  return item[props.valueField!] === unref(modelValue)
}

/**
 * 处理列表项点击事件
 * @param item - 被点击的列表项数据
 */
function headleClick(item: SuUni.Recordable) {
  if (props.multiple) {
    const model = (unref(modelValue) as SuUni.Recordable[]) || []
    const index = model.findIndex((i) => i === item[props.valueField!])
    if (index > -1) {
      model.splice(index, 1)
    } else {
      model.push(item[props.valueField!])
    }
    modelValue.value = model
  } else {
    modelValue.value = item[props.valueField!]
  }
  emit('item-click', item)
}

/**
 * 获取列表项的内容
 * @param item - 列表项数据
 * @returns 处理后的列表项内容
 */
function getContent(item: SuUni.Recordable) {
  return item[props.labelField!]
    .toString()
    .replace(new RegExp(keyWord.value, 'g'), `<span class="${prefixCls}-list-item-light">${keyWord.value}</span>`)
}

watch(
  () => modelValue.value,
  (val) => {
    emit('update:modelValue', val)
  },
  { deep: true }
)

defineExpose({
  setDataSource,
  reload,
  getDataSource,
  getPagination,
  setPagination,
  getLoading,
  setLoading
})
</script>

<template>
  <view :class="[prefixCls, customClass]" :style="customStyle">
    <view :class="`${prefixCls}-search`" v-if="showSearch">
      <su-search v-model="keyWord" v-bind="getSearchProps" @search="handleSearch"></su-search>
    </view>
    <view :class="`${prefixCls}-list`">
      <su-list v-bind="getListProps" @scrolltolower="handleScrollToLower" @scroll="handleScroll">
        <su-list-item v-for="(item, index) in getListData" :key="item" :anchor="item[valueField!] || index">
          <slot name="item" :item="item" :index="index" :data="dataSource">
            <view :class="`${prefixCls}-list-item`" @click="headleClick(item)">
              <!-- <view>{{ item[labelField!] }}</view> -->
              <rich-text :nodes="getContent(item)"></rich-text>
              <view :class="`${prefixCls}-list-item-checked`" v-if="onShowItemChecked(item)">
                <su-icon name="checkbox-mark" color="primary" :size="20"></su-icon>
              </view>
            </view>
          </slot>
        </su-list-item>
      </su-list>
    </view>
    <view :class="`${prefixCls}-loading`" v-if="showLoadmore">
      <su-loadmore v-bind="getLoadmoreProps"></su-loadmore>
    </view>
  </view>
</template>

<style lang="scss" scoped>
$su-api-list-item-padding: 14px 6px !default;
$su-api-list-item-border-color: #ebedf0 !default;
$su-api-list-item-border-width: 1px !default;
$su-api-list-item-border-style: solid !default;
$su-api-list-item-icon-checked-color: $su-primary !default;

.su-api-list {
  &-list {
    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: $su-api-list-item-padding;
      border-bottom-color: $su-api-list-item-border-color;
      border-bottom-width: $su-api-list-item-border-width;
      border-bottom-style: $su-api-list-item-border-style;

      &-checked {
        display: flex;
        align-items: center;
        color: $su-api-list-item-icon-checked-color;
      }

      &-light {
        color: $su-primary !important;
      }
    }
  }
}
</style>
