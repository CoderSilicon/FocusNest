// pomoColor.ts - Utility functions for managing Pomodoro colors
import { useThemeStore } from '@/stores/ThemePatcher'
import { setActivePinia, createPinia } from 'pinia'

setActivePinia(createPinia())

export const usePomoColor = () => {
  const themeStore = useThemeStore()

  // Get the current theme color for home page
  const getHomePageColor = (): string => {
    return themeStore.color
  }

  return {
    getHomePageColor,
  }
}
