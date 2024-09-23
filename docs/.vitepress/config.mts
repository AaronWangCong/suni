
import { defineConfig } from 'vitepress';
import viteCompression from 'vite-plugin-compression'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


export default defineConfig({
  vite: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
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
  title: `Suni`,
  description: '一个参照wot-design打造的uni-app组件库',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['script', {}, `
      !function(p){"use strict";!function(t){var s=window,e=document,i=p,c="".concat("https:"===e.location.protocol?"https://":"http://","sdk.51.la/js-sdk-pro.min.js"),n=e.createElement("script"),r=e.getElementsByTagName("script")[0];n.type="text/javascript",n.setAttribute("charset","UTF-8"),n.async=!0,n.src=c,n.id="LA_COLLECT",i.d=n;var o=function(){s.LA.ids.push(i)};s.LA?s.LA.ids&&o():(s.LA=p,s.LA.ids=[],o()),r.parentNode.insertBefore(n,r)}()}({id:"3J4q4tM6fN0n1fbZ",ck:"3J4q4tM6fN0n1fbZ"});
   `]
  ],
  themeConfig: {
    logo: '/sun-design.png',
    lastUpdated: {
      text: '最后更新'
    },
    editLink: {
      pattern: 'https://github.com/AaronWangCong/suni/edit/master/docs/:path',
      text: '为此页提供修改建议',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/AaronWangCong/suni' },
      { icon: { svg: '<svg t="1692699544299" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4184" width="200" height="200"><path d="M512 1024C230.4 1024 0 793.6 0 512S230.4 0 512 0s512 230.4 512 512-230.4 512-512 512z m259.2-569.6H480c-12.8 0-25.6 12.8-25.6 25.6v64c0 12.8 12.8 25.6 25.6 25.6h176c12.8 0 25.6 12.8 25.6 25.6v12.8c0 41.6-35.2 76.8-76.8 76.8h-240c-12.8 0-25.6-12.8-25.6-25.6V416c0-41.6 35.2-76.8 76.8-76.8h355.2c12.8 0 25.6-12.8 25.6-25.6v-64c0-12.8-12.8-25.6-25.6-25.6H416c-105.6 0-188.8 86.4-188.8 188.8V768c0 12.8 12.8 25.6 25.6 25.6h374.4c92.8 0 169.6-76.8 169.6-169.6v-144c0-12.8-12.8-25.6-25.6-25.6z" fill="#6D6D72" p-id="4185"></path></svg>' }, link: "https://github.com/AaronWangCong/suni", ariaLabel: 'Gitee' },
      { icon: { svg: '<svg t="1694688365239" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4048" width="200" height="200"><path d="M980.79827 694.105946c-21.144216-122.796973-109.844757-203.250162-109.844757-203.250162 12.647784-111.477622-33.792-131.26573-33.792-131.26573C827.392 14.668108 530.985514 20.67373 524.730811 20.839784 518.476108 20.67373 222.01427 14.668108 212.300108 359.590054c0 0-46.467459 19.788108-33.819676 131.26573 0 0-88.700541 80.453189-109.817081 203.250162 0 0-11.291676 207.484541 101.403676 25.40627 0 0 25.350919 69.161514 71.790703 131.26573 0 0-83.082378 28.256865-75.997405 101.625081 0 0-2.87827 81.836973 177.401081 76.218811 0 0 126.699243-9.852541 164.753297-63.515676l16.605405 0 0.276757 0 16.633081 0c38.026378 53.635459 164.725622 63.515676 164.725622 63.515676 180.224 5.618162 177.401081-76.218811 177.401081-76.218811 7.029622-73.368216-75.997405-101.625081-75.997405-101.625081 46.439784-62.104216 71.790703-131.26573 71.790703-131.26573C992.034595 901.590486 980.79827 694.105946 980.79827 694.105946z" p-id="4049" fill="#6D6D72"></path></svg>' }, link: "/guide/join-group", ariaLabel: 'QQ' }
    ],
    search: {
      provider: 'algolia',
      options: {
        appId: '4UD17U5YO7',
        apiKey: 'c4d57b592d7cb4424891f4c8e2dbb3cd',
        indexName: 'suni-design-uni2',
      },
    },

    footer: {
      message: `Released under the MIT License.`,
      copyright: 'Copyright © 2024-present 世纪众云',
    },
    nav: [
      {
        text: '指南', activeMatch: '/guide/', items: [
          {
            text: '介绍',
            link: '/guide/introduction',
          },
          {
            text: '快速上手',
            link: '/guide/quick-use',
          },
          {
            text: '定制主题',
            link: '/guide/custom-theme',
          },
          {
            text: '常见问题',
            link: '/guide/common-problems',
          },
          {
            text: '国际化',
            link: '/guide/locale',
          }, {
            text: '更新日志',
            link: '/guide/changelog',
          }
        ]
      },
      {
        text: '组件', activeMatch: '/component/', items: [
          {
            text: '基础组件',
            link: "/component/button",
          },
          // {
          //   text: "导航组件",
          //   link: "/component/pagination"
          // }, {
          //   text: "数据输入",
          //   link: "/component/calendar",
          // }, {
          //   text: "反馈组件",
          //   link: "/component/action-sheet",
          // }, {
          //   text: "数据展示",
          //   link: "/component/badge",
          // }

        ]
      }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '介绍',
          link: '/guide/introduction',
        },
        {
          text: '快速上手',
          link: '/guide/quick-use',
        },
        {
          text: '定制主题',
          link: '/guide/custom-theme',
        },
        {
          text: '国际化',
          link: '/guide/locale',
        },
        // {
        //   text: '常见问题',
        //   link: '/guide/common-problems',
        // },
        {
          text: '更新日志',
          link: '/guide/changelog',
        }
      ],

      '/component/': [
        {
          text: '基础',
          collapsed: false,
          items: [
            {
              link: "/component/button",
              text: "Button 按钮"
            }, {
              link: "/component/icon",
              text: "Icon 图标"
            }, {
              link: "/component/config-provider",
              text: "ConfigProvider 全局配置"
            }, {
              link: "/component/popup",
              text: "Popup 弹出层"
            }
          ]
        }
      ]
    }

  },

})
