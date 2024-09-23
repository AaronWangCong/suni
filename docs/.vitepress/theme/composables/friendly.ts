
import { ref, onMounted } from 'vue'

export type FriendlyLink = {
  icon: string
  title: string
  details: string
  link: string
}

const data = ref<FriendlyLink[]>([])

export function useFriendly() {
  onMounted(async () => {
    if (data.value && data.value.length) {
      return
    }
    const result = await fetch('https://su-sponsors.pages.dev/friendly.json')
    const json = await result.json()
    data.value = json && json.links ? json.links : []
  })

  return {
    data,
  }
}



