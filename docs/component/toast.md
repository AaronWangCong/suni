## Toast 消息提示 <to-api/>

<demo-model url="/pages/components/toast/index"></demo-model>

Toast 组件主要用于消息通知、加载提示、操作结果提示等醒目提示效果，我们为其提供了多种丰富的API。

:::warning 注意：
由于uni中无法通过js创建元素，所以需要在页面中调用`<su-toast />`组件，再通过ref开启
:::

### 基本使用

以下为一个模拟登录成功后，弹出toast提示，并在一定时间(默认2000ms)后，自动跳转页面到个人中心页(也可以配置跳转的参数)的示例

```html
<template>
  <view>
    <su-toast ref="uToastRef"></su-toast>
    <su-cell-group title-bg-color="rgb(243, 244, 246)">
      <su-cell
        :titleStyle="{fontWeight: 500}"
        :title="item.title"
        v-for="(item, index) in list"
        :key="index"
        isLink
        :icon="item.iconUrl"
        @click="showToast(item)"
      ></su-cell>
    </su-cell-group>
  </view>
</template>

<script setup>
  import { ref, computed } from 'vue'

  // 创建响应式数据
  const show = ref(false)
  const list = ref([
    {
      type: 'default',
      title: '默认主题',
      message: '锦瑟无端五十弦',
      iconUrl: 'https://uview-plus.jiangruyi.com/resources/toast/default.png'
    },
    {
      type: 'error',
      icon: false,
      title: '失败主题',
      message: '一弦一柱思华年',
      iconUrl: 'https://uview-plus.jiangruyi.com/resources/toast/error.png'
    },
    {
      type: 'success',
      title: '成功主题(带图标)',
      message: '庄生晓梦迷蝴蝶',
      iconUrl: 'https://uview-plus.jiangruyi.com/resources/toast/success.png'
    },
    {
      type: 'loading',
      title: '正在加载',
      message: '正在加载',
      iconUrl: 'https://uview-plus.jiangruyi.com/resources/toast/loading.png'
    },
    {
      type: 'default',
      title: '结束后跳转标签页',
      message: '此情可待成追忆',
      url: '/pages/componentsB/tag/tag',
      iconUrl: 'https://uview-plus.jiangruyi.com/resources/toast/jump.png'
    }
  ])

  // 计算属性
  const getIcon = computed(() => {
    return (path) => {
      return 'https://cdn.uviewui.com/uview/example/' + path + '.png'
    }
  })

  // 方法
  const uToastRef = ref(null)
  function showToast(params) {
    uToastRef.value.show({
      ...params,
      complete() {
        params.url &&
          uni.navigateTo({
            url: params.url
          })
      }
    })
  }
</script>
```

### 配置toast主题

一共有6种主题可选，如下：

- default-灰黑色，最普通的场景，此为默认主题，可以不用填`type`参数
- error-红色，代表错误
- success-绿色，代表成功
- warning-黄色，代表警告
- info-灰色，比default浅一点
- primary-蓝色，uView的主色调

除了`default`状态，其他5种主题，都是默认带有一个左边的图标，可以通过配置`icon`参数为`none`来取消

### useToast 写法

- 组件内置了useToast方法，可以更方便的使用toast，具体用法如下：

```ts
import { useToast } from 'sun-uni/components/su-toast'

const { show, success, error, info, warning } = useToast()

// 调用show方法，显示toast
show({
  message: '登录成功',
  type: 'success'
})

// 调用success方法，显示toast
success('登录成功')

// 调用error方法，显示toast
error('登录失败')

// 调用info方法，显示toast
info('登录失败')

// 调用warning方法，显示toast
warning('登录失败')
```

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/toast/toast.nvue) 右侧演示页面的源码

### API

### Params

这些参数为通过`ref`调用`<toast/>`组件内部的`show`方法时，需要传递参数

| 参数     | 说明                                 | 类型             | 默认值    | 可选值       |
| -------- | ------------------------------------ | ---------------- | --------- | ------------ |
| loading  | 是否加载中                           | Boolean          | false     | true         |
| message  | 显示的文本                           | String \| Number | -         | -            |
| icon     | 图标，或者绝对路径的图片             | String           | -         | -            |
| position | toast出现的位置                      | String           | center    | top / bottom |
| type     | 主题类型                             | String           | -         | -            |
| params   | 跳转的参数                           | Object           | -         | -            |
| duration | 展示时间，单位ms, 值为-1时不自动关闭 | String \| Number | 2000      | -            |
| complete | 执行完后的回调函数                   | Function         | null      | -            |
| selector | 当前的选择器                         | String           | undefined | -            |

### Methods

方法是通过`ref`调用的，参见上方说明
注意：所有有关`ref`的调用，都不能在页面的`onLoad`生命周期调用，因为此时组件尚未创建完毕，会报错，应该在`onReady`生命周期调用。

| 方法名 | 说明                                                            | 参数       | 版本 |
| :----- | :-------------------------------------------------------------- | :--------- | :--- |
| show   | 显示toast，如需一进入页面就显示toast，请在`onReady`生命周期调用 | 见上方说明 | -    |
