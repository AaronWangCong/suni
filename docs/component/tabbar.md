## Tabbar 底部导航栏 <to-api/>

<demo-model url="/pages/components/tabbar/index"></demo-model>

#### 优点：

此组件一般用于应用的底部导航，具有如下特点：

- 图标可以使用字体图标(内置图标和扩展图标)或者图片
- 可以动态切换菜单的数量以及配置
- 切换菜单之前，可以进行回调鉴权
- 可以设置角标或数字化提示
- 有效防止组件区域高度塌陷，无需给父元素额外的内边距或者外边距来避开导航的区域

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

推荐您使用`list`数组遍历循环，案例使用基础方式构建，请根据`click`事件回调进行后续逻辑操作。

```html
<template>
  <su-tabbar :value="value1" @change="change1" :fixed="false" :placeholder="false" :safeAreaInsetBottom="false">
    <su-tabbar-item text="首页" icon="home" @click="click1"></su-tabbar-item>
    <su-tabbar-item text="放映厅" icon="photo" @click="click1"></su-tabbar-item>
    <su-tabbar-item text="直播" icon="play-right" @click="click1"></su-tabbar-item>
    <su-tabbar-item text="我的" icon="account" @click="click1"></su-tabbar-item>
  </su-tabbar>
</template>

<script setup>
  const value1 = ref(0)

  function change1() {}
</script>
```

### 显示徽标

使用`dot`属性添加--小点--类型徽标，使用`badge`属性添加--数字--类型徽标。您也可以使用`:badge='badge'`动态设置徽标数量， 这在消息盒子的展示中是比较好用的功能

```html
<su-tabbar :value="value2" :placeholder="false" @change="name => value2 = name" :fixed="false" :safeAreaInsetBottom="false">
  <su-tabbar-item text="首页" icon="home" dot></su-tabbar-item>
  <su-tabbar-item text="放映厅" icon="photo" badge="3"></su-tabbar-item>
  <su-tabbar-item text="直播" icon="play-right"></su-tabbar-item>
  <su-tabbar-item text="我的" icon="account"></su-tabbar-item>
</su-tabbar>
<script setup>
  const value2 = ref(1)
</script>
```

### 匹配标签的名称

```html
<su-tabbar :placeholder="false" :value="value3" @change="name => value3 = name" :fixed="false" :safeAreaInsetBottom="false">
  <su-tabbar-item text="首页" icon="home" name="home"></su-tabbar-item>
  <su-tabbar-item text="放映厅" icon="photo" name="photo"></su-tabbar-item>
  <su-tabbar-item text="直播" icon="play-right" name="play-right"></su-tabbar-item>
  <su-tabbar-item text="我的" name="account" icon="account"></su-tabbar-item>
</su-tabbar>
<script setup>
  const value3 = ref('play-right')
</script>
```

### 自定义图标/颜色

如您需要自定义图标/颜色，在`su-tabbar-item`标签中使用插槽`active-icon`和`inactive-icon`来定义图标和颜色

```html
<su-tabbar :value="value4" @change="name => value4 = name" :fixed="false" :placeholder="false" activeColor="#d81e06" :safeAreaInsetBottom="false">
  <su-tabbar-item text="首页">
    <template #active-icon>
      <image class="u-page__item__slot-icon" src="https://cdn.uviewui.com/uview/common/bell-selected.png"></image>
    </template>
    <template #inactive-icon>
      <image class="u-page__item__slot-icon" src="https://cdn.uviewui.com/uview/common/bell.png"></image>
    </template>
  </su-tabbar-item>
  <su-tabbar-item text="放映厅" icon="photo"></su-tabbar-item>
  <su-tabbar-item text="直播" icon="play-right"></su-tabbar-item>
  <su-tabbar-item text="我的" icon="account"></su-tabbar-item>
</su-tabbar>

<script setup>
  const value4 = ref(0)
</script>
```

### 拦截切换事件(点击第二个标签)

在切换事件中，处理拦截事件或者您其他js操作逻辑。

