## Skeleton 骨架屏 <to-api/>

<demo-model url="/pages/components/skeleton/index"></demo-model>

骨架屏一般用于页面在请求远程数据尚未完成时，页面用灰色块预显示本来的页面结构，给用户更好的体验。

::: tip 说明
由于`VUE`和`NVUE`的特性不同，组件动画在`VUE`上为由左到右形式，在`NVUE`上为明暗显隐的形式。
:::

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

组件由`标题`，`段落`和`头像`组件组件，其中`段落`需要通过`rows`参数配置才显示，可以通过`title`和`avatar`是否显示标题和头像 。

该组件的使用，有几个需要注意的点，如下：

- `title`(可选)，是否显示`标题`占位行，该占位行不布满全屏宽度，同时与`段落`的距离较大以做明显区分
- `avatar`(可选)，是否在左上角位置显示圆形的`头像`占位区域
- `rows`(可选)，`段落`的行数
- `loading`(必选)，是否加载中状态，如果为`true`则显示骨架屏组件占位，否则显示`插槽`中的内容

数据请求完成后，将`loading`设置为`false`，会隐藏骨架组件

```html
<template>
  <su-skeleton rows="3" title loading></su-skeleton>
</template>
```

### 加载中动画

设置`animate`为`true`，加载中的骨架块将会有一个动画效果，用以加强视觉效果。

```html
<su-skeleton :loading="true" :animate="true"></su-skeleton>
```

### 显示头像

```html
<su-skeleton :loading="true" avatar rows="1"></su-skeleton>
```

### 插槽内容

可以通过插槽写入展示的内容，当请求结束，将`loading`设置为`false`，此时会隐藏骨架组件，同时展示插槽内容。

```html
<template>
  <su-skeleton rows="2" :loading="loading" avatar :title="false">
    <su-text>loading为false时，将会展示此处插槽内容</su-text>
  </su-skeleton>
</template>
<script setup>
  import { ref, onMounted } from 'vue'
  import { onLoad, onShow } from '@dcloudio/uni-app'

  // 响应式数据
  const loading = ref(true)

  onLoad(() => {
    // 延时2秒钟
    uni.$u.sleep(2000).then(() => {
      loading.value = false
    })
  })
</script>
```

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/skeleton/skeleton.nvue) 右侧演示页面的源码

### API

### Props

| 参数        | 说明                                                                                     | 类型                      | 默认值 | 可选值 |
| ----------- | ---------------------------------------------------------------------------------------- | ------------------------- | ------ | ------ |
| loading     | 是否显示骨架组件，请求完成后，将此值设置为`false`                                        | Boolean                   | true   | false  |
| animate     | 骨架块是否显示动画效果                                                                   | Boolean                   | false  | true   |
| rows        | 段落占位图行数                                                                           | Number \| String          | 0      | -      |
| rowsWidth   | 段落占位图的宽度，可以为百分比，数值，带单位字符串等，可通过数组传入指定每个段落行的宽度 | String \| Array \| Number | 100%   | -      |
| rowsHeight  | 段落的高度                                                                               | String \| Array \| Number | 18     | -      |
| title       | 是否展示标题占位图                                                                       | Boolean                   | true   | false  |
| titleWidth  | 标题的宽度                                                                               | String \| Number          | 50%    | -      |
| titleHeight | 标题的宽度                                                                               | String \| Number          | 18     | -      |
| avatar      | 是否展示头像占位图                                                                       | Boolean                   | false  | true   |
| avatarSize  | 头像占位图大小                                                                           | String \| Number          | 32     | -      |
| avatarShape | 头像占位图的形状，circle-圆形，square-方形                                               | String                    | circle | square |
