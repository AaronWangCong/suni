## ApiList 数据列表<to-api/>

新增版本：1.0.34

<demo-model url="/pages/components/apiList/index"></demo-model>

该组件为`su-search`, `su-list`和`su-loadmore`组合的高性能组件，传`listProps`可设置`su-list` 属性，传`searchProps`可设置 `su-search` 属性


### 平台差异说明

| App | App(nvue) | H5  | 小程序 |
| :-: | :-------: | :-: | :----: |
|  √  |     √     |  √  |   √    |

### 基础使用

- 传入`list`数据
- `showSearch`为`true`，开启本地搜索
- 不可传入`api`
- `multiple: true`, 开启多选

```html
<template>
  <view class="su-page">
    <view class="su-demo-block">
      <text class="su-demo-block__title">基础使用</text>
      <view class="su-demo-block__content">
        <su-api-list v-model="modelValue" v-bind="basicListProps"></su-api-list>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import type { SuApiListProps } from 'sun-uni/components/su-api-list/props'
  import { watch } from 'vue'
  import { ref } from 'vue'

  const modelValue = ref([1101])

  const basicListProps: Partial<SuApiListProps> = {
    labelField: 'cnName',
    valueField: 'id',
    listProps: {
      height: '200px'
    },
    showPager: false,
    multiple: true,
    showSearch: true,
    list: [
      {
        id: 1101,
        cnName: '中国'
      },
      {
        id: 1102,
        cnName: '美国'
      },
      {
        id: 1103,
        cnName: '日本'
      }
    ]
  }

  watch(
    () => modelValue.value,
    () => {
      console.log(modelValue.value, 'modelValue.value')
    },
    { deep: true }
  )
</script>
```

### api使用

- 传`api`，`dataField`快速获取接口数据
- `showSearch: true`, 需要设置`searchField`
- `showPager: true`, 开启分页
- `remoteSearch: true`, 远程搜索

```html
<template>
  <view class="su-page">
    <view class="su-demo-block">
      <text class="su-demo-block__title">api使用</text>
      <view class="su-demo-block__content">
        <su-api-list v-model="modelValue" v-bind="apiListProps"></su-api-list>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { CountryGetPageGET } from '@/api/dc-default/Country'
  import type { SuApiListProps } from 'sun-uni/components/su-api-list/props'
  import { watch } from 'vue'
  import { ref } from 'vue'

  const modelValue = ref([1101])

  const apiListProps: Partial<SuApiListProps> = {
    api: CountryGetPageGET,
    labelField: 'cnName',
    valueField: 'id',
    totalField: 'data.pagination.total',
    dataField: 'data.list',
    searchField: 'keyWord',
    listProps: {
      height: '500px'
    },
    showPager: true,
    multiple: true,
    remoteSearch: true,
    showSearch: true
  }

  watch(
    () => modelValue.value,
    () => {
      console.log(modelValue.value, 'modelValue.value')
    },
    { deep: true }
  )
</script>
```

### 抽屉使用

和`su-drawer`一起使用

```html
<template>
  <view class="su-page">
    <su-drawer selector="user-drawer" title="国家列表" show-footer :custom-style="{ height: '600px' }">
      <view style="padding: 24rpx">
        <su-api-list v-model="modelValue" v-bind="apiListProps"></su-api-list>
      </view>
    </su-drawer>
  </view>
</template>
<script setup lang="ts">
  import { CountryGetPageGET } from '@/api/dc-default/Country'
  import type { SuApiListProps } from 'sun-uni/components/su-api-list/props'
  import { watch } from 'vue'
  import { ref } from 'vue'

  import { useDrawer } from 'sun-uni/hooks'
  const modelValue = ref([1101])

  const { openDrawer } = useDrawer('user-drawer')

  const apiListProps: Partial<SuApiListProps> = {
    api: CountryGetPageGET,
    labelField: 'cnName',
    valueField: 'id',
    totalField: 'data.pagination.total',
    dataField: 'data.list',
    searchField: 'keyWord',
    listProps: {
      height: '500px'
    },
    showPager: true,
    multiple: true,
    remoteSearch: true,
    showSearch: true
  }

  watch(
    () => modelValue.value,
    () => {
      console.log(modelValue.value, 'modelValue.value')
    },
    { deep: true }
  )
</script>
```

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/apiList/apiList.vue) 右侧演示页面的源码

