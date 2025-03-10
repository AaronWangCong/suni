## ImagePreview 图片预览 <to-api/>

<demo-model url="/pages/components/imagePreview/imagePreview"></demo-model>

图片预览，多数为图片预览,可设置为组件预览

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 设置页面路由

- page.json 中添加页面路由
- 修改path

```json
{
  "path": "imagePreview/imagePreview", // 修改路径
  "style": {
    "navigationStyle": "custom", // 取消本页面的导航栏
    "app-plus": {
      "animationType": "fade-in", // 设置fade-in淡入动画，为最合理的动画类型
      "background": "transparent", // 背景透明
      "backgroundColor": "rgba(0,0,0,0)", // 背景透明
      "popGesture": "none" // 关闭IOS屏幕左边滑动关闭当前页面的功能
    }
  }
}
```

### 示例

- swiperStyle `{width:'100%',height: '80vh'}`

```html
<script setup lang="ts">
  import { ref } from 'vue'

  const imageList = [
    'https://pic2.zhimg.com/80/v2-6bc06520079e780ac1c550729f5cfa8d_1440w.webp',
    'https://img.tukuppt.com/photo-big/00/02/23/6188eaff33ec07243.jpg',
    'https://img0.baidu.com/it/u=4231555811,1903718579&fm=253&app=138&size=w931',
    'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2022%2F0509%2F1e1bac6cj00rbkpwf001ec000hs00q8c.jpg&thumbnail=660x2147483647&quality=80&type=jpg',
    'https://pic2.zhimg.com/80/v2-6bc06520079e780ac1c550729f5cfa8d_1440w.webp',
    'https://img.tukuppt.com/photo-big/00/02/23/6188eaff33ec07243.jpg',
    'https://img0.baidu.com/it/u=4231555811,1903718579&fm=253&app=138&size=w931',
    'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2022%2F0509%2F1e1bac6cj00rbkpwf001ec000hs00q8c.jpg&thumbnail=660x2147483647&quality=80&type=jpg'
  ]

  const current = ref(2)
</script>

<template>
  <su-image-preview v-model:current="current" :imageList="imageList"></su-image-preview>
</template>
```

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/imagePreview/imagePreview.vue) 右侧演示页面的源码

### API

### Props

| 参数        | 说明                 | 类型                   | 默认值                          | 可选值 |
| ----------- | -------------------- | ---------------------- | ------------------------------- | ------ |
| imageList   | 图片列表集合         | `Array<imageItemType>` | []                              | -      |
| current     | 当前显示的第几个图片 | Number                 | 0                               | -      |
| imageMode   | 裁剪模式             | UniHelper.ImageMode    | aspectFill                      | -      |
| imageStyle  | 图片的样式           | CSSProperties          | `{width:'100%',height: '100%'}` | -      |
| swiperStyle | 图片的样式           | CSSProperties          | `{width:'100%',height: '80vh'}` | -      |

### Slot

| 名称   | 说明       |
| :----- | :--------- |
| action | 底部操作栏 |
