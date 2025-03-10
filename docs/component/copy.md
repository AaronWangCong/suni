## Copy 复制组件

<demo-model url="/pages/components/copy/index"></demo-model>

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 使用场景

- 点击页面元素复制文字到剪切板

### 基本使用

- 通过`content`设置要复制的文字内容
- 通过`alertStyle`设置提示样式

```html
<template>
  <view>
    <su-copy content="uview-plus is great !">
      <text>点击复制</text>
    </su-copy>
    <su-copy content="uview-plus is great !">
      <su-button type="primary">点击复制</su-button>
    </su-copy>
  </view>
</template>
```

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/copy/copy.nvue) 右侧演示页面的源码

### API

### Props

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
| ---- | ---- | ---- | ------ | ------ |
| content | 待复制文字内容 | String | - | - |
| alertStyle | 提示样式 | String | toast | modal |
| notice | 提示消息 | String | 复制成功 | - |
| text | 显示的文本 | String | 复制 | - |

### Events

| 事件名 | 说明 | 回调参数 |
| ---- | ---- | ---- |
| success | 复制成功 | ---- |