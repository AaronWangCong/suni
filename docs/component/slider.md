## Slider 滑动选择器 <to-api/>

<demo-model url="/pages/components/slider/index"></demo-model>

该组件一般用于表单中，手动选择一个区间范围的场景。

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

需要通过`v-model`绑定一个值，来初始化滑块的选择值(0到100之间)，这个值是双向绑定的，您可以通过这个值，实时地得知内部的滑动结果。

```html
<template>
  <view class="wrap">
    <su-slider v-model="value"></su-slider>
  </view>
</template>

<script setup>
  import { ref } from 'vue'

  // 响应式数据
  const value = ref(30)
</script>

<style scoped lang="scss">
  .wrap {
    padding: 30rpx;
  }
</style>
```

### 设置最大和最小值

通过`min`和`max`，可以设置滑块所能选择的最大和最小值

```html
<su-slider v-model="value" min="30" max="80"></su-slider>
```

### 设置步进值

通过`step`参数设置步进值，这个步进值为每次跳变的值，具体表现请见示例。

:::tip 提示
需要注意的是，这个`step`必须要被`max`值整除，否则会出现无法无法滑动到最大值的情况
:::

```html
<su-slider v-model="value" step="20" min="30" max="100"></su-slider>
```

### 在弹窗等初始化不显示的容器中使用

:::tip 提示
需要注意的是，在此场景中使用要注意给slider同时一个v-if让它随着弹窗的显示再渲染，这样才能计算出滑块的正确尺寸。
:::

```html
<su-popup v-model:show="popupShow">
  <view class="slot-content" style="width: 100%">
    <su-slider v-if="popupShow" v-model="sliderValue" min="1" max="4" showValue></su-slider>
  </view>
</su-popup>

<script setup>
  import { ref } from 'vue'
  const popupShow = ref(false)
  const sliderValue = ref(4)
</script>
```

### 禁用状态

```html
<su-slider v-model="value" disabled></su-slider>
```

### 自定义按钮的内容和样式

- `activeColor`，设置进度条的激活部分颜色
- `inactiveColor`，进度条的激活部分颜色
- `inactiveColor`，进度条的背景颜色
- `blockColor`，滑块的背景颜色
- `blockStyle`，用户对滑块的自定义样式(颜色)

```html
<template>
  <su-slider v-model="value" activeColor="#3c9cff" inactiveColor="#c0c4cc"></su-slider>
</template>

<script setup>
  import { ref } from 'vue'

  // 响应式数据
  const value = ref(30)
</script>
```

### 自定义滑动选择器整体的样式

- 通过`inactive-color`配置底部滑动条背景颜色
- 通过`active-color`配置底部选择部分的背景颜色
- 通过`block-width`配置滑块宽度(高等于宽)
- 通过`block-color`配置滑动按钮按钮的颜色
- 通过`height`配置滑块条高度，单位rpx

其他更多参数详见底部API

```html
<su-slider v-model="value" block-width="40" block-color="red"></su-slider>
```

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/slider/slider.nvue) 右侧演示页面的源码

### API

### Props

| 参数               | 说明                           | 类型             | 默认值  | 可选值 |
| ------------------ | ------------------------------ | ---------------- | ------- | ------ |
| v-model/modelValue | 双向绑定滑块选择值             | String \| Number | 0       | -      |
| showValue          | 是否显示当前 value             | Boolean          | false   | true   |
| min                | 可选的最小值(0-100之间)        | String \| Number | 0       | -      |
| max                | 可选的最大值(0-100之间)        | String \| Number | 100     | -      |
| step               | 选择的步长                     | String \| Number | 1       | -      |
| height             | 滑动选择条的高度，单位rpx      | String \| Number | 6       | -      |
| inactive-color     | 滑动选择条的底部背景颜色       | String           | #c0c4cc | -      |
| active-color       | 底部选择部分的背景颜色         | String           | #2979ff | -      |
| block-size         | 滑块的大小                     | String \| Number | 18      | 12-28  |
| block-color        | 滑块背景颜色                   | String           | #ffffff | -      |
| block-style        | 给滑块按钮自定义样式，对象形式 | Object           | -       | -      |
| isRange            | 开始其双滑快模式               | Boolean          | false   | true   |
| rangeValue         | 双滑快双向绑定值，数组形式     | Array            | [0,0]   | -      |

### Events

| 事件名   | 说明                   | 回调参数      |
| :------- | :--------------------- | :------------ |
| changing | 触发事件（拖动过程中） | value：当前值 |
| change   | 触发事件               | value：当前值 |
