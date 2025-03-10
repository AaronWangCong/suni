## Modal 模态框 <to-api/>

弹出模态框，常用于消息提示、消息确认、在当前页面内完成特定的交互操作。

<demo-model url="/pages/components/modal/index"></demo-model>

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

默认情况下，模态框只有一个`确认`按钮：

- 请至少要配置弹框的内容参数`content`。
- 通过`v-model`绑定一个布尔变量来控制模态框的显示与否。

```html
<template>
  <view>
    <su-modal v-model="show" :content="content"></u-modal>
    <su-button @click="open">打开模态框</u-button>
  </view>
</template>

<script setup>
  import { ref } from 'vue';

  // 使用 ref 创建响应式数据
  const show = ref(false);
  const content = ref('东临碣石，以观沧海');

  function open() {
    show.value = true;
  }
</script>
```

### 传入富文本内容

有时候我们需要给模态框的内容，不一定是纯文本的字符串，可能会需要换行，嵌入其他元素等，这时候我们可以使用`slot`功能，再结合uni-app`rictText`组件，
就能传入富文本内容了，如下演示：

```html
<template>
  <view>
    <su-modal v-model="show" :title-style="{color: 'red'}">
      <view class="slot-content">
        <rich-text :nodes="content"></rich-text>
      </view>
    </su-modal>
    <su-button @click="open">打开模态框</u-button>
  </view>
</template>

<script setup>
  import { ref } from 'vue'

  const show = ref(false)

  const content = ref(`空山新雨后<br>天气晚来秋`)
  function open() {
    show.value = true;
  }
</script>
```

### 异步关闭

异步关闭只对"确定"按钮起作用，需要设置`async-close`为`true`，当点击确定按钮的时候，按钮的文字变成一个loading动画，此动画的颜色为
`confirm-color`参数的颜色，同时Modal不会自动关闭，需要手动设置通过`v-model`绑定的变量为`false`来实现手动关闭。

```html
<template>
  <view class="">
    <su-modal v-model="show" @confirm="confirm" ref="uModal1" :async-close="true"></su-modal>
    <su-button @click="showModal">弹起Modal</su-button>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const show = ref(false)

  function showModal() {
    show.value = true
  }

  function confirm() {
    setTimeout(() => {
      // 3秒后自动关闭
      show.value = false
      // 如果不想关闭，而单是清除loading状态，需要通过ref手动调用方法
      // this.$refs.uModal1.clearLoading();
    }, 3000)
  }
</script>
```

### 点击遮罩关闭

有时候我们不显示"关闭"按钮的时候，需要点击遮罩也可以关闭Modal，这时通过配置`closeOnClickOverlay`为`true`即可

```html
<su-modal v-model="show" :closeOnClickOverlay="true"></su-modal>
```

### 控制模态框宽度

可以通过设置`width`参数控制模态框的宽度，不支持百分比，可以数值，px，rpx单位

```html
<su-modal v-model="show" width="70%"></su-modal>
```

### 自定义样式

此组件有完善的自定义功能，可以配置标题，内容，按钮等样式(传入对象形式)，具体参数详见底部的API说明

```html
<su-modal v-model="show" :title-style="{color: 'red'}"></su-modal>
```

### 缩放效果

开启缩放效果，在打开和收起模态框的时候，会带有缩放效果，具体效果请见示例，此效果默认开启，通过`zoom`参数配置

```html
<su-modal v-model="show" :zoom="false"></su-modal>
```

### useModal 函数

此函数可以方便的调用Modal，[具体参数](/hooks/useModal.html)

```html
<template>
  <view>
    <su-button @click="openModal(true)">打开Modal</su-button>
    <su-modal selector="id-1" :content="content" title="标题" :zoom="false"></su-modal>
  </view>
</template>
<script setup lang="ts">
  import { useModal } from 'sun-ui/components/su-modal'

  const { openModal, closeModal, setModalProps } = useModal('id-1')
</script>
```

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/modal/modal.nvue) 右侧演示页面的源码

