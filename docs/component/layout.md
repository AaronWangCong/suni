## Layout 布局 <to-api/>

<demo-model url="/pages/components/layout/index"></demo-model>

通过基础的 12 分栏，迅速简便地创建布局

::: warning 注意
如需实现类似宫格的布局，请使用sun-uni的[Grid宫格组件](/component/grid.html)，可以设置角标，功能更完善和灵活
:::

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

通过`col`组件的`span`设置需要分栏的比例

::: warning 注意
`su-col` 下的 `view` 标签必须设置下高度，否则 `view` 内无内容不会渲染
:::

```html
<template>
  <view class="u-page">
    <view class="u-demo-block">
      <text class="u-demo-block__title">基础使用</text>
      <view class="u-demo-block__content">
        <su-row customStyle="margin-bottom: 10px">
          <su-col span="6">
            <view class="demo-layout bg-purple-light"></view>
          </su-col>
          <su-col span="6">
            <view class="demo-layout bg-purple"></view>
          </su-col>
        </su-row>
        <su-row customStyle="margin-bottom: 10px">
          <su-col span="4">
            <view class="demo-layout bg-purple"></view>
          </su-col>
          <su-col span="4">
            <view class="demo-layout bg-purple-light"></view>
          </su-col>
          <su-col span="4">
            <view class="demo-layout bg-purple-dark"></view>
          </su-col>
        </su-row>
        <su-row justify="space-between">
          <su-col span="3">
            <view class="demo-layout bg-purple"></view>
          </su-col>
          <su-col span="3">
            <view class="demo-layout bg-purple-light"></view>
          </su-col>
          <su-col span="3">
            <view class="demo-layout bg-purple"></view>
          </su-col>
          <su-col span="3">
            <view class="demo-layout bg-purple-light"></view>
          </su-col>
        </su-row>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
  .wrap {
    padding: 12px;
  }

  .demo-layout {
    height: 25px;
    border-radius: 4px;
  }

  .bg-purple {
    background: #ced7e1;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }
</style>
```

### 分栏间隔

通过设置`row`组件的`gutter`参数，来指定每一栏之间的间隔(最终表现为左边内边距各为gutter/2)，默认间隔为0

```html
<view class="u-demo-block__content">
  <su-row justify="space-between" gutter="10">
    <su-col span="3">
      <view class="demo-layout bg-purple"></view>
    </su-col>
    <su-col span="3">
      <view class="demo-layout bg-purple-light"></view>
    </su-col>
    <su-col span="3">
      <view class="demo-layout bg-purple"></view>
    </su-col>
    <su-col span="3">
      <view class="demo-layout bg-purple-light"></view>
    </su-col>
  </su-row>
</view>

<style lang="scss">
  .wrap {
    padding: 12px;
  }

  .demo-layout {
    height: 25px;
    border-radius: 4px;
  }

  .bg-purple {
    background: #ced7e1;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }
</style>
```

### 混合布局

通过指定`col`组件的`span`属性，指定不同的值，达到不同的比例

```html
<view class="u-demo-block__content">
  <su-row justify="space-between" gutter="10">
    <su-col span="2">
      <view class="demo-layout bg-purple-light"></view>
    </su-col>
    <su-col span="4">
      <view class="demo-layout bg-purple"></view>
    </su-col>
    <su-col span="6">
      <view class="demo-layout bg-purple-dark"></view>
    </su-col>
  </su-row>
</view>

<style lang="scss">
  .wrap {
    padding: 12px;
  }

  .demo-layout {
    height: 25px;
    border-radius: 4px;
  }

  .bg-purple {
    background: #ced7e1;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }
</style>
```

### 分栏偏移

通过指定`col`组件的`offset`属性可以指定分栏偏移的栏数。

```html
<view class="u-demo-block__content">
  <su-row justify="space-between" customStyle="margin-bottom: 10px">
    <su-col span="3" offset="3">
      <view class="demo-layout bg-purple-light"></view>
    </su-col>
    <su-col span="3" offset="3">
      <view class="demo-layout bg-purple"></view>
    </su-col>
  </su-row>
  <su-row>
    <su-col span="3">
      <view class="demo-layout bg-purple-light"></view>
    </su-col>
    <su-col span="3" offset="3">
      <view class="demo-layout bg-purple"></view>
    </su-col>
  </su-row>
</view>
```

### 对齐方式

通过`row`组件的`justify`来对分栏进行灵活的对齐，
可选值为`start`(或`flex-start`)、`end`(或`flex-end`)、`center`、`around`(或`space-around`)、`between`(或`space-between`)，
其最终的表现类似于css的`justify-content`属性。

**注意**：由于持微信小程序编译后的特殊结构，此方式不支持微信小程序。

```html
<view class="u-demo-block__content">
  <su-row justify="space-between" customStyle="margin-bottom: 10px">
    <su-col span="3">
      <view class="demo-layout bg-purple-light"></view>
    </su-col>
    <su-col span="3">
      <view class="demo-layout bg-purple"></view>
    </su-col>
  </su-row>
  <su-row>
    <su-col span="3">
      <view class="demo-layout bg-purple-light"></view>
    </su-col>
    <su-col span="3">
      <view class="demo-layout bg-purple"></view>
    </su-col>
  </su-row>
</view>
```

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/layout/layout.nvue) 右侧演示页面的源码

### API

### Row Props

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
| ---- | ---- | ---- | ------ | ------ |
| gutter | 栅格间隔，左右各为此值的一半，单位rpx | String \| Number | 0 | - |
| justify | 水平排列方式(微信小程序暂不支持) | String | start(或flex-start) | end(或flex-end) / center / around(或space-around) / between(或space-between) |
| align | 垂直排列方式 | String | center | top / bottom |

### Col Props

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
| ---- | ---- | ---- | ------ | ------ |
| span | 栅格占据的列数，总12等分 | String \| Number | 0 | 1-12 |
| offset | 分栏左边偏移，计算方式与`span`相同 | String \| Number | 0 | - |
| justify | 水平排列方式(微信小程序暂不支持) | String | start(或flex-start) | end(或flex-end) / center / around(或space-around) / between(或space-between) |
| align | 垂直对齐方式 | String | stretch | `top、center、bottom、stretch` |
| text-align | 文字水平对齐方式 | String | left | center / right |

### Row Events

| 事件名 | 说明        | 回调参数 |
| :----- | :---------- | :------- |
| click  | `row`被点击 | -        |

### Col Events

| 事件名 | 说明                               | 回调参数 |
| :----- | :--------------------------------- | :------- |
| click  | `col`被点击，会阻止事件冒泡到`row` | -        |
