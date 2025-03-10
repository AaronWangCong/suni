## Alert 警告提示 <to-api/>

<demo-model url="/pages/components/alert/index"></demo-model>

警告提示，展现需要关注的信息。

### 使用场景

- 当某个页面需要向用户显示警告的信息时。
- 非浮层的静态展现形式，始终展现，不会自动消失，用户可以点击关闭。

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

- 通过`title`和`description`设置组件的标题和描述内容，如果内容和标题同时存在，标题字体会被加粗加大
- 通过`type`设置主题类型，有`primary`,`success`,`error`,`warning`,`info`可选值
- 通过`effect`设置主题浅或深色调，有`light`(浅色 默认),`dark`(深色)可选值

```html
<template>
  <su-alert :title="title" type="warning" :description="description"></su-alert>
  <su-alert :title="title" type="warning" effect="dark" :description="description"></su-alert>
</template>

<script setup>
  import { ref } from 'vue'

  // 响应式数据
  const title = ref('uview-plus的目标是成为uni-app生态最优秀的UI框架')
  const description = ref('uview-plus是uni-app生态专用的UI框架')
</script>
```

### 图标

通过`show-icon`设置是否显示图标，作用是让信息类型更加醒目。

**注意**：当前版本图标为sui-uni内置图标，根据`type`参数显示不同的图标，无法自定义。

```html
<su-alert-tips type="warning" :show-icon="true"></su-alert-tips>
```

### 可关闭的警告提示

显示关闭按钮，点击可关闭警告提示。

- `closable`参数配置是否可关闭

```html
<template>
  <su-alert :title="title" type="warning" :closable="closable" :description="description"></su-alert>
</template>

<script setup>
  import { ref } from 'vue'
  import { onLoad, onShow } from '@dcloudio/uni-app'

  // 定义响应式数据
  const title = ref('uview-plus的目标是成为uni-app生态最优秀的UI框架')
  const description = ref('uview-plus是uni-app生态专用的UI框架')
  const closable = ref(true)
</script>
```

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/alert/alert.nvue) 右侧演示页面的源码

### API

### Props

| 参数        | 说明                                                | 类型             | 默认值      | 可选值                           |
| ----------- | --------------------------------------------------- | ---------------- | ----------- | -------------------------------- |
| title       | 显示的文字                                          | String           | -           | -                                |
| description | 辅助性文字，颜色比`title`浅一点，字号也小一点，可选 | String           | -           | -                                |
| type        | 使用预设的颜色                                      | String           | warning     | success / primary / error / info |
| closable    | 关闭按钮(默认为叉号icon图标)                        | Boolean          | false       | true                             |
| show-icon   | 是否显示左边的辅助图标                              | Boolean          | false       | true                             |
| show        | 显示或隐藏组件                                      | Boolean          | true        | false                            |
| effect      | 设置主题浅或深色调                                  | String           | light(浅色) | dark(深色)                       |
| center      | 文字是否居中                                        | Boolean          | false       | true                             |
| fontSize    | 字体大小                                            | String \| Number | 14          | -                                |

### Events

| 事件名 | 说明                                              | 回调参数 |
| :----- | :------------------------------------------------ | :------- |
| close  | 点击关闭按钮时触发，需在此回调设置`show`为`false` | -        |
| click  | 点击组件时触发                                    | -        |
