## Color 色彩

<demo-model url="/pages/components/color/index"></demo-model>


uView经过大量调试和研究，得出一套专有的调色板，在各个组件内部，使用统一的配色，为您的产品带来统一又鲜明的视觉效果。

::: danger 注意
sun-uni为了更好编写css，使用了scss预处理器，使用之前，请确认您的Hbuilder X已经安装了scss预处理器，一般情况下，相信您已经安装了。如果没有安装，
请在 Hbuilder X->工具->插件安装 中找到找到"scss/sass编译"安装即可，安装完毕如果不生效，请重启Hbuilder X。
:::

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 主题色

`primary`，`success`，`error`，`warning`，`info`是uView的主题色，他们给人在视觉感受上分别对应于蓝色，绿色，红色，黄色，灰色。
而他们又有对应的`disabled`、`dark`和`light`状态，分别表示对应的禁止，加深和变浅的对应颜色。举例uView的`button`组件来说：
1. 设置`type`参数为`primary`时，按钮显示蓝色。
2. 按钮被按下时，使用的是`primary`的加深颜色，也即`dark`状态。
3. 按钮设置为镂空状态(`plain`为`true`)时，背景色为`primary`的变浅颜色，也即`light`状态。
4. 按钮处于禁止状态时，使用的是`primary`的稍浅颜色，也即`disabled`状态。

### 主色

蓝色作为sun-uni主色调，表示一种鲜明，积极的态度

<div class="color-box">
	<div class="color-item" style="background: #3c9cff; color:#fff;">
		Primary<br>
		#3c9cff
		<div class="color-sub">
			<div class="sub-item" style="background: #398ade; color:#fff;">
				Dark<br>
				#398ade
			</div>
			<div class="sub-item" style="background: #9acafc; color:#606266;">
				Disabled<br>
				#9acafc
			</div>
			<div class="sub-item" style="background: #ecf5ff; color:#606266;">
				Light<br>
				#ecf5ff
			</div>
		</div>
	</div>
</div>

我们在全局样式中，通过`scss`提供了对应的颜色变量名，方便您在任何可写css的地方，调用这些变量，如下：

```css
/* 变量的定义，该部分uView已全局引入，无需您编写 */
$su-primary: #3c9cff;
$su-primary-dark: #398ade;
$su-primary-disabled: #9acafc;
$su-primary-light: #ecf5ff;


/* 在您编写css的地方使用这些变量 */
.title {
	color: $su-primary;
	......
}
```


### 辅助色

除了主色外的场景色，需要在不同的场景中使用，如绿色代表成功，红色代表错误，黄色代表警示。

<div class="color-box">
	<div class="color-item" style="background: #f56c6c; color:#fff;">
		Error<br>
		#f56c6c
		<div class="color-sub">
			<div class="sub-item" style="background: #e45656; color:#fff;">
				Dark<br>
				#e45656
			</div>
			<div class="sub-item" style="background: #f7b2b2; color:#606266;">
				Disabled<br>
				#f7b2b2
			</div>
			<div class="sub-item" style="background: #fef0f0; color:#606266;">
				Light<br>
				#fef0f0
			</div>
		</div>
	</div>
	<div class="color-item" style="background: #f9ae3d; color:#fff;">
		Warning<br>
		#f9ae3d
		<div class="color-sub">
			<div class="sub-item" style="background: #f1a532; color:#fff;">
				Dark<br>
				#f1a532
			</div>
			<div class="sub-item" style="background: #f9d39b; color:#606266;">
				Disabled<br>
				#f9d39b
			</div>
			<div class="sub-item" style="background: #fdf6ec; color:#606266;">
				Light<br>
				#fdf6ec
			</div>
		</div>
	</div>
	<div class="color-item" style="background: #5ac725; color:#fff;">
		Success<br>
		#5ac725
		<div class="color-sub">
			<div class="sub-item" style="background: #53c21d; color:#fff;">
				Dark<br>
				#53c21d
			</div>
			<div class="sub-item" style="background: #a9e08f; color:#606266;">
				Disabled<br>
				#a9e08f
			</div>
			<div class="sub-item" style="background: #f5fff0; color:#606266;">
				Light<br>
				#f5fff0
			</div>
		</div>
	</div>
	<div class="color-item" style="background: #909399; color:#fff;">
		Info<br>
		#909399
		<div class="color-sub">
			<div class="sub-item" style="background: #767a82; color:#fff;">
				Dark<br>
				#767a82
			</div>
			<div class="sub-item" style="background: #c4c6c9; color:#606266;">
				Disabled<br>
				#c4c6c9
			</div>
			<div class="sub-item" style="background: #f4f4f5; color:#606266;">
				Light<br>
				#f4f4f5
			</div>
		</div>
	</div>
