## Avatar 头像 <to-api/>

<demo-model url="/pages/components/avatar/index"></demo-model>

本组件一般用于展示头像的地方，如个人中心，或者评论列表页的用户头像展示等场所。

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

通过`src`指定头像的路径即可简单使用，如果传递了`text`参数，`text`将会优先起作用

**注意：** 请保证传递给`src`的是绝对地址，而不是相对地址，为什么呢？因为传入`avatar`组件的相对地址，是相对于组件的，而不是父组件(页面)，所以相对址可能会出错。

```html
<template>
  <view>
    <su-avatar :src="src"></su-avatar>
    <su-avatar :text="text"></su-avatar>
  </view>
</template>

<script lang="ts" setup>
  const src = ref('http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg')
  const text = ref('无头像')
</script>
```

### 头像形状

- `shape`参数指定头像的类型，取值`circle`为圆形，取值`square`为圆角方形

```html
<template>
  <su-avatar :src="src" shape="square"></su-avatar>
</template>

<script setup>
  const src = 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg'
</script>
```

### 头像尺寸

- `size`参数可以为指定字符串，或者数值 （默认 40 ）

```html
<template>
  <su-avatar :src="src" size="30"></su-avatar>
  <su-avatar :src="src" size="40"></su-avatar>
  <su-avatar :src="src" size="50"></su-avatar>
</template>

<script setup>
  const src = 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg'
</script>
```

### 图标头像

- `icon`参数显示的图标

```html
<template>
  <su-avatar icon="red-packet-fill" fontSize="22"></su-avatar>
</template>
```

### 文字头像(自动背景色)

- `randomBgColor`是否使用随机背景色
- `colorIndex`如果配置了randomBgColor为true，且配置了此值，则从默认的背景色数组中取出对应索引的颜色值，取值0

```html
<template>
  <su-avatar text="U" fontSize="20" randomBgColor :colorIndex="0"></su-avatar>
</template>
```

### 默认头像

如果头像加载失败，导致加载图片失败，将会显示一个默认的灰色头像

### 小程序开放能力

- `mpAvatar`显示小程序头像，只对百度，微信，QQ小程序有效 （默认 false ）

```html
<template>
  <su-avatar mpAvatar size="60"></su-avatar>
</template>
```

### 头像组`su-avatar-group`

- `urls`头像图片组
- `keyName`指定从数组的对象元素中读取哪个属性作为图片地址
- `gap`头像之间的遮挡比例

```html
<template>
  <su-avatar-group :urls="urls" size="35" gap="0.4"></su-avatar-group>
  <su-avatar-group :urls="urls1" size="35" gap="0.4" keyName="url"></su-avatar-group>
</template>

<script setup>
  const urls = [
    'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
  ]
  const urls1 = [
    {
      url: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg'
    }
  ]
  const
</script>
```

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/avatar/avatar.nvue) 右侧演示页面的源码

### API

### Props

| 参数          | 说明                                                                                                  | 类型             | 默认值     | 可选值 |
| ------------- | ----------------------------------------------------------------------------------------------------- | ---------------- | ---------- | ------ |
| bg-color      | 背景颜色，一般显示文字时用                                                                            | String           | #ffffff    | -      |
| src           | 头像路径，如加载失败，将会显示默认头像                                                                | String           | -          | -      |
| size          | 头像尺寸，可以为指定字符串，或者数值，单位rpx                                                         | String \| Number | default    | -      |
| mode          | 显示类型，见上方说明                                                                                  | String           | circle     | square |
| text          | 用文字替代图片，级别优先于`src`                                                                       | String           | -          | -      |
| mode          | 头像图片的裁剪类型，与uni的`image`组件的`mode`参数一致，如效果达不到需求，可尝试传`widthFix`值        | String           | aspectFill | -      |
| shape         | 头像形状                                                                                              | circle\| square  | circle     | square |
| fontSize      | 文字大小                                                                                              | String \| Number | 18         | -      |
| icon          | 显示的图标                                                                                            | String           | -          | -      |
| mpAvatar      | 显示小程序头像，只对百度，微信，QQ小程序有效 （默认 false ）                                          | Boolean          | false      | -      |
| randomBgColor | 是否使用随机背景色 （默认 false ）                                                                    | Boolean          | false      | -      |
| defaultUrl    | 加载失败的默认头像(组件有内置默认图片)                                                                | String           | -          | -      |
| colorIndex    | 如果配置了randomBgColor为true，且配置了此值，则从默认的背景色数组中取出对应索引的颜色值，取值0-19之间 | String \| Number | 0          | -      |
| name          | 组件标识符                                                                                            | String           | -          | -      |
| customStyle   | 自定义样式                                                                                            | CSSProperties    | -          | -      |

### Event

| 事件名 | 说明       | 回调参数                |
| :----- | :--------- | :---------------------- |
| click  | 头像被点击 | name: 用户传递的标识符 |

## AvatarGroup 头像组

### Props

| 参数       | 说明                                           | 类型             | 默认值      | 可选值 |
| ---------- | ---------------------------------------------- | ---------------- | ----------- | ------ |
| urls       | 头像图片组                                     | Array            | []          | -      |
| maxCount   | 最多展示的头像数量                             | String \| Number | 5           | -      |
| shape      | 头像形状                                       | circle \| square | circle      | square |
| mode       | 图片裁剪模式                                   | String           | scaleToFill | -      |
| showMore   | 超出maxCount时是否显示查看更多的提示           | Boolean          | true        | false  |
| size       | 头像大小                                       | Number           | 40          | -      |
| keyName    | 指定从数组的对象元素中读取哪个属性作为图片地址 | String           | -           | -      |
| extraValue | 需额外显示的值                                 | String \| Number | -           | -      |

### Event

| 事件名   | 说明           | 回调参数 |
| :------- | :------------- | :------- |
| showMore | 头像组更多点击 | -        |

<style scoped>
h3[id=props] + table thead tr th:nth-child(2){
	width: 35%;
}
</style>
