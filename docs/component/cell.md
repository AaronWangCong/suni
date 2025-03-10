## Cell 单元格 <to-api/>

<demo-model url="/pages/components/cell/index"></demo-model>

cell单元格一般用于一组列表的情况，比如个人中心页，设置页等。

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

- 该组件需要搭配`cell-group`使用，并由它实现列表组的上下边框，如不需要上下边框，配置`cellGroup`的`border`参数为`false`即可。
- 通过`title`设置左侧标题，`value`设置右侧内容。
- 通过`icon`字段设置图标，值为uView自带的[Icon 图标](/component/icon.html)名。

**注意：** 由于`cell`组件需要由`cellGroup`组件提供参数值，这些父子组件间通过Vue的"provide/inject"特性注入依赖，
所以您必须使用`cellGroup`包裹`cell`组件才能正常使用。

```html
<template>
  <su-cell-group>
    <su-cell icon="setting-fill" title="个人设置"></su-cell>
    <su-cell icon="integral-fill" title="会员等级" value="新版本"></su-cell>
  </su-cell-group>
</template>
```

### 自定义内容

- 通过插槽`icon`可以自定义图标，内容会替换左边图标位置
- 通过插槽`title`定义左边标题部分
- 通过插槽`right-icon`定义右边内容部分

```html
<su-cell-group>
  <su-cell title="夕阳无限好" arrow-direction="down">
    <template #icon>
      <su-icon size="32" name="search"></su-icon>
    </template>
    <template #right-icon>
      <su-switch v-model="checked"></su-switch>
    </template>
  </su-cell>
  <su-cell icon="setting-fill" title="只是近黄昏"></su-cell>
</su-cell-group>
```

如上所示，可以给`cell-item`组件通过`rightIcon`设定右边sun-uni自带的`badge`或者`switch`组件：

- 如果搭配的是`badge`组件，注意设置`absolute`参数为`false`去掉绝对定位，否则其位于右侧的恰当位置，详见[Badge 徽标数](/component/badge.html)。
- 如果搭配的是`switch`组件，注意要通过`v-model`绑定一个内容为布尔值的变量，否则无法操作`switch`，详见[Switch 开关选择器](/component/switch.html)。

### 自定义大小

设置`size`可自定义大小

```html
<su-cell-group>
  <su-cell size="large" title="单元格" value="内容" isLink></su-cell>
  <su-cell size="mini" title="单元格" value="内容" label="描述信息"></su-cell>
</su-cell-group>
```

### 展示右箭头

设置`arrow`为`true`，将会显示右侧的箭头，可以通过arrow-direction控制箭头的方向

```html
<su-cell-group>
  <su-cell icon="share" title="停车坐爱枫林晚" :arrow="true" arrow-direction="down"></su-cell>
  <su-cell icon="map" title="霜叶红于二月花" :arrow="false"></su-cell>
</su-cell-group>
```

### 跳转页面

设置`isLink`为`true`，单元格点击可跳转页面,传入`url`设置跳转地址

```html
<su-cell-group>
  <su-cell title="打开标签页" isLink url="/pages/componentsB/tag/tag"></su-cell>
  <su-cell title="打开徽标页" isLink url="/pages/componentsB/badge/badge"></su-cell>
</su-cell-group>
```

### 右侧内容垂直居中

设置`center`为`true`，可将右侧内容垂直居中

```html
<su-cell-group>
  <su-cell title="单元格" value="内容" label="描述信息" center></su-cell>
</su-cell-group>
```

### 自定义插槽

设置`slot`为`title`，可自定义左侧区域内容 设置`slot`为`value`，可自定义右侧区域内容

```html
<su-cell-group>
  <su-cell value="内容">
    <template #title>
      <view class="u-slot-title">
        <text class="u-cell-text">单元格</text>
        <su-tag text="标签" plain size="mini" type="warning"></su-tag>
      </view>
    </template>
  </su-cell>
  <su-cell title="单元格" isLink>
    <template #value>
      <text class="u-slot-value">99</text>
    </template>
  </su-cell>
</su-cell-group>
```

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/cell/cell.nvue) 右侧演示页面的源码