### API

### Props

| 参数             | 说明                                                    | 类型                     | 默认值                                       | 可选值 |
| ---------------- | ------------------------------------------------------- | ------------------------ | -------------------------------------------- | ------ |
| api              | api请求方法                                             | Function                 | -                                            | -      |
| immediate        | 是否初始化加载数据                                      | Boolean                  | true                                         | false  |
| loading          | 是否加载中                                              | Boolean                  | false                                        | true   |
| afterFetch       | 请求后的回调                                            | Function                 | -                                            | -      |
| beforeFetch      | 请求前的回调                                            | Function                 | -                                            | -      |
| params           | 请求携带的参数                                          | Object                   | {}                                           | -      |
| labelField       | label 字段                                              | String                   | -                                            | -      |
| valueField       | value 字段                                              | String                   | -                                            | -      |
| currentPageField | 当前页数 field                                          | String                   | pageIndex                                    | -      |
| pageSizeField    | 当前页的大小 field                                      | String                   | pageSize                                     | -      |
| totalField       | 总数 field                                              | String                   | data.pagination.total                        | -      |
| dataField        | 数据的 field                                            | String                   | data.list                                    | -      |
| showSearch       | 是否开启搜索                                            | Boolean                  | true                                         | false  |
| searchField      | 搜索的 field                                            | string                   | -                                            | -      |
| listProps        | `su-list`的`props`配置                                  | SuListProps              | -                                            | -      |
| searchProps      | `su-search`的`props`配置                                | SuListProps              | -                                            | -      |
| showPager        | 是否开启分页                                            | SuListProps              | -                                            | -      |
| pagerConfig      | 分页设置                                                | SuApiListPageConfigProps | `{ currentPage: 1, pageSize: 50, total: 0 }` | -      |
| modelValue       | 当前选中的值                                            | String\|Number\|Array    | -                                            | -      |
| multiple         | 是否多选                                                | Boolean                  | false                                        | true   |
| showLoadmore     | 是否显示加载更多状态                                    | Boolean                  | false                                        | true   |
| loadmoreProps    | `su-loadmore`的props                                     | Boolean                  | false                                        | true   |
| remoteSearch     | 是否远程搜索/本地搜索, 默认false本地搜索, true 远程搜索 | Boolean                  | false                                        | true   |
| list             | 数据                                                    | Array                    | []                                           | -      |

### Emit

| 事件名            | 说明           |
| :---------------- | :------------- |
| search            | 搜索事件       |
| scroll            | 滚动事件       |
| fetch-success     | 加载数据成功   |
| fetch-error       | 加载数据失败   |
| item-click        | item点击事件   |
| scrolltolower     | 滚动到底部事件 |
| update:modelValue | 双向数绑定     |

### Events

| 事件名        | 说明         | 类型                                                |
| :------------ | :----------- | :-------------------------------------------------- |
| setDataSource | 设置data数据 | `(data: SuUni.Recordable[]) => void`                |
| reload        | 重新获取数据 | `(pramas?: SuApiListProps['params']) => void`       |
| getDataSource | 获取data数据 | `() => SuUni.Recordable[]`                          |
| setPagination | 设置分页     | `(info: Partial<SuApiListPageConfigProps>) => void` |
| getPagination | 获取分页     | `() => SuApiListPageConfigProps`                    |
| getLoading    | 获取加载状态 | `boolean`                                           |
| setLoading    | 获取loading  | `(bool: boolean) => void`                           |
