<script lang="ts" setup>
import type { SuUni } from '../../../../types/uni'
import type { SuUseFormContext } from '../types/form'
import SuIcon from '../../../su-icon/su-icon.vue'
import { useDesign } from '../../../../hooks'
import { computed } from 'vue'

interface Props {
  /**
   * 表单实例
   */
  form?: SuUseFormContext<SuUni.Recordable>
  /** 是否折叠 */
  collapsed?: boolean
}

defineOptions({
  name: 'SuUseFormCollapse'
})

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits(['change'])
const { prefixCls } = useDesign('use-form-collapse')

const collapsedText = computed(() => {
  return props.collapsed ? uni.$u.config.i18n('展开') : uni.$u.config.i18n('收起')
})

function handleCollapsed() {
  emit('change', !props.collapsed)
}
</script>

<template>
  <view @click="handleCollapsed" :class="prefixCls">
    <text>{{ collapsedText }}</text>
    <view :class="`${prefixCls}-icon`">
      <SuIcon v-if="props.collapsed" name="arrow-down" :size="14"></SuIcon>
      <SuIcon v-else name="arrow-up" :size="14"></SuIcon>
    </view>
  </view>
</template>

<style lang="scss">
$prefix-cls: 'su-use-form-collapse';

.#{$prefix-cls} {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  font-size: 12px;
  color: $su-info;

  &-icon {
    display: flex;
    align-items: center;
    margin-left: 4px;
  }
}
</style>
