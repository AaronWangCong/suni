## Avatar 头像 <to-api/>

<demo-model url="/pages/components/album/index"></demo-model>

本组件一般用于展示图片组的地方，如朋友圈图片展示等场景

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

通过`urls`指定相册组的url地址，可以是多个图片

- `keyName` 指定的参数名

```html
<template>
  <view>
    <su-album :urls="urls1" keyName="src2"></su-album>
    <su-album :urls="urls2"></su-album>
  </view>
</template>

<script lang="ts" setup>
  const urls1 = ref([
    {
      src2: 'https://cdn.uviewui.com/uview/album/1.jpg'
    }
  ])

  const urls2 = ref([
    'https://cdn.uviewui.com/uview/album/1.jpg',
    'https://cdn.uviewui.com/uview/album/2.jpg',
    'https://cdn.uviewui.com/uview/album/3.jpg',
    'https://cdn.uviewui.com/uview/album/4.jpg',
    'https://cdn.uviewui.com/uview/album/5.jpg',
    'https://cdn.uviewui.com/uview/album/6.jpg',
    'https://cdn.uviewui.com/uview/album/7.jpg',
    'https://cdn.uviewui.com/uview/album/8.jpg',
    'https://cdn.uviewui.com/uview/album/9.jpg',
    'https://cdn.uviewui.com/uview/album/10.jpg'
  ])
</script>
```

### 图文对齐

- `albumWidth` 回调给上下文宽度对齐，返参为图片的宽度
- `multipleSize` 多图 图片边长

```html
<template>
  <view
    :style="{
      width: albumWidth + 'px'
    }"
  >
    <su-text
      text="全面的组件和便捷的工具会让您信手拈来，如鱼得水"
      :customStyle="{
        width: albumWidth + 'px'
      }"
    ></su-text>
    <su-album :urls="urls2" @albumWidth="(width) => (albumWidth = width)" multipleSize="68"></su-album>
  </view>
</template>

<script lang="ts" setup>
  const albumWidth = ref(0)
  const urls2 = ref([
    'https://cdn.uviewui.com/uview/album/1.jpg',
    'https://cdn.uviewui.com/uview/album/2.jpg',
    'https://cdn.uviewui.com/uview/album/3.jpg',
    'https://cdn.uviewui.com/uview/album/4.jpg',
    'https://cdn.uviewui.com/uview/album/5.jpg',
    'https://cdn.uviewui.com/uview/album/6.jpg',
    'https://cdn.uviewui.com/uview/album/7.jpg',
    'https://cdn.uviewui.com/uview/album/8.jpg',
    'https://cdn.uviewui.com/uview/album/9.jpg',
    'https://cdn.uviewui.com/uview/album/10.jpg'
  ])
</script>
```

### 裁剪模式

- `singleMode` 单图时，图片缩放裁剪的模式 （默认 'scaleToFill' ）
- `multipleMode` 多图时，图片缩放裁剪的模式（默认 'aspectFill' ）

```html
<template>
  <view>
    <su-album :urls="urls3" rowCount="2" maxCount="4" multipleMode="scaleToFill"></su-album>
  </view>
</template>

<script lang="ts" setup>
  const urls2 = ref([
    'https://cdn.uviewui.com/uview/album/5.jpg',
    'https://cdn.uviewui.com/uview/album/6.jpg',
    'https://cdn.uviewui.com/uview/album/7.jpg',
    'https://cdn.uviewui.com/uview/album/8.jpg'
  ])
</script>
```

### 图片大小

- `singleSize` 单图时，图片长边的长度 （默认 180 ）
- `multipleSize` 多图时，图片边长 （默认 70 ）

```html
<template>
  <view>
    <su-album :urls="urls3" rowCount="2" maxCount="4" multipleMode="scaleToFill"></su-album>
  </view>
</template>

<script lang="ts" setup>
  const urls2 = ref([
    'https://cdn.uviewui.com/uview/album/5.jpg',
    'https://cdn.uviewui.com/uview/album/6.jpg',
    'https://cdn.uviewui.com/uview/album/7.jpg',
    'https://cdn.uviewui.com/uview/album/8.jpg'
  ])
</script>
```

### 自定义圆角

- `radius` 圆角值，单位任意，如果为数值，则为px单位 （默认 0 ）

