## Checkbox 复选框 <to-api/>

<demo-model url="/pages/components/checkbox/index"></demo-model>

复选框组件一般用于需要多个选择的场景，该组件功能完整，使用方便

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

```html
<template>
  <view>
    <su-checkbox-group v-model="checkboxValue1" placement="column" @change="checkboxChange">
      <su-checkbox
        :customStyle="{marginBottom: '8px'}"
        v-for="(item, index) in checkboxList1"
        :key="index"
        :label="item.name"
        :name="item.name"
      ></su-checkbox>
    </su-checkbox-group>
  </view>
</template>

<script setup>
  import { ref, reactive } from 'vue'

  const checkboxValue1 = reactive([])

  // 基本案列数据
  const checkboxList1 = reactive([
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
    }
  ])

  const checkboxChange = (n) => {
    console.log('change', n)
  }
</script>
```

### 独立使用su-checkbox

- 通过`usedAlone`可以设置独立使用`su-checkbox`，通过`v-model:checked`双向绑定值。

```html
<template>
  <su-checkbox
    :customStyle="{marginBottom: '8px'}"
    label="同意用户协议与隐私条款"
    name="agree"
    usedAlone
    v-model:checked="aloneChecked"
  ></su-checkbox>
</template>
<script setup>
  import { ref } from 'vue'

  const aloneChecked = ref(false)
</script>
```

### 自定义形状

通过`shape`可以设置选择形状

```html
<template>
  <view>
    <su-checkbox-group v-model="checkboxValue1" placement="column" @change="checkboxChange">
      <su-checkbox
        :customStyle="{marginBottom: '8px'}"
        v-for="(item, index) in checkboxList1"
        :key="index"
        :label="item.name"
        :name="item.name"
      ></su-checkbox>
    </su-checkbox-group>
  </view>
</template>
<script setup>
  import { ref, reactive } from 'vue'

  const checkboxValue1 = reactive([])

  // 基本案列数据
  const checkboxList1 = reactive([
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
    }
  ])

  const checkboxChange = (n) => {
    console.log('change', n)
  }
</script>
```

### 禁用checkbox

设置`disabled`为`true`，即可禁用某个组件，让用户无法点击，禁用分为两种状态，一是未勾选前禁用，这时只显示一个灰色的区域。二是已勾选后
再禁用，会有灰色的已勾选的图标，但此时依然是不可操作的。

```html
<template>
  <view>
    <su-checkbox-group v-model="checkboxValue1" placement="column" @change="checkboxChange">
      <su-checkbox
        :customStyle="{marginBottom: '8px'}"
        v-for="(item, index) in checkboxList1"
        :key="index"
        :label="item.name"
        :name="item.name"
        :disabled="item.disabled"
      ></su-checkbox>
    </su-checkbox-group>
  </view>
</template>

<script setup>
  import { reactive } from 'vue'

  const checkboxValue1 = reactive([])

  // 基本案列数据
  const checkboxList1 = reactive([
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
      disabled: true
    }
  ])

  const checkboxChange = (n) => {
    console.log('change', n)
  }
</script>
```

### 自定义形状

可以通过设置`shape`为`square`或者`circle`，将复选框设置为方形或者圆形

```html
<su-checkbox-group>
  <su-checkbox v-model="checked" shape="circle">明月</su-checkbox>
</su-checkbox-group>
```

### 自定义颜色

此处所指的颜色，为`checkbox`选中时的背景颜色，参数为`active-color`

```html
<su-checkbox-group>
  <su-checkbox v-model="checked" active-color="red">光影</su-checkbox>
</su-checkbox-group>
```

### 文本是否可点击

设置`label-disabled`为`false`，点击文本时，无法操作`checkbox`

```html
<su-checkbox-group>
  <su-checkbox v-model="checked" :label-disabled="false">剑舞</su-checkbox>
</su-checkbox-group>
```

### 横向两端排列形式

可以通过设置`iconPlacement`为`left`或者`right`，将复选框勾选图标的对齐设置为左对齐或者右对齐

