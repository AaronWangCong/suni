<script lang="ts" setup>
const list = [
	{
		name: '关注'
	},
	{
		name: '推荐'
	},
]

function click(i) {
	console.log(i)
}
</script>

<template>
	<view class="su-page">
		<view class="su-demo-block">
			<text class="su-demo-block__title">基础演示</text>
			<view class="su-demo-block__content">
				<up-tabs :list="list" @click="click" :current="0"></up-tabs>
			</view>
		</view>
	</view>
</template>

<style lang="scss" scoped></style>
