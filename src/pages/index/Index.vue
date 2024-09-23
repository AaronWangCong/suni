<template>
  <page-wraper>
    <view class="page">
      <view class="page__hd">
        <view class="page__title">
          <view class="logo"></view>
          <view class="inline">
            Suni
            <text class="version">@{{ packageConfig.version }}</text>
          </view>
        </view>
        <view class="page__desc">Suni 是一个基于Vue3+TS开发的uni-app组件库，提供70+高质量组件，支持暗黑模式、国际化和自定义主题。</view>
      </view>
      <view class="page__bd">
        <block v-for="(item, index) in list" :key="index">
          <view class="kind-list__item">
            <view :id="item.id" class="su-flex kind-list__item-hd" @click="kindToggle(item.id)">
              <view class="su-flex__item title">{{ item.name }}</view>
              <image class="kind-list__img" :src="item.icon"></image>
            </view>
            <view :class="['kind-list__item-bd', item.open ? 'kind-list__item-bd_show' : '']">
              <view :class="['su-cells', item.open ? 'su-cells_show' : '']">
                <su-cell
                  v-for="(page, j) in item.pages"
                  :key="j"
                  is-link
                  :label="page.name"
                  @click="handleClick(`/pages/${page.id}/Index`)"
                ></su-cell>
              </view>
            </view>
          </view>
        </block>
      </view>
    </view>
  </page-wraper>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import packageConfig from '../../../package.json'

const imgModules: any = import.meta.glob('../images/*.png', { eager: true })

