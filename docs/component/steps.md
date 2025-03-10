## Steps 步骤条 <to-api/>

<demo-model url="/pages/components/steps/index"></demo-model>

该组件一般用于完成一个任务要分几个步骤，标识目前处于第几步的场景。

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

:::warning 说明
由于安卓`nvue`下，`overflow`属性不支持`visible`值，故此组件暂不支持安卓`nvue`环境。
:::

- 通过`current`参数标识目前处于第几步，从0开始

```html
<template>
  <su-steps current="0">
    <su-steps-item title="已下单" desc="10:30"></su-steps-item>
    <su-steps-item title="已出库" desc="10:35"></su-steps-item>
    <su-steps-item title="运输中" desc="11:40"></su-steps-item>
  </su-steps>
</template>
```

### 错误状态

如果设置`su-steps-item`的`error`参数为`true`的话，当前步骤将会为“失败”的状态

```html
<su-steps current="1">
  <su-steps-item title="已下单" desc="10:30"></su-steps-item>
  <su-steps-item error title="仓库着火" desc="10:35"></su-steps-item>
  <su-steps-item title="破产清算" desc="11:40"></su-steps-item>
</su-steps>
```

### 设置步骤条的模式

`su-steps`的`dot`参数设置为`true`的话，将会以点状的形式展示步骤条样式。

```html
<su-steps current="1" dot>
  <su-steps-item title="已下单" desc="10:30"></su-steps-item>
  <su-steps-item title="已出库" desc="10:35"></su-steps-item>
  <su-steps-item title="运输中" desc="11:40"></su-steps-item>
</su-steps>
```

### 竖向模式

`su-steps`的`direction`参数设置为`column`的话，组件将会以竖向的形式展示步骤条内容。

```html
<template>
  <su-steps current="1" direction="column">
    <su-steps-item title="已下单" desc="10:30"></su-steps-item>
    <su-steps-item title="已出库" desc="10:35"></su-steps-item>
    <su-steps-item title="运输中" desc="11:40"></su-steps-item>
  </su-steps>
</template>
```

### 自定义图标

- 通过`activeIcon`可以设置激活状态的图标
- 通过`inactiveIcon`可以设置非激活状态的图标

```html
<su-steps current="1" activeIcon="checkmark" inactiveIcon="arrow-right">
  <su-steps-item title="已下单" desc="10:30"></su-steps-item>
  <su-steps-item title="已出库" desc="10:35"></su-steps-item>
  <su-steps-item title="运输中" desc="11:40"></su-steps-item>
</su-steps>
```

### 通过插槽自定义样式

通过默认插槽，可以自定义某个步骤当前状态的特殊标识

```html
<su-steps :current="1">
  <su-steps-item title="已下单" desc="10:30"></su-steps-item>
  <su-steps-item title="已出库" desc="10:35"></su-steps-item>
  <su-steps-item title="运输中" desc="11:40">
    <template #icon>
      <text class="slot-icon">运</text>
    </template>
  </su-steps-item>
</su-steps>

<style lang="scss">
  .slot-icon {
    width: 21px;
    height: 21px;
    background-color: $su-warning;
    border-radius: 100px;
    font-size: 12px;
    color: #fff;
    line-height: 21px;
    text-align: center;
  }
</style>
```

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/steps/steps.vue) 右侧演示页面的源码

### API

### Steps Props

| 参数          | 说明                  | 类型             | 默认值  | 可选值 |
| ------------- | --------------------- | ---------------- | ------- | ------ |
| direction     | row-横向，column-竖向 | String           | row     | column |
| current       | 设置当前处于第几步    | Number \| String | 0       | -      |
| activeColor   | 激活状态颜色          | String           | #3c9cff | -      |
| inactiveColor | 未激活状态颜色        | String           | #969799 | -      |
| activeIcon    | 激活状态的图标        | String           | -       | -      |
| inactiveIcon  | 未激活状态图标        | String           | -       | -      |
| dot           | 是否显示点类型        | Boolean          | false   | true   |

### Steps Item Props

| 参数      | 说明                     | 类型             | 默认值 | 可选值 |
| --------- | ------------------------ | ---------------- | ------ | ------ |
| title     | 标题文字                 | String           | -      | -      |
| current   | 描述文本                 | String           | -      | -      |
| iconSize  | 图标大小                 | String \| Number | 17     | -      |
| error     | 当前步骤是否处于失败状态 | Boolean          | false  | true   |
| itemStyle | 当前步骤自定义样式       | Object           | {}     | -      |
