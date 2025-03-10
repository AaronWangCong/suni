## Picker 选择器 <to-api/>

此选择器用于单列，多列，多列联动的选择场景

<demo-model url="/pages/components/picker/index"></demo-model>

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

- 通过`show`绑定一个布尔值变量，用于控制组件的弹出与收起。
- 都通过传入数组columns配置选择项。

```html
<template>
  <view>
    <su-picker :show="show" :columns="columns"></su-picker>
    <su-button @click="show = true">打开</su-button>
  </view>
</template>

<script setup>
  import { ref, reactive } from 'vue'

  const show = ref(false)
  const columns = reactive([['中国', '美国', '日本']])
</script>
```

#### 2. 设置需要显示的参数

- 时间模式时：通过`params`参数传入一个对象给组件，给需要显示的参数属性置为`true`，可选的参数有：`year`、`month`、`day`、`hour`、`minute`、`second`。
  其中，`hour`、`minute`、`second`值默认为`false`，其他值默认为`true`
- 地区模式时：可选的参数有：`province`、`city`、`area`，默认都为`true`

下方示例时间模式，只会显示年，月，日3个参数可供选择：

```html
<template>
  <su-picker mode="time" v-model="show" :params="params"></su-picker>
</template>

<script>
  export default {
    data() {
      return {
        params: {
          year: true,
          month: true,
          day: true,
          hour: false,
          minute: false,
          second: false
        },
        show: false
      }
    }
  }
</script>
```

### 多列模式与多列联动

此模式通过传入`columns`参数，此参数为二维数组，通过`change`事件完成联动操作。

```html
<template>
  <su-picker :show="show" ref="uPickerRef" :columns="columns" @confirm="confirm" @change="changeHandler"></su-picker>
</template>

<script setup>
  import { ref, reactive } from 'vue'

  const show = ref(true)
  const columns = reactive([
    ['中国', '美国'],
    ['深圳', '厦门', '上海', '拉萨']
  ])
  const columnData = reactive([
    ['深圳', '厦门', '上海', '拉萨'],
    ['得州', '华盛顿', '纽约', '阿拉斯加']
  ])

  const uPickerRef = ref(null)
  const changeHandler = (e) => {
    const { columnIndex, value, values, index } = e

    if (columnIndex === 0) {
      uPickerRef.value.setColumnValues(1, columnData[index])
    }
  }

  const confirm = (e) => {
    console.log('confirm', e)
    show.value = false
  }
</script>
```

### 加载状态

由于需要多列联动，此模式和上面的"多列模式"基本相同，在加载之前将`loading`设置为`true`，数据获取完成之后再置为`false`即可

```html
<template>
  <su-picker :show="show" ref="uPickerRef" :loading="loading" :columns="columns" @change="changeHandler"></su-picker>
</template>

<script setup>
  import { ref, reactive } from 'vue'

  const show = ref(true)
  const loading = ref(false)
  const columns = reactive([
    ['中国', '美国'],
    ['深圳', '厦门', '上海', '拉萨']
  ])
  const columnData = reactive([
    ['深圳', '厦门', '上海', '拉萨'],
    ['得州', '华盛顿', '纽约', '阿拉斯加']
  ])

  const uPickerRef = ref(null)
  const changeHandler = (e) => {
    const { columnIndex, index, picker } = e

    if (columnIndex === 0) {
      loading.value = true
      // 模拟网络请求
      setTimeout(() => {
        uPickerRef.value.setColumnValues(1, columnData[index])
        loading.value = false
      }, 1500)
    }
  }
</script>
```

### 自定义选项值

参数`columns`可以传入自定义选项值，可以通过`keyName`参数控制对应的显示属性。

```html
<template>
  <su-picker :show="show" :columns="columns" keyName="label"></su-picker>
</template>

<script setup>
  import { ref, reactive } from 'vue'

  const show = ref(true)
  const columns = reactive([
    [
      {
        label: '雪月夜',
        // 其他属性值
        id: 2021
        // ...
      },
      {
        label: '冷夜雨',
        id: 804
      }
    ]
  ])
</script>
```

### 默认值

此组件的所有模式，都可以设置默认值，通过`defaultIndex`数组参数配置，数组元素的0表示选中每列的哪个值(从0开始)，下面分别对几种模式进行说明：

**注意：** `defaultIndex`数组的长度，必须与列数相同，否则无效。

1. 单列模式

如设置`defaultIndex`为[1]表示默认选中第2个(从0开始)，[5]表示选中第6个。

2. 多列模式

如设置`defaultIndex`为[1, 3]表示第一列默认选中第2个，第二列默认选中第4个。

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/picker/picker.nvue) 右侧演示页面的源码

### API

### Props

注意：props中没有控制Picker打开与收起的参数，因为这是通过v-model绑定变量实现的，见上方说明。

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
| ---- | ---- | ---- | ------ | ------ |
| show | 用于控制选择器的弹出与收起 | Boolean | false | true |
| showToolbar | 是否显示顶部的操作栏 | Boolean | true | false |
| title | 顶部中间的标题 | String | - | - |
| columns | 设置每一列的数据，见上方说明 | Array | - | - |
| loading | 加载状态 | Boolean | false | true |
| itemHeight | 各列中，单个选项的高度 | String \| Number | 44 | - |
| cancelText | 取消按钮的文字 | String | 取消 | - |
| confirmText | 确认按钮的文字 | String | 确认 | - |
| cancelColor | 取消按钮的颜色 | String | '#909193' | - |
| confirmColor | 确认按钮的颜色 | String | '#3c9cff' | - |
| visibleItemCount | 每列中可见选项的数量 | String \| Number | 5 | - |
| keyName | 自定义需要展示的`text`属性键名 | String | text | - |
| closeOnClickOverlay | 是否允许点击遮罩关闭选择器（注意：关闭事件需要自行处理，只会在开启closeOnClickOverlay后点击遮罩层执行close回调） | Boolean | false | true |
| defaultIndex | 各列的默认索引 | Array | - | - |
| immediateChange  | 是否在手指松开时立即触发`change`事件。若不开启则会在滚动动画结束后触发`change`事件，只在微信`2.21.1`及以上有效 | Boolean | true | false |


### Methods

| 名称 | 说明 |
| :----- | :--- |
| setIndexs | (index, setLastIndex) 设置对应列的选择值 |
| setColumnValues | 多列联动时需要用到，见上方说明，注意微信小程序的特殊用法 |

### Events

| 事件名 | 说明 | 回调参数 | 版本 |
| :----- | :--- | :------- | :--- |
| close |关闭选择器时触发 | - | - |
| confirm | 点击确定按钮，返回当前选择的值 | Object: 见上方"回调参数"部分说明 | - |
| change | 当选择值变化时触发 | {column: column, index: index}: 见上方"回调参数"部分说明 | - |
| cancel | 点击取消按钮 | - | - |

### Slots

| 名称 | 说明 |
| :----- | :--- |
| toolbar-right | 工具栏右侧内容，自定义右侧内容，因为微信小程序限制，需要同时设置:toolbarRightSlot="true"生效。 |
| toolbar-bottom | 输入框下方自定义区域 |

<style scoped>
h3[id=props] + p + table thead tr th:nth-child(2){
	width: 35%;
}

h3[id=events] + table thead tr th:nth-child(2){
	width: 35%;
}
</style>
