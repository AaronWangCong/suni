## CodeInput 验证码输入 <to-api/>

<demo-model url="/pages/components/codeInput/index"></demo-model>

通过折叠面板收纳内容区域

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

- 通过`mode`参数模式，可取如下值：
- `box`(默认)-输入位置位一个方框
- `bottomLine`-底部显示一条横线
- `middleLine`-中部显示一条横线

```html
<su-code-input v-model="value"></su-code-input>
```

### 横线模式

- 通过`mode="line"`可设置显示为横线模式

```html
<su-code-input v-model="value2" mode="line"></su-code-input>
```

### 设置长度

- 通过`maxlength`参数配置可输入的方框个数，如6位验证码，该值设置为`6`即可

```html
<su-code-input v-model="value3" :maxlength="6"></su-code-input>
```

### 横线间距

- 通过`space`可设置显示为横线模式

```html
<su-code-input v-model="value4" :space="0"></su-code-input>
```

### 细边框

- 通过`hairline`可设置细边框

```html
<su-code-input v-model="value5" mode="box" :space="0" :maxlength="4" hairline></su-code-input>
```

### 调整颜色

- 通过`color`和`borderColor`可设置颜色

```html
<su-code-input v-model="value6" hairline color="#f56c6c" borderColor="#f56c6c"></su-code-input>
```

### 用"●"替代输入内容

`dot`参数配置后，输入内容将不可见，用点替代，事件回调中会返回真实值

```html
<su-code-input v-model="value5" mode="box" dot></su-code-input>
```

### 是否自动获取焦点

如果需要一打开页面，就自动弹出键盘获取焦点，请配置`focus`值为true，否则需要用户手动点击输入区域才能唤起键盘

```html
<su-code-input v-model="value4" :focus="true"></su-code-input>
```

### 禁止唤起系统键盘

内置有键盘组件，如果您想结合键盘组件进行自定义的输入效果，就需要设置`disabled-keyboard`为true，来保证点击 输入框时不会触发系统自带的键盘，否则会造成冲突

### 事件回调

- 每当输入内容发生改变，会回调一个`change`事件，内容为当前输入的字符串，如"395"
- 当输入的内容长度(字符个数)达到`maxlength`值后，会触发`finish`事件，同时也会触发`change`事件

```html
<template>
  <view>
    <su-code-input @change="change" @finish="finish"></su-code-input>
  </view>
</template>
<script setup>
  // 定义 change 方法
  const change = (e) => {
    console.log('内容改变，当前值为：' + e)
  }

  // 定义 finish 方法
  const finish = (e) => {
    console.log('输入结束，当前值为：' + e)
  }
</script>
```

### API

### Props

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
| ---- | ---- | ---- | ------ | ------ |
| adjustPosition | 键盘弹起时，是否自动上推页面 | Boolean | true | false |
| maxlength | 输入字符个数 | String \| Number | 6 | - |
| dot | 是否用圆点填充 | Boolean | false | true |
| mode | 模式选择，见上方"基本使用"说明 | String | box | bottomLine \| middleLine |
| hairline | 是否细边框 | Boolean | false | true |
| space | 字符间的距离 | string \| Number | 10 | - |
| modelValue | 预置值 | string \| Number | - | - |
| focus | 是否自动获取焦点 | Boolean | false | true |
| bold | 字体和输入横线是否加粗 | Boolean | false | true |
| color | 字体颜色 | String | #606266 | - |
| fontSize | 字体大小，单位rpx | String \| Number | 18 | - |
| size | 输入框的大小，宽等于高 | String \| Number | 35 | - |
| disabledKeyboard | 禁止点击输入框唤起系统键盘 | Boolean | false | true |
| borderColor | 边框和线条颜色 | String | #c9cacc | - |
| disabledDot | 是否禁止输入"."符号 | Boolean | true | false |

### Events

| 事件名 | 说明 | 回调参数 |
| ---- | ---- | ---- |
| change | 输入内容发生改变时触发，具体见上方说明 | value：当前输入的值 |
| finish | 输入字符个数达`maxlength`值时触发，见上方说明 | value：当前输入的值 |
