## tabs 标签 <to-api/>

<demo-model url="/pages/components/tabs/index"></demo-model>

该组件，是一个tabs标签组件，在标签多的时候，可以配置为左右滑动，标签少的时候，可以禁止滑动。
该组件的一个特点是配置为滚动模式时，激活的tab会自动移动到组件的中间位置。

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

- 通过设置`scrollable`(默认为`true`)，配置tabs组件的内容是否可以左右拖动，一般4个标签以下时，无需拖动，设置为`false`，5个标签以上，建议可以左右拖动。
- tabs标签的切换，需要绑定`current`值，在`change`事件回调中可以得到`index`，将其赋值给current即可，也可以使用`v-model:current`自动双向绑定。

具体的标签，通过`list`参数配置，该参数要求为数组，元素为对象，对象要有`name`属性，见示例：

:::tip 说明
`scrollable`参数很重要，如果您的`tabs`项只有几个，且不想tabs导航栏可以被左右滑动的话，请一定要设置`scrollable`为`false`，因为它默认为`true`。
:::

```html
<template>
  <su-tabs :list="list1" @click="click"></su-tabs>
</template>

<script setup>
  import { reactive } from 'vue'

  // 创建响应式数据
  const list1 = reactive([
    { name: '关注' },
    { name: '推荐' },
    { name: '电影' },
    { name: '科技' },
    { name: '音乐' },
    { name: '美食' },
    { name: '文化' },
    { name: '财经' },
    { name: '手工' }
  ])

  // 定义方法
  function click(item) {
    console.log('item', item)
  }
</script>
```

### 粘性布局

通过加上`su-sticky`来使`tabs`滑动浮动在最顶部。

```html
<template>
  <su-sticky bgColor="#fff">
    <su-tabs :list="list1"></su-tabs>
  </su-sticky>
</template>

<script setup>
  import { reactive } from 'vue'

  // 创建响应式数据
  const list1 = reactive([
    { name: '关注' },
    { name: '推荐' },
    { name: '电影' },
    { name: '科技' },
    { name: '音乐' },
    { name: '美食' },
    { name: '文化' },
    { name: '财经' },
    { name: '手工' }
  ])
</script>
```

### 显示徽标

可以通过在列表对象中加入`badge`来设置徽标。

```html
<template>
  <su-tabs :list="list2"></su-tabs>
</template>
<script setup>
  import { reactive } from 'vue'

  // 创建响应式数据
  const list2 = reactive([
    { name: '关注' },
    { name: '推荐', badge: { isDot: true } },
    { name: '电影', badge: { value: 5 } },
    { name: '科技' },
    { name: '音乐' },
    { name: '美食' },
    { name: '文化' },
    { name: '财经' },
    { name: '手工' }
  ])
</script>
```

### 禁用

可以通过在列表对象中加入`disabled = true`来设置禁用。

```html
<template>
  <su-tabs :list="list2"></su-tabs>
</template>
<script setup>
  import { reactive } from 'vue'

  // 创建响应式数据
  const list2 = reactive([
    { name: '关注', disabled: true },
    { name: '推荐', badge: { isDot: true } },
    { name: '电影', badge: { value: 5 } },
    { name: '科技', disabled: true },
    { name: '音乐' },
    { name: '美食' },
    { name: '文化' },
    { name: '财经' },
    { name: '手工' }
  ])
</script>
```

### 自定义样式

通过使用`activeStyle`、`inactiveStyle`、`itemStyle`来设置tabs的样式。

```html
<template>
  <su-tabs
    :list="list4"
    lineWidth="30"
    lineColor="#f56c6c"
    :activeStyle="{
            color: '#303133',
            fontWeight: 'bold',
            transform: 'scale(1.05)'
        }"
    :inactiveStyle="{
            color: '#606266',
            transform: 'scale(1)'
        }"
    itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;"
  ></su-tabs>
</template>

<script setup>
  import { ref, reactive } from 'vue'

  const list4 = reactive([
    { name: '关注' },
    { name: '推荐', badge: { isDot: true } },
    { name: '电影' },
    { name: '科技' },
    { name: '音乐' },
    { name: '美食' },
    { name: '文化' },
    { name: '财经' },
    { name: '手工' }
  ])
</script>
```

### 滑块设置背景图

通过使用`lineColor`来设置滑块背景图。

