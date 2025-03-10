<script lang="ts" setup>
import { onMounted, reactive, ref, unref } from 'vue'

const formModel = reactive({
  data: {
    name: ''
  },
  rules: {
    name: [
      {
        required: true,
        message: '请输入姓名',
        trigger: ['change'],
      }
    ]
  }
})

const formRef = ref()

onMounted(() => {
  unref(formRef) && unref(formRef).setRules(formModel.rules)
})
</script>

<template>
  <view class="p-3">
    <view class="su-demo-block">
      <text class="su-demo-block__title">基础演示</text>
      <view class="su-demo-block__content">
        <su-cell-input label="姓名"></su-cell-input>
      </view>
    </view>
    <view class="su-demo-block">
      <text class="su-demo-block__title">自动聚焦</text>
      <view class="su-demo-block__content">
        <su-cell-input label="姓名" focus></su-cell-input>
      </view>
    </view>
    <view class="su-demo-block">
      <text class="su-demo-block__title">禁用</text>
      <view class="su-demo-block__content">
        <su-cell-input label="姓名" disabled></su-cell-input>
      </view>
    </view>
    <view class="su-demo-block">
      <text class="su-demo-block__title">必填输入框</text>
      <view class="su-demo-block__content">
        <su-cell-input label="姓名" isRequest></su-cell-input>
      </view>
    </view>
    <view class="su-demo-block">
      <text class="su-demo-block__title">验证为错误边框变红</text>
      <view class="su-demo-block__content">
        <su-cell-input label="姓名" isError></su-cell-input>
      </view>
    </view>
    <view class="su-demo-block">
      <text class="su-demo-block__title">textarea 使用于备注</text>
      <view class="su-demo-block__content">
        <su-cell-input label="备注" type="textarea"></su-cell-input>
      </view>
    </view>
    <view class="su-demo-block">
      <text class="su-demo-block__title">自定义右边内容</text>
      <view class="su-demo-block__content">
        <su-cell-input label="备注" type="textarea" isCustom>
          <view class="text-sm text-gray-500">自定义内容</view>
        </su-cell-input>
      </view>
    </view>
    <view class="su-demo-block">
      <text class="su-demo-block__title">form 用法</text>
      <view class="su-demo-block__content">
        <!-- <su-cell-input label="备注" type="textarea" isCustom>
          <view class="text-sm text-gray-500">自定义内容</view>
        </su-cell-input> -->
        <su-form :model="formModel.data" :rules="formModel.rules" ref="formRef" class="w-full">
          <su-form-item label="" prop="name"  label-width="0">
            <su-cell-input label="姓名" v-model="formModel.data.name" class="w-full" isRequest></su-cell-input>
          </su-form-item>
        </su-form>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped></style>
