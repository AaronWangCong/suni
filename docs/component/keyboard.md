## Keyboard 键盘 <to-api/>

<demo-model url="/pages/components/keyboard/index"></demo-model>

此为sun-uni自定义的键盘面板，内含了数字键盘，车牌号键，身份证号键盘3种模式，都有可以打乱按键顺序的选项。

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

通过`mode`参数定义键盘的类型，v-model绑定一个值为布尔值的变量控制键盘的弹出与收起：

- mode = number (默认值)为数字键盘，此时顶部工具条中间的提示文字为"数字键盘"
- mode = car 为汽车键盘，此时顶部工具条中间的提示文字为"车牌号键盘"
- mode = card 为身份证键盘，此时顶部工具条中间的提示文字为"身份证键盘"

```html
<template>
  <view>
    <su-keyboard ref="uKeyboard" mode="car" :show="show"></su-keyboard>
    <su-button @click="show = true">打开</su-button>
  </view>
</template>

<script setup>
  import { ref } from 'vue'

  const show = ref(false)
</script>
```

### 是否显示键盘的点(".")按键

该按键通过`dot-enabled`(默认为`true`)参数配置，只在"mode = number"时生效，因为车牌号和身份证键盘，用不到"."这个按键

```html
<su-keyboard mode="number" :dotDisabled="true"></su-keyboard>
```

### 是否打乱按键的顺序

如果配置`random`参数为`true`的话，**每次**打开键盘，按键的顺序都是随机的，该功能默认是关闭的

```html
<su-keyboard ref="uKeyboard" mode="number" :random="true" :show="show"></su-keyboard>
```

### 如何控制键盘的打开和关闭？

```html
<template>
  <su-keyboard mode="number" :show="show"></su-keyboard>
</template>

<script setup>
  import { ref } from 'vue'
  import { onReady, onLoad } from '@dcloud/uniapp'

  const show = ref(false)

  onReady(() => {
    // 如果想一进入页面就打开键盘，请在此生命周期调用
    show.value = true
  })

  onLoad(() => {
    // 不应在此调用，因为此时su-keyboard组件尚未创建完成
    // show.value = true;
  })
</script>
```

### 如何监听键盘按键被点击？

- 输入值是通过组件的`change`事件实现的，组件内部每个按键被点击的时候，组件就会发出一个`change`事件，回调参数为点击的按键的值。
- 通过`backspace`事件监听键盘退格键的点击，通过修改父组件的值实现退格的效果，见下方示例

注意：点击退格键(也即删除键)不会触发`change`事件

```html
<template>
  <su-keyboard mode="number" @change="valChange" @backspace="backspace" :show="show"></su-keyboard>
</template>

<script setup>
  import { ref } from 'vue'

  const value = ref('') // 输入框的值
  const show = ref(false) // 是否显示键盘

  const valChange = (val) => {
    // 将每次按键的值拼接到value变量中，注意+=写法
    value.value += val
    console.log(value.value)
  }

  const backspace = () => {
    // 删除value的最后一个字符
    if (value.value.length) {
      value.value = value.value.substr(0, value.value.length - 1)
    }
    console.log(value.value)
  }
</script>
```

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/keyboard/keyboard.nvue) 右侧演示页面的源码

### API

### Props

注意：props中没有控制键盘弹出与收起的参数，因为这是通过v-model绑定变量实现的，见上方说明。

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
| ---- | ---- | ---- | ------ | ------ |
| mode | 键盘类型，见上方`基本使用`的说明 | String | car | number / card |
| dotDisabled | 是否显示"."按键，只在mode=number时有效 | Boolean | true | false |
| tooltip | 是否显示键盘顶部工具条 | Boolean | true | false |
| showTips | 是否显示工具条中间的文字 | Boolean | true | false |
| tips | 工具条中间的提示文字，见上方`基本使用`的说明 | String | - | - |
| showCancel | 是否显示工具条左边的"取消"按钮 | Boolean | true | false |
| showConfirm | 是否显示工具条右边的"完成"按钮 | Boolean | true | false |
| random | 是否打乱键盘按键的顺序 | Boolean | false | true |
| safeAreaInsetBottom | 是否开启[底部安全区适配](/component/safeAreaInset.html#关于uview某些组件safe-area-inset参数的说明) | Boolean | false | true |
| closeOnClickOverlay | 是否允许点击遮罩收起键盘 | Boolean | true | false |
| overlay | 是否显示遮罩 | Boolean | true | false |
| zIndex | 弹出键盘的`z-index`值 | Number \| String | 1075 | - |
| confirmText | 确认按钮的文字 | String | 取消 | - |
| cancelText | 取消按钮的文字 | String | 确认 | - |
| customStyle | 自定义样式，对象形式 | Boolean | false | true |

### Events

| 事件名 | 说明 | 回调参数 | 版本 |
| :----- | :--- | :------- | :--- |
| change | 按键被点击(不包含退格键被点击) | 按键的值，见上方说明和示例 | - |
| cancel | 键盘顶部工具条左边的"取消"按钮被点击 | - | - |
| confirm | 键盘顶部工具条右边的"完成"按钮被点击 | - | - |
| backspace | 键盘退格键被点击 | - | - |

### Slot

| 名称 | 说明 | 版本 |
| :--- | :--- | :--- |
| default | 内容将会显示键盘的工具条上面，可以结合[MessageInput 验证码输入](/component/messageInput.html)组件实现类似支付宝输入密码时，上方显示输入内容的功能 | - |

<style scoped>
h3[id=props] + table thead tr th:nth-child(2){
	width: 40%;
}

h3[id=events] + table thead tr th:nth-child(2){
	width: 40%;
}

h3[id=slot] + table thead tr th:nth-child(2){
	width: 60%;
}
</style>
