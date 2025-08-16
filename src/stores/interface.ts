

export interface PomodoroSettings {
  pomodoroDuration: number
  shortBreakDuration: number
  longBreakDuration: number
  longBreakInterval: number
  enableTasks: boolean
  autoStartBreaks: boolean
  autoStartPomodoros: boolean
  notifications: boolean
}

export interface Task {
  id: string
  title: string
  completed: boolean
  pomodorosCompleted: number
  estimatedPomodoros: number
  createdAt: Date
}

export interface PomodoroSession {
  id: string
  type: 'pomodoro' | 'short' | 'long'
  duration: number
  completedAt: Date
  taskId?: string
}

// Define the saved data structure for localStorage (serialized format)
export interface SavedData {
  settings?: Partial<PomodoroSettings>
  tasks?: Array<Omit<Task, 'createdAt'> & { createdAt: string }>
  completedSessions?: Array<Omit<PomodoroSession, 'completedAt'> & { completedAt: string }>
  pomodoroCount?: number
  activeTaskId?: string | null
}
