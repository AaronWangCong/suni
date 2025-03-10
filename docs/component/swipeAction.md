## SwipeAction 滑动操作 <to-api/>

<demo-model url="/pages/components/swipeAction/index"></demo-model>

该组件一般用于左滑唤出操作菜单的场景，用的最多的是左滑删除操作。

::: warning 注意
如果把该组件通过v-for用于左滑删除的列表，请保证循环的`:key`是一个唯一值，可以用数据的id或者title替代。
不能是数组循环的index，否则删除的时候，可能会出现数据错乱
:::

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

- 通过slot传入内部内容即可，可以将`v-for`的"index"索引值传递给`index`参数，用于点击时，在回调方法中对某一个数据进行操作(点击回调时第一个参数会返回此索引值)
- 内部的按钮通过`options`参数配置，此参数为一个数组，元素为对象，可以配置按钮的文字，背景颜色(建议只配置此两个参数即可)，**请勿配置宽高等属性**。

```html
<template>
  <view>
    <su-swipe-action>
      <su-swipe-action-item v-model:show="show" :options="options1">
        <view class="swipe-action su-border-top su-border-bottom">
          <view class="swipe-action__content">
            <text class="swipe-action__content__text">基础使用</text>
          </view>
        </view>
      </su-swipe-action-item>
    </su-swipe-action>
  </view>
</template>

<script setup>
  import { reactive } from 'vue'

  const show = ref(false)
  // 使用 reactive 创建响应式对象
  const options1 = reactive([
    {
      text: '删除'
    }
  ])
</script>

<style lang="scss">
  .u-page {
    padding: 0;
  }

  .u-demo-block__title {
    padding: 10px 0 2px 15px;
  }

  .swipe-action {
    &__content {
      padding: 25rpx 0;

      &__text {
        font-size: 15px;
        color: $su-main-color;
        padding-left: 30rpx;
      }
    }
  }
</style>
```

### 多个按钮并列

- 通过`options`参数，达到多个并列的效果

```html
<template>
  <view>
    <su-swipe-action>
      <su-swipe-action-item :options="options2">
        <view class="swipe-action su-border-top su-border-bottom">
          <view class="swipe-action__content">
            <text class="swipe-action__content__text">两个按钮并列</text>
          </view>
        </view>
      </su-swipe-action-item>
    </su-swipe-action>
  </view>
</template>

<script setup>
  import { reactive } from 'vue'

  // 使用 reactive 创建响应式对象数组
  const options2 = reactive([
    {
      text: '收藏',
      style: {
        backgroundColor: '#3c9cff'
      }
    },
    {
      text: '删除',
      style: {
        backgroundColor: '#f56c6c'
      }
    }
  ])
</script>

<style lang="scss">
  .u-page {
    padding: 0;
  }

  .u-demo-block__title {
    padding: 10px 0 2px 15px;
  }

  .swipe-action {
    &__content {
      padding: 25rpx 0;

      &__text {
        font-size: 15px;
        color: $su-main-color;
        padding-left: 30rpx;
      }
    }
  }
</style>
```

### 组合使用

- 通过增设`options`的`options`达成组合效果

```html
<template>
  <view>
    <su-swipe-action>
      <su-swipe-action-item :options="item.options" v-for="(item, index) in options4" :disabled="item.disabled" :key="index">
        <view class="swipe-action su-border-top" :class="[index === options4.length - 1 && 'su-border-bottom']">
          <view class="swipe-action__content">
            <text class="swipe-action__content__text">{{ item.text }}</text>
          </view>
        </view>
      </su-swipe-action-item>
    </su-swipe-action>
  </view>
</template>
<script setup>
  import { reactive } from 'vue'

  // 使用 reactive 创建响应式对象数组
  const options4 = reactive([
    {
      text: '禁用状态',
      disabled: true,
      options: [
        {
          text: '置顶',
          style: {
            backgroundColor: '#3c9cff'
          }
        },
        {
          text: '取消',
          style: {
            backgroundColor: '#f9ae3d'
          }
        }
      ]
    },
    {
      text: '正常状态',
      disabled: false,
      options: [
        {
          text: '置顶',
          style: {
            backgroundColor: '#3c9cff'
          }
        },
        {
          text: '取消',
          style: {
            backgroundColor: '#f9ae3d'
          }
        }
      ]
    },
    {
      text: '自动关闭',
      disabled: false,
      options: [
        {
          text: '置顶',
          style: {
            backgroundColor: '#3c9cff'
          }
        },
        {
          text: '取消',
          style: {
            backgroundColor: '#f9ae3d'
          }
        }
      ]
    }
  ])
</script>
<style lang="scss">
  .u-page {
    padding: 0;
  }

  .u-demo-block__title {
    padding: 10px 0 2px 15px;
  }

  .swipe-action {
    &__content {
      padding: 25rpx 0;

      &__text {
        font-size: 15px;
        color: $su-main-color;
        padding-left: 30rpx;
      }
    }
  }
</style>
```

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/swipeAction/swipeAction.nvue) 右侧演示页面的源码

### API

### SwipeAction Props

| 参数      | 说明                        | 类型    | 默认值 | 可选值 |
| --------- | --------------------------- | ------- | ------ | ------ |
| autoClose | 是否自动关闭其他swipe按钮组 | Boolean | true   | false  |

### SwipeAction Event

| 事件名 | 说明           | 回调参数    |
| :----- | :------------- | :---------- |
| click  | 点击组件时触发 | index: 索引 |

### SwipeActionItem Props

| 参数         | 说明                                                             | 类型             | 默认值 | 可选值 |
| ------------ | ---------------------------------------------------------------- | ---------------- | ------ | ------ |
| show         | 打开或者关闭某个组件                                             | Boolean          | false  | true   |
| index        | 标识符，点击时候用于区分点击了哪一个，用`v-for`循环时的index即可 | String \| Number | -      | -      |
| disabled     | 是否禁止某个swipeAction滑动                                      | Boolean          | false  | true   |
| options      | 按钮组的配置参数，数组形式，见上方说明                           | Array            | [ ]    | -      |
| closeOnClick | 点击后立即关闭                                                   | Boolean          | false  | true   |
| autoClose    | 是否自动关闭其他swipe按钮组                                      | Boolean          | true   | false  |
| threshold    | 滑动距离阈值，只有大于此值，才被认为是要打开菜单                 | Number           | 20     | -      |
| duration     | 动画过渡时间，单位ms                                             | String \| Number | 300    | -      |

### SwipeActionItem Event

| 事件名 | 说明           | 回调参数                                         |
| :----- | :------------- | :----------------------------------------------- |
| click  | 点击组件时触发 | name: props参数name的值，index: 第几个按钮被点击 |
