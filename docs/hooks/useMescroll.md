## [useMescroll](https://github.com/AaronWangCong/suni/blob/main/src/uni_modules/sun-uni/components/su-mescroll/hooks/useMescroll.ts)

自定义钩子函数，用于处理页面滚动、到达底部和下拉刷新事件

- `onPageScroll` 页面滚动事件的处理函数
- `onReachBottom` 到达底部时的处理函数
- `onPullDownRefresh` 下拉刷新时的处理函数

返回值

- `mescrollInit` 初始化 MeScroll 实例的函数
- `downCallback` 处理下拉刷新的回调函数
- `getMescroll` 获取 MeScroll 实例的函数
- `upCallback` 处理上拉加载的回调函数

```js
import { onPageScroll, onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app'

// 初始化mescroll，包括滚动初始化、下拉刷新和获取mescroll实例的回调函数
const { mescrollInit, downCallback, getMescroll, upCallback } = useMescroll(onPageScroll, onReachBottom, onPullDownRefresh)
```

### 使用示例

- 配合`su-mescroll-body`或者`su-mescroll-uni`组件使用

```html
<script setup lang="ts">
  import { onPageScroll, onReachBottom } from '@dcloudio/uni-app'

  const { mescrollInit, downCallback, getMescroll } = useMescroll(onPageScroll, onReachBottom)

  // 上拉加载的回调, mescroll为MeScroll实例对象
  const upCallback = async (mescroll: SuUni.MeScroll & MeScrollPage) => {
    try {
      const data = await http.post('/mescroll/list', {
        pageIndex: mescroll.num,
        pageSize: 20
      })
      if (mescroll.num === 1) {
        list.value = data.list || []
      } else {
        list.value = list.value?.concat(data.list || [])
      }
      if (mescroll.endBySize) mescroll.endBySize(list.value?.length, data.total)
      mescroll.endBySize(data.value.length, total)
    } catch (error) {
      // 捕获异常，打印错误信息，并调用mescroll的错误结束函数
      console.error('su-mescroll-uni-callback :', error)
      mescroll.endErr()
    }
  }
</script>

<template>
  <!-- su-mescroll-body 和 su-mescroll-uni 组件 -->
  <su-mescroll-body @init="mescrollInit" @down="downCallback" @up="upCallback" v-bind="$attrs">
    <!-- 页面数据内容内容 -->
  </su-mescroll-body>
</template>
```
