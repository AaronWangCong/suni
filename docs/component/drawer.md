## Drawer 抽屉 <to-api/>

<demo-model url="/pages/components/drawer/drawer"></demo-model>

<div>对su-pupop进行二次封装，包含了头部和底部, 根据高度内部局部滚动</div>

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

- 通过`v-model`绑定一个布尔值的变量控制弹出层的打开和收起
- 通过`title`设置标题

```html
<template>
	<view>
		<su-drawer v-model="show" title="标题">
			<view>
				人生若只如初见，何事秋风悲画扇
			</view>
		</su-drawer>
		<su-button @click="show = true">打开</u-button>
	</view>
</template>

<script setup lang="ts">
	const show = ref(false)
</script>
```

### 设置弹出层的方向

- 可以通过`mode`参数设置，可以设置为`left`、`top`、`right`、`bottom`
- 默认为`bottom`

```html
<template>
  <su-popup v-model="show" mode="bottom">
    <view>人生若只如初见，何事秋风悲画扇</view>
  </su-popup>
</template>
```

### useDrawer 函数使用

[详细查看](/hooks/useDrawer.html)

```html
<template>
  <su-drawer selector="user-drawer" title="标题" show-footer :custom-style="{ height: '500px' }">
    <view class="p-2 h-900px">
      openDraweropenDraweropenDraweropenDraweropenDrawer
      <su-button @click.stop="closeDrawer">关闭抽屉</su-button>
      关闭抽屉关闭抽屉关闭抽屉关闭抽屉
    </view>
    openDraweropenDraweropenDraweropenDraweropenDraweropenDrawer
  </su-drawer>
</template>

<script lang="ts" setup>
  import { useDrawer } from '@/uni_modules/sun-uni/hooks'

  const { openDrawer, closeDrawer } = useDrawer('user-drawer')

  function useDrawerClick() {
    openDrawer(true)
  }
</script>
```

### 示例源码

[点击可以查看](https://github.com/AaronWangCong/suni/blob/main/src/pages/components/drawer/drawer.vue) 右侧演示页面的源码

### API

### Props

- su-pupop的参数也支持, 暴露出的类型为[`SuDrawerProps`](https://github.com/AaronWangCong/suni/blob/main/src/uni_modules/sun-uni/components/su-drawer/props.ts)

| 参数                   | 说明                                          | 类型           | 默认值    | 可选值                   |
| ---------------------- | --------------------------------------------- | -------------- | --------- | ------------------------ |
| mode                   | 弹出层方向                                    | String         | bottom    | left、top、right、bottom |
| round                  | 是否圆角                                      | Boolean        | false     | true、false              |
| closeable              | 是否显示关闭按钮                              | Boolean        | false     | true、false              |
| selector               | 当前抽屉的选择器                              | String         | undefined | -                        |
| showHeader             | 是否显示头部                                  | Boolean        | true      | true、false              |
| headerStyle            | 头部样式                                      | CSSProperties  | -         | -                        |
| headerHeight           | 头部的高度 单位px 默认44px                    | Number, string | 44        | -                        |
| showHeaderBottomBorder | 是否显示头部底部边框                          | Boolean        | true      | true、false              |
| title                  | 标题                                          | String         | -         | -                        |
| titleStyle             | 标题样式                                      | CSSProperties  | -         | -                        |
| contentStyle           | 内容样式                                      | CSSProperties  | -         | -                        |
| showFooter             | 是否显示底部                                  | Boolean        | true      | true、false              |
| showFooterTopBorder    | 是否显示底部顶部边框                          | Boolean        | true      | true、false              |
| footerHeight           | 底部高度 单位px, rpx 默认58px                 | Number, string | 58        | -                        |
| footerStyle            | 底部样式                                      | CSSProperties  | -         | -                        |
| showConfirmButton      | 是否显示确定按钮                              | Boolean        | true      | true、false              |
| showCancelButton       | 是否显示取消按钮                              | Boolean        | true      | true、false              |
| confirmText            | 确定按钮文字                                  | String         | 确定      | -                        |
| cancelText             | 取消按钮文字                                  | String         | 取消      | -                        |
| confirmButtonProps     | 确定按钮的props                               | SuButtonProps  | -         | -                        |
| cancelButtonProps      | 取消按钮的参props                             | SuButtonProps  | -         | -                        |
| confirmColProps        | 确定col的参数                                 | SuButtonProps  | -         | -                        |
| cancelColProps         | 取消col的参数                                 | SuButtonProps  | -         | -                        |
| closeFunc              | 关闭前的回调函数，如果返回 false 则不会关闭， | Function       | -         | -                        |
| confirmLoading         | 是否显示确认按钮的加载状态                    | Boolean        | false     | true、false              |

### Events

| 事件名       | 说明            |
| ------------ | --------------- |
| close        | 关闭时触发      |
| click        | 点击时触发      |
| cancel       | 点击取消时触发  |
| update-props | 更新props时触发 |

### Slots

| 名称         | 说明         |
| ------------ | ------------ |
| default      | 自定义内容   |
| header-left  | 头部左边插槽 |
| header-right | 头部右边内容 |
| footer       | 底部内容     |
