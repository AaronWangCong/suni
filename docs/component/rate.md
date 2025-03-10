## Rate 评分 <to-api/>

<demo-model url="/pages/components/rate/index"></demo-model>

该组件一般用于满意度调查，星型评分的场景。

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

- 通过`count`参数设置总共有多少颗星星可选择
- 通过`v-model`双向绑定初始化时默认选中的星星数量

```html
<template>
  <su-rate :count="count" v-model="value"></su-rate>
</template>

<script setup>
  import { ref } from 'vue'

  const count = ref(4)
  const value = ref(2)
</script>
```

### 自定义样式

- 通过`active-color`设置选中的星星的颜色
- 通过`inactive-color`设置未选中时星星的颜色
- 通过`gutter`设置星星的间距，左右内边距各占`gutter`的一半

```html
<su-rate active-color="#FA3534" inactive-color="#b2b2b2" gutter="20"></su-rate>
```

### 自定义图标

- 通过`active-icon`设置激活的图标
- 通过`inactive-icon`设置未激活的图标

下方示例为使用心形图标替代默认的星星图标：

```html
<su-rate active-icon="heart-fill" inactive-icon="heart"></su-rate>
```

### 最少选中的数量

```html
<su-rate :min-count="5"></su-rate>
```

### 禁用状态

禁用下，无法点击或者滑动选择，但是可以通过`value`设置默认选中的数量，禁用状态下用来展示分数，允许出现半星

```html
<su-rate :current="3.7" :disabled="true"></su-rate>
```

### 只读状态

只读下，无法点击或者滑动选择，但是可以通过`value`设置默认选中的数量，禁用状态下用来展示分数，允许出现半星

```html
<su-rate :current="3.7" :disabled="true"></su-rate>
```

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/rate/rate.nvue) 右侧演示页面的源码

### API

### Props

| 参数               | 说明                                    | 类型             | 默认值    | 可选值 |
| ------------------ | --------------------------------------- | ---------------- | --------- | ------ |
| v-model/modelValue | 双向绑定选择星星的数量                  | String \| Number | 0         | -      |
| count              | 最多可选的星星数量                      | String \| Number | 5         | -      |
| disabled           | 是否禁止用户操作                        | Boolean          | false     | true   |
| readonly           | 是否只读                                | Boolean          | false     | true   |
| size               | 星星的大小，单位rpx                     | String \| Number | 32        | -      |
| inactive-color     | 未选中星星的颜色                        | String           | #b2b2b2   | -      |
| active-color       | 选中的星星颜色                          | String           | #FA3534   | -      |
| gutter             | 星星之间的距离                          | String \| Number | 10        | -      |
| min-count          | 最少选中星星的个数                      | String \| Number | 0         | -      |
| allowHalf          | 是否允许半星选择                        | Boolean          | false     | true   |
| active-icon        | 选中时的图标名，只能为uView的内置图标   | String           | star-fill | -      |
| inactive-icon      | 未选中时的图标名，只能为uView的内置图标 | String           | star      | -      |
| touchable          | 是否可以通过滑动手势选择评分            | Boolean          | true      | false  |

<!-- | allow-half | 是否允许半星选择 | Boolean | false | true | -->

### Events

| 事件名 | 说明                     | 回调参数                                                                   |
| :----- | :----------------------- | :------------------------------------------------------------------------- |
| change | 选中的星星发生变化时触发 | value：当前选中的星星的数量，如果使用`v-model`双向绑定方式，无需监听此事件 |