```html
<su-checkbox-group v-model="checked" iconPlacement="right" placement="row">
  <su-checkbox activeColor="red" label="红色"></su-checkbox>
  <su-checkbox activeColor="green" label="绿色"></su-checkbox>
</su-checkbox-group>
```

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/checkbox/checkbox.nvue) 右侧演示页面的源码

### API

### Checkbox Props

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
| ---- | ---- | ---- | ------ | ------ |
| name | checkbox的名称 | String \ Number \ Boolean | - | - |
| shape | 形状，见上方说明 | String | - | square |
| size | 组件整体的大小 | String \ Number | - | - |
| checked | 是否默认选中 | Boolean | false | true |
| disabled | 是否禁用 | Boolean \ String | - | - |
| active-color | 选中时的颜色，如设置`CheckboxGroup`的`active-color`将失效 | String | - | - |
| inactive-color | 未选中的颜色 | String | - | - |
| icon-size | 图标大小，单位px | String \ Number | - | - |
| icon-color | 图标颜色 | String | - | - |
| label | label提示文字，因为nvue下，直接slot进来的文字，由于特殊的结构，无法修改样式 | String | - | - |
| label-size | label字体大小，单位px | String \ Number | - | - |
| label-solor | label的颜色 | String | - | - |
| label-disabled | 是否禁止点击文本操作`checkbox` | Boolean | - | false / true |
| usedAlone | 是否独立使用复选框 | Boolean | false | true |
| beforeChange | 选中前置钩子 | Function | - | - |

### CheckboxGroup Props

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
| ---- | ---- | ---- | ------ | ------ |
| name | 标识符 | String | - | - |
| v-model/modelValue | 双向绑定的值，该值是一个数组，代表被选中的`checkbox` | Array | - | - |
| shape | 形状，见上方说明 | String | circle | square |
| disabled | 是否禁用所有`checkbox` | Boolean | false | true |
| active-color | 选中时的颜色，应用到所有子`Checkbox`组件 | String | #2979ff | - |
| inactive-color | 未选中的颜色 | String | - | - |
| size | 组件整体的大小，单位px | String \ Number | 18 | - |
| placement | 布局方式，row-横向，column-纵向 | Boolean | row | column |
| label-size | label字体大小，单位px | String \ Number | - | - |
| label-solor | label的颜色 | String | - | - |
| label-disabled | 是否禁止点击文本操作`checkbox` | Boolean | - | false / true |
| icon-size | 图标大小，单位px | String \ Number | 12 | - |
| icon-color | 图标颜色 | String | #ffffff | - |
| icon-placement | 勾选图标的对齐方式，left-左边，right-右边 | String | left | right |
| borderBottom | 竖向配列时，是否显示下划线 | Boolean | false | true |

### Checkbox Slot

| 名称  | 说明              |
| :---- | :---------------- |
| icon  | 定义`icon`内容    |
| label | 自定义`label`内容 |

### CheckboxGroup Event

| 事件名 | 说明 | 回调参数 | 版本 |
| :----- | :--- | :------- | :--- |
| change | 任一个`checkbox`状态发生变化时触发，回调为一个对象 | detail = array( [元素为被选中的`checkbox`的`name`] ) | - |

## su-form-checkbox

`su-checkbox`和`su-checkbox-group`组件组合，使用更方便，使用于`su-use-form`

### Props

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
| ---- | ---- | ---- | ------ | ------ |
| options | 配置项 | `SuUni.Options[]` | - | - |
| modelValue | modelValue | - | - | - |
| checkboxGroupProps | su-check-group组件的props | `SuCheckboxGroupProps` | - | - |
| checkboxProps | su-check-group组件的props | `SuCheckboxProps` | - | - |
| beforeChange | 选中前置钩子 | Function | - | - |

<style scoped>
h3[id=checkbox-props] + p + table thead tr th:nth-child(2){
	width: 35%;
}
</style>
