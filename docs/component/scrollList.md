### ScrollList 横向滚动列表 <to-api/>

<demo-model url="/pages/components/scrollList/index"></demo-model>

该组件一般用于同时展示多个商品、分类的场景，也可以完成左右滑动的列表。

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

通过slot传入内容

```html
<template>
  <su-scroll-list>
    <view v-for="(item, index) in list" :key="index">
      <image :src="item.thumb"></image>
    </view>
  </su-scroll-list>
</template>
<script setup>
  import { reactive } from 'vue'

  const list = reactive([
    {
      thumb: 'https://cdn.uviewui.com/uview/goods/1.jpg'
    },
    {
      thumb: 'https://cdn.uviewui.com/uview/goods/2.jpg'
    },
    {
      thumb: 'https://cdn.uviewui.com/uview/goods/3.jpg'
    },
    {
      thumb: 'https://cdn.uviewui.com/uview/goods/4.jpg'
    },
    {
      thumb: 'https://cdn.uviewui.com/uview/goods/5.jpg'
    }
  ])
</script>
```

### 指示器的使用

- `indicator` 用于控制指示器是否显示
- `indicatorWidth` 用于控制指示器整体的宽度
- `indicatorBarWidth` 用于控制指示器整体的宽度
- `indicatorColor` 用于控制指示器整体的宽度
- `indicatorActiveColor` 用于控制指示器整体的宽度
- `indicatorStyle` 用于控制指示器整体的宽度

```html
<template>
  <su-scroll-list :indicator="indicator" indicatorColor="#fff0f0" indicatorActiveColor="#f56c6c">
    <view v-for="(item, index) in list" :key="index">
      <image :src="item.thumb"></image>
    </view>
  </su-scroll-list>
</template>
<script setup>
  import { reactive } from 'vue'

  const list = reactive([
    {
      thumb: 'https://cdn.uviewui.com/uview/goods/1.jpg'
    },
    {
      thumb: 'https://cdn.uviewui.com/uview/goods/2.jpg'
    },
    {
      thumb: 'https://cdn.uviewui.com/uview/goods/3.jpg'
    },
    {
      thumb: 'https://cdn.uviewui.com/uview/goods/4.jpg'
    },
    {
      thumb: 'https://cdn.uviewui.com/uview/goods/5.jpg'
    }
  ])
</script>
```

### 兼容性与性能

- 此组件是在nvue中引入bindingx，此库类似于微信小程序wxs，目的是让js运行在视图层，减少视图层和逻辑层的通信折损，在nvue中会有更好的体验。
- 此组件是在APP-VUE、H5、小程序中使用的是wxs。
- 其他平台则使用js完成。

当滑动到最左边/最右边时，提供了事件`left`和`right`可供调用，用于对列表滑动到端点处的业务实现。

::: details 查看基础用法示例
::: code-group

```html [vue]
<template>
  <su-scroll-list @right="right" @left="left">
    <view class="scroll-list" style="flex-direction: row;">
      <view
        class="scroll-list__goods-item"
        v-for="(item, index) in list"
        :key="index"
        :class="[(index === 9) && 'scroll-list__goods-item--no-margin-right']"
      >
        <image class="scroll-list__goods-item__image" :src="item.thumb"></image>
        <text class="scroll-list__goods-item__text">￥{{ item.price }}</text>
      </view>
      <view class="scroll-list__show-more">
        <text class="scroll-list__show-more__text">查看更多</text>
        <su-icon name="arrow-leftward" color="#f56c6c" size="12"></su-icon>
      </view>
    </view>
  </su-scroll-list>
</template>
```

```typescript [typescript]
<script setup>
import { ref } from 'vue';

// 响应式数据
const list = ref([
  {
    price: '230.5',
    thumb: 'https://cdn.uviewui.com/uview/goods/1.jpg'
  },
  {
    price: '74.1',
    thumb: 'https://cdn.uviewui.com/uview/goods/2.jpg'
  },
  // ... 其他对象
  {
    price: '251.5',
    thumb: 'https://cdn.uviewui.com/uview/goods/1.jpg'
  }
]);

// 方法
function left() {
  console.log('left');
}

function right() {
  console.log('right');
}
</script>
```

```scss [scss]
<style lang="scss">
.scroll-list {
	@include flex(column);

	&__goods-item {
		margin-right: 20px;

		&__image {
			width: 60px;
			height: 60px;
			border-radius: 4px;
		}

		&__text {
			color: #f56c6c;
			text-align: center;
			font-size: 12px;
			margin-top: 5px;
		}
	}

	&__show-more {
		background-color: #fff0f0;
		border-radius: 3px;
		padding: 3px 6px;
		@include flex(column);
		align-items: center;

		&__text {
			font-size: 12px;
			width: 12px;
			color: #f56c6c;
			line-height: 16px;
		}
	}
}
</style>
```

:::

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/scrollList/scrollList.nvue) 右侧演示页面的源码

### API

### Props

| 参数                 | 说明                                          | 类型             | 默认值  | 可选值 |
| -------------------- | --------------------------------------------- | ---------------- | ------- | ------ |
| indicatorWidth       | 指示器的整体宽度                              | String \| Number | 50      | -      |
| indicatorBarWidth    | 指示器的整体宽度                              | String \| Number | 20      | -      |
| indicator            | 是否显示面板指示器                            | Boolean          | true    | false  |
| indicatorColor       | 指示器非激活颜色                              | String           | #f2f2f2 | -      |
| indicatorActiveColor | 指示器滑块颜色                                | String           | #3c9cff | -      |
| indicatorStyle       | 指示器样式，可通过bottom，left，right进行定位 | String \| Object | -       | -      |

### Events

| 事件名 | 说明 | 回调参数 |
| ------ | ---- | -------- |
| left | 滑动到左边时触发 | - |
| right | 滑动到右边时触发 | - |
