<template>
  <div class="demo-model">
    <div class="model-content">
      <iframe class="iframe" scrolling="auto" frameborder="0" :src="href" id="demo-modal"></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useData } from 'vitepress'
import { computed, onMounted, ref, watch } from 'vue'
const baseUrl = process.env.NODE_ENV === 'production' ? `${location.origin}/demo/?timestamp=${new Date().getTime()}#` : 'http://localhost:17010/#'

const props = withDefaults(
  defineProps<{
    url?: string
  }>(),
  {}
)
const route = useRoute()
const href = computed(() => {
  const path = route.path
  const paths = path ? path.split('.')[0].split('/') : []
  const urls = props.url ? props.url.split('/') : []
  let href = ''
  if (paths.length) {
    if (urls[urls.length - 1] === 'index') {
      urls[urls.length - 1] = `${paths[paths.length - 1]}`
    }
    href = baseUrl + (props.url?.includes('pages/components/') ? urls.join('/') : `${props.url}`)
  } else {
    href = baseUrl
  }
  console.log(href, 'href')
  return href
})
const iframe = ref<HTMLIFrameElement | null>(null)

const vitepressData = useData()

onMounted(() => {
  iframe.value &&
    iframe.value.addEventListener('load', () => {
      // 在iframe加载完成后执行发送消息的操作
      ssendMessage()
    })
})

watch(
  () => vitepressData.isDark.value,
  () => {
    ssendMessage()
  }
)

function ssendMessage() {
  if (iframe.value && iframe.value.contentWindow) {
    iframe.value.contentWindow.postMessage(vitepressData.isDark.value, href.value)
  }
}

// function kebabToCamel(input: string): string {
//   return input.replace(/-([a-z])/g, (match, group) => group.toUpperCase())
// }
</script>

<style scoped>
.demo-model {
  font-size: 16px;
  background-color: #fff;
  width: 330px;
  position: fixed;
  z-index: 10;
  margin: 0;
  /* top: calc(3.6em + 3px); */
  top: calc((100vh - 560px - 3.6rem) / 2 + 3.6rem);
  box-sizing: border-box;
  overflow-y: auto;
  /* background-image: url(/iPhone_model.png); */
  background-image: url(/iPhoneX_model.png);
  background-repeat: no-repeat;
  background-size: 100%;
  /* box-shadow: 0 4px 25px 0 rgba(4, 40, 60, 0.18); */
  border-radius: 30px;
  padding: 48px 23px 38px 16px;
  right: 20px;
}

.model-content {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-bottom-left-radius: 30px;
}

.iframe {
  height: 100%;
  width: 100%;
  border-radius: 30px;
}

@media screen and (min-width: 1200px) {
  .demo-model {
    width: 310px;
    height: calc(310px * 143.6 / 70.9);
  }

  .demo-model {
    top: calc((100vh - 310px * 143.6 / 70.9 - 3.6rem) / 2 + 3.6rem);
  }
}

@media (max-width: 1200px) {
  .demo-model {
    display: none;
  }
}

@media screen and (min-width: 1366px) {
  .demo-model {
    width: 270;
    height: calc(270px * 143.6 / 70.9);
    top: calc((100vh - 270px * 143.6 / 70.9 - 3.6rem) / 2 + 3.6rem);
  }
}

@media screen and (min-width: 1500px) {
  .demo-model {
    width: 340px;
    height: calc(340px * 143.6 / 70.9);
    top: calc((100vh - 340px * 143.6 / 70.9 - 3.6rem) / 2 + 3.6rem);
  }
}

@media screen and (min-width: 1920px) {
  .demo-model {
    width: 350px;
    height: calc(350px * 143.6 / 70.9);
    top: calc((100vh - 350px * 143.6 / 70.9 - 3.6rem) / 2 + 3.6rem);
  }
}
</style>
