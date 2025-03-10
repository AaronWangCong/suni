### Navbar 自定义导航栏 <to-api/>

此组件一般用于在特殊情况下，需要自定义导航栏的时候用到，一般建议使用uni-app带的导航栏。

<demo-model url="/pages/components/navbar/index"></demo-model>

<custom-block text="右侧的演示中，导航栏上方有圆角，也有顶部的手机模型状态栏内容，以及返回图标和文字不对齐的情况。这是因为网页演示导致，实际中无此情况，请通过右上角的“演示”扫码查看实际效果。"></custom-block>

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

默认情况下，该组件只有向左的箭头，**点击**可以返回上一页，如果您想将自定义导航栏用在tabbar(不存在要返回的逻辑)页面， 这样会隐藏左边的返回图标区域。

- 如果想在返回箭头的右边自定义类似"返回"字样，可以将`left-text`设置为"返回"，前提是`is-back`要为`true`(默认)
- 通过`title`参数传入需要显示的标题，通过`title-width`(rpx)设置标题区域的宽度，文字超出会通过省略号隐藏
- 通过`fixed`配置是否将导航栏固定在顶部

:::tip 说明

- 在小程序中，导航栏会自动适配导航栏右侧的胶囊位置，避开该区域
- 组件底部默认有一条下边框，如您不需要，可以设置`border-bottom`为`false`即可
  :::

```html
<template>
  <view>
    <su-navbar title="个人中心" @rightClick="rightClick" :autoBack="true"></su-navbar>
    <view class="content">
      <!-- 正文内容 -->
    </view>
  </view>
</template>

<script setup>
  // 定义方法
  const rightClick = () => {
    console.log('rightClick')
  }

  const leftClick = () => {
    console.log('leftClick')
  }
</script>
```

### 注意事项

既然是要自定义导航栏，那么首先就要取消系统自带的导航栏，需要在uni-app目的根目录的"pages.json"中设置，同时在此设置状态栏字体的颜色(H5无效)，
自定义导航栏后，如果想通过"uni.setNavigationBarColor"动态设置导航栏颜色相关参数，是可能会出问题的，请勿使用此方式。

```js
// pages.json

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

可以通过`height`(单位**px**，默认44，和uni-app统导航栏高度一致)配置导航栏的高度，此高度为导航栏内容的高度，不含状态栏的高度，组件内部会自动
加上状态栏的高度，并填充状态栏的占位区域。

注意上方说的uni-app方的高度，这里指的是H5，和APP。至于各家小程序，由于受导航栏右侧胶囊的影响，目前组件内部给安卓设定的导航栏高度为`48px`，iOS设定的导航栏高度为`44`，这是结合了大量的
实践的出来的结果，具备完好的兼容性。

### 自定义导航栏内容

**注意：** 通过自定义`slot`传入的内容，为了能在导航栏中垂直居中，您可能需要注意下方示例的css的`slot-wrap`类的内容：

```html
<template>
  <view>
    <su-navbar leftText="返回" title="个人中心" :safeAreaInsetTop="false">
      <template #left>
        <view class="u-nav-slot">
          <su-icon name="arrow-left" size="19"></su-icon>
          <su-line direction="column" :hairline="false" length="16" margin="0 8px"></su-line>
          <su-icon name="home" size="20"></su-icon>
        </view>
      </template>
    </su-navbar>
  </view>
</template>
```

### 自定义导航栏背景颜色

su-uni提供了一个`bgColor`参数(需对象形式)，可以自定义导航栏的背景颜色：

```html
<template>
  <view>
    <su-navbar title="" :bgColor="bgColor"></su-navbar>
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

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/navbar/navbar.nvue) 右侧演示页面的源码

### API

### Props

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
| ---- | ---- | ---- | ------ | ------ |
| height | 导航栏高度(不包括状态栏高度在内，内部自动加上)，注意这里的单位是<span style="color: red;">**px**</span> | String \| Number | 44 | - |
| back-icon-color | 左边返回图标的颜色 | String | #606266 | - |
| back-icon-name | 左边返回图标的名称，只能为uView自带的图标，`1.5.5`起由arrow-left调整为nav-back | String | nav-back | - |
| back-icon-size | 左边返回图标的大小，单位rpx | String \| Number | 30 | - |
| back-text | 返回图标右边的辅助提示文字 | String | - | - |
| back-text-style | 返回图标右边的辅助提示文字的样式，对象形式 | Object | { color: '#606266' } | - |
| title | 导航栏标题，如设置为空字符，将会隐藏标题占位区域 | String | - | - |
| title-width | 导航栏标题的最大宽度，内容超出会以省略号隐藏，单位rpx | String \| Number | 250 | - |
| title-color | 标题的颜色 | String | #606266 | - |
| title-size | 导航栏标题字体大小，单位rpx，`1.5.5`起由32调整为44 | String \| Number | 44 | - |
| z-index | 固定在顶部时的`z-index`值 | String \| Number | 980 | - |
| is-back | 是否显示导航栏左边返回图标和辅助文字 | Boolean | true | false |
| background | 导航栏背景设置(APP和小程序上包括状态栏的颜色)，见上方说明 | Object | { background: '#ffffff' } | - |
| is-fixed | 导航栏是否固定在顶部 | Boolean | true | false |
| border-bottom | 导航栏底部是否显示下边框，如定义了较深的背景颜色，可取消此值 | Boolean | true | false |
| custom-back | 自定义返回逻辑方法，如传入，点击返回按钮执行函数，否则正常返回上一页，注意模板中不需要写方法参数的括号 | Function | - | - |
| immersive | 沉浸式，允许fixed定位后导航栏塌陷，仅fixed定位下生效 | Boolean | false | true |
| title-bold | 导航栏标题字体是否加粗 | Boolean | false | true |

### Slot

| 名称  | 说明                 |
| ----- | -------------------- |
| -     | 自定义中间部分的内容 |
| right | 自定义右侧部分内容   |

<style scoped>
h3[id=props] + table thead tr th:nth-child(2){
	width: 40%;
}

h3[id=slot] + table thead tr th:nth-child(2){
	width: 50%;
}
</style>