```html
<template>
  <view>
    <su-album :urls="urls3" radius="10"></su-album>
  </view>
</template>

<script lang="ts" setup>
  const urls2 = ref([
    'https://cdn.uviewui.com/uview/album/5.jpg',
    'https://cdn.uviewui.com/uview/album/6.jpg',
    'https://cdn.uviewui.com/uview/album/7.jpg',
    'https://cdn.uviewui.com/uview/album/8.jpg'
  ])
</script>
```

### 自定义形状

- `radius` 圆角值，单位任意，如果为数值，则为px单位 （默认 0 ）

```html
<template>
  <view>
    <su-album :urls="urls3" shape="square"></su-album>
  </view>
</template>

<script lang="ts" setup>
  const urls2 = ref([
    'https://cdn.uviewui.com/uview/album/5.jpg',
    'https://cdn.uviewui.com/uview/album/6.jpg',
    'https://cdn.uviewui.com/uview/album/7.jpg',
    'https://cdn.uviewui.com/uview/album/8.jpg'
  ])
</script>
```

### 自适应自动换行

- `autoWrap` 自适应换行模式，不受rowCount限制，图片会自动换行 （默认 false ）

```html
<template>
  <view>
    <su-album :urls="urls2" :max-count="9" autoWrap></su-album>
  </view>
</template>

<script lang="ts" setup>
  const urls2 = ref([
    'https://cdn.uviewui.com/uview/album/1.jpg',
    'https://cdn.uviewui.com/uview/album/2.jpg',
    'https://cdn.uviewui.com/uview/album/3.jpg',
    'https://cdn.uviewui.com/uview/album/4.jpg',
    'https://cdn.uviewui.com/uview/album/5.jpg',
    'https://cdn.uviewui.com/uview/album/6.jpg',
    'https://cdn.uviewui.com/uview/album/7.jpg',
    'https://cdn.uviewui.com/uview/album/8.jpg',
    'https://cdn.uviewui.com/uview/album/9.jpg',
    'https://cdn.uviewui.com/uview/album/10.jpg'
  ])
</script>
```

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/album/album.nvue) 右侧演示页面的源码

### API

### Props

| 参数             | 说明                                                             | 类型             | 默认值        | 可选值 |
| ---------------- | ---------------------------------------------------------------- | ---------------- | ------------- | ------ |
| urls             | 图片地址列表 `Array<String>` 或者 `Array<Object>`                | Array            | []            | -      |
| keyName          | 指定从数组的对象元素中读取哪个属性作为图片地址                   | String           | -             | -      |
| singleSize       | 单图时，图片长边的长度 （默认 180 ）                             | String \| Number | 180           | -      |
| multipleSize     | 多图时，图片边长 （默认 70 ）                                    | String \| Number | 70            | -      |
| space            | 多图时，图片水平和垂直之间的间隔 （默认 6 ）                     | String \| Number | 6             | -      |
| singleMode       | 单图时，图片缩放裁剪的模式 （默认 'scaleToFill' ）               | String           | 'scaleToFill' | -      |
| multipleMode     | 多图时，图片缩放裁剪的模式 （默认 'scaleToFill' ）               | String           | 'scaleToFill' | -      |
| maxCount         | 最大图片数量                                                     | String \| Number | 9             | -      |
| previewFullImage | 是否可以预览图片                                                 | Boolean          | true          | false  |
| rowCount         | 每行展示图片数量，如设置，singleSize和multipleSize将会无效       | String \| Number | 3             | -      |
| showMore         | 超出maxCount时是否显示查看更多的提示                             | Boolean          | true          | false  |
| shape            | 图片形状，circle-圆形，square-方形                               | circle \| square | square        | circle |
| radius           | 圆角值，单位任意，如果为数值，则为px单位 （默认 0 ）             | String \| Number | 0             | -      |
| autoWrap         | 自适应换行模式，不受rowCount限制，图片会自动换行 （默认 false ） | Boolean          | false         | true   |
| unit             | 图片的单位                                                       | String           | px            | -      |

### Event

| 事件名     | 说明                                               | 回调参数        |
| :--------- | :------------------------------------------------- | :-------------- |
| albumWidth | 需要让文字与相册的宽度相等，这里事件的形式对外发送 | width: 图片宽度 |

<style scoped>
h3[id=props] + table thead tr th:nth-child(2){
	width: 35%;
}
</style>
