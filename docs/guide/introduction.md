#  介绍

`suni`组件库基于`vue3`+`Typescript`构建，参照`wot design`的设计规范进行开发，提供70+高质量组件，支持暗黑模式、国际化和自定义主题，旨在给开发者提供统一的UI交互，同时提高研发的开发效率。

## 快速上手

请查看[快速上手](/guide/quick-use.html)文档。

## 扫码体验

<div style="display:flex;gap:24px">
<div style="display: inline-block;">
  <img style="width: 150px; height: 150px;" :src="WxQrcode" />
  <div style="text-align: center;">微信扫码</div>
</div>

<div style="display: inline-block;">
  <img style="width: 150px; height: 150px;" :src="AlipayQrcode" />
  <div style="text-align: center;">支付宝扫码</div>
</div>

<div style="display: inline-block;">
  <img style="width: 150px; height: 150px;" :src="H5Qrcode" />
  <div style="text-align: center;">浏览器扫码</div>
</div>

<div style="display: inline-block;">
  <img style="width: 150px; height: 150px;" :src="AndroidQrcode" />
  <div style="text-align: center;">浏览器扫码</div>
</div>
</div>

## ✨ 特性

- 🎯 多平台覆盖，支持 微信小程序、支付宝小程序、钉钉小程序、H5、APP 等.
- 🚀 70+ 个高质量组件，覆盖移动端主流场景.
- 💪 使用 Typescript 构建，提供良好的组件类型系统.
- 🌍 支持国际化，内置 6 种语言包.
- 📖 提供丰富的文档和组件示例.
- 🎨 支持修改 CSS 变量实现主题定制.
- 🍭 支持暗黑模式


## 链接

* [更新日志](/guide/changelog)
* [常见问题](/guide/common-problems)



## 鸣谢

- [wot-design](https://github.com/jd-ftf/wot-design-mini) - 感谢 wot-design 团队多年来的不断维护，让 suni 能够站在巨人的肩膀上。
- [uni-helper](https://github.com/uni-helper) - 感谢 uni-helper 团队提供的 uni-app 工具库，让 suni 能够更方便地使用。



## 开源协议

本项目基于 [MIT](https://zh.wikipedia.org/wiki/MIT%E8%A8%B1%E5%8F%AF%E8%AD%89) 协议，请自由地享受和参与开源。

<script>
import WxQrcode from '/wx.jpg'
import AlipayQrcode from '/alipay.png'
import H5Qrcode from '/h5.png'
import AndroidQrcode from '/android.png'


export default {
  data () {
    return {
      WxQrcode,
      AlipayQrcode,
      H5Qrcode,
      AndroidQrcode
    }
  }
}
</script>