import { OAuthLogin20POST } from '@/api/user-oAuth/OAuth'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { encryptedData } from '@/util'

export type UserState = {
  // 用户的信息
  userInfo: UserApi.LoginOutput | null
}

export const useUserStore = defineStore(
  `su-user`,
  () => {
    const state = reactive<UserState>({
      userInfo: null
    })

    /** 登录 */
    async function login(params: UserApi.LoginInput) {
      const password = encryptedData(params.password)
      const { data } = await OAuthLogin20POST({ ...params, password })
      state.userInfo = data
    }

    /** 退出登录 */
    function logout() {
      uni.removeStorageSync('Authorization')
      uni.removeStorageSync('x-Authorization')
    }

    return {
      state,
      login,
      logout
    }
  },
  {
    persist: {
      storage: {
        // 修改存储方式
        getItem: uni.getStorageSync,
        setItem: uni.setStorageSync
      },
      key: `su-user` // 本地存储key值
    }
  }
)
