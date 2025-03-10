import { defineConfig } from 'vite'
// #ifdef H5
import viteCompression from 'vite-plugin-compression'
// #endif

import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig(async () => {
  // unocss 不支持commonjs规范
  const UnoCSS = await import('unocss/vite').then((i) => i.default)
  return {
    base: './',
    plugins: [
      uni(),
      // #ifdef H5
      viteCompression(),
      // #endif
      UnoCSS()
    ],
    optimizeDeps: {
      include: ['dayjs']
    },
    server: {
      port: 17010,
      fs: {
        // Allow serving files from one level up to the project root
        allow: ['..']
      }
    },
    build: {
      //   关闭生成map文件 可以达到缩小打包体积
      sourcemap: false // 这个生产环境一定要关闭，不然打包的产物会很大
    }
  }
})
