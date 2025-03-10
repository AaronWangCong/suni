<script setup lang="ts">
import { useSuForm, useSuWeexForm, type SuUseFormSchema } from '@/uni_modules/sun-uni/components/su-use-form'
import type { SuUni } from '@/uni_modules/sun-uni/types/uni'
import { ref, unref } from 'vue'

const formRef = ref()

const schemas: SuUseFormSchema[] = [
	{
		field: 'input1',
		component: 'SuFormInput',
		// 对应组件的参数
		componentProps: {},
		dependencies: {
			rules: {
				required: true,
				message: '请输入'
			}
		},
		// 界面显示的label
		label: '字段字段字段'
	},
	{
		field: 'Radio',
		component: 'SuFormRadio',
		// 对应组件的参数
		componentProps: {
			options: [
				{
					value: '1',
					label: '江'
				},
				{
					value: '2',
					label: '湖'
				}
			]
		},
		dependencies: {
			rules: {
				required: true,
				message: '选择'
			}
		},
		// 界面显示的label
		label: '单选框'
	},
	{
		field: 'Checkbox',
		component: 'SuFormCheckbox',
		// 对应组件的参数
		componentProps: {
			options: [
				{
					value: '1',
					label: '江'
				},
				{
					value: '2',
					label: '湖'
				}
			]
		},
		dependencies: {
			rules: {
				required: true,
				type: 'array',
				message: '选择'
			}
		},
		// 界面显示的label
		label: '复选框'
	},
	{
		field: 'input2',
		component: 'SuFormSelect',
		// 对应组件的参数
		componentProps: {
			placeholder: '请输入'
		},
		popupProps: {
			mode: 'mutil-column-auto',
			list: [
				{
					value: '1',
					label: '江',
					children: [
						{
							value: '1',
							label: '江'
						},
						{
							value: '2',
							label: '湖'
						}
					]
				},
				{
					value: '2',
					label: '湖',
					children: [
						{
							value: '2',
							label: '湖'
						},
						{
							value: '1',
							label: '江'
						}
					]
				}
			]
		},
		dependencies: {
			rules: {
				required: true,
				type: 'array',
				message: '请选择'
			}
		},
		// 界面显示的label
		label: '字段2',
		colProps: {
			span: 6
		}
	},
	{
		field: 'input3',
		component: 'SuFormInput',
		// 对应组件的参数
		componentProps: {
			placeholder: '请输入'
		},
		dependencies: {
			required: true
		},
		// 界面显示的label
		label: '字段3',
		colProps: {
			span: 6
		}
	},
	{
		field: 'input4',
		component: 'SuFormInput',
		// 对应组件的参数
		componentProps: {
			placeholder: '请输入'
		},
		dependencies: {
			required: true
		},
		// 界面显示的label
		label: '字段4'
	}
]

const [BaseForm, baseFormApi] = useSuForm({
	schemas,
	commonConfig: {
		autoSetPlaceHolder: true
	},
	showDefaultActions: true,
	showCollapseButton: true,
	collapsedRows: 2,
	handleSubmit: () => {
		baseFormApi.validate()
	}
})

const baseWeexFormApi = useSuWeexForm({
	schemas,
	commonConfig: {
		autoSetPlaceHolder: true
	},
	showDefaultActions: true,
	showCollapseButton: true,
	collapsedRows: 2,
	handleSubmit: () => {
		baseWeexFormApi.validate()
	}
})

function handleSubmit(values: SuUni.Recordable) {
	// const [_, formApi] = injectFormProps()
	console.log(values, 'values')
	console.log(formRef, 'formRef')
	// formApi.validate()
	unref(formRef).validate()
}

function handleReset() {
	console.log('handleReset---handleReset')
}
</script>

<template>
	<view style="padding: 0 12px">
		<su-use-form
			ref="formRef"
			:schemas="schemas"
			:commonConfig="{
				autoSetPlaceHolder: true
			}"
			showDefaultActions
			showCollapseButton
			:collapsedRows="2"
			@submit="handleSubmit"
			@reset="handleReset"
		></su-use-form>
		<!-- #ifdef H5 -->
		<!-- <su-divider text="BaseForm"></su-divider>
    <BaseForm /> -->
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<!-- <su-divider text="BaseWeexForm"></su-divider>
    <su-use-form :formApi="baseWeexFormApi" /> -->
		<!-- #endif -->
	</view>
</template>
