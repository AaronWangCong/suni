## Input 输入框 <to-api/>

<demo-model url="/pages/components/input/index"></demo-model>

此组件为一个输入框，默认没有边框和样式，是专门为配合表单组件[su-form](/component/form.html)而设计的，利用它可以快速实现表单验证，输入内容，下拉选择等功能。

**注意：** 当您仅是需要一个输入框的话，可以考虑使用[su-field](/component/field.html)组件，而如果是一个表单组，比如有多个输入框一起，且需要验证功能的时候，
应该在`su-form`中嵌套`su-form-item`，再嵌套`su-input`去实现。

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

- 通过`type`设置输入框的类型，默认`text`
- 通过`placeholder`设置输入框为空时的占位符
- 通过`border`配置是否显示输入框的边框
- 绑定`@change`事件

```html
<template>
  <su-input placeholder="请输入内容" border="surround" v-model="value" @change="change"></su-input>
</template>

<script setup>
  import { ref } from 'vue'

  const value = ref('')

  const change = (e) => {
    console.log('change', e)
  }
</script>
```

### 输入框的类型

综述：此组件通过配置`type`参数有两种形态：

- `text`-文本输入键盘。
- `number`-数字输入键盘，`app-vue`下可以输入浮点数，`app-nvue`和小程序平台下只能输入整数。
- `idcard`-身份证输入键盘，微信、支付宝、百度、QQ小程序。
- `digit`-带小数点的数字键盘，App的nvue页面、微信、支付宝、百度、头条、QQ小程序。
- `password`-等同于设置password为true的效果

#### 可清空字符

将`clearable`设置为true，会在输入框后方增加一个清空按钮。

```html
<template>
  <su-input placeholder="请输入内容" border="surround" clearable></su-input>
</template>
```

#### 下划线

通过设置属性`border`为`bottom`即可变成一个下划线

```html
<template>
  <template>
    <su-input placeholder="请输入内容" border="bottom" clearable></su-input>
  </template>
</template>
```

#### 前后图标

全后置图标可自由设置样式信息。

```html
<template>
  <su-input placeholder="前置图标" prefixIcon="search" prefixIconStyle="font-size: 22px;color: #909399"></su-input>
  <su-input placeholder="后置图标" suffixIcon="map-fill" suffixIconStyle="color: #909399"></su-input>
</template>
```

### 前后插槽

通过设置`slot`为`prefix`或`suffix`来指定前后插槽

::: details 查看示例
::: code-group

```html [vue]
<template>
  <view class="u-demo-block">
    <text class="u-demo-block__title">前后插槽</text>
    <view class="u-demo-block__content">
      <!-- 注意：由于兼容性差异，如果需要使用前后插槽，nvue下需使用u--input，非nvue下需使用u-input -->
      <!-- #ifndef APP-NVUE -->
      <su-input placeholder="前置插槽">
        <!-- #endif -->
        <!-- #ifdef APP-NVUE -->
        <su-input placeholder="前置插槽">
          <!-- #endif -->
          <template #prefix>
            <su-text text="http://" margin="0 3px 0 0" type="tips"></su-text>
          </template>
          <!-- #ifndef APP-NVUE -->
        </su-input>
        <!-- #endif -->
        <!-- #ifdef APP-NVUE -->
      </su-input>
      <!-- #endif -->
    </view>
    <view class="u-demo-block__content" style="margin-top: 15px;">
      <!-- 注意：由于兼容性差异，如果需要使用前后插槽，nvue下需使用u--input，非nvue下需使用u-input -->
      <!-- #ifndef APP-NVUE -->
      <su-input placeholder="后置插槽">
        <!-- #endif -->
        <!-- #ifdef APP-NVUE -->
        <su-input placeholder="后置插槽">
          <!-- #endif -->
          <template #suffix>
            <su-code ref="uCodeRef" @change="codeChange" seconds="20" changeText="X秒重新获取哈哈哈"></su-code>
            <su-button @tap="getCode" :text="tips" type="success" size="mini"></su-button>
          </template>
          <!-- #ifndef APP-NVUE -->
        </su-input>
        <!-- #endif -->
        <!-- #ifdef APP-NVUE -->
      </su-input>
      <!-- #endif -->
    </view>
  </view>
</template>
```

