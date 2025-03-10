## DatetimePicker 时间日期选择器

<demo-model url="/pages/components/datetimePicker/index"></demo-model>

此选择器用于时间日期

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

- 通过`show`绑定一个布尔值变量，用于控制组件的弹出与收起。
- 通过`mode`这配置选择何种日期格式。

```html
<template>
  <view>
    <su-datetime-picker hasInput :show="show" v-model="value1" mode="datetime"></su-datetime-picker>
    <su-button @click="show = true">打开</su-button>
  </view>
</template>

<script setup>
  import { ref } from 'vue'

  const show = ref(false)
  const value1 = ref(Date.now())
</script>
```

### 年 月 日

此模式通过mode设置为date。

```html
<template>
  <view>
    <su-datetime-picker hasInput :show="show" v-model="value1" mode="date"></su-datetime-picker>
    <su-button @click="show = true">打开</su-button>
  </view>
</template>

<script setup>
  import { ref } from 'vue'

  const show = ref(false)
  const value1 = ref(Date.now())
</script>
```

### 格式化

如有需要，可以通过`formatter`参数编写自定义格式化规则。

::: waring 注意
微信小程序不支持通过`props`传递函数参数，所以组件内部暴露了一个`setFormatter`方法用于设置格式化方法，注意在页面的`onReady`生命周期获取`ref`再操作。
:::

```html
<template>
  <view>
    <su-datetime-picker ref="datetimePickerRef" :show="show" v-model="value1" mode="datetime" :formatter="formatter"></su-datetime-picker>
    <su-button @click="show = true">打开</su-button>
  </view>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { onReady } from '@dcloud/uni-app'

  const show = ref(false)
  const value1 = ref(Date.now())
  const datetimePickerRef = ref(null)

  const formatter = (type, value) => {
    if (type === 'year') {
      return `${value}年`
    }
    if (type === 'month') {
      return `${value}月`
    }
    if (type === 'day') {
      return `${value}日`
    }
    return value
  }

  onReady(() => {
    // 微信小程序需要用此写法
    datetimePickerRef.value.setFormatter(formatter)
  })
</script>
```

### 限制最大最小值

参数`minDate`和`maxData`可以设置最大值和最小值（传入时间戳）。

```html
<template>
  <view>
    <su-datetime-picker :show="show" v-model="value1" :minDate="1587524800000" :maxDate="1786778555000" mode="datetime"></su-datetime-picker>
    <su-button @click="show = true">打开</su-button>
  </view>
</template>

<script setup>
  import { ref } from 'vue'

  const show = ref(false)
  const value1 = ref(Date.now())
</script>
```

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/datetimePicker/datetimePicker.nvue) 右侧演示页面的源码

### API

### Props

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
| ---- | ---- | ---- | ------ | ------ |
| hasInput | 是否自带input输入框 | Boolean | false | true |
| format | 输入框显示日期格式 | String | `YYYY-MM-DD HH:mm` | - |
| placeholder | 输入框placeholder | String | 请选择 | - |
| show | 用于控制选择器的弹出与收起 | Boolean | false | true |
| popupMode | 用于控制选择器的弹出方向 | String | bottom | top、bottom、left、right |
| showToolbar | 是否显示顶部的操作栏 | Boolean | true | false |
| v-model | 绑定值 | Number \| String | - | - |
| title | 顶部标题 | String | - | - |
| mode | 展示格式 | String | datetime | date为日期选择，time为时间选择，year-month为年月选择 |
| maxDate | 可选的最大时间（时间戳毫秒） | Number | 最大默认值为后10年 | - |
| minDate | 可选的最小时间（时间戳毫秒） | Number | 最小默认值为前10年 | - |
| minHour | 可选的最小小时，仅mode=time有效 | Number | 0 | - |
| maxHour | 可选的最大小时，仅mode=time有效 | Number | 23 | - |
| minMinute | 可选的最小分钟，仅mode=time有效 | Number | 0 | - |
| maxMinute | 可选的最大分钟，仅mode=time有效 | Number | 59 | - |
| filter | 选项过滤函数 | Function | null | - |
| formatter | 输入过滤或格式化函数(如需兼容微信小程序，则只能通过setFormatter方法) | Function | null | - |
| loading | 是否显示加载中状态 | Boolean | false | true |
| itemHeight | 各列中，单个选项的高度 | String \| Number | 44 | - |
| cancelText | 取消按钮的文字 | String | 取消 | - |
| confirmText | 确认按钮的文字 | String | 确认 | - |
| cancelColor | 取消按钮的颜色 | String | #909193 | - |
| confirmColor | 确认按钮的颜色 | String | #3c9cff | - |
| visibleItemCount | 是否允许点击遮罩关闭选择器（注意：关闭事件需要自行处理，只会在开启closeOnClickOverlay后点击遮罩层执行close回调） | Boolean | false | true |
| defaultIndex | 各列的默认索引 | Array | - | - |

### Events

| 事件名 | 说明 | 回调参数 | 版本 |
| :----- | :--- | :------- | :--- |
| close | 关闭选择器时触发 | - | - |
| confirm | 点击确定按钮，返回当前选择的值 | - | - |
| change | 当选择值变化时触发 | - | - |
| cancel | 点击取消按钮 | - | - |

### Slots

| 名称 | 说明 |
| :--- | :--- |
| toolbar-right | 工具栏右侧内容，自定义右侧内容，因为微信小程序限制，需要同时设置:toolbarRightSlot="true"生效。 |
| toolbar-bottom | 输入框下方自定义区域 |

### Methods

| 名称 | 说明 |
| :--- | :--- |
| setFormatter | 为兼容微信小程序而暴露的内部方法，见上方说明 |
