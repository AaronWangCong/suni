## Box 盒子 <to-api/>

box盒子一般为左边一个盒子，右侧两个等高的半盒组成，常用于App首页座位重点突出。

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

- 通过`bgColors`(设置3个盒子的背景色)，`height`(盒子总高度)，`gap`(盒子间隔)
- 通过`borderRadius`设置盒子圆角大小

```html
<template>
  <view class="p-4 bg-white">
    <su-box height="160px" gap="12px" :bgColors="['#EEFCFF', '#FCF8FF', '#FDF8F2']">
      <template #left>左</template>
      <template #rightTop>右上</template>
      <template #rightBottom>右下</template>
    </su-box>
  </view>
</template>
```

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/box/box.nvue) 右侧演示页面的源码

### API

### Props

| 参数   | 说明 | 类型   | 默认值 | 可选值 |
| ------ | ---- | ------ | ------ | ------ |
| height | 高度 | String | 160px  | -      |
| bgCorlors | 盒子背景色 | String | `['#EEFCFF', '#FCF8FF', '#FDF8F2']`  | -      |
| borderRadius | 圆角 | String | 6px | -      |
| gap | 间隔 | String | 15px | -      |

### Slot

| 名称   | 说明 |
| ------ | ---- |
| left | 左侧 |
| rightTop | 右上 |
| rightBottom | 右下 |