</div>

我们在全局样式中，通过`scss`提供了对应的颜色变量名，方便您在任何可写css的地方，调用这些变量，如下：

```css
/* 变量的定义，该部分uView已全局引入，无需您编写 */

$su-warning: #f9ae3d;
$su-warning-dark: #f1a532;
$su-warning-disabled: #f9d39b;
$su-warning-light: #fdf6ec;

$su-success: #5ac725;
$su-success-dark: #53c21d;
$su-success-disabled: #a9e08f;
$su-success-light: #f5fff0;

$su-error: #f56c6c;
$su-error-dark: #e45656;
$su-error-disabled: #f7b2b2;
$su-error-light: #fef0f0;

$su-info: #909399;
$su-info-dark: #767a82;
$su-info-disabled: #c4c6c9;
$su-info-light: #f4f4f5;

/* 在您编写css的地方使用这些变量 */
.title {
	color: $su-info;
	......
}
```

### 文字颜色

sun-uni中，分别提炼了4种用于文字颜色，分别是：主要文字、常规文字、次要文字、占位文字颜色。

- 主要文字颜色一般用于内容的标题等，如新闻列表的标题
- 常规文字颜色一般用于内容的主体，如新闻列表的概要
- 次要文字颜色一般用于内容的提示部分，如新闻列表底部的时间，评论数量的提示文字
- 占位文字颜色属于更浅的灰色，看场景选择使用

<div class="color-box">
	<div class="color-item" style="background: #303133; color:#fff;">
		主要文字<br>
		#303133
		<div class="color-sub">
			<div class="sub-item" style="background: #606266; color:#fff;">
				常规文字<br>
				#606266
			</div>
			<div class="sub-item" style="background: #909193; color:#fff;">
				次要文字<br>
				#909193
			</div>
			<div class="sub-item" style="background: #c0c4cc; color:#303133;">
				占位文字<br>
				#c0c4cc
			</div>
		</div>
	</div>
</div>

```css
/* 变量的定义，该部分uView已全局引入，无需您编写 */
$su-main-color: #303133;
$su-content-color: #606266;
$su-tips-color: #909193;
$su-light-color: #c0c4cc;

/* 在您编写css的地方使用这些变量 */
.title {
	color: $su-main-color;
}
```


### 背景颜色

sun-uni中，定义了一个背景颜色，如下：

<div class="color-box">
	<div class="color-item" style="background: #f3f4f6; color:#909399;">
		背景颜色<br>
		#f3f4f6
	</div>
</div>

我们在全局样式中，通过`scss`提供了对应的颜色变量名，方便您在任何可写css的地方，调用这个变量，如下：

```css
/* 变量的定义，该部分uView已全局引入，无需您编写 */
$su-bg-color: #f3f4f6;

/* 在您编写css的地方使用这些变量 */
.title {
	color: $su-bg-color;
}
```


### 边框颜色

sun-uni自定义了一个边框的颜色，值为`#dadbde`，如果想使用，如下：

```css
/* 变量的定义，该部分uView已全局引入，无需您编写 */
$u-border-color: #dadbde;

/* 在您编写css的地方使用这个变量 */
.item {
	border: 1px solid $su-border-color;
}
```

<style scoped>
.color-box {
	display: flex;
	flex-wrap: wrap;
}

.color-item {
	box-sizing: border-box;
	text-align: left;
	padding: 20px 25px;
	border-radius: 5px;
	flex: 0 0 31.5%;
	position: relative;
	height: 130px;
	overflow: hidden;
	margin-right: 4%;
	margin-bottom: 35px;
	min-width: 300px;
}

.color-item:nth-child(3n) {

}

.color-sub {
	position: absolute;
	bottom: 0;
	width: 100%;
	left: 0;
	display: flex;
	height: 50px;
}

.sub-item {
	display: flex;
	flex: 1;
	align-items: center;
	justify-content: flex-start;
	padding: 0 10px;
	font-size: 13px;
}

.sub-item:first-child {
	border-radius: 0 0 0 5px;
}

.sub-item:last-child {
	border-radius: 0 0 5px 0;
}

</style>

