## Transition 动画 <to-api/>

<demo-model url="/pages/components/transition/index"></demo-model>

该组件用于组件的动画过渡效果。

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

通过slot传入内容，默认使用的是`fade`效果

```html
<template>
  <su-transition :show="show">
    <view class="transition"></view>
  </su-transition>
</template>
<script setup>
  import { ref } from 'vue'

  const show = ref(true)
</script>
```

### 动画模式

通过`mode`传入效果模式，目前支持：

- `fade` 淡入
- `fade-up` 上滑淡入
- `fade-down` 下滑淡入
- `fade-left` 左滑淡入
- `fade-right` 右滑淡入
- `slide-up` 上滑进入
- `slide-down` 下滑进入
- `slide-left` 左滑进入
- `slide-right` 右滑进入
- `zoom-in` 缩放
- `zoom-out` 缩放

```html
<template>
  <su-transition :show="show" mode="zoom-in">
    <view class="transition"></view>
  </su-transition>
</template>
<script setup>
  import { ref } from 'vue'

  const show = ref(true)
</script>
```

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/transition/transition.nvue) 右侧演示页面的源码

### API

### Props

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
| ---- | ---- | ---- | ------ | ------ |
| show | 是否展示组件 | Boolean | false | true |
| mode | 使用的动画模式 | String | fade | 查看上面动画方式 |
| duration | 动画的执行时间，单位ms | string \| Number | 300 | - |
| timingFunction | 使用的动画过渡函数，见上方说明 | String | ease-out | - |
| customStyle | 自定义样式 | Object | - | - |

### Events

| 事件名 | 说明 |
| ---- | ---- |
| beforeEnter | 进入前触发 |
| enter | 进入中触发 |
| afterEnter | 进入后触发 |
| beforeLeave | 离开前触发 |
| leave | 离开中触发 |
| afterLeave | 离开后触发 |
