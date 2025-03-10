## Link 超链接

<demo-model url="/pages/components/link/index"></demo-model>

该组件为超链接组件，在不同平台有不同表现形式：

- 在APP平台会通过`plus`环境打开内置浏览器
- 在小程序中把链接复制到粘贴板，同时提示信息
- 在H5中通过`window.open`打开链接

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

- 通过`href`设置打开的链接，`text`传入显示的内容

```html
<su-link href="https://uviewui.com/" text="打开uview-plus UI文档" @click="click"></su-link>
```

### 下划线

通过`under-line`设置是否显示链接的下划线

```html
<su-link href="https://uviewui.com/" text="打开uview-plus UI文档" :under-line="true"></su-link>
```

### 自定义颜色

- 通过`color`设置文字颜色
- 通过`line-color`设置下划线颜色

```html
<su-link href="https://uviewui.com/" text="打开uview-plus UI文档" color="#19be6b" line-color="#19be6b"></su-link>
```

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/link/link.nvue) 右侧演示页面的源码

### API

### Props

| 参数       | 说明                                       | 类型             | 默认值                     | 可选值 |
| ---------- | ------------------------------------------ | ---------------- | -------------------------- | ------ |
| color      | 文字颜色                                   | String           | #606266                    | -      |
| font-size  | 字体大小，单位rpx                          | String \| Number | 28                         | -      |
| under-line | 是否显示下划线                             | Boolean          | false                      | true   |
| href       | 跳转的链接，要带上http(s)                  | String           | -                          | -      |
| line-color | 下划线颜色，默认同`color`参数颜色          | String           | -                          | -      |
| mp-tips    | 各个小程序平台把链接复制到粘贴板后的提示语 | String           | 链接已复制，请在浏览器打开 | -      |
