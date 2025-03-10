### LoadingIcon 加载动画 <to-api />

<demo-model url="/pages/components/loading-page/loading-page"></demo-model>

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |


### 基本使用

```html
<template>
	<view>
		<su-loading-page></su-loading-page>
	</view>
</template>
```

### 显示或隐藏

`loading`可以指定是否显示加载页

```html
<su-loading-page :loading="true"></su-loading-page>
```


### 文字内容

`loading-text`可以指定提示内容

```html
<su-loading-page loading-text="loading..."></su-loading-page>
```

### 动画模式

`loading-mode`可以指定加载动画的模式, 默认为`circle`

```html
<su-loading-page loading-mode="spinner"></su-loading-page>
<su-loading-page loading-mode="semicircle"></su-loading-page>
```

### 动画图片

`image`可以指定文字上方用于替换`loading`动画的图片

```html
<su-loading-page image="/static/logo.png"></su-loading-page>
```

### 文字颜色

`color`可以指定文字颜色

```html
<su-loading-page color="#666"></su-loading-page>
```

### 文字大小

`font-size`可以指定文字大小

```html
<su-loading-page font-size="24"></su-loading-page>
```

### 图标大小

`bg-color`可以指定文字大小

```html
<su-loading-page bg-color="#e8e8e8"></su-loading-page>
```

### 图标颜色

`loading-color`可以指定加载中图标的颜色

```html
<su-loading-page loading-color="#000000"></su-loading-page>
```

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/loading-page/loading-page.nvue) 右侧演示页面的源码


| 参数 | 说明 | 类型 | 默认值 | 可选值 |
| ---- | ---- | ---- | ------ | ------ |
| loadingText | 提示内容 | String \| Number | 正在加载 | - |
| image | 文字上方用于替换loading动画的图片 | String | - | - |
| loadingMode | 加载动画的模式 | String | circle | semicircle \| spinner |
| loading | 是否加载中 | boolean | false | true |
| bgColor | 背景颜色 | String | #ffffff | - |
| color | 文字颜色 | String | #C8C8C8 | - |
| fontSize | 文字大小 | String \| Number | 19 | - |
| iconSize  | 图标大小 | String \| Number | 28 | - |
| loadingColor  | 加载中图标的颜色 | String | #C8C8C8 | - |
| zIndex  | zIndex | Number | 10 | - |
