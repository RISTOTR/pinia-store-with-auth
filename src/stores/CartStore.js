import { defineStore, acceptHMRUpdate } from 'pinia'
import { computed } from 'vue'
import { groupBy } from 'lodash'
import { useAuthUserStore } from './AuthUserStore'
import { useLocalStorage } from '@vueuse/core'

export const useCartStore = defineStore('CartStore', () => {

  // const items = ref([])
  const items = useLocalStorage("CartStore:items", [])

  const count = computed(() => items.value.length)

  const isEmpty = computed(() => count.value === 0)

  const group = computed(() => groupBy(items.value, item => item.name));

  const grouped = computed(() => {
    let sorted = Object.keys(group.value).sort()
    let inOrder = {};
    sorted.forEach((key) => (inOrder[key] = group.value[key]));
    return inOrder
  })

  const groupCount = computed(() => (name) => grouped.value[name].length)

  const total = computed(() => items.value.reduce((p, c) => p + c.price, 0))


  function addItems(count, item) {
    count = parseInt(count)
    for (let index = 0; index < count; index++) {
      items.value.push({ ...item })
    }
  }

  function clearItem(name) {
    items.value = items.value.filter(item => item.name !== name)
  }

  function reset() {
    items.value = []
  }

  function setItemCount(item, count) {
    clearItem(item.name)
    addItems(count, item)
  }

  function checkOut() {
    const AuthUserStore = useAuthUserStore()
    alert(`${AuthUserStore.userName}`)
  }

  return { items, addItems, count, isEmpty, grouped, groupCount, reset, total, clearItem, setItemCount, checkOut }

},
  {
    historyEnabled: true
  })

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}