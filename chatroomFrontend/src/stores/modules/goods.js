import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useNumStore333 = defineStore(
  'num',
  () => {
    const count = ref(0)
    const avatar = ref(
      'https://mp-e0d15f0f-d6bf-4f95-b183-b82aede04535.cdn.bspapp.com/可爱蜘蛛侠.png'
    )

    const doubleCount = computed(() => count.value * 2)
    function increment() {
      count.value++
    }
    function reset() {
      count.value = 0
    }

    return { count, doubleCount, increment, reset, avatar }
  },
  {
    persist: true
  }
)
