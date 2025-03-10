## [useModal](https://github.com/AaronWangCong/suni/blob/main/src/uni_modules/sun-uni/components/su-modal/index.ts)

useModal 简化 `su-modal` 组件的使用。它提供了一系列快捷方法。

使用 `provide/inject`, 需要提供`key`值

useModal 参数为 selector 用到的key值，和`su-toast`组件绑定

- `openModal` 打开弹窗
- `closeModal` 关闭弹窗
- `setModalProps` 设置弹窗props

```js
const { openModal, setModalProps, closeModal } = useModal('modal')
```

#### 使用示例

```html
<template>
  <up-modal selector="id-9" :content="content" title="标题" :zoom="false"></up-modal>
</template>

<script lang="ts" setup>
  import { useModal } from 'sun-uni/hooks'

  const content = ref('模态框，常用于消息提示、消息确认、在当前页面内完成特定的交互操作')

  const { openModal } = useModal('id-9')

  function showModal() {
    openModal(true)
  }
</script>
```
