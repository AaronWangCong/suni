# 安装

> 插件市场地址： [点击前往](https://ext.dcloud.net.cn/plugin?name=sun-uni)

## 安装教程之Vue3.0

友情提示：

1. 不建议把老项目 升级到 Vue3.0 (升级非常麻烦，建议新项目才考虑是否使用Vue3.0)
2. 支持：H5、App(vue)、微信小程序（其他小程序未测试）

**正式安装的前置操作**

uview赖SCSS，您必须要安装此插件，否则无法正常运行。

如果您的项目是由HBuilder X创建的，请在HX菜单的 工具->插件安装中找到 "dart-sass编译" 和 "scss/sass编译" 插件进行安装，安装完后重启下HBX

如果您的项目是由vue-cli创建的，请通过以下命令安装对sass(scss)的支持，如果已安装，请略过。

安装sass（2个都要装）

```
npm i sass -D
```

安装sass-loader（2个都要装）

```
npm i sass-loader -D
```

**正式安装**

* 1、修改 `manifest.json` 内的 `vue` 版本为 `vue3`（如果已经是vue3则无视此步骤）

```js
"vueVersion": "3"
```

* 2、项目根目录新增 `index.html` 文件，文件代码为
```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="static/logo.svg" />
    <script>
      const coverSupport =
        "CSS" in window &&
        typeof CSS.supports === "function" &&
        (CSS.supports("top: env(a)") || CSS.supports("top: constant(a)"));
      document.write(
        `<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0${
          coverSupport ? ", viewport-fit=cover" : ""
        }" />`,
      );
    </script>
    <title></title>
    <!--preload-links-->
    <!--app-context-->
  </head>
  <body>
    <div id="app"><!--app-html--></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>

```

* 3、main.ts 引入 sun-uni

```ts
// 引入 uView UI
import uView from './uni_modules/sun-uni';

import { createSSRApp } from 'vue'

export function createApp() {
  const app  = createSSRApp(App)

  // 使用 uView UI
  app.use(uView)

  return { app }
}

```

* 4、App.vue 引入基础样式（注意style标签需声明scss属性支持）

```html
<style lang="scss">
	@import "./uni_modules/sun-uni/index.scss";
</style>
```

* 5、uni.scss 引入全局 scss 变量文件

```css
@import "@/uni_modules/sun-uni/theme.scss";
```

## 通过npm方式安装（不建议）

* 1、在项目根目录执行命令 `npm i sun-uni`

* 2、将上面的安装步骤中的 `./uni_modules/` 字符串去除即可

* 3、在 `pages.json` 文件中写入 `easycom` 规则（插件市场导入方式无需写此规则）

```js
"easycom": {
	"autoscan": true,
	"custom": {
		"^u-(.*)": "sun-uni/component/u-$1/u-$1.vue"
	}
},
```
4、如果是使用ts写的话，在src下创建一个.d.ts的文件，里面写入

```js
declare module 'sun-uni';
```

## 卸载 `sun-uni` 的步骤

* 1、main.ts 删除sun-uni

```ts
import uView from './uni_modules/sun-uni';
Vue.use(uView);
```

* 2、App.vue 删除基础样式

```html
<style lang="scss">
	@import "./uni_modules/sun-uni/index.scss";
</style>
```

* 3、uni.scss 删除全局 scss 变量文件

```css
@import "@/uni_modules/sun-uni/theme.scss";
```

* 4、删除 uni_modules/sun-uni 整个目录

