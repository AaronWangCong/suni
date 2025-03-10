## Divider 分割线 <to-api/>

<demo-model url="/pages/components/divider/index"></demo-model>

区隔内容的分割线，一般用于页面底部"没有更多"的提示。

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

文字内容通过`slot`传入

```html
<su-divider>大漠孤烟直</su-divider>
```

### 设置虚线

可以通过`dashed`指定虚线

```html
<su-divider text="分割线" :dashed="true"></su-divider>
```

### 设置细线

可以通过`hairline`指定细线

```html
<su-divider text="分割线" :hairline="true"></su-divider>
```

### 设置以点代替文字

可以通过`dot`指定细线

```html
<su-divider text="分割线" :hairline="true"></su-divider>
```

### 设置文本靠左靠右

可以通过`textPosition`指定细线

```html
<su-divider text="靠左" textPosition="left"></su-divider>
<su-divider text="靠右" textPosition="right"></su-divider>
```

### 设置文本颜色和线条颜色

可以通过`textColor`和`lineColor`指定文字刚线条颜色

```html
<su-divider text="分割线" textColor="#2979ff" lineColor="#ff0000"></su-divider>
```

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/divider/divider.nvue) 右侧演示页面的源码

### API

### Props

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
| ---- | ---- | ---- | ------ | ------ |
| dashed | 是否虚线 | Boolean | false | true |
| hairline | 是否细线 | Boolean | true | false |
| dot | 是否以点替代文字，优先于text字段起作用 | Boolean | false | true |
| textPosition | 内容文本的位置 | String | center | left、right |
| text | 文本内容 | String\|number | - | - |
| textSize | 文本大小 | String\|number | 14 | - |
| textColor | 文本颜色 | String | '#909399' | - |
| lineColor | 线条颜色 | String | '#dcdfe6' | - |

### Events

| 事件名 | 说明 | 回调参数 | 版本 |
| :----- | :--- | :------- | :--- |
| click | divider组件被点击时触发 | - | - |