```html
<su-tabbar :value="value5" :fixed="false" @change="change5" :safeAreaInsetBottom="false" :placeholder="false">
  <su-tabbar-item text="首页" icon="home"></su-tabbar-item>
  <su-tabbar-item text="放映厅" icon="photo"></su-tabbar-item>
  <su-tabbar-item text="直播" icon="play-right"></su-tabbar-item>
  <su-tabbar-item text="我的" icon="account"></su-tabbar-item>
</su-tabbar>

<script setup>
  const value5 = ref(0)

  function change5(name) {
    if (name === 1) return uni.$u.toast('请您先登录')
    else this.value5 = name
  }
</script>
```

### 边框

组件默认带了顶部边框，如果不需要，配置`border`为`false`即可。

```html
<su-tabbar :value="value7" :placeholder="false" :border="false" @change="name => value7 = name" :fixed="false" :safeAreaInsetBottom="false">
  <su-tabbar-item text="首页" icon="home"></su-tabbar-item>
  <su-tabbar-item text="放映厅" icon="photo"></su-tabbar-item>
  <su-tabbar-item text="直播" icon="play-right"></su-tabbar-item>
  <su-tabbar-item text="我的" icon="account"></su-tabbar-item>
</su-tabbar>

<script setup>
  const value7 = ref(0)
</script>
```

### 固定在底部(固定在屏幕最下方)

与原生效果无异，但您可以按照api配置您需要的其他配置，如徽标，边框等

```html
<su-tabbar :value="value6" @change="name => value6 = name" :fixed="true" :placeholder="true" :safeAreaInsetBottom="true">
  <su-tabbar-item text="首页" icon="home"></su-tabbar-item>
  <su-tabbar-item text="放映厅" icon="photo"></su-tabbar-item>
  <su-tabbar-item text="直播" icon="play-right"></su-tabbar-item>
  <su-tabbar-item text="我的" icon="account"></su-tabbar-item>
</su-tabbar>

<script setup>
  const value6 = ref(0)
</script>
```

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/tabbar/tabbar.nvue) 右侧演示页面的源码

### API

### TabBar Props

| 参数                | 说明                                                | 类型             | 默认值  | 可选值 |
| ------------------- | --------------------------------------------------- | ---------------- | ------- | ------ |
| value               | 当前匹配项的name                                    | String \| Number | null    | -      |
| safeAreaInsetBottom | 是否为iPhoneX留出底部安全距离                       | Boolean          | true    | false  |
| border              | 是否显示上方边框                                    | Boolean          | true    | false  |
| zIndex              | 元素层级z-index                                     | String \| Number | 1       | -      |
| active-color        | 选中标签的颜色                                      | String           | #1989fa | -      |
| inactive-color      | 未选中标签的颜色                                    | String           | #7d7e80 | -      |
| fixed               | 是否固定在底部                                      | Boolean          | true    | false  |
| placeholder         | fixed定位固定在底部时，是否生成一个等高元素防止塌陷 | Boolean          | true    | false  |

### TabBarItem Props

| 参数       | 说明                                                       | 类型             | 默认值                | 可选值 |
| ---------- | ---------------------------------------------------------- | ---------------- | --------------------- | ------ |
| name       | item标签的名称，作为与up-tabbar的value参数匹配的标识符     | String \| Number | null                  | -      |
| icon       | `su-icon`内置图标或者绝对路径的图片                        | String           | -                     | -      |
| badge      | 右上角的角标提示信息                                       | String \| Number | null                  | -      |
| dot        | 是否显示圆点，将会覆盖badge参数                            | Boolean          | false                 | true   |
| text       | 描述文本                                                   | String           | -                     | -      |
| badgeStyle | 控制徽标的位置，对象或者字符串形式，可以设置top和right属性 | Object \| String | `top: 6px;right:2px;` | -      |

### TabBarItem Events

| 事件名 | 说明           | 回调参数                  |
| :----- | :------------- | :------------------------ |
| change | 切换选项时触发 | index：当前要切换项的name |
| click  | 切换选项时触发 | index：当前要切换项的name |

<style scoped>
h3[id=table-props] + table thead tr th:nth-child(2){
	width: 40%;
}

h3[id=td-props] + table thead tr th:nth-child(2){
	width: 43%;
}

h3[id=th-props] + table thead tr th:nth-child(2){
	width: 43%;
}
</style>
