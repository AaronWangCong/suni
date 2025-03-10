import { defineMixin } from '../vue'
import { queryParams } from '../function'

export const mpShare = defineMixin({
  data() {
    return {
      mpShare: {
        title: '', // 默认为小程序名称
        path: '', // 默认为当前页面路径
        imageUrl: '' // 默认为当前页面的截图
      }
    }
  },
  async onLoad(options: any) {
    const pages = getCurrentPages()
    const page = pages[pages.length - 1]
    this.mpShare.path = page.route + queryParams(options)
  },
  onShareAppMessage(res: any) {
    if (res.from === 'button') {
      // 来自页面内分享按钮
      console.log(res.target)
    }
    return this.mpShare
  }
})

export default mpShare