```html
<template>
  <su-tabs
    :list="list4"
    lineWidth="20"
    lineHeight="7"
    :lineColor="`url(${lineBg}) 100% 100%`"
    :activeStyle="{
        color: '#303133',
        fontWeight: 'bold',
        transform: 'scale(1.05)'
    }"
    :inactiveStyle="{
        color: '#606266',
        transform: 'scale(1)'
    }"
    itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;"
  ></su-tabs>
</template>

<script setup>
  import { reactive } from 'vue'

  const lineBg =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAOCAYAAABdC15GAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFxSURBVHgBzZNRTsJAEIb/WTW+lpiY+FZPIDew3ABP4GJ8hxsI9zBpOYHeQDwBPQI+mRiRvpLojtPdYhCorQqF/6GdbGd2vvwzBXZcNAt4oj1ANeUoAT5iqkUjbEFLHNmhD1YPEvpZ3ghkGlVDCkc94/BmHMq998I5ONiY1ZBfpKAyuOtgAc5yOEDmYEWNh32BHF91sGHZHmwW4azciN9aQwnz3SJEgOmte+R2tdLprTYoa50mvuomlLpD4Y3oQZnov6D2RzCqI93bWOHaEmAGqQUyRBlZR1WfarcD/EJ2z8DtzDGvsMCwpm8XOCfDUsVOCYhiqRxI/CTQo4UOvjzO7Pow18vfywneuUHHUUxLn55lLw5JFpZ8bEUcY8oXdOLWiHLTxvoGpLqoUmy6dBT15o/ox3znpoycAmxUsiJTbs1cmxeVKp+0zmFIS7bGWiVghC7Vwse8jFKAX9eljh4ggKLLv7uaQvG9/F59Oo2SouxPu7OTCxN/s8wAAAAASUVORK5CYII='

  // 响应式数据
  const list4 = reactive([
    { name: '关注' },
    { name: '推荐', badge: { isDot: true } },
    { name: '电影' },
    { name: '科技' },
    { name: '音乐' },
    { name: '美食' },
    { name: '文化' },
    { name: '财经' },
    { name: '手工' }
  ])
</script>
```

### 右侧自定义插槽

```html
<template>
  <su-tabs :list="list1">
    <template #right>
      <view style="padding-left: 4px;" @tap="$u.toast('插槽被点击')">
        <su-icon name="list" size="21" bold></su-icon>
      </view>
    </template>
  </su-tabs>
</template>

<script setup>
  import { reactive } from 'vue'

  // 创建响应式数组
  const list1 = reactive([
    { name: '关注' },
    { name: '推荐' },
    { name: '电影' },
    { name: '科技' },
    { name: '音乐' },
    { name: '美食' },
    { name: '文化' },
    { name: '财经' },
    { name: '手工' }
  ])
</script>
```

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/tabs/tabs.nvue) 右侧演示页面的源码

### API

### Props

| 参数          | 说明                                          | 类型             | 默认值                 | 可选值 |
| ------------- | --------------------------------------------- | ---------------- | ---------------------- | ------ |
| duration      | 滑块移动一次所需的时间，单位**ms**            | String \| Number | 300                    | -      |
| list          | 标签数组，元素为对象，如：`[{name: '推荐'}] ` | Array            | -                      | -      |
| lineColor     | 滑块颜色                                      | String           | #3c9cff                | -      |
| activeStyle   | 菜单选择中时的样式                            | String \| Object | `{ color: '#303133' }` | -      |
| inactiveStyle | 菜单非选中时的样式                            | String \| Object | `{ color: '#606266' }` | -      |
| lineWidth     | 滑块长度                                      | String \| Number | 20                     | -      |
| lineHeight    | 滑块高度                                      | String \| Number | 3                      | -      |
| lineBgSize    | 滑块背景显示大小，当滑块背景设置为图片时使用  | String           | cover                  | -      |
| itemStyle     | 菜单item的样式                                | String \| Object | `{ height: '44px' }`   | -      |
| scrollable    | 菜单是否可滚动                                | Boolean          | true                   | false  |
| current       | 当前选中标签的索引                            | String \| Number | 0                      | -      |
| keyName       | 从`list`元素对象中读取的键名                  | String           | name                   | -      |

### Slot

| 名称    | 说明                                             |
| :------ | :----------------------------------------------- |
| left    | 整体左侧插槽                                     |
| right   | 整体右侧插槽                                     |
| content | 自定义每个tab内容 `scope={item, keyName, index}` |

### Events

| 事件名    | 说明                                   | 回调参数                                                | 版本 |
| :-------- | :------------------------------------- | :------------------------------------------------------ | :--- |
| change    | 标签索引改变时触发(disalbed时不会触发) | tabItem: `{ index: 标签索引值，...item: 传入的其他值 }` | -    |
| click     | 点击标签时触发                         | index: 标签索引值，item: 传入的其他值                   | -    |
| longPress | 长按标签时触发                         | index: 标签索引值，item: 传入的其他值                   | -    |