```typescript [typescript]
<script setup>
import { ref, watch } from 'vue';

const tips = ref('');
const value = ref('');
const uCodeRef = ref(null);

watch(value, (newValue, oldValue) => {
  // console.log('v-model', newValue);
});

const codeChange = (text) => {
  tips.value = text;
};

const getCode = () => {
  if (uCodeRef.canGetCode) {
    // 模拟向后端请求验证码
    uni.showLoading({
      title: '正在获取验证码',
    });
    setTimeout(() => {
      uni.hideLoading();
      // 这里此提示会被start()方法中的提示覆盖
      uni.$u.toast('验证码已发送');
      // 通知验证码组件内部开始倒计时
      uCodeRef.start();
    }, 2000);
  } else {
    uni.$u.toast('倒计时结束后再发送');
  }
};

const change = (e) => {
  console.log('change', e);
};
</script>
```

:::

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/input/input.nvue) 右侧演示页面的源码

### API

### Props

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
| ---- | ---- | ---- | ------ | ------ |
| v-model | 用于双向绑定输入框的值 | - | - | - |
| type | 模式选择，见上方说明 | String | text | select / password / textarea / number |
| fixed | 如果`type`为`textarea`，且在一个"position:fixed"的区域，需要指明为`true` | Boolean | false | true |
| disabled | 是否禁用输入框 | Boolean | false | true |
| disabledColor | 禁用状态时的背景色 | string | `#f5f7fa` | - |
| clearable | 是否显示右侧的清除图标，type = select时无效 | Boolean | true | false |
| password-icon | `type`为`password`时，是否显示右侧的密码查看图标 | Boolean | true | false |
| password | 是否密码类型 | Boolean | false | true |
| maxlength | 输入框的最大可输入长度 | Number \| String | 140 | - |
| placeholder | placeholder显示值 | String | 请输入内容 | - |
| placeholder-style | placeholder的样式，字符串形式，如"color: red;" | String | "color: #c0c4cc;" | - |
| placeholder-class | 指定placeholder的样式类，注意页面或组件的style中写了scoped时，需要在类名前写/deep/ | String | "input-placeholder" | - |
| showWordLimit | 是否显示输入字数统计，只在`type ="text"`或`type ="textarea"`时有效 | Boolean | false | true |
| confirm-type | 设置键盘右下角按钮的文字，仅在`type`为`text`时生效 | String | done | - |
| confirmHold | 点击键盘右下角按钮时是否保持键盘不收起，H5无效 | Boolean | false | true |
| holdKeyboard | focus时，点击页面的时候不收起键盘，微信小程序有效 | Boolean | false | true |
| focus | 是否自动获得焦点 | Boolean | false | true |
| autoBlur | 键盘收起时，是否自动失去焦点，目前仅App3.0.0+有效 | Boolean | false | true |
| disableDefaultPadding | 是否去掉 iOS 下的默认内边距，仅微信小程序，且type=textarea时有效 | Boolean | false | true |
| cursor | 指定focus时光标的位置 | Number | -1 | - |
| cursor-spacing | 指定光标与键盘的距离，单位**px** | Number \| String | 30 | - |
| selection-start | 光标起始位置，自动聚焦时有效，需与selection-end搭配使用 | Number \| String | -1 | - |
| selection-end | 光标结束位置，自动聚焦时有效，需与selection-start搭配使用 | Number \| String | -1 | - |
| adjust-position | 弹出键盘时是否自动调节高度 | Boolean | true | false |
| input-align | 输入框文字的对齐方式 | String | left | center / right |
| fontSize | 输入框字体的大小 | String | '15px' | - |
| color | 输入框字体颜色 | String | '#303133' | - |
| prefixIcon | 输入框前置图标 | String | - | - |
| prefixIconStyle | 前置图标样式，对象或字符串 | String | - | - |
| suffixIcon | 输入框后置图标 | String | - | - |
| suffixIconStyle | 后置图标样式，对象或字符串 | String | - | - |
| border | 边框类型 | string | surround | bottom \| none |
| readonly | 是否只读，与disabled不同之处在于disabled会置灰组件，而readonly则不会 | Boolean | false | true |
| shape | 输入框形状，circle-圆形，square-方形 | String | square | circle |
| ignoreCompositionEvent | 是否忽略组件内对文本合成系统事件的处理 | Boolean | true | false |

<style scoped>
h3[id=props] + table thead tr th:nth-child(2){
	width: 35%;
}
</style>

