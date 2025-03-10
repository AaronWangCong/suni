## Cell Input 单元格 <to-api/>

<demo-model url="/pages/components/cell-input/cell-input"></demo-model>

cell Input单元格一般用于一组列表的情况

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

- 通过`v-model`绑定输入框的值
- 通过`type`设置输入框的类型

```html
<template>
  <su-cell-input v-model="value" :type="type" />
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  const value = ref('')
</script>
```

### 自动聚焦

- 通过`focus`属性，设置是否自动获得焦点

```html
<template>
  <su-cell-input v-model="value" :type="type" :focus="true" />
</template>
```

### 禁用

- 通过`disabled`属性，设置是否禁用

```html
<template>
  <su-cell-input v-model="value" :type="type" :disabled="true" />
</template>
```

### 必填输入框

- 通过`isRequest`属性，设置是否必填

```html
<template>
  <su-cell-input v-model="value" :type="type" :isRequest="true" />
</template>
```

### 必填输入框

- 通过`isError`属性，验证为错误边框变红

```html
<template>
  <su-cell-input v-model="value" :type="type" isError />
</template>
```

### 插槽使用

- 通过`isCustom`属性，设置是否自定义

```html
<template>
  <su-cell-input label="备注" isCustom>
    <view class="text-sm text-gray-500">自定义内容</view>
  </su-cell-input>
</template>
```

### form表单使用

```html
<template>
  <su-form :model="formModel.data" :rules="formModel.rules" ref="formRef" class="w-full">
    <su-form-item label="" prop="name" label-width="0">
      <su-cell-input label="姓名" v-model="formModel.data.name" class="w-full" isRequest></su-cell-input>
    </su-form-item>
  </su-form>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref, unref } from 'vue'

  const formModel = reactive({
    data: {
      name: ''
    },
    rules: {
      name: [
        {
          required: true,
          message: '请输入姓名',
          trigger: ['change']
        }
      ]
    }
  })

  const formRef = ref()

  onMounted(() => {
    unref(formRef) && unref(formRef).setRules(formModel.rules)
  })
</script>
```

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/cell-input/cell-input.vue) 右侧演示页面的源码


## API

### Props

| 参数             | 说明                                                                | 类型                                           | 默认值         | 可选值                                 |
| ---------------- | ------------------------------------------------------------------- | ---------------------------------------------- | -------------- | -------------------------------------- |
| modelValue       | v-model 绑定的值                                                    | String \| Number                               | ''             | -                                      |
| label            | label 文本                                                          | String                                         | ''             | -                                      |
| type             | 输入框的类型，textarea，text，number                                | 'textarea' \| 'text' \| 'number' \| 'select'   | 'text'         | 'textarea', 'text', 'number', 'select' |
| confirmType      | 设置键盘右下角按钮的文字，仅在 type="text" 时生效                   | 'send' \| 'search' \| 'next' \| 'go' \| 'done' | 'done'         | 'send', 'search', 'next', 'go', 'done' |
| labelWidth       | label 宽度                                                          | Number                                         | 100            | -                                      |
| labelStyle       | label 样式                                                          | CSSProperties                                  | -              | -                                      |
| customStyle      | 输入框的自定义样式                                                  | CSSProperties                                  | -              | -                                      |
| height           | 高度，默认整个高度为88去除边框高度                                  | Number                                         | 86             | -                                      |
| focus            | 是否自动获得焦点                                                    | Boolean                                        | false          | -                                      |
| isRequest        | 是否必填                                                            | Boolean                                        | false          | -                                      |
| disabled         | 是否禁用                                                            | Boolean                                        | false          | -                                      |
| inputAlign       | 输入框文字的对齐方式                                                | 'left' \| 'right' \| 'center'                  | 'left'         | 'left', 'right', 'center'              |
| isError          | 验证为错误                                                          | Boolean                                        | false          | -                                      |
| placeholder      | 输入框为空时占位符                                                  | String                                         | '请输入'       | -                                      |
| placeholderStyle | 指定 placeholder 的样式                                             | String                                         | 'color: #ccc;' | -                                      |
| trim             | 是否自动去除两端的空格                                              | Boolean                                        | true           | -                                      |
| clearable        | 是否可清空                                                          | Boolean                                        | true           | -                                      |
| selectionStart   | 光标起始位置，自动聚焦时有效，需与 selectionEnd 搭配使用            | Number                                         | -1             | -                                      |
| selectionEnd     | 光标结束位置，自动聚焦时有效，需与 selectionStart 搭配使用          | Number                                         | -1             | -                                      |
| maxlength        | 最大输入长度，设置为 -1 的时候不限制最大长度                        | Number                                         | 140            | -                                      |
| cursorSpacing    | 指定光标与键盘的距离，单位px                                        | Number                                         | 0              | -                                      |
| isCustom         | 自定义右边的内容                                                    | Boolean                                        | false          | -                                      |
| selectOpen       | type=select时，旋转右侧的图标，标识当前处于打开还是关闭select的状态 | Boolean                                        | false          | -                                      |
