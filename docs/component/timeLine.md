## TimeLine 时间轴 <to-api/>

<demo-model url="/pages/components/timeLine/index"></demo-model>


时间轴组件一般用于物流信息展示，各种跟时间相关的记录等场景。

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

- 该组件左边图标默认为显示一个点，如需自定义，请通过name为`node`的`slot`传入内容
- 组件右边内容为了更强的自定义，需要请通过name为`content`的`slot`传入

以下为基本示例，完整示例请见演示部分

```html
<template>
	<su-time-line>
		<su-time-line-item nodeTop="2">
			<!-- 此处自定义了左边内容，用一个图标替代 -->
			<template v-slot:node>
				<view class="su-node" style="background: #19be6b;">
					<!-- 此处为uView的icon组件 -->
					<su-icon name="pushpin-fill" color="#fff" :size="24"></su-icon>
				</view>
			</template>
			<template v-slot:content>
				<view>
					<view class="su-order-title">待取件</view>
					<view class="su-order-desc">[自提柜]您的快件已放在楼下侧门，直走前方53.6米，左拐约10步，再右拐直走，见一红灯笼停下，叩门三下，喊“芝麻开门”即可。</view>
					<view class="su-order-time">2019-05-08 12:12</view>
				</view>
			</template>
		</su-time-line-item>
		<su-time-line-item>
			<!-- 此处没有自定义左边的内容，会默认显示一个点 -->
			<template v-slot:content>
				<view>
					<view class="su-order-desc">【深圳市】日照香炉生紫烟，遥看瀑布挂前川，飞流直下三千尺，疑是银河落九天。</view>
					<view class="su-order-time">2019-12-06 22:30</view>
				</view>
			</template>
		</su-time-line-item>
	</su-time-line>
</template>

<style lang="scss" scoped>
	.su-node {
		width: 44rpx;
		height: 44rpx;
		border-radius: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #d0d0d0;
	}

	.su-order-title {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx;
	}

	.su-order-desc {
		color: rgb(150, 150, 150);
		font-size: 28rpx;
		margin-bottom: 6rpx;
	}

	.su-order-time {
		color: rgb(200, 200, 200);
		font-size: 26rpx;
	}
</style>
```

### 注意事项

如果自定义了左边的图标等内容，有可能左边的图标无法和右边的内容平齐，可以调整`time-line-item`组件的`node-top`参数来达到想要的效果

```html
<su-time-line-item node-top="2">
	<template v-slot:node>
		<su-icon name="pushpin-fill" color="#ddd" :size="24"></su-icon>
	</template>
	<template v-slot:content>
		......
	</template>
</su-time-line-item>
```

### API

### TiemLimeItem Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| bg-color | 左边节点的背景颜色，一般通过slot内容自定义背景颜色即可 | String | #ffffff | - |
| node-top | 节点左边图标绝对定位的top值，单位rpx | String \| Number | - | - |



<style scoped>
h3[id=tiemlimeitem-props] + table thead tr th:nth-child(2){
	width: 40%;
}
</style>