import { defineMixin } from '../vue'

export const openType = defineMixin({
  props: {
    openType: String
  },
  methods: {
    onGetUserInfo(event: { detail: any }) {
      this.$emit('getuserinfo', event.detail)
    },
    onContact(event: { detail: any }) {
      this.$emit('contact', event.detail)
    },
    onGetPhoneNumber(event: { detail: any }) {
      this.$emit('getphonenumber', event.detail)
    },
    onError(event: { detail: any }) {
      this.$emit('error', event.detail)
    },
    onLaunchApp(event: { detail: any }) {
      this.$emit('launchapp', event.detail)
    },
    onOpenSetting(event: { detail: any }) {
      this.$emit('opensetting', event.detail)
    }
  }
})
