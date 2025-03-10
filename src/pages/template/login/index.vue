<script setup lang="ts">
import { useUserStore } from '@/store/user'
import { onMounted, reactive, ref, unref } from 'vue'

type RuleItem = {
  required?: boolean
  message?: string
  trigger?: 'blur' | 'change'
  min?: number
  max?: number
}

const { login } = useUserStore()
const path = ref('')

const formRef = ref()
const formModel = reactive<{
  data: UserApi.LoginInput
  rules: {
    account: RuleItem[]
    password: RuleItem[]
  }
}>({
  data: {
    account: '',
    password: ''
  },
  rules: {
    account: [{ required: true, message: '用户名不能为空', trigger: 'change' }],
    password: [
      { required: true, message: '密码不能为空', trigger: 'change' },
      { min: 6, message: '密码不能少于6位', trigger: 'change' }
    ]
  }
})

async function onLogin() {
  await unref(formRef).validate()
  await login(formModel.data)
  uni.switchTab({
    url: '/'
  })
}

onMounted(() => {
  unref(formRef) && unref(formRef).setRules(formModel.rules)
})
</script>

<template>
  <view class="h-full">
    <view class="h-full flex items-center justify-center px-5">
      <view class="h-300px w-full">
        <view class="mb-4 text-28px font-bold">欢迎！！！！</view>
        <su-form ref="formRef" label-position="top" label-width="100px" :model="formModel.data" :rules="formModel.rules">
          <su-form-item label="用户名" prop="account" required>
            <su-input v-model="formModel.data.account" placeholder="请输入用户名" />
          </su-form-item>
          <su-form-item label="密码" prop="password" required>
            <su-input v-model="formModel.data.password" type="password" placeholder="请输入密码" />
          </su-form-item>
        </su-form>
        <su-gap size="30" />
        <su-button type="primary" @click="onLogin">登录</su-button>
      </view>
    </view>
  </view>
</template>
