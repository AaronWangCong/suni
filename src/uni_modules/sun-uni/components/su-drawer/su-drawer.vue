<script setup lang="ts">
import { computed, inject, ref, unref, useAttrs, watch, type CSSProperties } from 'vue'
import { useDebounceFn, useDesign } from '../../hooks'
import { baseProps } from '../../libs/vue'
import { drawerProps, type SuDrawerProps } from './props'
import type { SuUni } from '../../types/uni'
import { addUnit, deepMerge } from '../../libs/function'
import { cloneDeep, isFunction } from 'lodash-es'
import { drawerDefaultOptionKey } from '.'

const props = defineProps({
  ...drawerProps,
  ...baseProps
})

const emit = defineEmits(['close', 'click', 'update:modelValue', 'cancel', 'update-props'])

const attrs = useAttrs()

const visible = ref(false)
const { prefixCls } = useDesign('drawer')
const propsRef = ref<Partial<SuDrawerProps>>(cloneDeep(props))

const drawerOptionKey = props.selector ? drawerDefaultOptionKey + props.selector : drawerDefaultOptionKey

const drawerOptions = inject(
  drawerOptionKey,
  ref<Partial<SuDrawerProps>>({
    confirmLoading: false
  })
)

const getProps = computed((): Partial<SuDrawerProps> => unref(propsRef))

/** 计算内容区域高度 */
const getScrollStyle = computed(() => {
  const { footerHeight, showFooter, showHeader, headerHeight } = unref(getProps)
  // 确保高度值为有效数值
  const validFooterHeight = footerHeight || 0
  const validHeaderHeight = headerHeight || 0
  let height = '100%'
  if (showHeader) {
    height = `calc(100% - ${addUnit(validHeaderHeight)})`
  }
  if (showFooter) {
    height = `calc(${height} - ${addUnit(validFooterHeight)})`
  }

  return {
    height
  }
})

/** 底部操作按钮 */
const footerActionList = computed(() => {
  const { showCancelButton, showConfirmButton, confirmColProps, cancelColProps, cancelText, confirmText, cancelButtonProps, confirmButtonProps } =
    unref(getProps)

  const actionList: SuUni.Recordable[] = []
  if (showCancelButton) {
    actionList.push({
      colProps: {
        ...cancelColProps,
        span: 12 - (confirmColProps!.span || 0)
      },
      buttonProps: cancelButtonProps,
      label: cancelText,
      onClick: hendleCancel
    })
  }

  if (showConfirmButton) {
    actionList.push({
      colProps: {
        ...confirmColProps,
        span: 12 - (cancelColProps!.span || 0)
      },
      buttonProps: {
        ...confirmButtonProps,
        loading: unref(getProps).confirmLoading,
        disabled: unref(getProps).confirmLoading
      },
      label: confirmText,
      onClick: hendleConfirm
    })
  }

  return actionList
})

/** 头部样式 */
const getHeaderStyle = computed(() => {
  return {
    height: addUnit(unref(getProps).headerHeight),
    ...(unref(getProps).headerStyle! as CSSProperties)
  }
})

/** 底部样式 */
const getFooterStyle = computed(() => {
  return {
    height: addUnit(unref(getProps).footerHeight),
    ...(unref(getProps).footerStyle! as CSSProperties)
  }
})

/** 更新双向绑定的的值 */
function updateModel() {
  drawerOptions.value.modelValue = false
  emit('update:modelValue', false)
}

/** 取消/关闭事件 * */
async function hendleCancel() {
  let flag = true
  if (unref(getProps).closeFunc && isFunction(unref(getProps).closeFunc) && visible.value) {
    flag = await unref(getProps).closeFunc!()
  }
  visible.value = !flag
  updateModel()
  emit('close')
}

/** 确定事件 */
const hendleConfirm = useDebounceFn(async () => {
  try {
    drawerOptions.value.confirmLoading = true
    if (attrs.onConfirm && isFunction(attrs.onConfirm)) {
      await attrs.onConfirm()
    }
  } catch (error: any) {
    throw new Error(error)
  } finally {
    drawerOptions.value.confirmLoading = false
  }
}, 300)

/** 点击事件 */
function clickHandler() {
  if (unref(getProps).closeOnClickOverlay) {
    hendleCancel()
  }
}

/** 监听modelValue变化 */
watch(
  () => unref(getProps).modelValue,
  () => {
    visible.value = !!unref(getProps).modelValue
  }
)

/** 监听props变化, 赋值给drawerOptions */ 
watch(
  () => props,
  () => {
    Object.assign(drawerOptions.value, props)
  },
  { deep: true, immediate: true }
)

/** 更新依赖 */
watch(
  () => drawerOptions.value,
  (val) => {
    visible.value = !!val.modelValue
    propsRef.value = deepMerge(propsRef.value, val)
    emit('update-props', val)
  },
  { deep: true }
)
</script>

<template>
  <su-popup
    v-model="visible"
    :mode="getProps.mode"
    :class="[prefixCls, getProps.customClass]"
    :customStyle="getProps.customStyle"
    :closeOnClickOverlay="getProps.closeOnClickOverlay"
    :duration="getProps.duration || 400"
    :overlay="getProps.overlay"
    :overlayStyle="getProps.overlayStyle"
    :overlayOpacity="getProps.overlayOpacity"
    :closeable="getProps.closeable"
    :round="getProps.round"
    :zIndex="getProps.zIndex"
    :safeAreaInsetBottom="true"
    @click="clickHandler"
    @close="hendleCancel"
  >
    <view style="height: 100%; width: 100%; overflow: hidden">
      <view
        :class="{
          [`${prefixCls}-header`]: true,
          'su-border-bottom': getProps.showHeaderBottomBorder
        }"
        :style="getHeaderStyle"
        v-if="getProps.showHeader"
      >
        <slot name="header-left"></slot>
        <view v-if="getProps.title" :style="getProps.titleStyle" :class="`${prefixCls}-header-title`">
          <text>{{ getProps.title }}</text>
        </view>
        <slot v-else name="header-center"></slot>
        <slot name="header-right"></slot>
      </view>
      <scroll-view scroll-y scroll-x :style="getScrollStyle">
        <view :class="`${prefixCls}-content`" :style="getProps.contentStyle">
          <slot></slot>
        </view>
      </scroll-view>
      <view
        :class="{
          [`${prefixCls}-footer`]: true,
          'su-border-top': getProps.showFooterTopBorder
        }"
        :style="getFooterStyle"
        v-if="getProps.showFooter"
      >
        <slot name="footer"></slot>
        <su-row v-if="footerActionList.length" :gutter="16">
          <su-col v-for="(item, index) in footerActionList" :key="index" :span="item.colProps.span">
            <su-button v-bind="item.buttonProps" @tap="item.onClick" shape="circle">
              <text>{{ item.label }}</text>
            </su-button>
          </su-col>
        </su-row>
      </view>
    </view>
  </su-popup>
</template>

<style lang="scss" scoped>
.su-drawer {
  &-header-title {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-footer {
    display: flex;
    align-items: center;
    width: 100%;

    :deep(.su-row) {
      width: 100%;
      // 先置为0，避免样式bug，导致左右边距失效
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
  }
}
</style>
