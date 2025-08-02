import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    color: 'bg-yellow-400',
  }),
  getters: {
    getColor: (state) => state.color,
  },
  actions: {
    setColor(color: string) {
      this.color = color
    },
  },
})
