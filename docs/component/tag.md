## Tag 标签 <to-api/>

<demo-model url="/pages/components/tag/index"></demo-model>

tag组件一般用于标记和选择，我们提供了更加丰富的表现形式，能够较全面的涵盖您的使用场景

平台差异说明

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

- 通过`type`参数设置主题类型，默认为`primary`, 可取值`warning`, `success`, `error`
- `text`设置标签内容

```html
<su-tag text="雪月夜" type="success" />
<su-tag text="标签" type="warning"></su-tag>
<su-tag text="标签" type="success"></su-tag>
<su-tag text="标签" type="error"></su-tag>
```

### 自定义尺寸

- 通过设置`size`参数，可以设置标签的类型，`large`、`medium`、`mini`

```html
<su-tag text="一丘之貉" mode="large" />
<su-tag text="沆瀣一气" mode="medium" />
<su-tag text="狼狈为奸" mode="mini" />
```

### 圆形标签

通过`shape`参数，可以设置标签的形状，默认是`square`（方形，带圆角），可选：`circle`（两边半圆形）

- 类似胶囊形状

```html
<su-tag text="主谓宾" shape="circle" />
<su-tag text="定状补" shape="square" />
```

### 镂空标签

```html
<su-tag text="标签" plain></su-tag>
<su-tag text="标签" type="warning" plain></su-tag>
<su-tag text="标签" type="success" plain></su-tag>
<su-tag text="标签" type="error" plain></su-tag>
```

### 镂空带背景色

- 添加`plainFill`属性镂空带背景色

```html
<su-tag text="标签" plain></su-tag>
<su-tag text="标签" type="warning" plain plainFill></su-tag>
<su-tag text="标签" type="success" plain plainFill></su-tag>
<su-tag text="标签" type="error" plain plainFill></su-tag>
```

### 可关闭标签

`tag`在右上角提供了删除标签的样式

```html
<template>
  <su-tag text="标签" size="mini" closable :show="close1" @close="close1 = false"></su-tag>
  <su-tag text="标签" type="warning" closable :show="close2" @close="close2 = false"></su-tag>
  <su-tag text="标签" type="success" plain size="large" closable :show="close3" @close="close3 = false"></su-tag>
</template>

<script setup>
  import { ref, reactive } from 'vue'

  const close1 = ref(true)
  const close2 = ref(true)
  const close3 = ref(true)
  const radios = reactive([{ checked: true }, { checked: false }, { checked: false }])
  const checkboxs = reactive([{ checked: true }, { checked: false }, { checked: false }])
</script>
```

### 带图片和图标

```html
<su-tag text="标签" size="mini" icon="map" plain></su-tag>
<su-tag text="标签" type="warning" icon="tags-fill"></su-tag>
<su-tag text="标签" type="success" plain size="large" icon="https://cdn.uviewui.com/uview/example/tag.png"></su-tag>
```

### 单选标签和多选标签

```html
<template>
  <!-- 单选 -->
  <view class="u-page__tag-item" v-for="(item, index) in radios" :key="index">
    <su-tag :text="`选项${index + 1}`" :plain="!item.checked" type="warning" :name="index" @click="radioClick"></su-tag>
  </view>
  <!-- 多选 -->
  <view class="u-page__tag-item" v-for="(item, index) in checkboxs" :key="index">
    <su-tag :text="`选项${index + 1}`" :plain="!item.checked" type="warning" :name="index" @click="checkboxClick"></su-tag>
  </view>
</template>

<script setup>
  import { reactive } from 'vue'

  const radios = reactive([{ checked: true }, { checked: false }, { checked: false }])
  const checkboxs = reactive([{ checked: true }, { checked: false }, { checked: false }])

  const radioClick = (name) => {
    radios.forEach((item, index) => {
      item.checked = index === name
    })
  }

  const checkboxClick = (name) => {
    checkboxs[name].checked = !checkboxs[name].checked
  }
</script>
<style lang="scss">
  .u-page__tag-item {
    margin-right: 20px;
  }
</style>
```

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/tag/tag.nvue) 右侧演示页面的源码


### API

### Props

| 参数         | 说明                                                   | 类型             | 默认值  | 可选值                           |
| ------------ | ------------------------------------------------------ | ---------------- | ------- | -------------------------------- |
| type         | 主题类型                                               | String           | primary | success / info / warning / error |
| disabled     | 不可用                                                 | Boolean          | true    | false                            |
| size         | 标签大小                                               | String           | default | mini                             |
| shape        | 标签形状                                               | String           | square  | circle                           |
| text         | 标签的文字内容                                         | String           | -       | -                                |
| bg-color     | 自定义标签的背景颜色                                   | String           | -       | -                                |
| color        | 文字的颜色                                             | String           | -       | -                                |
| border-color | 标签的边框颜色                                         | String           | -       | -                                |
| close-color  | 关闭按钮图标的颜色                                     | String           | #C6C7CB | -                                |
| name         | 点击时返回的索引值，用于区分例遍的数组哪个元素被点击了 | String \| Number | -       | -                                |
| plainFill    | 镂空时是否填充背景色                                   | Boolean          | false   | false / true                     |
| plain        | 是否镂空                                               | Boolean          | false   | false / true                     |
| closable     | 是否可关闭，设置为`true`，文字右边会出现一个关闭图标   | Boolean          | false   | true                             |
| show         | 标签显示与否                                           | Boolean          | true    | false                            |
| icon         | 内置图标，或绝对路径的图片                             | String           | -       | -                                |

### Event

| 事件名 | 说明                                       | 回调参数                 | 版本 |
| :----- | :----------------------------------------- | :----------------------- | :--- |
| click  | 点击标签触发                               | name: 传递的`name`参数值 | -    |
| close  | `closable`为`true`时，点击标签关闭按钮触发 | name: 传递的`name`参数值 | -    |