### API

### Props

注意：需要给`modal`组件通过`v-model`绑定一个布尔值，来初始化`modal`的状态，随后该值被双向绑定。 暴露的类型[`SuModalProps `](https://github.com/AaronWangCong/suni/blob/main/src/uni_modules/sun-uni/components/su-modal/props.ts)

| 参数                | 说明                                                                  | 类型             | 默认值  | 可选值            |
| ------------------- | --------------------------------------------------------------------- | ---------------- | ------- | ----------------- |
| selector            | 唯一标识符，用于在使用`useModal`函数时，调用Modal                     | String           | -       | -                 |
| modelValue          | 是否显示模态框，请赋值给`v-model`                                     | Boolean          | false   | true              |
| z-index             | 层级`(规划中)`                                                        | String \| Number | 1075    | -                 |
| title               | 标题内容                                                              | String           | 提示    | -                 |
| width               | 模态框宽度，数值时单位为rpx                                           | String \| Number | 600     | 百分比 / auto     |
| content             | 模态框内容，如传入`slot`内容，则此参数无效                            | String           | 内容    | -                 |
| showConfirmButton   | 是否显示确认按钮                                                      | Boolean          | true    | false             |
| showCancelButton    | 是否显示取消按钮                                                      | Boolean          | false   | true              |
| confirmText         | 确认按钮的文字                                                        | String           | 确认    | -                 |
| cancelText          | 取消按钮的文字                                                        | String           | 取消    | -                 |
| cancelColor         | 取消按钮的颜色                                                        | String           | #606266 | -                 |
| confirmColor        | 确认按钮的颜色                                                        | String           | #2979ff | -                 |
| border-radius       | 模态框圆角值，单位rpx                                                 | String \| Number | 16      | -                 |
| title-style         | 自定义标题样式，对象形式                                              | Object           | -       | -                 |
| contentStyle        | 自定义内容样式，对象形式`(规划中)`                                    | Object           | -       | -                 |
| cancelStyle         | 自定义取消按钮样式，对象形式`(规划中)`                                | Object           | -       | -                 |
| confirmStyle        | 自定义确认按钮样式，对象形式`(规划中)`                                | Object           | -       | -                 |
| zoom                | 是否开启缩放模式                                                      | Boolean          | true    | false             |
| asyncClose          | 是否异步关闭，只对确定按钮有效，见上方说明                            | Boolean          | false   | true              |
| closeOnClickOverlay | 是否允许点击遮罩关闭Modal                                             | Boolean          | false   | true              |
| negativeTop         | 往上偏移的值，以避免可能弹出的键盘重合，单位任意，数值则默认为rpx单位 | String \| Number | 0       | -                 |
| buttonReverse       | 对调确认和取消的位置                                                  | Boolean          | false   | true              |
| confirmButtonShape  | 确认按钮的样式,如设置，将不会显示取消按钮                             | String           | square  | square/circle     |
| contentTextAlign    | 内容的对齐方式                                                        | String           | left    | left/center/right |

### Event

| 事件名  | 说明                                            | 回调参数 |
| :------ | :---------------------------------------------- | :------- |
| confirm | 点击确认按钮时触发                              | -        |
| cancel  | 点击取消按钮时触发                              | -        |
| close   | 点击遮罩关闭出发，closeOnClickOverlay为true有效 | -        |

### Method

此方法需要通过ref调用，详见上方的"异步关闭"

| 事件名       | 说明                                                               |
| :----------- | :----------------------------------------------------------------- |
| clearLoading | 异步控制时，通过调用此方法，可以不关闭Modal，而单是清除loading状态 |

### Slots

| 名称           | 说明                                                   |
| :------------- | :----------------------------------------------------- |
| default        | 传入自定义内容，一般为富文本，见上方说明               |
| confirm-button | 传入自定义按钮，用于在微信小程序弹窗通过按钮授权的场景 |