const list = ref([
  {
    id: 'widget',
    name: '基础',
    open: false,
    icon: imgModules['../images/icon_nav_widget.png'].default,
    pages: [
      {
        id: 'button',
        name: 'Button 按钮'
      },
      {
        id: 'icon',
        name: 'Icon 图标'
      },
      {
        id: 'configProvider',
        name: 'ConfigProvider 全局配置'
      },
      {
        id: 'popup',
        name: 'Popup 弹出层'
      }
      // {
      //   id: 'resize',
      //   name: 'Resize 监听元素尺寸变化'
      // },
      // {
      //   id: 'transition',
      //   name: 'Transition 动画'
      // },
      // {
      //   id: 'fab',
      //   name: 'Fab 悬浮按钮'
      // },
      // {
      //   id: 'text',
      //   name: 'Text 文本'
      // }
    ]
  },
  {
    id: 'nav',
    name: '导航',
    open: false,
    icon: imgModules['../images/icon_nav_nav.png'].default,

    pages: [
      // {
      //   id: 'pagination',
      //   name: 'Pagination 分页'
      // },
      // {
      //   id: 'popover',
      //   name: 'Popover 气泡'
      // },
      // {
      //   id: 'tabs',
      //   name: 'Tabs 标签页'
      // },
      // {
      //   id: 'segmented',
      //   name: 'Segmented 分段器'
      // },
      // {
      //   id: 'tabbar',
      //   name: 'Tabbar 标签栏'
      // },
      // {
      //   id: 'navbar',
      //   name: 'Navbar 导航栏'
      // },
      // {
      //   id: 'sidebar',
      //   name: 'Sidebar 侧边栏'
      // },
      // {
      //   id: 'backtop',
      //   name: 'Backtop 回到顶部'
      // },
      // {
      //   id: 'indexBar',
      //   name: 'IndexBar 索引栏'
      // }
    ]
  },
  {
    id: 'form',
    name: '数据输入',
    open: false,
    icon: imgModules['../images/icon_nav_form.png'].default,
    pages: [
      // {
      //   id: 'calendar',
      //   name: 'Calendar 日历选择器'
      // },
      // {
      //   id: 'calendarView',
      //   name: 'CalendarView 日历面板'
      // },
      // {
      //   id: 'checkbox',
      //   name: 'Checkbox 复选框'
      // },
      // {
      //   id: 'colPicker',
      //   name: 'ColPicker 多列选择器'
      // },
      // {
      //   id: 'datetimePicker',
      //   name: 'DatetimePicker 时间选择器'
      // },
      // {
      //   id: 'datetimePickerView',
      //   name: 'DatetimePickerView 时间选择器视图'
      // },
      // {
      //   id: 'input',
      //   name: 'Input 输入框'
      // },
      // {
      //   id: 'textarea',
      //   name: 'Textarea 文本域'
      // },
      // {
      //   id: 'inputNumber',
      //   name: 'InputNumber 计数器'
      // },
      // {
      //   id: 'picker',
      //   name: 'Picker 选择器'
      // },
      // {
      //   id: 'pickerView',
      //   name: 'PickerView 选择器视图'
      // },
      // {
      //   id: 'radio',
      //   name: 'Radio 单选框'
      // },
      // {
      //   id: 'rate',
      //   name: 'Rate 评分'
      // },
      // {
      //   id: 'search',
      //   name: 'Search 搜索'
      // },
      // {
      //   id: 'selectPicker',
      //   name: 'SelectPicker 单复选选择器'
      // },
      // {
      //   id: 'slider',
      //   name: 'Slider 滑块'
      // },
      // {
      //   id: 'switch',
      //   name: 'Switch 开关'
      // },
      // {
      //   id: 'form',
      //   name: 'Form 表单'
      // },
      // {
      //   id: 'upload',
      //   name: 'Upload 上传'
      // },
      // {
      //   id: 'passwordInput',
      //   name: 'PasswordInput 密码输入框'
      // }
    ]
  },
  {
    id: 'feedback',
    name: '反馈',
    open: false,
    icon: imgModules['../images/icon_nav_feedback.png'].default,
    pages: [
      // {
      //   id: 'actionSheet',
      //   name: 'ActionSheet 上拉菜单'
      // },
      // {
      //   id: 'dropMenu',
      //   name: 'DropMenu 下拉菜单'
      // },
      // {
      //   id: 'loading',
      //   name: 'Loading 加载指示器'
      // },
      // {
      //   id: 'messageBox',
      //   name: 'MessageBox 弹框'
      // },
      // {
      //   id: 'overlay',
      //   name: 'Overlay 遮罩层'
      // },
      // {
      //   id: 'noticeBar',
      //   name: 'NoticeBar 通知栏'
      // },
      // {
      //   id: 'progress',
      //   name: 'Progress 进度条'
      // },
      // {
      //   id: 'circle',
      //   name: 'Circle 环形进度条'
      // },
      // {
      //   id: 'sortButton',
      //   name: 'SortButton 排序按钮'
      // },
      // {
      //   id: 'statusTip',
      //   name: 'StatusTip 缺省提示'
      // },
      // {
      //   id: 'swipeAction',
      //   name: 'SwipeAction 滑动操作'
      // },
      // {
      //   id: 'toast',
      //   name: 'Toast 轻提示'
      // },
      // {
      //   id: 'notify',
      //   name: 'Notify 消息通知'
      // },
      // {
      //   id: 'tooltip',
      //   name: 'Tooltip 文字提示'
      // },
      // {
      //   id: 'countDown',
      //   name: 'CountDown 倒计时'
      // },
      // {
      //   id: 'countTo',
      //   name: 'CountTo 数字滚动'
      // },
      // {
      //   id: 'numberKeyboard',
      //   name: 'NumberKeyboard 数字键盘'
      // }
    ]
  },
  {
    id: 'show',
    name: '数据展示',
    open: false,
    icon: imgModules['../images/icon_nav_show.png'].default,
    pages: [
      // {
      //   id: 'badge',
      //   name: 'Badge 徽标'
      // },
      // {
      //   id: 'card',
      //   name: 'Card 卡片'
      // },
      // {
      //   id: 'cell',
      //   name: 'Cell 单元格'
      // },
      // {
      //   id: 'collapse',
      //   name: 'Collapse 折叠面板'
      // },
      // {
      //   id: 'curtain',
      //   name: 'Curtain 幕帘'
      // },
      // {
      //   id: 'divider',
      //   name: 'Divider 分割线'
      // },
      // {
      //   id: 'gap',
      //   name: 'Gap 间隔槽'
      // },
      // {
      //   id: 'img',
      //   name: 'Img 图片'
      // },
      // {
      //   id: 'imgCropper',
      //   name: 'imgCropper 图片裁剪'
      // },
      // {
      //   id: 'grid',
      //   name: 'Grid 宫格'
      // },
      // {
      //   id: 'loadmore',
      //   name: 'Loadmore 加载更多'
      // },
      // {
      //   id: 'skeleton',
      //   name: 'Skeleton 骨架屏'
      // },
      // {
      //   id: 'steps',
      //   name: 'Steps 步骤条'
      // },
      // {
      //   id: 'sticky',
      //   name: 'Sticky 吸顶布局'
      // },
      // {
      //   id: 'tag',
      //   name: 'Tag 标签'
      // },
      // {
      //   id: 'watermark',
      //   name: 'Watermark 水印'
      // },
      // {
      //   id: 'swiper',
      //   name: 'Swiper 轮播图'
      // },
      // {
      //   id: 'table',
      //   name: 'Table 表格'
      // }
    ]
  }
])

