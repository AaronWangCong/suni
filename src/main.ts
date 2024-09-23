import { createSSRApp } from 'vue'
import App from './App.vue'
// #ifdef H5
import '@vant/touch-emulator'
// #endif

export function createApp() {
  const app = createSSRApp(App)
  // app.config.warnHandler = () => null
  return {
    app
  }
}
