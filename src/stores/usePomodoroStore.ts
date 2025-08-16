// stores/usePomodoroStore.ts
import { defineStore } from 'pinia'
import type { PomodoroSettings, PomodoroSession, SavedData } from './interface'

export const usePomodoroStore = defineStore('pomodoro', {
  state: () => ({
    // Timer settings
    settings: {
      pomodoroDuration: 25,
      shortBreakDuration: 5,
      longBreakDuration: 15,
      longBreakInterval: 4,
      enableTasks: true,
      autoStartBreaks: false,
      autoStartPomodoros: false,
      notifications: true,
    } as PomodoroSettings,

    // Session tracking
    currentSession: null as PomodoroSession | null,
    completedSessions: [] as PomodoroSession[],
    pomodoroCount: 0,

    // Timer state
    isRunning: false,
    currentMode: 'pomodoro' as 'pomodoro' | 'short' | 'long',
    timeRemaining: 0,
  }),

  getters: {
    // Duration getters
    pomodoroDuration: (state) => state.settings.pomodoroDuration,
    shortBreakDuration: (state) => state.settings.shortBreakDuration,
    longBreakDuration: (state) => state.settings.longBreakDuration,
    longBreakInterval: (state) => state.settings.longBreakInterval,

    // Current timer duration based on mode
    currentDuration: (state) => {
      switch (state.currentMode) {
        case 'short':
          return state.settings.shortBreakDuration
        case 'long':
          return state.settings.longBreakDuration
        default:
          return state.settings.pomodoroDuration
      }
    },

    // Check if it's time for long break
    isLongBreakTime: (state) => {
      return state.pomodoroCount > 0 && state.pomodoroCount % state.settings.longBreakInterval === 0
    },

    // Today's completed pomodoros
    todayCompletedPomodoros: (state) => {
      const today = new Date().toDateString()
      return state.completedSessions.filter(
        (session) => session.type === 'pomodoro' && session.completedAt.toDateString() === today,
      ).length
    },

    // Statistics
    totalCompletedPomodoros: (state) => {
      return state.completedSessions.filter((session) => session.type === 'pomodoro').length
    },
  },

  actions: {
    // Settings management
    updateSettings(newSettings: Partial<PomodoroSettings>) {
      this.settings = { ...this.settings, ...newSettings }
      this.saveToLocalStorage()
    },

    resetSettingsToDefaults() {
      this.settings = {
        pomodoroDuration: 25,
        shortBreakDuration: 5,
        longBreakDuration: 15,
        longBreakInterval: 4,
        enableTasks: true,
        autoStartBreaks: false,
        autoStartPomodoros: false,
        notifications: true,
      }
      this.saveToLocalStorage()
    },

    // Timer actions
    setMode(mode: 'pomodoro' | 'short' | 'long') {
      this.currentMode = mode
      this.timeRemaining = this.currentDuration * 60
    },

    startTimer() {
      this.isRunning = true
      this.currentSession = {
        id: Date.now().toString(),
        type: this.currentMode,
        duration: this.currentDuration,
        completedAt: new Date(),
      }
    },

    pauseTimer() {
      this.isRunning = false
    },

    resetTimer() {
      this.isRunning = false
      this.timeRemaining = this.currentDuration * 60
      this.currentSession = null
    },

    completeTimer() {
      if (!this.currentSession) return

      // Add to completed sessions
      this.completedSessions.push({
        ...this.currentSession,
        completedAt: new Date(),
      })

      // Handle pomodoro completion
      if (this.currentMode === 'pomodoro') {
        this.pomodoroCount++

        // Auto-switch to break
        if (this.settings.autoStartBreaks) {
          const nextMode = this.isLongBreakTime ? 'long' : 'short'
          this.setMode(nextMode)
          if (this.settings.autoStartBreaks) {
            setTimeout(() => this.startTimer(), 1000)
          }
        }
      } else {
        // Auto-switch back to pomodoro after break
        if (this.settings.autoStartPomodoros) {
          this.setMode('pomodoro')
          setTimeout(() => this.startTimer(), 1000)
        }
      }

      // Show notification
      if (this.settings.notifications) {
        this.showNotification()
      }

      this.currentSession = null
      this.saveToLocalStorage()
    },

    // Task management actions

    toggleTask() {
      this.settings.enableTasks = !this.settings.enableTasks
      this.saveToLocalStorage()
    },

    // Utility actions
    showNotification() {
      if (!('Notification' in window)) return

      const title = this.currentMode === 'pomodoro' ? 'Pomodoro Complete!' : 'Break Time Over!'

      const body =
        this.currentMode === 'pomodoro'
          ? 'Time for a break! Great work! 🍅'
          : "Break's over. Ready for another pomodoro? 😊"

      if (Notification.permission === 'granted') {
        new Notification(title, { body, icon: '/favicon.ico' })
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            new Notification(title, { body, icon: '/favicon.ico' })
          }
        })
      }
    },

    // Persistence
    saveToLocalStorage() {
      const data: SavedData = {
        settings: this.settings,
        completedSessions: this.completedSessions.map((session) => ({
          ...session,
          completedAt: session.completedAt.toISOString(),
        })),
        pomodoroCount: this.pomodoroCount,
      }
      try {
        localStorage.setItem('focusnest-data', JSON.stringify(data))
      } catch (error) {
        console.error('Error saving to localStorage:', error)
      }
    },

    loadFromLocalStorage() {
      const saved = localStorage.getItem('focusnest-data')
      if (!saved) return

      try {
        const data = JSON.parse(saved) as SavedData

        if (data.settings) {
          this.settings = { ...this.settings, ...data.settings }
        }

        if (data.completedSessions) {
          this.completedSessions = data.completedSessions.map((session) => ({
            ...session,
            completedAt: new Date(session.completedAt),
          }))
        }

        if (typeof data.pomodoroCount === 'number') {
          this.pomodoroCount = data.pomodoroCount
        }
      } catch (error) {
        console.error('Error loading saved data:', error)
        // Optionally clear corrupted data
        localStorage.removeItem('focusnest-data')
      }
    },
  },
})
