export async function logout() {
  const currents = getCurrentPages()
  const [page] = currents
  uni.clearStorage()
  uni.clearStorageSync()

  uni.reLaunch({
    url: '/pages/template/login/index',
    success() {
      uni.$emit('current-route', {
        currentRoute: page.route
      })
    }
  })
}
