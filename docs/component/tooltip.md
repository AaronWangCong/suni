## Tooltip 长按提示 <to-api/>

<demo-model url="/pages/components/tooltip/index"></demo-model>

Tooltip组件主要用于长按操作，类似微信的长按气泡

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

:::warning
由于安卓`nvue`下，overflow属性不支持`visible`值，故此组件暂不支持安卓`nvue`环境。
:::

```html
<template>
  <su-tooltip text="复制" overlay></su-tooltip>
</template>
```

### 下方显示

```html
<template>
  <su-tooltip text="下方显示" direction="bottom"></su-tooltip>
</template>
```

### 扩展按钮

```html
<template>
  <su-tooltip text="扩展显示" :buttons="['扩展']"></su-tooltip>
</template>
```

### 高亮选中文本背景色

```html
<template>
  <su-tooltip text="高亮选中文本背景色" :buttons="['扩展']" bgColor="#e3e4e6"></su-tooltip>
</template>
```

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/tooltip/tooltip.nvue) 右侧演示页面的源码

### API

### Props

| 参数      | 说明                                         | 类型             | 默认值      | 可选值 |
| --------- | -------------------------------------------- | ---------------- | ----------- | ------ |
| text      | 需要显示的提示文字                           | String           | -           | -      |
| copyText  | 点击复制按钮时，复制的文本，为空则使用text值 | String           | -           | -      |
| size      | 文本大小                                     | String           | 14          | -      |
| color     | 字体颜色                                     | String           | #606266     | -      |
| bgColor   | 弹出提示框时，文本的背景色                   | String           | transparent | -      |
| direction | 弹出提示的方向，top-上方，bottom-下方        | String           | top         | bottom |
| zIndex    | 弹出提示的z-index，nvue无效                  | String \| Number | 10071       | -      |
| showCopy  | 是否显示复制按钮                             | Boolean          | true        | false  |
| buttons   | 扩展的按钮组                                 | Array            | -           | -      |
| overlay   | 是否显示透明遮罩以防止触摸穿透               | Boolean          | true        | false  |
| showToast | 是否显示复制成功或者失败的toast              | Boolean          | true        | false  |

### Events

| 参数 | 说明 | 回调参数 |
| ---- | ---- | -------- |
| click | 点击触发事件 | index，被点击按钮的索引 |
