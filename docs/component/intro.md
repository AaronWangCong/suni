
# 介绍

<demo-model url="/"></demo-model>

<div class="intro-logo">
	<img class="logo" src="/sun-design.png" alt="uView" />
	<h3>sun-uni</h3>
	<p class="slogan">一个基于Vue3+TS开发的uni-app组件库，提供70+高质量组件，支持暗黑模式、国际化和自定义主题。</p>
</div>


## `sun-uni` 与 `uview-plus 3.3.X` 功能上有什么区别？

* 1、最大的亮点：重构之前vue2.x版本的uview-plus，使用vue3.0+ts重构，支持H5、APP、小程序，并且支持暗黑模式、国际化、自定义主题等。
* 2、以 `uni_modules` 模块形式发布，方便一键更新（同时组件会自动按需加载，无需手动写 `easycom` 规则（注意，你需要把之前写的 `easycom` 规则删除，在项目根目录的 `pages.json` 中删除）
* 3、Vue3.0中， uniapp 的 Vue3 版本在H5 APP（非nvue）微信小程序 中兼容性尚可，其他小程序目前还不行。

> 组件属性没有更改，文档直接看 `uview-ui 1.0` 文档即可。 [uview-ui 1.0文档](https://uview-plus.jiangruyi.com/components/changelog.html)

___目前大的问题没有了，作者自己的项目也是用此组件库开发，因此你无需担心后期无人维护。___

如果你了解了以上须知，那么请继续阅读安装。