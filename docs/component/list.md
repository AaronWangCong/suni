## List 数据列表 <to-api/>

<demo-model url="/pages/components/list/index"></demo-model>

该组件为高性能列表组件

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

- 配合组件`su-list-item`嵌套使用
- 参数`show-scrollbar`是否出现滚动条仅在nvue中有效
- 事件`@scrolltolower`滚动到底部触发事件

```html
<template>
  <view class="su-page">
    <su-list @scrolltolower="scrolltolower">
      <su-list-item v-for="(item, index) in indexList" :key="index">
        <su-cell :title="`列表长度-${index + 1}`">
          <template #icon>
            <su-avatar shape="square" size="35" :src="item.url" customStyle="margin: -3px 5px -3px 0"></su-avatar>
          </template>
        </su-cell>
      </su-list-item>
    </su-list>
  </view>
</template>
<script setup lang="ts">
  import { ref, reactive } from 'vue'
  import { onLoad, onShow } from '@dcloudio/uni-app'

  const indexList = reactive([])
  const urls = [
    'https://uview-plus.jiangruyi.com/album/1.jpg',
    'https://uview-plus.jiangruyi.com/album/2.jpg',
    'https://uview-plus.jiangruyi.com/album/3.jpg',
    'https://uview-plus.jiangruyi.com/album/4.jpg',
    'https://uview-plus.jiangruyi.com/album/5.jpg',
    'https://uview-plus.jiangruyi.com/album/6.jpg',
    'https://uview-plus.jiangruyi.com/album/7.jpg',
    'https://uview-plus.jiangruyi.com/album/8.jpg',
    'https://uview-plus.jiangruyi.com/album/9.jpg',
    'https://uview-plus.jiangruyi.com/album/10.jpg'
  ]

  onLoad(() => {
    loadmore()
  })

  const scrolltolower = () => {
    loadmore()
  }

  const loadmore = () => {
    for (let i = 0; i < 30; i++) {
      indexList.value.push({
        url: urls[uni.$u.random(0, urls.length - 1)]
      })
    }
  }
</script>
```

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/list/list.nvue) 右侧演示页面的源码

### API

### List Props

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
| ---- | ---- | ---- | ------ | ------ |
| showScrollbar | 控制是否出现滚动条，仅`nvue`有效 | Boolean | false | true |
| lowerThreshold | 距底部多少时触发scrolltolower事件 | String \| Number | 50 | - |
| upperThreshold | 距顶部多少时触发scrolltoupper事件，非`nvue`有效 | String \| Number | 0 | - |
| scrollTop | 设置竖向滚动条位置 | String \| Number | 0 | - |
| offsetAccuracy | 控制 onscroll 事件触发的频率，仅`nvue`有效 | String \| Number | 10 | - |
| enableFlex | 启用 `flexbox` 布局。开启后，当前节点声明了`display: flex`就会成为`flex container`，并作用于其孩子节点，仅微信小程序有效 | Boolean | false | - |
| pagingEnabled | 是否按分页模式显示List，默认值false | Boolean | false | - |
| scrollable | 是否允许List滚动 | Boolean | true | - |
| scrollIntoView | 值应为某子元素id（id不能以数字开头） | String | - | - |
| scrollWithAnimation | 在设置滚动条位置时使用动画过渡 | Boolean | false | - |
| enableBackToTop | iOS点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只对微信小程序有效 | Boolean | false | - |
| height | 列表的高度 | String \| Number | 0 | - |
| width | 列表宽度 | String \| Number | 0 | - |
| preLoadScreen | 列表前后预渲染的屏数，1代表一个屏幕的高度，1.5代表1个半屏幕高度 | String \| Number | 1 | - |

### List Events

| 事件名 | 说明 | 回调参数 |
| ---- | ---- | ---- |
| scroll | 滚动条滚动触发事件 | scrollTop: 滚动条位置 |
| scrolltolower | 滚动到底部触发事件 | - |

### ListItem Props

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
| ---- | ---- | ---- | ------ | ------ |
| anchor | 用于滚动到指定item | String \| Number | - | - |


<style scoped>
h3[id=events] + table thead tr th:nth-child(2){
	width: 50%;
}

h3[id=slot] + table thead tr th:nth-child(2){
	width: 50%;
}
</style>