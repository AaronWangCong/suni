
import { ref, onMounted } from 'vue'


const data = ref()

export function useSponsor() {
  onMounted(async () => {
    if (data.value) {
      return
    }
    const result = await fetch('https://su-sponsors.pages.dev/suni.json')
    const json = await result.json()
    data.value = json
  })

  return {
    data,
  }
}



