## Badge 徽标数 <to-api/>

该组件一般用于图标右上角显示未读的消息数量，提示用户点击，有圆点和圆包含文字两种形式。

<demo-model url="/pages/components/badge/index"></demo-model>

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

- 通过`value`参数定义徽标内容
- 通过`type`设置主题。重申一次，sun-uni中，所有组件的`type`参数都只有5个固定的可选值，分别是`primary`(蓝色-主色)，`warning`(黄色-警告)，
  `error`(红色-错误)，`success`(绿色-成功)，`info`(灰色-信息)

::: warning 注意
此组件内部默认为`absulote`绝对定位，所以需要给`badge`父组件(元素)设置`position: relative`相对定位，
再通过调整`offset`偏移值(数组，两个元素，第一个元素为`top`值，第二个元素为`right`值，单位rpx，可为负值，如"[-10, -10]")设置到合适的位置即可。
如果不需要组件内容默认的自动绝对定位，设置`absolute`参数为`false`即可。
:::

```html
<su-badge type="error" :value="7"></su-badge>
```

### 徽标数显示方式

- `numberType`参数默认为`overflow`，会根据max字段判断，超出显示`${max}+`
- `ellipsis`会根据max判断，超出显示`${max}...`
- `limit`会依据1000作为判断条件，超出1000，显示`${value/1000}K`，比如2.2k、3.34w，最多保留2位小数

```html
<su-badge :value="5132" numberType="ellipsis"></su-badge>
<su-badge :value="1011" numberType="overflow"></su-badge>
<su-badge :value="1500" numberType="limit"></su-badge>
<su-badge :value="45187" numberType="limit"></su-badge>
```

### 设置徽标的类型为一个圆点

通过`is-dot`参数设置，该形式组件没有内容，只显示一个圆点

```html
<su-badge :is-dot="true" type="success"></su-badge>
```

### 反转色

通过`inverted`参数设置是否反转背景和字体颜色

```html
<su-badge :inverted="true" type="success"></su-badge>
```

### 自定义徽标样式

可以通过`custom-style`自定义样式

```html
<su-badge type="green" :custom-style="customStyle"></su-badge>

<script lang="ts" setup>
  const customStyle = {
    'background-color': 'blue',
    color: 'white'
  }
</script>
```

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/badge/badge.nvue) 右侧演示页面的源码

### API

### Props

| 参数             | 说明                                                                                                  | 类型                          | 默认值   | 可选值                             |
| ---------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------- | -------- | ---------------------------------- |
| value/modelValue | 展示的数字                                                                                            | String \| Number              | -        | -                                  |
| is-dot           | 不展示数字，只有一个小点                                                                              | Boolean                       | false    | true                               |
| absolute         | 组件是否绝对定位，为`true`时，`offset`参数才有效                                                      | Boolean                       | true     | false                              |
| type             | 使用预设的背景颜色                                                                                    | String                        | error    | success / primary / warning / info |
| offset           | 设置badge的位置偏移，格式为 [x, y]，也即设置的为`top`和`right`的值，单位rpx。`absolute`为`true`时有效 | Array                         | [20, 20] | -                                  |
| color            | 字体颜色                                                                                              | String                        | #ffffff  | -                                  |
| bgColor          | 背景颜色，优先级比`type`高，如设置，`type`参数会失效                                                  | String                        | -        | -                                  |
| show             | 是否显示, 默认显示                                                                                    | Boolean                       | true     | true / false                       |
| max              | 最大值，超过最大值会显示 '{max}+'                                                                     | String \| Number              | 999      | -                                  |
| show-zero        | 当数值为 0 时，是否展示 Badge                                                                         | Boolean                       | false    | true / false                       |
| shape            | 徽标形状，circle-四角均为圆角，horn-左下角为直角                                                      | circle \| horn                | circle   | circle / horn                      |
| numberType       | 设置数字的显示方式                                                                                    | overflow \| ellipsis \| limit | overflow | overflow / ellipsis / limit        |
| inverted         | 是否反转背景和字体颜色                                                                                | Boolean                       | false    | true / false                       |

<style scoped>
h3[id=props] + table thead tr th:nth-child(2){
	width: 40%;
}
</style>
