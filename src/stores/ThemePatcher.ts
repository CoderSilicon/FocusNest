import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    color: 'bg-[#518A89]',
  }),
  getters: {
    getColor: (state) => state.color,
  },
  actions: {
    setColor(color: string): void {
      this.color = color
    },
  },
})
