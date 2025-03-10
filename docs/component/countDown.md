## CountDown 倒计时 <to-api/>

<demo-model url="/pages/components/countDown/index"></demo-model>

该组件一般使用于某个活动的截止时间上，通过数字的变化，给用户明确的时间感受，提示用户进行某一个行为操作。

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

- 通过 `time` 参数设置倒计时间，单位为 `ms`

```html
<template>
  <su-count-down :time="30 * 60 * 60 * 1000" format="HH:mm:ss"></su-count-down>
</template>
```

### 自定义格式

- 说明：通过绑定`change`回调的值，进行自定义格式

```html
<template>
  <su-count-down :time="30 * 60 * 60 * 1000" format="DD:HH:mm:ss" autoStart millisecond @change="onChange">
    <view class="time">
      <text class="time__item">{{ timeData.days }}&nbsp;天</text>
      <text class="time__item">{{ timeData.hours>10?timeData.hours:'0'+timeData.hours}}&nbsp;时</text>
      <text class="time__item">{{ timeData.minutes }}&nbsp;分</text>
      <text class="time__item">{{ timeData.seconds }}&nbsp;秒</text>
    </view>
  </su-count-down>
</template>

<script setup>
  import { ref } from 'vue'

  // 使用 reactive 创建响应式对象
  const timeData = ref({})

  // 定义 onChange 方法
  const onChange = (e) => {
    timeData.value = e
  }
</script>

<style lang="scss">
  .time {
    @include flex;
    align-items: center;

    &__item {
      color: #fff;
      font-size: 12px;
      text-align: center;
    }
  }
</style>
```

### 毫秒级渲染

- 通过配置millisecond来开启毫秒级倒计时

```html
<su-count-down :time="30 * 60 * 60 * 1000" format="HH:mm:ss:SSS" autoStart millisecond></su-count-down>
```

### 自定义格式（插槽形式）

- 说明：通过绑定`change`回调的值，进行自定义格式

```html
<template>
  <su-count-down :time="30 * 60 * 60 * 1000" format="HH:mm:ss" autoStart millisecond @change="onChange">
    <view class="time">
      <view class="time__custom">
        <text class="time__custom__item">{{ timeData.hours>10?timeData.hours:'0'+timeData.hours}}</text>
      </view>
      <text class="time__doc">:</text>
      <view class="time__custom">
        <text class="time__custom__item">{{ timeData.minutes }}</text>
      </view>
      <text class="time__doc">:</text>
      <view class="time__custom">
        <text class="time__custom__item">{{ timeData.seconds }}</text>
      </view>
    </view>
  </su-count-down>
</template>

<script setup>
  import { ref } from 'vue'

  // 使用 reactive 创建响应式对象
  const timeData = ref({})

  // 定义 onChange 方法
  const onChange = (e) => {
    timeData.value = e
  }
</script>

<style lang="scss">
  .time {
    @include flex;
    align-items: center;

    &__custom {
      margin-top: 4px;
      width: 22px;
      height: 22px;
      background-color: $su-primary;
      border-radius: 4px;
      /* #ifndef APP-NVUE */
      display: flex;
      /* #endif */
      justify-content: center;
      align-items: center;

      &__item {
        color: #fff;
        font-size: 12px;
        text-align: center;
      }
    }

    &__doc {
      color: $su-primary;
      padding: 0px 4px;
    }

    &__item {
      color: #606266;
      font-size: 15px;
      margin-right: 4px;
    }
  }
</style>
```

### 手动控制

- 说明：通过绑定`ref`进行手动控制重置、开始、暂停

```html
<template>
  <su-count-down ref="countDown" :time="3* 1000" format="ss:SSS" :autoStart="false" millisecond @change="onChange"></su-count-down>
  <su-button text="重置" size="normal" type="info" @click="reset"></su-button>
  <su-button text="开始" size="normal" type="success" @click="start"></su-button>
  <su-button text="暂停" size="normal" type="error" @click="pause"></su-button>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'

  // 假设 countDown 是一个子组件，并且它在模板中有 ref="countDown"
  const countDownRef = ref(null)

  // data
  const timeData = ref({})

  // methods
  const start = () => {
    if (countDownRef.value) {
      countDownRef.value.start()
    }
  }

  const pause = () => {
    if (countDownRef.value) {
      countDownRef.value.pause()
    }
  }

  const reset = () => {
    if (countDownRef.value) {
      countDownRef.value.reset()
    }
  }

  const onChange = (e) => {
    timeData.value = e
  }

  // 在组件挂载后设置 ref，确保子组件已经渲染
  onMounted(() => {
    // 确保 countDownRef 已经指向了一个组件实例
    if (countDownRef.value) {
      // 你可以在这里做一些初始化操作，如果需要的话
    }
  })

  // 在组件卸载时清理，如果有必要的话
  onUnmounted(() => {
    // 清理操作
  })
</script>
```

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/countDown/countDown.nvue) 右侧演示页面的源码

### API

### Props

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
| ---- | ---- | ---- | ------ | ------ |
| time | 倒计时，单位为毫秒 | String 、Number | 0 | - |
| format | 时间格式，DD-日，HH-时，mm-分，ss-秒，SSS-毫秒 | String | HH:mm:ss | - |
| autoStart | 是否自动开始倒计时 | Boolean | true | false |
| millisecond | 是否展示毫秒倒计时 | Boolean | false | true |

### Events

| 事件名 | 说明 | 回调参数 |
| :----- | :--- | :------- |
| finish | 倒计时结束 | - |
| change | 倒计过程中，每秒触发一次 | time: 剩余的时间 |

### Methods

需要通过ref获取倒计时组件才能调用，见上方"倒计时执行的时机"说明

| 名称  | 说明       |
| ----- | ---------- |
| start | 开始倒计时 |
| pause | 暂停倒计时 |
| reset | 重置倒计时 |
