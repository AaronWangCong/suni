## NumberBox 步进器 <to-api/>

<demo-model url="/pages/components/numberBox/index"></demo-model>

该组件一般用于商城购物选择物品数量的场景

注意：该输入框只能输入大于或等于0的整数，不支持小数输入

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

通过`v-model`绑定`value`初始值，此值是双向绑定的，**无需**在回调中将返回的数值重新赋值给`value`。

```html
<template>
  <su-number-box v-model="value" @change="valChange"></su-number-box>
</template>

<script setup>
  import { ref } from 'vue'

  // 创建响应式数据
  const value = ref(0)

  // 定义方法
  function valChange(e) {
    console.log('当前值为: ' + e.target.value)
  }
</script>
```

### 步长设置

- 通过`step`属性设置每次点击增加或减少按钮时变化的值，默认为1

下面示例每次都会加2或者减2

```html
<su-number-box :step="2"></su-number-box>
```

### 限制输入范围

通过`min`和`max`参数限制输的入值最小值和最大值

```html
<su-number-box :min="1" :max="100"></su-number-box>
```

### 禁用状态

```html
<!-- 通过设置`disabled`参数来禁用输入框，禁用状态下无法点击加减按钮或修改输入框的值 -->
<su-number-box :disabled="true"></su-number-box>

<!-- 禁用输入框 -->
<su-number-box :disabledInput="true"></su-number-box>

<!-- 禁用增加按钮 -->
<su-number-box :disablePlus="true"></su-number-box>

<!-- 禁用减少按钮 -->
<su-number-box :disableMinus="true"></su-number-box>

<!-- 禁用长按 -->
<su-number-box :longPress="false"></su-number-box>
```

### 固定小数位数

- 通过`step`设置步进长度，`decimal-length`设置显示小数位数

```html
<su-number-box step="0.25" decimal-length="1"></su-number-box>
```

### 异步变更

通过`asyncChange`设置异步变更，开启后需要手动控制输入值 （默认 false ）

```html
<template>
  <su-number-box v-model="value" :asyncChange="true" @change="onChange"></su-number-box>
</template>

<script setup>
  import { ref, onMounted } from 'vue'

  // 创建响应式数据
  const value = ref(1)

  // 定义方法
  function onChange(e) {
    setTimeout(() => {
      value.value += 1 // 使用 value.value 来访问和修改响应式数据
    }, 3000)
  }
</script>
```

### 自定义颜色和大小

- 通过`button-size`参数设置按钮大小
- 通过`icon-style`参数设置按钮大小

```html
<su-number-box button-size="36" color="#ffffff" bgColor="#2979ff" iconStyle="color: #fff"></su-number-box>
```

### 自定义 slot

```html
<template>
  <su-number-box v-model="value">
    <template #minus>
      <view class="minus">
        <su-icon name="minus" size="12"></su-icon>
      </view>
    </template>
    <template #input>
      <text style="width: 50px;text-align: center;" class="input">{{value}}</text>
    </template>
    <template #plus>
      <view class="plus">
        <su-icon name="plus" color="#FFFFFF" size="12"></su-icon>
      </view>
    </template>
  </su-number-box>
</template>

<script setup>
  import { ref } from 'vue'

  // 创建响应式数据
  const value = ref(1)
</script>

<style lang="scss">
  .minus {
    width: 22px;
    height: 22px;
    border-width: 1px;
    border-color: #e6e6e6;
    border-top-left-radius: 100px;
    border-top-right-radius: 100px;
    border-bottom-left-radius: 100px;
    border-bottom-right-radius: 100px;
    @include flex;
    justify-content: center;
    align-items: center;
  }

  .input {
    padding: 0 10px;
  }

  .plus {
    width: 22px;
    height: 22px;
    background-color: #ff0000;
    border-radius: 50%;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    justify-content: center;
    align-items: center;
  }
</style>
```

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/numberBox/numberBox.nvue) 右侧演示页面的源码

### API

### Props

| 参数             | 说明                                                                            | 类型             | 默认值  | 可选值 |
| ---------------- | ------------------------------------------------------------------------------- | ---------------- | ------- | ------ |
| v-model          | 输入框初始值                                                                    | Number           | 1       | -      |
| bg-color         | 输入框和按钮的背景颜色                                                          | String           | #F2F3F5 | -      |
| min              | 用户可输入的最小值                                                              | Number           | 0       | -      |
| max              | 用户可输入的最大值                                                              | Number           | 99999   | -      |
| step             | 步长，每次加或减的值，起支持小数值，如需小数，请设置`positive-integer`为`false` | Number           | 1       | -      |
| disabled         | 是否禁用操作，禁用后无法加减或手动修改输入框的值                                | Boolean          | false   | true   |
| size             | 输入框文字和按钮字体大小，单位rpx                                               | String \| Number | 26      | -      |
| color            | 输入框文字和加减按钮图标的颜色                                                  | String           | #323233 | -      |
| input-width      | 输入框宽度，单位rpx                                                             | String \| Number | 80      | -      |
| input-height     | 输入框和按钮的高度，单位rpx                                                     | String \| Number | 50      | -      |
| index            | 事件回调时用以区分当前发生变化的是哪个输入框                                    | String \| Number | -       | -      |
| disabled-input   | 是否禁止输入框手动输入值                                                        | Boolean          | false   | true   |
| cursor-spacing   | 指定光标于键盘的距离，避免键盘遮挡输入框，单位rpx                               | String \| Number | 200     | -      |
| long-press       | 是否开启长按连续递增或递减                                                      | Boolean          | true    | false  |
| press-time       | 开启长按触发后，每触发一次需要多久，单位ms                                      | String \| Number | 250     | -      |
| positive-integer | 是否只能输入正整数                                                              | Boolean          | true    | false  |

### Events

| 事件名 | 说明                                           | 回调参数                                             | 版本 |
| :----- | :--------------------------------------------- | :--------------------------------------------------- | :--- |
| change | 输入框内容发生变化时触发，对象形式             | value：输入框当前值，index：通过props传递的`index`值 | -    |
| blur   | 输入框失去焦点时触发，对象形式                 | value：输入框当前值，index：通过props传递的`index`值 | -    |
| minus  | 点击减少按钮时触发(按钮可点击情况下)，对象形式 | value：输入框当前值，index：通过props传递的`index`值 | -    |
| plus   | 点击增加按钮时触发(按钮可点击情况下)，对象形式 | value：输入框当前值，index：通过props传递的`index`值 | -    |
| blur   | 输入框失去焦点时触发，对象形式                 | value：输入框当前值，index：通过props传递的`index`值 | -    |

<style scoped>
h3[id=props] + table thead tr th:nth-child(2){
	width: 40%;
}

h3[id=events] + table thead tr th:nth-child(2){
	width: 40%;
}

h3[id=events] + table thead tr th:nth-child(3){
	width: 40%;
}
</style>
