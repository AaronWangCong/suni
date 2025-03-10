## [useModal](https://github.com/AaronWangCong/suni/blob/main/src/uni_modules/sun-uni/components/su-modal/index.ts)

useDrawer 简化 `su-drawer` 组件的使用。它提供了一系列快捷方法。

使用 `provide/inject`, 需要提供`key`值

useDrawer 参数为 selector 用到的key值，和`su-drawer`组件绑定

- `openDrawer` 打开抽屉
- `closeDrawer` 关闭抽屉
- `setDrawerProps` 设置抽屉props

```js
const { openDrawer, setDrawerProps, closeDrawer } = useDrawer('drawer')
```

#### 使用示例

```html
<template>
  <su-button class="mt-4" @click="useDrawerClick">useDrawer 打开抽屉</su-button>

  <su-drawer selector="user-drawer" title="标题" show-footer>
    <view class="p-2 h-900px">openDraweropenDraweropenDraweropenDraweropenDrawer</view>
  </su-drawer>
</template>

<script lang="ts" setup>
  import { useDrawer } from 'sun-uni/hooks'

  const { openModal } = useModal('id-9')

  function useDrawerClick() {
    openDrawer(true)
  }
</script>
```
