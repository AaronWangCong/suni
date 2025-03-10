<script setup lang="ts">
import { ref } from 'vue'

const imageList = [
  'https://pic2.zhimg.com/80/v2-6bc06520079e780ac1c550729f5cfa8d_1440w.webp',
  'https://img.tukuppt.com/photo-big/00/02/23/6188eaff33ec07243.jpg',
  'https://img0.baidu.com/it/u=4231555811,1903718579&fm=253&app=138&size=w931',
  'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2022%2F0509%2F1e1bac6cj00rbkpwf001ec000hs00q8c.jpg&thumbnail=660x2147483647&quality=80&type=jpg',
  'https://pic2.zhimg.com/80/v2-6bc06520079e780ac1c550729f5cfa8d_1440w.webp',
  'https://img.tukuppt.com/photo-big/00/02/23/6188eaff33ec07243.jpg',
  'https://img0.baidu.com/it/u=4231555811,1903718579&fm=253&app=138&size=w931',
  'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2022%2F0509%2F1e1bac6cj00rbkpwf001ec000hs00q8c.jpg&thumbnail=660x2147483647&quality=80&type=jpg'
]

const current = ref(2)
</script>

<template>
  <su-image-preview v-model:current="current" :imageList="imageList"></su-image-preview>
</template>
