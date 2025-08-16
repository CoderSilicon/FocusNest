import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    color: 'bg-[#D8A657]',
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
