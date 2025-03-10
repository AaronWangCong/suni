## Grid 宫格布局 <to-api/>

<demo-model url="/pages/components/grid/index"></demo-model>

宫格组件一般用于同时展示多个同类项目的场景，可以给宫格的项目设置徽标组件([badge](/component/badge.html))，或者图标等，也可以扩展为左右滑动的轮播形式。

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

- 该组件外层为`su-grid`组件包裹，通过`col`设置内部宫格的列数
- 内部通过`su-grid-item`组件的`slot`设置宫格的内容
- 如果不需要宫格的边框，可以设置`border`为`false`

```html
<template>
  <view>
    <su-grid :border="false" @click="click">
      <su-grid-item v-for="(baseListItem,baseListIndex) in baseList" :key="baseListIndex">
        <su-icon :customStyle="{paddingTop:20+'rpx'}" :name="baseListItem.name" :size="22"></su-icon>
        <text class="grid-text">{{baseListItem.title}}</text>
      </su-grid-item>
    </su-grid>
    <su-toast ref="uToastRef" />
  </view>
</template>
<script setup>
  import { ref } from 'vue'

  // 创建响应式数据
  const baseList = ref([
    {
      name: 'photo',
      title: '图片'
    },
    {
      name: 'lock',
      title: '锁头'
    },
    {
      name: 'star',
      title: '星星'
    }
  ])

  // 创建对子组件的引用
  const uToastRef = ref(null)

  // 定义方法
  const click = (name) => {
    if (uToastRef.value) {
      uToastRef.value.success(`点击了第${name}个`)
    }
  }
</script>

<style lang="scss">
  .grid-text {
    font-size: 14px;
    color: #909399;
    padding: 10rpx 0 20rpx 0rpx;
    /* #ifndef APP-PLUS */
    box-sizing: border-box;
    /* #endif */
  }
</style>
```

### 绑定点击事件&自定义列数

```html
<template>
  <view>
    <su-grid :border="false" col="4">
      <su-grid-item v-for="(listItem,listIndex) in list" :key="listIndex">
        <su-icon :customStyle="{paddingTop:20+'rpx'}" :name="listItem.name" :size="22"></su-icon>
        <text class="grid-text">{{listItem.title}}</text>
      </su-grid-item>
    </su-grid>
    <su-toast ref="uToastRef" />
  </view>
</template>

<script setup>
  import { ref, reactive } from 'vue'

  // 创建响应式数据
  const list = reactive([
    {
      name: 'photo',
      title: '图片'
    },
    {
      name: 'lock',
      title: '锁头'
    },
    {
      name: 'star',
      title: '星星'
    },
    {
      name: 'hourglass',
      title: '沙漏'
    },
    {
      name: 'home',
      title: '首页'
    },
    {
      name: 'volume', // 注意：这里修改了 name 从 'star' 改为 'volume'，以避免列表中两个元素具有相同的 name
      title: '音量'
    }
  ])

  // 创建对子组件的引用
  const uToastRef = ref(null)

  // 定义方法
  const click = (name) => {
    if (uToastRef.value) {
      uToastRef.value.success(`点击了第${name + 1}个`) // 注意：这里加1是因为通常我们是从第1个开始计数的
    }
  }
</script>

<style lang="scss">
  .grid-text {
    font-size: 14px;
    color: #909399;
    padding: 10rpx 0 20rpx 0rpx;
    /* #ifndef APP-PLUS */
    box-sizing: border-box;
    /* #endif */
  }
</style>
```

### 实现宫格的左右滑动

结合uni的swiper组件可以实现宫格的左右滑动，因为`swiper`特性的关系，请指定`swiper`的高度 ，否则`swiper`的高度不会被内容撑开，可以自定义`swiper`的指示器，达到更高的灵活度

