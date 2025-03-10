<template>
  <picker-view-column>
    <view class="su-picker-column"></view>
  </picker-view-column>
</template>

<script>
import { props } from './props'
import { mpMixin } from '../../libs/mixin/mpMixin'
import { mixin } from '../../libs/mixin/mixin'
/**
 * PickerColumn
 * @description
 * @tutorial url
 * @property {String}
 * @event {Function}
 * @example
 */
export default {
  name: 'su-picker-column',
  mixins: [mpMixin, mixin, props]
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';
</style>
