// pomoColor.ts - Utility functions for managing Pomodoro colors
import { useThemeStore } from '@/stores/ThemePatcher'

export const usePomoColor = () => {
  const themeStore = useThemeStore()

  // Get the current theme color for home page
  const getHomePageColor = (): string => {
    return themeStore.color
  }

  // Extract color name from class (e.g., 'bg-yellow-400' -> 'yellow')
  const getColorName = (): string => {
    const currentColor = themeStore.color
    // Fixed regex to match multi-character color names
    const match = currentColor.match(/bg-(\w+)-400/)
    return match ? match[1] : 'yellow'
  }

  return {
    getHomePageColor,
    getColorName,
  }
}
