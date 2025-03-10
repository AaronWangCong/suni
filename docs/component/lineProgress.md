## LineProgress 线形进度条 <to-api/>

<demo-model url="/pages/components/progress/progress"></demo-model>

展示操作或任务的当前进度，比如上传文件，是一个线形的进度条。

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

- 通过`percentage`设置当前的进度值，该值区间为0-100.
- 通过`active-color`设置进度条的颜色，也可以直接设置`type`主题颜色(优先起作用)，使用预置值

```html
<su-line-progress active-color="#2979ff" :percentage="70"></su-line-progress>
```

### 不显示百分比

不显示百分比值信息

- `show-text`数配置是否显示进度条内百分值

```html
<su-line-progress :percentage="30" :showText="false"></su-line-progress>
```

### 自定义高度

- `height`进度条高度

```html
<su-line-progress :percentage="30" height="8"></su-line-progress>
```

### 自定义样式(不支持安卓环境的nvue)

- 自定义的数值样式嵌套在默认插槽里

```html
<template>
  <su-line-progress :percentage="30">
    <text class="su-percentage-slot">{{30}}%</text>
  </su-line-progress>
</template>

<style lang="scss" scoped>
  .su-percentage-slot {
    padding: 1px 5px;
    background-color: $su-warning;
    color: #fff;
    border-radius: 100px;
    font-size: 10px;
    margin-right: -5px;
  }
</style>
```

### 手动加减

- 通过控制`percentage`参数数值达到增减

```html
<template>
  <view style="margin-top: 50px;">
    <su-line-progress :percentage="percentage" />
    <view style="display: flex;margin-top: 100px;">
      <button @click="computedWidth('minus')">减少</button>
      <button @click="computedWidth('plus')">增加</button>
    </view>
  </view>
</template>

<script setup>
  import { ref } from 'vue'

  const percentage = ref(30)

  const computedWidth = (type) => {
    if (type === 'plus') {
      percentage.value = uni.$u.range(0, 100, percentage.value + 10)
    } else {
      percentage.value = uni.$u.range(0, 100, percentage.value - 10)
    }
  }
</script>
```

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/lineProgress/lineProgress.nvue) 右侧演示页面的源码

### API

### Props

| 参数           | 说明                              | 类型             | 默认值  | 可选值 |
| -------------- | --------------------------------- | ---------------- | ------- | ------ |
| active-color   | 进度条激活部分的颜色              | String           | #19be6b | -      |
| inactive-color | 进度条的底色，默认为灰色          | String           | #ececec | -      |
| percentage     | 进度条百分比值，为数值类型，0-100 | String \| Number | -       | -      |
| showText       | 是否在进度条内部显示百分比的值    | Boolean          | true    | false  |
| height         | 进度条的高度，默认单位px          | String \| Number | 12      | -      |

### Slots

| 名称    | 说明                                             |
| :------ | :----------------------------------------------- |
| default | 传入自定义的显示内容，将会覆盖默认显示的百分比值 |

<style scoped>
h3[id=slots] + table thead tr th:nth-child(2){
	width: 50%;
}
</style>
