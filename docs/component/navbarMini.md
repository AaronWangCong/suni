### NavbarMini 迷你导航栏 <to-api/>

此组件一般用于在全屏页面中，典型的比如微信小程序左上角。

<demo-model url="/pages/components/navbarMini/index"></demo-model>

:::warning 说明
右侧的演示中，导航栏上方有圆角，也有顶部的手机模型状态栏内容，以及返回图标和文字不对齐的情况。这是因为网页演示导致，实际中无此情况，请通过右上角的“演示”扫码查看实际效果。
:::

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

默认情况下，该组件只有向左的箭头及返回主页的按钮，点击向左的箭头可以返回上一页。

- 通过`fixed`配置是否将导航栏固定在顶部

:::warning 说明
- 非常适合在小程序全屏页面中，避开导航栏右侧的胶囊位置。
:::


```html
<template>
  <view>
    <su-navbar-mini @leftClick="leftClick" :autoBack="true" homeUrl="/pages/index/index"></su-navbar-mini>
  </view>
</template>
<script setup>
  // 定义方法
  const leftClick = () => {
    console.log('leftClick')
  }
</script>
```

### 注意事项

既然是要自定义导航栏，那么首先就要取消系统自带的导航栏，需要在uni-app目的根目录的"pages.json"中设置，同时在此设置状态栏字体的颜色(H5无效)， 自定义导航栏后，如果想通过"uni.setNavigationBarColor"动态设置导航栏颜色相关参数，是可能会出问题的，请勿使用此方式。

```json
"pages": [
	// navbar-自定义导航栏
	{
		"path": "/pages/navbar/index",
		"style": {
			"navigationStyle": "custom" ,// 隐藏系统导航栏
			"navigationBarTextStyle": "white" // 状态栏字体为白色，只能为 white-白色，black-黑色 二选一
		}
	}
]
```

### 导航栏高度

组件内部会自动加上状态栏的高度，并填充状态栏的占位区域。

### 自定义导航栏内容

通过自定义slot传入的内容

```html
<template>
  <view>
    <su-navbar-mini :safeAreaInsetTop="false">
      <template #left>
        <su-icon name="arrow-left" size="19"></su-icon>
      </template>
    </su-navbar-mini>
  </view>
</template>
```

### 自定义导航栏背景颜色

提供了一个`bgColor`参数，可以自定义导航栏的背景颜色：

```html
<template>
  <view>
    <su-navbar-mini fixed :bgColor="bgColor"></su-navbar-mini>
    <view class="content">
      <!-- 正文内容 -->
    </view>
  </view>
</template>

<script setup>
  import { ref } from 'vue'

  // 创建响应式数据
  const bgColor = ref('#001f3f')
</script>
```

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/navbarMini/navbarMini.nvue) 右侧演示页面的源码

### API

### Props

| 参数             | 说明                                                   | 类型             | 默认值     | 可选值 |
| ---------------- | ------------------------------------------------------ | ---------------- | ---------- | ------ |
| safeAreaInsetTop | 是否开启顶部安全区适配                                 | Boolean          | true       | false  |
| fixed            | 导航栏是否固定在顶部                                   | Boolean          | true       | false  |
| leftIcon         | 左边返回图标的名称，只能为自带的图标                   | String           | arrow-left | -      |
| bgColor          | 导航栏背景设置                                         | String           | #fff       | -      |
| height           | 导航栏高度(不包括状态栏高度在内，内部自动加上)，单位px | String \| Number | 44px       | -      |
| iconSize         | 左侧返回图标的大小                                     | String \| Number | 20px       | -      |
| iconColor        | 左侧返回图标的颜色                                     | String           | #303133    | -      |
| autoBack         | 点击左侧区域(返回图标)，是否自动返回上一页             | Boolean          | false      | true   |

### Event

| 名称      | 说明         | 类型    |
| --------- | ------------ | ------- |
| leftClick | 点击左侧区域 | Handler |

### Slot

| 名称   | 说明               |
| ------ | ------------------ |
| left   | 自定义左侧部分内容 |
| center | 自定义左侧部分内容 |
