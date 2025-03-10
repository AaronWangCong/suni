# 快速上手

<demo-model url="/"></demo-model>

### 如何使用

通过uniapp插件市场安装后，在某个页面可以直接使用组件，无需通过`import`引入组件。

```html
<template>
	<su-action-sheet :list="list" v-model="show"></su-action-sheet>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					text: '点赞',
					color: 'blue',
					fontSize: 28
				}, {
					text: '分享'
				}, {
					text: '评论'
				}],
				show: true
			}
		}
	}
</script>
```

<br>


### 关于uni.$u

uView将`$u`对象同时挂载到了`uni`对象上，这意味着您可以在外部的`js`文件中，通过`uni.$u.xxx`的形式去调用uView提供的一些工具方法，而不再像从前一样必须在`*.vue`中通过`this.$u.xxx`的形式调用。

<br>