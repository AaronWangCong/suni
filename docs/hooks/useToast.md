## [useToast](https://github.com/AaronWangCong/suni/blob/main/src/uni_modules/sun-uni/components/su-toast/index.ts)

useToast 简化 `su-toast` 组件的使用。它提供了一系列快捷方法。

使用 `provide/inject`, 需要提供`key`值

useToast 参数为 selector 用到的key值，和`su-toast`组件绑定

- `show` 显示toast
- `loading` 显示加载中toast
- `success` 显示成功toast
- `error` 显示错误toast
- `warning` 显示警告toast
- `info` 显示信息toast
- `close` 关闭toast


### 代码

```js
const { show, loading, success, error, warning, info, close } = useToast('toast')
```

### 使用示例

```html
<template>
  <su-toast selector="me-toast" />
</template>

<script setup lang="ts">
  const { show, loading, success, error, warning, info, close } = useToast('me-toast')

  show({
    message: '我是toast'
  })
  loading('我是加载中toast')
  success('我是成功toast')
  error('我是错误toast')
  warning('我是警告toast')
  info('我是信息toast')
  close()
</script>
```