### API

### CellGroup Props

| 参数         | 说明                                                                              | 类型    | 默认值 | 可选值 |
| ------------ | --------------------------------------------------------------------------------- | ------- | ------ | ------ |
| title        | 分组标题                                                                          | String  | -      | -      |
| border       | 是否显示外边框                                                                    | Boolean | true   | false  |
| custom-style | 分组标题的的样式，对象形式，如{`'font-size': '24rpx'`} 或 {`'fontSize': '24rpx'`} | object  | -      | -      |

### CellItem Props

| 参数            | 说明                                                                                                                | 类型             | 默认值      | 可选值    |
| --------------- | ------------------------------------------------------------------------------------------------------------------- | ---------------- | ----------- | --------- |
| custom-style    | 分组标题的的样式，对象形式，如{`'font-size': '24rpx'`} 或 {`'fontSize': '24rpx'`}                                   | object           | -           | -         |
| title           | 左侧标题                                                                                                            | String           | -           | -         |
| icon            | 左侧图标名，只支持uView内置图标，见[Icon 图标](/component/icon.html)                                                | String           | -           | -         |
| icon-style      | icon的样式，对象形式                                                                                                | Object           | -           | -         |
| value           | 右侧内容                                                                                                            | String           | -           | -         |
| label           | 标题下方的描述信息                                                                                                  | String           | -           | -         |
| border-bottom   | 是否显示cell的下边框                                                                                                | Boolean          | true        | false     |
| border-top      | 是否显示cell的上边框                                                                                                | Boolean          | false       | true      |
| border-gap      | `border-bottom`为`true`时，Cell列表中间的条目的下边框是否与左边有一个间隔 <Badge type="error" text="1.4.0已废弃" /> | Boolean          | true        | false     |
| hover-class     | 是否开启点击反馈，`none`为无效果，见上方说明                                                                        | String           | -           | none      |
| arrow           | 是否显示右侧箭头，开启的话，将会默认带上点击反馈，可通过`hover-class`配置                                           | Boolean          | true        | false     |
| arrow-direction | 箭头方向，可选值为                                                                                                  | String           | right       | up / down |
| title-style     | 标题样式，对象形式                                                                                                  | Object           | -           | -         |
| required        | 是否显示左边表示必填的星号                                                                                          | Boolean          | false       | true      |
| value-style     | 右侧内容样式，对象形式                                                                                              | Object           | -           | -         |
| label-style     | 标题下方描述信息的样式，对象形式                                                                                    | Object           | -           | -         |
| bg-color        | 背景颜色，默认透明背景                                                                                              | String           | transparent | -         |
| index           | 用于在`click`事件回调中返回，标识当前是第几个Item                                                                   | String \| Number | -           | -         |
| title-width     | 标题的宽度，单位rpx                                                                                                 | Number \| String | -           | -         |
| icon-size       | 左边通过`icon`参数传入的图标的大小，单位rpx                                                                         | Number \| String | 34          | -         |
| center          | 是否使内容垂直居中                                                                                                  | Boolean          | false       | true      |

### CellItem Slot

| 名称       | 说明                                                                      |
| ---------- | ------------------------------------------------------------------------- |
| title      | 自定义左侧标题部分的内容，如需使用，请勿定义`title`参数，或赋值`null`即可 |
| icon       | 自定义左侧的图标                                                          |
| right-icon | 自定义右侧图标内容，需设置`arrow`为`false`才起作用                        |
| label      | 自定义`label`内容                                                         |

### CellItem Event

| 事件名 | 说明               | 回调参数                            |
| :----- | :----------------- | :---------------------------------- |
| click  | 点击cell列表时触发 | index: 通过`props`传递的`index`参数 |

<style scoped>
h3[id=cellgrosu-props] + table thead tr th:nth-child(2){
	width: 40%;
}

h3[id=cellitem-props] + table thead tr th:nth-child(2){
	width: 40%;
}

h3[id=cellitem-slot] + table thead tr th:nth-child(2){
	width: 50%;
}
</style>
