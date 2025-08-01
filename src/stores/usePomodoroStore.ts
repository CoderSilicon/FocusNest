// stores/usePomodoroStore.ts
import { defineStore } from 'pinia'

interface PomodoroSettings {
  pomodoroDuration: number
  shortBreakDuration: number
  longBreakDuration: number
  longBreakInterval: number
  enableTasks: boolean
  autoStartBreaks: boolean
  autoStartPomodoros: boolean
  notifications: boolean
  soundEffects: boolean
}

interface Task {
  id: string
  title: string
  completed: boolean
  pomodorosCompleted: number
  estimatedPomodoros: number
  createdAt: Date
}

interface PomodoroSession {
  id: string
  type: 'pomodoro' | 'short' | 'long'
  duration: number
  completedAt: Date
  taskId?: string
}

// Define the saved data structure for localStorage (serialized format)
interface SavedData {
  settings?: Partial<PomodoroSettings>
  tasks?: Array<Omit<Task, 'createdAt'> & { createdAt: string }>
  completedSessions?: Array<Omit<PomodoroSession, 'completedAt'> & { completedAt: string }>
  pomodoroCount?: number
  activeTaskId?: string | null
}

// Extend Window interface for webkit audio context
declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext
  }
}

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
      soundEffects: true,
    } as PomodoroSettings,

    // Session tracking
    currentSession: null as PomodoroSession | null,
    completedSessions: [] as PomodoroSession[],
    pomodoroCount: 0,

    // Tasks
    tasks: [] as Task[],
    activeTaskId: null as string | null,

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

    // Active task
    activeTask: (state) => {
      return state.tasks.find((task) => task.id === state.activeTaskId) || null
    },

    // Completed tasks
    completedTasks: (state) => state.tasks.filter((task) => task.completed),

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
        soundEffects: true,
      }
      this.saveToLocalStorage()
    },

    randomizeSettings() {
      this.settings.pomodoroDuration = Math.floor(Math.random() * 35) + 15 // 15-50 min
      this.settings.shortBreakDuration = Math.floor(Math.random() * 10) + 3 // 3-12 min
      this.settings.longBreakDuration = Math.floor(Math.random() * 25) + 15 // 15-40 min
      this.settings.longBreakInterval = Math.floor(Math.random() * 6) + 3 // 3-8 cycles
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
        taskId: this.activeTaskId || undefined,
      }
    },

    pauseTimer() {
      this.isRunning = false
    },

    stopTimer() {
      this.isRunning = false
      this.currentSession = null
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

        // Update active task
        if (this.activeTaskId) {
          const task = this.tasks.find((t) => t.id === this.activeTaskId)
          if (task) {
            task.pomodorosCompleted++
          }
        }

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

      // Play sound
      if (this.settings.soundEffects) {
        this.playCompletionSound()
      }

      this.currentSession = null
      this.saveToLocalStorage()
    },

    // Task management actions
    addTask(title: string, estimatedPomodoros: number = 1): Task {
      const newTask: Task = {
        id: Date.now().toString(),
        title,
        completed: false,
        pomodorosCompleted: 0,
        estimatedPomodoros,
        createdAt: new Date(),
      }
      this.tasks.push(newTask)
      this.saveToLocalStorage()
      return newTask
    },

    updateTask(taskId: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) {
      const taskIndex = this.tasks.findIndex((task) => task.id === taskId)
      if (taskIndex !== -1) {
        this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updates }
        this.saveToLocalStorage()
      }
    },

    deleteTask(taskId: string) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId)
      if (this.activeTaskId === taskId) {
        this.activeTaskId = null
      }
      this.saveToLocalStorage()
    },

    setActiveTask(taskId: string | null) {
      this.activeTaskId = taskId
      this.saveToLocalStorage()
    },

    // Utility actions
    showNotification() {
      if (!('Notification' in window)) return

      const title = this.currentMode === 'pomodoro' ? 'Pomodoro Complete!' : 'Break Time Over!'

      const body =
        this.currentMode === 'pomodoro'
          ? 'Time for a break! Great work! 🍅'
          : "Break's over. Ready for another pomodoro? 💪"

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

    async playCompletionSound() {
      try {
        // Use proper AudioContext typing
        const AudioContextClass = window.AudioContext || window.webkitAudioContext
        if (!AudioContextClass) {
          console.warn('AudioContext not supported')
          return
        }

        const audioContext = new AudioContextClass()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        oscillator.frequency.value = 800
        oscillator.type = 'sine'

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.5)

        // Clean up
        setTimeout(() => {
          audioContext.close()
        }, 1000)
      } catch (error) {
        console.error('Error playing completion sound:', error)
      }
    },

    // Persistence
    saveToLocalStorage() {
      const data: SavedData = {
        settings: this.settings,
        tasks: this.tasks.map((task) => ({
          ...task,
          createdAt: task.createdAt.toISOString(),
        })),
        completedSessions: this.completedSessions.map((session) => ({
          ...session,
          completedAt: session.completedAt.toISOString(),
        })),
        pomodoroCount: this.pomodoroCount,
        activeTaskId: this.activeTaskId,
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

        if (data.tasks) {
          // Ensure dates are properly converted
          this.tasks = data.tasks.map((task) => ({
            ...task,
            createdAt: new Date(task.createdAt),
          }))
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

        if (data.activeTaskId !== undefined) {
          this.activeTaskId = data.activeTaskId
        }
      } catch (error) {
        console.error('Error loading saved data:', error)
        // Optionally clear corrupted data
        localStorage.removeItem('focusnest-data')
      }
    },

    // Reset all data
    resetAllData() {
      this.tasks = []
      this.completedSessions = []
      this.pomodoroCount = 0
      this.activeTaskId = null
      this.currentSession = null
      this.isRunning = false
      this.resetSettingsToDefaults()
      localStorage.removeItem('focusnest-data')
    },
  },
})