function handleClick(url: string) {
  uni.navigateTo({
    url
  })
}

function kindToggle(id: string) {
  const listValue = list.value
  for (let i = 0, len = listValue.length; i < len; ++i) {
    if (listValue[i].id === id) {
      listValue[i].open = !listValue[i].open
      break
    }
  }
  list.value = listValue
}
</script>

<style lang="scss" scoped>
.su-theme-dark {
  .page__hd,
  .kind-list__item {
    background: $-dark-background2;
  }
  .title {
    color: $-dark-color;
  }
  :deep(.su-cell__label) {
    color: $-dark-color3 !important;
  }
  .kind-list__img {
    filter: invert(100%);
  }
}
.page__hd {
  padding: 40px 40px 30px;
  margin-bottom: 30px;
  background: #fff;
}
.page__title {
  text-align: left;
  font-size: 20px;
  font-weight: 400;
  color: #0083ff;
}
.page__desc {
  margin-top: 20px;
  color: #999;
  text-align: left;
  font-size: 12px;
}
.page__bd {
  padding: 0 15px 30px 20px;
  user-select: none;
}
.logo {
  display: inline-block;
  margin-right: 14px;
  width: 40px;
  height: 40px;
  background: url('data:image/png;base64,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')
    no-repeat;
  background-size: cover;
  vertical-align: middle;
}
.inline {
  display: inline-block;
  vertical-align: middle;
}
.version {
  font-size: 14px;
}

.su-cell_access {
  padding: 15px 20px;
}
.su-cell__ft {
  padding-right: 16px;
  position: relative;
}
.su-cells {
  position: relative;
  margin-top: 0;
  opacity: 0;
  transform: translateY(-50%);
  transition: 0.3s;
  :deep(.su-cell__label) {
    color: rgba(0, 0, 0, 0.65);
  }
}
.su-cells_show {
  opacity: 1;
  transform: translateY(0);
}

.kind-list__item {
  border-radius: 30px;
  background: #fff;
  overflow: hidden;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
}

.kind-list__img {
  width: 20px;
  height: 20px;
}

.kind-list__item-hd {
  padding: 15px 30px;
  transition: opacity 0.3s;
}

.kind-list__item-bd {
  height: 0;
  overflow: hidden;
}
.kind-list__item-bd_show {
  height: auto;
}

.su-flex {
  display: flex;
}
.su-flex__item {
  flex: 1;
}
.title {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
}
.page-name {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.65);
}

.su-tool-right-line-angle::after {
  content: ' ';
  display: inline-block;
  height: 8px;
  width: 8px;
  border-width: 2px 2px 0 0;
  border-color: #b2b2b2;
  border-style: solid;
  -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  position: relative;
  top: -2px;
  position: absolute;
  top: 50%;
  margin-top: -5px;
  right: 0;
}
</style>
