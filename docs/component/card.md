## Card 卡片 <to-api/>

<demo-model url="/pages/components/card/index"></demo-model>

卡片组件一般用于多个列表条目，且风格统一的场景。


### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

组件的头部信息可以通过参数配置，其他主体和底部的信息，需要通过`slot`传入。

- `title`配置标题
- `sub-title`配置副标题

```html
<template>
	<su-card :title="title" :sub-title="subTitle" :thumb="thumb">
		<template v-slot:body>
			<view>
				<view class="su-body-item su-flex su-border-bottom su-col-between su-p-t-0">
					<view class="su-body-item-title su-line-2">瓶身描绘的牡丹一如你初妆，冉冉檀香透过窗心事我了然，宣纸上走笔至此搁一半</view>
					<image src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg" mode="aspectFill"></image>
				</view>
				<view class="su-body-item su-flex su-row-between su-p-b-0">
					<view class="su-body-item-title su-line-2">釉色渲染仕女图韵味被私藏，而你嫣然的一笑如含苞待放</view>
					<image src="https://img12.360buyimg.com/n7/jfs/t1/102191/19/9072/330688/5e0af7cfE17698872/c91c00d713bf729a.jpg" mode="aspectFill"></image>
				</view>
			</view>
		</template>
		<template v-slot:foot>
			<view class=""><su-icon name="chat-fill" size="34" color="" label="30评论"></su-icon></view>
		</template>
	</su-card>
</template>

<script lang="ts" setup>
const title = ref('素胚勾勒出青花，笔锋浓转淡')
const subTitle = ref('2020-05-15')
const thumb = ref('http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg')
</script>

<style scoped lang="scss">
	.su-card-wrap {
		background-color: $su-bg-color;
		padding: 1px;
	}

	.su-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 10rpx;
	}

	.su-body-item image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	}
</style>
```

### 配置卡片间距

可以通过`margin`参数配置卡片与屏幕左右的边距，以及上下卡片之间的距离，如: `20rpx 30rpx`、`20rpx 30rpx 30rpx 20rpx`。
注意：当设置`full`参数为`true`的时候，也就是卡片占据屏幕总宽度的时候，通过`margin`配置的左右边距会失效。

```html
<su-card margin="30rpx"></su-card>
```


### 配置卡片左上角的缩略图

这个缩略图是可选的，显示在卡片的左上角位置，如果配置了`thumb`参数(图片路径)，就会显示图片。
- `thumb`缩略图路径
- `thumb-width`缩略图宽度，高等于宽
- `thumb-circle`缩略图是否为圆形


```html
<su-card thumb="xxx.jpg" thumb-width="60"></su-card>
```


### 配置卡片边框

这里说的边框，有3个：

- `border`配置是否显示整个卡片的外边框
- `head-border-bottom`配置是否显示卡片内部头部的下边框
- `foot-border-top`配置是否显示卡片内部底部的上边框

```html
<su-card :border="false" :foot-border-top="false"></su-card>
```


### 设置内边距

默认下，卡片内部的头部，主体，底部都有一个内边距，可以通过配置`padding`参数去覆盖：

```html
<su-card padding="30"></su-card>
```

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/card/card.vue) 右侧演示页面的源码


### API

### Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| full | 卡片与屏幕两侧是否留空隙  | Boolean | fasle | true |
| title | 头部左边的标题  | String	 | - | - |
| title-color | 标题颜色 | String  | #303133 | - |
| title-size | 标题字体大小，单位rpx | String \| Number  | 30 | - |
| sub-title | 头部右边的副标题 | String  | - | - |
| sub-title-color | 副标题颜色 | String  | #909399 | - |
| sub-title-size | 副标题字体大小 | String \| Number  | 26 | - |
| border | 是否显示边框 | Boolean  | true | false |
| index | 用于标识点击了第几个卡片 | String \| Number  | - | - |
| margin | 卡片与屏幕两边和上下元素的间距，需带单位，如"30rpx 20rpx"，见上方说明 | String  | 30rpx | - |
| border-radius | 卡片整体的圆角值，单位rpx | String \| Number  | 16 | - |
| head-style | 头部自定义样式，对象形式 | Object  | - | - |
| body-style | 主体自定义样式，对象形式 | Object  | - | - |
| foot-style | 底部自定义样式，对象形式 | Object  | - | - |
| head-border-bottom | 是否显示头部的下边框 | Boolean  | true | false |
| foot-border-top | 是否显示底部的上边框 | Boolean  | true | false |
| thumb | 缩略图路径，如设置将显示在标题的左边，不建议使用相对路径 | String  | - | - |
| thumb-width | 缩略图的宽度，高等于宽，单位rpx | String \| Number  | 60 | - |
| thumb-circle | 缩略图是否为圆形 | Boolean  | false | true |
| padding | 给head，body，foot部的内边距，见上方说明，单位rpx | String \| Number  | 30 | - |
| show-head  | 是否显示头部 | Boolean  | true | false |
| show-foot  | 是否显示尾部 | Boolean  | true | false |
| box-shadow  | 卡片外围阴影，字符串形式 | String  | none | - |


### Slot

| 名称          | 说明            |
|-------------  |---------------- |
| head | 自定义卡片头部内容  |
| body | 自定义卡片主体部分内容 |
| foot | 自定义卡片底部部分内容 |


### Event

|事件名|说明|回调参数|
|:-|:-|:-|
| click | 整个卡片任意位置被点击时触发 | index: 用户传递的标识符 |
| head-click | 卡片头部被点击时触发 | index: 用户传递的标识符 |
| body-click | 卡片主体部分被点击时触发 | index: 用户传递的标识符 |
| foot-click | 卡片底部部分被点击时触发 | index: 用户传递的标识符 |




<style scoped>
h3[id=props] + table thead tr th:nth-child(2){
	width: 35%;
}

h3[id=slot] + table thead tr th:nth-child(2){
	width: 50%;
}
</style>