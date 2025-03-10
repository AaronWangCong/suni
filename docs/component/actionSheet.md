## ActionSheet 操作菜单 <to-api/>

<demo-model url="/pages/components/actionSheet/index"></demo-model>

本组件用于从底部弹出一个操作菜单，供用户选择并返回结果。
本组件功能类似于uni的`uni.showActionSheet`API，配置更加灵活，所有平台都表现一致。

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

- 通过`title`(设置标题)，`cancelText`(取消按钮的文字，不为空时显示按钮)，`description`(选项上方的描述信息)
- 通过`actions`设置需要显示的菜单，该值为一个数组，元素为对象，对象至少要提供`name`属性，另外可选的有`fontSize`(字体大小)，`color`(颜色)，`disabled`(是否禁用),`loading`(加载动画)
- 通过`show`绑定一个值为布尔值的变量控制组件的弹出与收起，`v-model:show`的值是双向绑定的

```html
<template>
  <view>
    <su-action-sheet :actions="list" :show="show"></su-action-sheet>
    <su-button @click="show = true">打开ActionSheet</su-button>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const show = ref(false)
  const list = ref([
    {
      name: '选项1'
    },
    {
      name: '选项2'
    },
    {
      name: '选项3'
    }
  ])
</script>
```

### 配置顶部的提示信息和底部取消按钮

- 通过`closeOnClickAction`参数来配置点击某个菜单项时是否关闭弹窗。
- 通过`closeOnClickOverlay`参数配置点击遮罩是否允许关闭（注意：关闭事件需要自行处理，只会在开启`closeOnClickOverlay`后点击遮罩层执行close回调）

```html
<template>
  <su-action-sheet :actions="list" :closeOnClickOverlay="true" :closeOnClickAction="true" :title="title" :show="show"></su-action-sheet>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue'

  const title = ref('标题')
  const list = ref([{ name: '选项一' }, { name: '选项二' }])
  const show = ref(false)
</script>
```

### 点击获取所点击选项name

`select`回调事件带有一个`object`值，这个索引值为传递的`select`数组的`name`值，根据回调事件，能获得点击了 该项的内容

```html
<template>
  <su-action-sheet :actions="list" @select="selectClick" :title="title" :show="show"></su-action-sheet>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue'

  // 响应式数据
  const title = ref('标题')
  const list = ref([{ name: '选项一' }, { name: '选项二' }])
  const show = ref(false)

  // 方法
  const selectClick = (index) => {
    console.log(index)
  }
</script>
```

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/actionSheet/actionSheet.nvue) 右侧演示页面的源码

### API

### Props

注意：props中没有控制组件弹出与收起的参数，因为这是通过v-model绑定变量实现的，见上方说明。

| 参数                   | 说明                                                                                                                                                          | 类型             | 默认值 | 可选值               |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------ | -------------------- |
| show                   | 是否展示                                                                                                                                                      | Boolean          | false  | true                 |
| title                  | 设置标题                                                                                                                                                      | String           | -      | -                    |
| description            | 选项上方的描述信息，见上方文档示例                                                                                                                            | String           | -      | -                    |
| actions                | 按钮的文字数组，见上方文档示例                                                                                                                                | Array            | []     | -                    |
| closeOnClickAction     | 点击某个菜单项时是否关闭弹窗，见上方文档示例                                                                                                                  | String           | -      | -                    |
| safe-area-inset-bottom | 是否开启[底部安全区适配](/component/safeAreaInset.html#关于uview某些组件safe-area-inset参数的说明)                                                            | Boolean          | false  | true                 |
| z-index                | `z-index`值                                                                                                                                                   | Number \ String  | 1075   | -                    |
| cancel-text            | 取消按钮的文字，不为空时显示按钮                                                                                                                              | String           | 取消   | -                    |
| openType               | 程序的打开方式                                                                                                                                                | String           | -      | -                    |
| closeOnClickOverlay    | 点击遮罩是否允许关闭，见上方文档示例（注意：关闭事件需要自行处理，只会在开启closeOnClickOverlay后点击遮罩层执行close回调）                                    | Boolean          | -      | -                    |
| round                  | 圆角值，默认无圆角                                                                                                                                            | String \| Number | 0      | -                    |
| wrapMaxHeight          | 选项列表区域最大高度，支持列表过长滚动。                                                                                                                      | String           | 600px  | -                    |
| lang                   | 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文                                                                                               | String           | en     | zh_CN \| zh_TW \| en |
| sessionFrom            | 会话来源，open-type="contact"时有效。只微信小程序有效                                                                                                         | String           | -      | -                    |
| sendMessageTitle       | 会话内消息卡片标题，openType="contact"时有效                                                                                                                  | String           | -      | -                    |
| sendMessagePath        | 会话内消息卡片点击跳转小程序路径，openType="contact"时有效                                                                                                    | String           | -      | -                    |
| sendMessageImg         | 会话内消息卡片图片，openType="contact"时有效                                                                                                                  | String           | -      | -                    |
| showMessageCard        | 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，openType="contact"时有效 | Boolean          | false  | true                 |
| appParameter           | 打开 APP 时，向 APP 传递的参数，openType=launchApp 时有效                                                                                                     | String           | -      | -                    |

### Event

| 事件名         | 说明                                                                                                                   | 回调参数 | 版本 |
| :------------- | :--------------------------------------------------------------------------------------------------------------------- | :------- | :--- |
| select         | 点击ActionSheet列表项时触发                                                                                            | -        | -    |
| close          | 点击取消按钮时触发                                                                                                     | -        | -    |
| getuserinfo    | 用户点击该按钮时，会返回获取到的用户信息，回调的 detail 数据与 wx.getUserInfo 返回的一致，openType="getUserInfo"时有效 | -        | -    |
| contact        | 客服消息回调，openType="contact"时有效                                                                                 | -        | -    |
| getphonenumber | 获取用户手机号回调，openType="getPhoneNumber"时有效                                                                    | -        | -    |
| error          | 当使用开放能力时，发生错误的回调，openType="error"时有效                                                               | -        | -    |
| launchapp      | 打开 APP 成功的回调，openType="launchApp"时有效                                                                        | -        | -    |
| opensetting    | 在打开授权设置页后回调，openType="openSetting"时有效                                                                   | -        | -    |