```html
<template>
  <view>
    <swiper :indicator-dots="true" class="swiper">
      <swiper-item>
        <su-grid :border="true">
          <su-grid-item :customStyle="{width:220+'rpx',height:220+'rpx'}" v-for="(item, index) in swiperList" :index="index" :key="index">
            <su-icon :customStyle="{paddingTop:20+'rpx'}" :name="item" :size="22"></su-icon>
            <text class="grid-text">{{ '宫格' + (index + 1) }}</text>
          </su-grid-item>
        </su-grid>
      </swiper-item>
      <swiper-item>
        <su-grid :border="true">
          <su-grid-item :customStyle="{width:220+'rpx',height:220+'rpx'}" v-for="(item, index) in swiperList" :index="index + 9" :key="index">
            <su-icon :customStyle="{paddingTop:20+'rpx'}" :name="item" :size="22"></su-icon>
            <text class="grid-text">{{ '宫格' + (index + 1) }}</text>
          </su-grid-item>
        </su-grid>
      </swiper-item>
      <swiper-item>
        <su-grid :border="true">
          <su-grid-item :customStyle="{width:220+'rpx',height:220+'rpx'}" v-for="(item, index) in swiperList" :index="index + 18" :key="index">
            <su-icon :customStyle="{paddingTop:20+'rpx'}" :name="item" :size="22"></su-icon>
            <text class="grid-text">{{ "宫格" + (index + 1) }}</text>
          </su-grid-item>
        </su-grid>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup>
  import { ref } from 'vue'

  // 创建响应式数据
  const swiperList = ref(['integral', 'kefu-ermai', 'coupon', 'gift', 'scan', 'pause-circle', 'wifi', 'email', 'list'])
</script>

<style lang="scss">
  .swiper {
    height: 720rpx;
  }

  .grid-text {
    font-size: 14px;
    color: #909399;
    padding: 10rpx 0 20rpx 0rpx;
    /* #ifndef APP-PLUS */
    box-sizing: border-box;
    /* #endif */
  }
</style>
```

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/grid/grid.nvue) 右侧演示页面的源码

### API

### Grid Props

| 参数        | 说明                                                                                                                  | 类型             | 默认值         | 可选值         |
| ----------- | --------------------------------------------------------------------------------------------------------------------- | ---------------- | -------------- | -------------- |
| col         | 宫格的列数                                                                                                            | String \| Number | 3              | -              |
| border      | 是否显示宫格的边框                                                                                                    | Boolean          | true           | false          |
| align       | 宫格的对齐方式，用于控制只有一两个宫格时的对齐场景                                                                    | String           | left           | center / right |
| hover-class | 样式类名，按下时有效，样式必须写在根目录的`App.vue`或通过其引入的全局样式中才有效，`none`为无效果，作用于头部标题区域 | String           | su-hover-class | none / 其他    |

### Grid-item Props

| 参数         | 说明                 | 类型             | 默认值                 | 可选值 |
| ------------ | -------------------- | ---------------- | ---------------------- | ------ |
| bg-color     | 宫格的背景颜色       | String           | #ffffff                | -      |
| index        | 点击宫格时，返回的值 | String \| Number | -                      | -      |
| custom-style | 自定义样式，对象形式 | Object           | `{padding: '30rpx 0'}` | -      |

### Grid Event

注意：请在`<su-grid></su-grid>`上监听此事件

| 事件名 | 说明         | 回调参数                                        |
| :----- | :----------- | :---------------------------------------------- |
| click  | 点击宫格触发 | index: `su-grid-item`通过`props`传递的`index`值 |

### Grid-item Event

注意：请在`<su-grid-item></su-grid-item>`上监听此事件

| 事件名 | 说明         | 回调参数                                        |
| :----- | :----------- | :---------------------------------------------- |
| click  | 点击宫格触发 | index: `su-grid-item`通过`props`传递的`index`值 |

<style scoped>
h3[id=grid-props] + table thead tr th:nth-child(2){
	width: 40%;
}
</style>
