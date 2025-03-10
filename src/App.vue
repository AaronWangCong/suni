<script>
import { http } from '@/uni_modules/sun-uni'
export default {
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: async function () {
    console.log('App Show')
    // let res = await http.get('/')
    // console.log(res)
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style lang="scss">
/*每个页面公共css */
// @import "sun-uni/index.scss";
@import '@/uni_modules/sun-uni/index.scss';
@import 'common/demo.scss';
</style>
