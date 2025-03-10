<script lang="ts" setup>
import type { SuSelectMode } from '@/uni_modules/sun-uni/components/su-select/props'
import type { SuUni } from '@/uni_modules/sun-uni/types/uni'
import { ref, reactive } from 'vue'

type Data = {
  label: string
  value: any
  children?: Data
}[]

const model = ref<SuUni.Recordable>({
  'single-column': [],
  'mutil-column': [],
  'mutil-column-auto': []
})
const show = ref(false)

const mode = ref<SuSelectMode>('single-column')

const list = ref([
  {
    title: '单列',
    type: 'single-column'
  },
  {
    title: '多列',
    type: 'mutil-column'
  },
  {
    title: '多列联动',
    type: 'mutil-column-auto'
  }
])

const data = reactive<{
  'single-column': Data
  'mutil-column': Data[]
  'mutil-column-auto': Data
}>({
  'single-column': [
    {
      value: '1',
      label: '江'
    },
    {
      value: '2',
      label: '湖'
    }
  ],
  'mutil-column': [
    [
      {
        value: '1',
        label: '江'
      },
      {
        value: '2',
        label: '湖'
      }
    ],
    [
      {
        value: '3',
        label: '夜'
      },
      {
        value: '4',
        label: '雨'
      }
    ]
  ],
  'mutil-column-auto': [
    {
      value: 1,
      label: '中国',
      children: [
        {
          value: 2,
          label: '广东',
          children: [
            {
              value: 3,
              label: '深圳'
            },
            {
              value: 4,
              label: '广州'
            }
          ]
        },
        {
          value: 5,
          label: '广西',
          children: [
            {
              value: 6,
              label: '南宁'
            },
            {
              value: 7,
              label: '桂林'
            }
          ]
        }
      ]
    },
    {
      value: 8,
      label: '美国',
      children: [
        {
          value: 9,
          label: '纽约',
          children: [
            {
              value: 10,
              label: '皇后街区'
            }
          ]
        }
      ]
    }
  ]
})

function showSelect(item: SuUni.Recordable) {
  show.value = true
  mode.value = item.type
}

function confirm() {
  uni.showToast({
    title: '控制台查看选中数据',
    icon: 'none'
  })
  console.log(model, 'model')
}
</script>

<template>
  <view class="su-page">
    <su-cell-group>
      <su-cell :title="item.title" v-for="(item, index) in list" :key="index" @click="showSelect(item)"></su-cell>
    </su-cell-group>
    <su-select :mode="mode" v-model:show="show" v-model="model[mode]" :list="data[mode]" @confirm="confirm"></su-select>
  </view>
</template>
