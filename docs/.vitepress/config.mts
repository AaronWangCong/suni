import { defineConfig } from 'vitepress'
import viteCompression from 'vite-plugin-compression'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  vite: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz'
      })
    ],
    ssr: { noExternal: ['element-plus'] }
    // build: {
    //   terserOptions: {
    //     compress: {
    //       //生产环境时移除console
    //       drop_console: true,
    //       drop_debugger: true
    //     }
    //   },
    //   //   关闭文件计算
    //   reportCompressedSize: false,
    //   //   关闭生成map文件 可以达到缩小打包体积
    //   sourcemap: false // 这个生产环境一定要关闭，不然打包的产物会很大
    // }
  },
  title: `Sun uni`,
  description: '一个参照wot-design打造的uni-app组件库',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    [
      'script',
      {},
      `
      !function(p){"use strict";!function(t){var s=window,e=document,i=p,c="".concat("https:"===e.location.protocol?"https://":"http://","sdk.51.la/js-sdk-pro.min.js"),n=e.createElement("script"),r=e.getElementsByTagName("script")[0];n.type="text/javascript",n.setAttribute("charset","UTF-8"),n.async=!0,n.src=c,n.id="LA_COLLECT",i.d=n;var o=function(){s.LA.ids.push(i)};s.LA?s.LA.ids&&o():(s.LA=p,s.LA.ids=[],o()),r.parentNode.insertBefore(n,r)}()}({id:"3J4q4tM6fN0n1fbZ",ck:"3J4q4tM6fN0n1fbZ"});
   `
    ]
  ],
  themeConfig: {
    logo: '/sun-design.png',
    editLink: {
      pattern: 'https://gotofreight.feishu.cn/share/base/form/shrcnQv0DLCfRs6gAkYZCH1B7Xd',
      text: '为此页提供修改建议'
    },
    socialLinks: [
      // { icon: 'github', link: 'https://github.com/AaronWangCong/suni' },
      {
        icon: 'github',
        link: 'https://github.com/AaronWangCong/suni.git'
      },
      {
        icon: 'npm',
        link: 'https://npm.shijizhongyun.com/-/web/detail/sun-uni'
      }
      // {
      //   icon: {
      //     svg: '<svg t="1692699544299" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4184" width="200" height="200"><path d="M512 1024C230.4 1024 0 793.6 0 512S230.4 0 512 0s512 230.4 512 512-230.4 512-512 512z m259.2-569.6H480c-12.8 0-25.6 12.8-25.6 25.6v64c0 12.8 12.8 25.6 25.6 25.6h176c12.8 0 25.6 12.8 25.6 25.6v12.8c0 41.6-35.2 76.8-76.8 76.8h-240c-12.8 0-25.6-12.8-25.6-25.6V416c0-41.6 35.2-76.8 76.8-76.8h355.2c12.8 0 25.6-12.8 25.6-25.6v-64c0-12.8-12.8-25.6-25.6-25.6H416c-105.6 0-188.8 86.4-188.8 188.8V768c0 12.8 12.8 25.6 25.6 25.6h374.4c92.8 0 169.6-76.8 169.6-169.6v-144c0-12.8-12.8-25.6-25.6-25.6z" fill="#6D6D72" p-id="4185"></path></svg>'
      //   },
      //   link: 'https://git.shijizhongyun.com/Front/sun-uni.git',
      //   ariaLabel: 'Gitee'
      // },
    ],
    search: {
      provider: 'local',
      // options: {
      //   appId: '4UD17U5YO7',
      //   apiKey: 'c4d57b592d7cb4424891f4c8e2dbb3cd',
      //   indexName: 'suni-design-uni2',
      // },
      options: {
        _render(src, env, md) {
          const html = md.render(src, env)
          if (env.frontmatter?.title) return md.render(`# ${env.frontmatter.title}`) + html
          return html
        }
      }
    },

    footer: {
      message: `Released under the MIT License.`,
      copyright: 'Copyright © 2024-present 世纪众云'
    },
    nav: [
      {
        text: '指南',
        link: '/guide/demo'
      },
      {
        text: '组件',
        link: '/component/intro'
      },
      {
        text: 'hooks',
        link: '/hooks/intro'
      }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '效果演示',
          link: '/guide/demo'
        },
        {
          text: '扩展自定义图标库',
          link: '/guide/customIcon'
        },
        {
          text: '自定义主题',
          link: '/guide/theme'
        },
        {
          text: '多语言切换',
          link: '/guide/i18n'
        },
        {
          text: '全局变量的实现',
          link: '/guide/globalVariable'
        },
        {
          text: 'HBuilder X代码提示',
          link: '/guide/codeHint'
        },
        {
          text: '设计理念',
          link: '/guide/design'
        },
        {
          text: '注意事项',
          link: '/guide/note'
        },
        {
          text: '更新日志',
          link: '/guide/changelog'
        }
      ],

      '/component/': [
        {
          text: '起步',
          items: [
            {
              link: '/component/intro',
              text: '介绍'
            },
            {
              link: '/component/install',
              text: '安装'
            },
            {
              link: '/component/quickstart',
              text: '快速上手'
            },
            {
              link: '/component/common',
              text: '内置样式'
            },
            {
              link: '/component/type',
              text: '内置类型'
            },
            {
              link: '/component/feature',
              text: '注意事项'
            },
            // {
            //   link: '/component/nvue',
            //   text: 'Nvue排错指南'
            // },
            {
              link: '/component/changelog',
              text: '更新日志'
            }
          ]
        },
        {
          text: '组件',
          items: [
            {
              text: '基础组件',
              items: [
                {
                  text: 'Color 色彩',
                  link: '/component/color'
                },
                {
                  text: 'Icon 图标',
                  link: '/component/icon'
                },
                {
                  text: 'Image 图片',
                  link: '/component/image'
                },
                {
                  text: 'imagePreview 图片预览',
                  link: '/component/imagePreview'
                },
                {
                  text: 'Button 按钮',
                  link: '/component/button'
                },
                {
                  text: 'Layout 布局',
                  link: '/component/layout'
                },
                {
                  text: 'Cell 单元格',
                  link: '/component/cell'
                },
                {
                  text: 'Badge 徽标数',
                  link: '/component/badge'
                },
                {
                  text: 'Tag 标签',
                  link: '/component/tag'
                },
                {
                  text: 'LoadingIcon 加载动画',
                  link: '/component/loadingIcon'
                },
                {
                  text: 'LoadingPage 加载页',
                  link: '/component/loadingPage'
                },
              ]
            },
            {
              text: '表单组件',
              items: [
                {
                  text: 'Input 输入框',
                  link: '/component/input'
                },

                {
                  text: 'Cell Input 输入框',
                  link: '/component/cell-input'
                },
                {
                  text: 'Form 表单',
                  link: '/component/form'
                },
                {
                  text: 'useForm 表单',
                  link: '/component/useForm'
                },
                {
                  text: 'Calendar 日历',
                  link: '/component/calendar'
                },
                {
                  text: 'Select 列选择器',
                  link: '/component/select'
                },
                {
                  text: 'Keyboard 键盘',
                  link: '/component/keyboard'
                },
                {
                  text: 'Picker 选择器',
                  link: '/component/picker'
                },
                {
                  text: 'datetimePicker 日期选择',
                  link: '/component/datetimePicker'
                },
                {
                  text: 'Rate 评分',
                  link: '/component/rate'
                },
                {
                  text: 'Search 搜索',
                  link: '/component/search'
                },
                {
                  text: 'NumberBox 步进器',
                  link: '/component/numberBox'
                },
                {
                  text: 'Upload 上传',
                  link: '/component/upload'
                },
                {
                  text: 'Code 验证码倒计时',
                  link: '/component/code'
                },
                // {
                //   text: 'Field 输入框',
                //   link: '/component/field'
                // },
                {
                  text: 'Checkbox 复选框',
                  link: '/component/checkbox'
                },
                {
                  text: 'Radio 单选框',
                  link: '/component/radio'
                },
                {
                  text: 'Switch 开关选择器',
                  link: '/component/switch'
                },
                {
                  text: 'Slider 滑动选择器',
                  link: '/component/slider'
                }
              ]
            },
            {
              text: '数据组件',
              items: [
                // {
                //   text: 'CircleProgress 圆形进度条',
                //   link: '/component/circleProgress'
                // },
                {
                  text: 'LineProgress 线形进度条',
                  link: '/component/lineProgress'
                },
                // {
                //   text: 'Table 表格',
                //   link: '/component/table'
                // },
                {
                  text: 'List 列表',
                  link: '/component/list',
                },
                {
                  text: 'ApiList 列表',
                  link: '/component/apiList'
                },
                {
                  text: 'CountDown 倒计时',
                  link: '/component/countDown'
                },
                {
                  text: 'CountTo 数字滚动',
                  link: '/component/countTo'
                }
              ]
            },
            {
              text: '反馈组件',
              items: [
                {
                  text: 'Tooltip 长按提示',
                  link: '/component/tooltip'
                },
                {
                  text: 'ActionSheet 操作菜单',
                  link: '/component/actionSheet'
                },
                {
                  text: 'Alert 警告提示',
                  link: '/component/alert'
                },
                {
                  text: 'Toast 消息提示',
                  link: '/component/toast'
                },
                {
                  text: 'NoticeBar 滚动通知',
                  link: '/component/noticeBar'
                },
                {
                  text: 'Collapse 折叠面板',
                  link: '/component/collapse'
                },
                {
                  text: 'Popup 弹出层',
                  link: '/component/popup'
                },
                {
                  text: 'Drawer 弹窗',
                  link: '/component/drawer'
                },
                {
                  text: 'SwipeAction 滑动操作',
                  link: '/component/swipeAction'
                },
                {
                  text: 'Modal 模态框',
                  link: '/component/modal'
                },
                {
                  text: 'Copy 复制',
                  link: '/component/copy'
                }
                // {
                //   text: 'fullScreen 压窗屏',
                //   link: '/component/fullScreen'
                // }
              ]
            },
            {
              text: '布局组件',
              items: [
                {
                  text: 'ScrollList 横向滚动列表',
                  link: '/component/scrollList'
                },
                {
                  text: 'Line 线条',
                  link: '/component/line'
                },
                {
                  text: 'Card 卡片',
                  link: '/component/card'
                },
                {
                  text: 'Overlay 遮罩层',
                  link: '/component/overlay'
                },
                {
                  text: 'NoNetwork 无网络提示',
                  link: '/component/noNetwork'
                },
                {
                  text: 'Grid 宫格布局',
                  link: '/component/grid'
                },
                {
                  text: 'Swiper 轮播图',
                  link: '/component/swiper'
                },
                // {
                //   text: 'TimeLine 时间轴',
                //   link: '/component/timeLine'
                // },
                {
                  text: 'Skeleton 骨架屏',
                  link: '/component/skeleton'
                },
                {
                  text: 'Sticky 吸顶',
                  link: '/component/sticky'
                },
                {
                  text: 'Waterfall 瀑布流',
                  link: '/component/waterfall'
                },
                {
                  text: 'Box 盒子',
                  link: '/component/box'
                },
                {
                  text: 'Divider 分割线',
                  link: '/component/divider'
                }
              ]
            },
            {
              text: '导航组件',
              items: [
                {
                  text: 'Dropdown 下拉菜单',
                  link: '/component/dropdown'
                },
                {
                  text: 'Tabbar 底部导航栏',
                  link: '/component/tabbar'
                },
                {
                  text: 'BackTop 返回顶部',
                  link: '/component/backTop'
                },
                {
                  text: 'Navbar 自定义导航栏',
                  link: '/component/navbar'
                },
                {
                  text: 'NavbarMini 自定义导航栏',
                  link: '/component/navbarMini'
                },
                {
                  text: 'tabs 标签',
                  link: '/component/tabs'
                },
                // {
                //   text: 'tabsSwiper 全屏选项卡',
                //   link: '/component/tabsSwiper'
                // },
                {
                  text: 'Subsection 分段器',
                  link: '/component/subsection'
                },
                {
                  text: 'IndexList 索引列表',
                  link: '/component/indexList'
                },
                {
                  text: 'Steps 步骤条',
                  link: '/component/steps'
                },
                {
                  text: 'Empty 内容为空',
                  link: '/component/empty'
                },

                // {
                //   text: 'Section 查看更多',
                //   link: '/component/section'
                // }
              ]
            },
            {
              text: '其他组件',
              items: [
                {
                  text: 'Parse 富文本解析器',
                  link: '/component/parse'
                },
                {
                  text: 'CodeInput 验证码输入',
                  link: '/component/codeInput'
                },
                // {
                //   text: 'AvatarCropper 头像裁剪',
                //   link: '/component/avatarCropper'
                // },
                {
                  text: 'loadMore 加载更多',
                  link: '/component/loadMore'
                },
                {
                  text: 'ReadMore 展开阅读更多',
                  link: '/component/readMore'
                },
                {
                  text: 'LazyLoad 懒加载',
                  link: '/component/lazyLoad'
                },
                {
                  text: 'Gap 间隔槽',
                  link: '/component/gap'
                },
                {
                  text: 'Avatar 头像',
                  link: '/component/avatar'
                },
                {
                  text: 'Link 超链接',
                  link: '/component/link'
                },
                {
                  text: 'Transition 动画',
                  link: '/component/transition'
                },
                // {
                //   text: 'Loading 加载动画',
                //   link: '/component/loading'
                // },
                {
                  text: 'Mecroll 下拉刷新 上拉加载',
                  link: '/component/mescroll'
                },
                {
                  text: 'Album 相册',
                  link: '/component/album'
                },

              ]
            }
          ]
        }
      ],

      '/hooks/': [
        {
          link: '/hooks/intro',
          text: '介绍'
        },
        {
          text: '实用工具',
          items: [
            {
              link: '/hooks/useDesign',
              text: 'useDesign'
            },
            {
              link: '/hooks/useRequest',
              text: 'useRequest'
            },
            {
              link: '/hooks/useDebounceFn',
              text: 'useDebounceFn'
            },
            {
              link: '/hooks/useThrottleFn',
              text: 'useThrottleFn'
            }
          ]
        },
        {
          text: '组件',
          items: [
            {
              link: '/hooks/useMescroll',
              text: 'useMescroll'
            },
            {
              link: '/hooks/useToast',
              text: 'useToast'
            },
            {
              link: '/hooks/useModal',
              text: 'useModal'
            },
            {
              link: '/hooks/useDrawer',
              text: 'useDrawer'
            }
          ]
        }
      ]
    }
  }
})
