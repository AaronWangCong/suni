<template>
  <su-config-provider :theme="theme" :theme-vars="isRed ? themeVars : {}">
    <su-toast />
    <view class="page-wraper">
      <su-cell title="切换暗黑" title-width="240px" center v-if="showDarkMode">
        <su-switch v-model="isDark" />
      </su-cell>
      <su-cell title="切换主题色" title-width="240px" center v-if="showDarkMode">
        <su-switch v-model="isRed" />
      </su-cell>
      <slot />
      <su-gap height="0" v-if="safeAreaInsetBottom" safe-area-bottom></su-gap>
    </view>
    <su-notify />
  </su-config-provider>
</template>
<script lang="ts">
export default {
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>
<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue'
import { setNotifyDefaultOptions, type ConfigProviderThemeVars } from '@/uni_modules/suni'
import { useDark } from '../../store'

interface Props {
  showDarkMode?: boolean
  safeAreaInsetBottom?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showDarkMode: false,
  safeAreaInsetBottom: true
})

const darkMode = useDark()
const isDark = ref<boolean>(false)
const isRed = ref<boolean>(false)

const themeVars: ConfigProviderThemeVars = {
  colorTheme: 'red'
}

const theme = computed(() => {
  return darkMode.isDark.value || isDark.value ? 'dark' : 'light'
})

onMounted(() => {
  setNotifyDefaultOptions({
    onClick: (event) => console.log('onClick', event),
    onClosed: () => console.log('onClosed'),
    onOpened: () => console.log('onOpened')
  })
})
</script>
<style lang="scss" scoped>
.su-theme-dark {
  .page-wraper {
    background: #000;
  }
}
.page-wraper {
  min-height: calc(100vh - var(--window-top));
  box-sizing: border-box;
}
</style>
