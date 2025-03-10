## Radio 单选框 <to-api/>

<demo-model url="/pages/components/radio/index"></demo-model>

单选框用于有一个选择，用户只能选择其中一个的场景。

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

- 该组件需要搭配`radioGroup`组件使用，以便用户进行操作时，获得当前单选框组的选中情况，当然，您也可以单独对某个`radio`进行事件监听
- 通过`v-model`给`radioGroup`组件绑定一个变量，这个绑定的变量是双向的(初始值只能是`true`或者`false`)，也就是说，您可以无需监听`radio`或者`radioGroup`组件的`change`事件，也能知道哪个
  被勾选了

**注意：** 由于`radio`组件需要由`radioGroup`组件提供参数值，这些父子组件间通过Vue的"provide/inject"特性注入依赖，
所以您必须使用`radioGroup`包裹`radio`组件才能正常使用。

```html
<template>
  <su-radio-group v-model="radiovalue1" placement="column" @change="groupChange">
    <su-radio
      :customStyle="{marginBottom: '8px'}"
      v-for="(item, index) in radiolist1"
      :key="index"
      :label="item.name"
      :name="item.name"
      @change="radioChange"
    ></su-radio>
  </su-radio-group>
</template>

<script setup>
  import { ref, reactive } from 'vue'

  // 基本案列数据
  const radiolist1 = reactive([
    {
      name: '苹果',
      disabled: false
    },
    {
      name: '香蕉',
      disabled: false
    },
    {
      name: '橙子',
      disabled: false
    },
    {
      name: '榴莲',
      disabled: false
    }
  ])

  // su-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
  const radiovalue1 = ref('苹果')

  const groupChange = (n) => {
    console.log('groupChange', n)
  }

  const radioChange = (n) => {
    console.log('radioChange', n)
  }
</script>
```

### 禁用radio

设置`disabled`为`true`，即可禁用某个组件，让用户无法点击

```html
<su-radio-group v-model="value">
  <su-radio :disabled="true">明月几时有</su-radio>
</su-radio-group>
```

### 是否禁止点击提示语选中复选框

设置`labelDisabled`为`true`，即可禁止点击提示语选中复选框

```html
<su-radio-group v-model="value">
  <su-radio :labelDisabled="true" label="明月几时有"></su-radio>
</su-radio-group>
```

### 自定义形状

可以通过设置`shape`为`square`或者`circle`，将单选框设置为方形或者圆形

```html
<su-radio-group v-model="value">
  <su-radio shape="circle">月明人倚楼</su-radio>
</su-radio-group>
```

### 自定义颜色

此处所指的颜色，为`radio`选中时的背景颜色，参数为`active-color`

```html
<su-radio-group v-model="value">
  <su-radio active-color="red">思悠悠，恨悠悠，恨到归时方始休</su-radio>
</su-radio-group>
```

### 横向排列形式

可以通过设置`placement`为`row`或者`column`，将复选框设置为横向排列或者竖向排列

```html
<su-radio-group v-model="value" placement="row">
  <su-radio activeColor="red" label="思悠悠，恨悠悠，恨到归时方始休"></su-radio>
</su-radio-group>
```

### 横向两端排列形式

可以通过设置`iconPlacement`为`left`或者`right`，将复选框勾选图标的对齐设置为左对齐或者右对齐

```html
<su-radio-group v-model="value" iconPlacement="right">
  <su-radio activeColor="red" label="思悠悠，恨悠悠，恨到归时方始休"></su-radio>
</su-radio-group>
```

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/radio/radio.nvue) 右侧演示页面的源码

### API

### Radio Props

注意：`radio`和`radio-group`二者同名参数中，`radio`的参数优先级更高。

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
| ---- | ---- | ---- | ------ | ------ |
| name | `radio`组件的标示符 | String \| Number | - | - |
| shape | 形状，见上方说明 | String | - | circle / square |
| icon-size | 图标大小，单位rpx | String \| Number | - | - |
| label-size | label字体大小，单位rpx | String \| Number | - | - |
| disabled | 是否禁用 | Boolean | - | false / true |
| label-disabled | 是否禁止点击文本操作`radio` | Boolean | - | true / false |
| active-color | 选中时的颜色，如设置`radioGroup`的`active-color`将失效 | String | - | - |
| inactiveColor | 未选中的颜色 | String | - | - |
| label | label提示文字，因为nvue下，直接slot进来的文字，由于特殊的结构，无法修改样式 | String \ Number | - | - |
| size | 整体的大小 | String \ Number | - | - |
| iconColor | 图标颜色 | String | - | - |
| labelColor | label的颜色 | String | - | - |
| beforeChange | 选中前置钩子 | Function | - | - |

### radioGroup Props

注意：需要给`radioGroup`组件通过`v-model`绑定一个**变量**，来初始化`radio`的状态，随后该值被双向绑定，
当用户勾单选框时，该值在`radio`内部被修改为`name`值，并反映到父组件，换言之，您无需监听`radio`的`change`事件，也能知道哪个`radio`被选中了。

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
| ---- | ---- | ---- | ------ | ------ |
| v-model/modelValue | 绑定的值 | String \ Number | - | - |
| disabled | 是否禁用所有`radio` | Boolean | false | true |
| shape | 形状，见上方说明 | String | circle | square |
| active-color | 选中时的颜色，应用到所有子`Radio`组件 | String | #2979ff | - |
| inactiveColor | 未选中的颜色 | String | #c8c9cc | - |
| name | 标识符 | String | - | - |
| size | radio组件整体的大小，单位rpx | String \ Number | 34 | - |
| placement | 布局方式，row-横向，column-纵向 | String | row | column |
| label | 文本 | String | - | - |
| labelColor | label的字体颜色 | String | #303133 | - |
| label-disabled | 是否禁止点击文本操作`radio` | Boolean | false | true |
| iconColor | 图标颜色 | String | #ffffff | - |
| icon-size | 图标大小，单位px | String \ Number | 12 | - |
| borderBottom | 竖向配列时，是否显示下划线 | Boolean | false | true |
| iconPlacement | 标的对齐方式，left-左边，right-右边 | String | left | right |

### radio Slot

| 名称  | 说明               |
| :---- | :----------------- |
| icon  | 自定义`icon`内容   |
| label | 自定义`label `内容 |

### radio Event

| 事件名 | 说明                                    | 回调参数                          | 版本 |
| :----- | :-------------------------------------- | :-------------------------------- | :--- |
| change | 某个`radio`状态发生变化时触发(选中状态) | name: 通过`props`传递的`name`参数 | -    |

### radioGroup Event

| 事件名 | 说明                            | 回调参数                                   | 版本 |
| :----- | :------------------------------ | :----------------------------------------- | :--- |
| change | 任一个`radio`状态发生变化时触发 | name: 值为`radio`通过`props`传递的`name`值 | -    |
