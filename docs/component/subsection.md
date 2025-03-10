## Subsection 分段器 <to-api/>

<demo-model url="/pages/components/subsection/index"></demo-model>

该分段器一般用于用户从几个选项中选择某一个的场景

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

- 通过`list`数组参数传递分段的选项，数组元素可为字符串，或者通过`keyName`参数传入对象(默认为`name`)
- 通过`current`指定初始化时激活的选项

```html
<template>
  <su-subsection :list="list" :current="1"></su-subsection>
</template>

<script setup>
  import { ref } from 'vue'

  const list = ref(['未付款', '待评价', '已付款'])
  // 或者如果您想要使用对象数组
  // const list = ref([
  //   { name: '未付款' },
  //   { name: '待评价' },
  //   { name: '已付款' }
  // ]);

  const current = ref(1)
</script>
```

### 模式选择

通过`mode`设置分段器的模式

- 值为`button`时为按钮类型
- 值为`subsection`时为分段器形式

```html
<su-subsection :list="list" v-model="current" mode="button"></su-subsection>
```

### 颜色配置

- 通过`activeColor`配置激活选项的文字颜色
- 通过`inactiveColor`配置未激活选项的文字颜色
- 通过`bgColor`配置背景颜色，`mode`为`button`时有效（默认 '#eeeeef' ）

```html
<su-subsection activeColor="#f56c6c"></su-subsection>
```

### 注意事项

如果想通过一个变量绑定`current`值，需要在`change`事件回调中修改此值，否则可能会由于`props`的限制，前后两次设置`current`为相同的值， 而导致无法通过修改`current`值触发分段器的变化。

```html
<template>
  <su-subsection :list="list" :current="curNow" @change="sectionChange"></su-subsection>
</template>
<script setup>
  import { ref } from 'vue'

  // 创建响应式引用
  const list = ref(['未付款', '待评价', '已付款'])
  const curNow = ref(0)

  // 定义方法，注意在 setup 中不需要 this，直接访问响应式引用
  function sectionChange(index) {
    curNow.value = index
  }
</script>
```

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/subsection/subsection.nvue) 右侧演示页面的源码

### API

### Props

| 参数           | 说明                                 | 类型             | 默认值  | 可选值     |
| -------------- | ------------------------------------ | ---------------- | ------- | ---------- |
| list           | 选项的数组，形式见上方"基本使用"     | Array            | -       | -          |
| current        | 初始化时默认选中的选项索引值         | String \| Number | 0       | -          |
| active-color   | 激活时的颜色                         | String           | #3c9cff | -          |
| inactive-color | 未激活时的颜色                       | String           | #303133 | -          |
| mode           | 模式选择，见上方"模式选择"说明       | String           | button  | subsection |
| font-size      | 字体大小，单位rpx                    | String \| Number | 28      | -          |
| bold           | 激活选项的字体是否加粗               | Boolean          | true    | false      |
| bg-color       | 组件背景颜色，`mode`为`button`时有效 | String           | #eeeeef | -          |
| keyName        | 从`list`元素对象中读取的键名         | String           | name    | -          |

### Events

| 事件名 | 说明                     | 回调参数                          |
| :----- | :----------------------- | :-------------------------------- |
| change | 分段器选项发生改变时触发 | index：选项的index索引值，从0开始 |
