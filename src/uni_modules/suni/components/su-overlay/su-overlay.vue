<template>
  <su-transition
    :show="show"
    name="fade"
    custom-class="su-overlay"
    :duration="duration"
    :custom-style="`z-index: ${zIndex}; ${customStyle}`"
    @click="handleClick"
    @touchmove.stop.prevent="lockScroll ? noop : ''"
  >
    <slot></slot>
  </su-transition>
</template>
<script lang="ts">
export default {
  name: 'su-overlay',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import wdTransition from '../su-transition/su-transition.vue'
import useLockScroll from '../composables/useLockScroll'
import { overlayProps } from './types'

const props = defineProps(overlayProps)

const emit = defineEmits(['click'])

function handleClick() {
  emit('click')
}

function noop() {}

// #ifdef H5
useLockScroll(() => props.show && props.lockScroll)
// #endif
</script>

<style lang="scss">
@import './index.scss';
</style>
