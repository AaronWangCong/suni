## Mescroll 组件 <to-api/>

<demo-model url="/pages/template/mescroll/index"></demo-model>

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

mescroll-uni 改造 的vue3 的通用下拉刷新和上拉加载组件。[官网文档](https://www.mescroll.com/uni.html)

- 参数都可以通用

### su-mescroll 组件

- 内部使用的是su-mescroll-body组件
- `queryCallback`默认的返回格式 `{ data: Array, total: Number }`

```html
<su-mescroll :queryCallback="upCallback">
  <template #default="{ list }">
    <view v-for="(item, index) in list" :key="index" class="py-2 px-4 border-#eee border-b-solid border-b-1">
      <view>
        <text>姓名：</text>
        <text>{{ item.userName }}</text>
      </view>
      <view>
        <text>邮箱：</text>
        <text>{{ item.email }}</text>
      </view>
    </view>
  </template>
</su-mescroll>

<script lang="ts" setup>
import type { SuUni } from '@/uni_modules/sun-uni/types/uni'
import { http } from '@/uni_modules/sun-uni'

async function upCallback(mescroll: SuUni.MeScroll) {
  console.log(mescroll, 'mescroll')
  const data = await http.post('/mescroll/list', {
    pageIndex: mescroll.num,
    pageSize: 20
  })

  return {
    data
  }
}
</script>
```

## hooks

可以结合 [useMescroll](/hooks/useMescroll.html) 使用

```js
// 初始化mescroll，包括滚动初始化、下拉刷新和获取mescroll实例的回调函数
const { mescrollInit, downCallback, getMescroll } = useMescroll(onPageScroll, onReachBottom)
```

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/template/mescroll/index.vue) 右侧演示页面的源码

## API

### Props

| 参数          | 说明                      | 类型                                            | 默认值        | 可选值 |
| ------------- | ------------------------- | ----------------------------------------------- | ------------- | ------ |
| queryCallback | 下拉加载的事件            | \<T\>(mescroll: SuUni.MeScroll) => Promise\<T\> | null          | --     |
| onReachBottom | uniapp的onReachBottom事件 | SuUni.onReachBottom                             | onReachBottom | --     |
| onPageScroll  | uniapp的onPageScroll事件  | SuUni.onPageScroll                              | onPageScroll  | --     |
| dataField     | 列表数据字段名            | string                                          | data.list     | --     |
| totalField    | 列表数据字段名            | string                                          | data.total    | --     |
| pageSize      | 分页大小                  | number                                          | 10            | --     |
