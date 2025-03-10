## Gap 间隔槽 <to-api/>

<demo-model url="/pages/components/gap/index"></demo-model>


该组件一般用于内容块之间的用一个灰色块隔开的场景，方便用户风格统一，减少工作量

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

直接引入即可使用
- 通过`height`配置高度，单位rpx
- 通过`bg-color`配置背景颜色

```html
<su-gap height="20" bg-color="#f3f3f3"></su-gap>
```

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/gap/gap.nvue) 右侧演示页面的源码


### API

### Props

| 参数          | 说明            | 类型            | 默认值             |  可选值   |
|-------------  |---------------- |---------------|------------------ |-------- |
| bg-color |  背景颜色 | String	 | transparent(背景透明) | - |
| height | 间隔槽高度，单位rpx  | String \| Number | 30 | - |
| margin-top | 与前一个元素的距离，单位rpx | String \| Number  | 0 | - |
| margin-bottom | 与后一个元素的距离，单位rpx | String \| Number  | 0 | - |
