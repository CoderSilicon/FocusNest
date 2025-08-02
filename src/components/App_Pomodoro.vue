<template>
  <div
    class="lexend rounded-4xl mx-auto p-9 transition-all duration-500 select-none max-w-4xl backdrop-blur-3xl shadow-lg"
    :class="{
      'bg-zinc-300/50': mode === 'pomodoro',
      'bg-zinc-400/50': mode === 'short',
      'bg-zinc-600/50': mode === 'long',
    }"
  >
    <!-- Mode Navigation -->
    <nav id="NAVITEMS" class="flex justify-around items-center mb-8">
      <ul class="flex space-x-6 list-none text-lg lexend relative">
        <li
          v-for="m in modes"
          :key="m"
          @click="switchMode(m)"
          class="group relative cursor-pointer px-4 py-2 rounded-lg transition-all duration-300 font-medium text-white"
        >
          {{ labelMap[m] }}

          <!-- Active underline -->
          <div
            v-if="mode === m"
            class="absolute left-1/2 -translate-x-1/2 bottom-0 h-1 bg-white rounded-full transition-all duration-300 w-5"
          />

          <!-- Hover underline (only shows if not active) -->
          <div
            v-if="mode !== m"
            class="absolute left-1/2 -translate-x-1/2 bottom-0 h-1 bg-white rounded-full transition-all duration-300 w-0 group-hover:w-16"
          />
        </li>
      </ul>
    </nav>

    <!-- Timer Display -->
    <div class="p-4">
      <div class="text-center mb-8">
        <h1 class="text-8xl md:text-9xl font-bold mb-4 font-mono tracking-tight text-white">
          {{ formattedTime }}
        </h1>

        <!-- Progress Bar -->
        <div class="w-full max-w-md mx-auto mb-6">
          <div
            class="w-full h-2 rounded-full overflow-hidden"
            :class="{
              'bg-zinc-300/50': mode === 'pomodoro',
              'bg-zinc-400/50': mode === 'short',
              'bg-zinc-600/50': mode === 'long',
            }"
          >
            <div
              class="h-full rounded-full transition-all duration-1000 ease-linear bg-slate-100"
              :style="{ width: progressPercentage + '%' }"
            ></div>
          </div>
        </div>

        <!-- Session Info -->
        <div class="text-lg font-medium mb-6 text-slate-100">
          <p v-if="mode === 'pomodoro'">
            Pomodoro #{{ store.pomodoroCount + 1 }}
            <span v-if="store.isLongBreakTime"> • Long break next!</span>
          </p>
          <p v-else-if="mode === 'short'">Short Break</p>
          <p v-else>Long Break • You've earned it!</p>
        </div>

        <!-- Active Task Display -->
        <div
          v-if="store.settings.enableTasks && store.activeTask"
          class="mb-6 p-4 rounded-lg border-2"
          :class="{
            'bg-gray-50 border-gray-300 text-black': mode === 'pomodoro',
            'bg-gray-900 border-gray-700 text-white': mode === 'short' || mode === 'long',
          }"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium">{{ store.activeTask.title }}</p>
              <p
                class="text-sm"
                :class="{
                  'text-gray-600': mode === 'pomodoro',
                  'text-gray-400': mode === 'short' || mode === 'long',
                }"
              >
                {{ store.activeTask.pomodorosCompleted }}/{{ store.activeTask.estimatedPomodoros }}
                pomodoros
              </p>
            </div>
            <div class="flex items-center gap-2">
              <div
                class="w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold"
                :class="{
                  'border-black text-black': mode === 'pomodoro',
                  'border-white text-white': mode === 'short' || mode === 'long',
                }"
              >
                🍅
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Control Buttons -->
      <div class="flex justify-center items-center gap-4">
        <button
          @click="toggle"
          :class="[
            'text-transparent text-shadow-xs',
            'px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 active:scale-95 ',
          ]"
        >
          {{ running ? 'Pause' : 'Start' }}
        </button>

        <button
          @click="reset"
          class="px-9 py-3 rounded-full font-medium text-lg border-2 text-white border-white hover:bg-white hover:text-black transition-all duration-300"
        >
          Reset
        </button>
      </div>

      <!-- Statistics -->
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, defineComponent } from 'vue'
import { usePomodoroStore } from '@/stores/usePomodoroStore'
import { usePomoColor } from '@/functions/pomoColor'

export default defineComponent({
  name: 'AppPomodoro',

  setup() {
    const store = usePomodoroStore()
    const { getColorName } = usePomoColor()

    const modes = ['pomodoro', 'short', 'long'] as const
    type Mode = (typeof modes)[number]
    const labelMap: Record<Mode, string> = {
      pomodoro: 'Pomodoro',
      short: 'Short Break',
      long: 'Long Break',
    }

    const mode = ref<Mode>('pomodoro')
    const timer = ref(0)
    const running = ref(false)
    let interval: ReturnType<typeof setInterval> | null = null

    // Computed properties for dynamic styling

    const durationInSeconds = computed(() => {
      switch (mode.value) {
        case 'short':
          return store.shortBreakDuration * 60
        case 'long':
          return store.longBreakDuration * 60
        default:
          return store.pomodoroDuration * 60
      }
    })

    const formattedTime = computed(() => {
      const minutes = Math.floor(timer.value / 60)
        .toString()
        .padStart(2, '0')
      const seconds = (timer.value % 60).toString().padStart(2, '0')
      return `${minutes}:${seconds}`
    })

    const progressPercentage = computed(() => {
      const total = durationInSeconds.value
      const remaining = timer.value
      return total > 0 ? ((total - remaining) / total) * 100 : 0
    })

    function toggle() {
      if (running.value) {
        stop()
        store.pauseTimer()
      } else {
        start()
        store.startTimer()
      }
    }

    function start() {
      if (running.value) return
      running.value = true
      interval = setInterval(() => {
        if (timer.value > 0) {
          timer.value--
          store.timeRemaining = timer.value
        } else {
          handleTimerComplete()
        }
      }, 1000)
    }

    function stop() {
      running.value = false
      if (interval) clearInterval(interval)
    }

    function reset() {
      stop()
      timer.value = durationInSeconds.value
      store.resetTimer()
    }

    function switchMode(newMode: Mode) {
      mode.value = newMode
      store.setMode(newMode)
      reset()
    }

    function handleTimerComplete() {
      stop()
      store.completeTimer()

      // Auto-switch logic based on settings
      if (mode.value === 'pomodoro') {
        const nextMode = store.isLongBreakTime ? 'long' : 'short'
        if (store.settings.autoStartBreaks) {
          setTimeout(() => {
            switchMode(nextMode)
            if (store.settings.autoStartBreaks) {
              setTimeout(() => start(), 500)
            }
          }, 1000)
        } else {
          switchMode(nextMode)
        }
      } else {
        // After break, go back to pomodoro
        if (store.settings.autoStartPomodoros) {
          setTimeout(() => {
            switchMode('pomodoro')
            setTimeout(() => start(), 500)
          }, 1000)
        } else {
          switchMode('pomodoro')
        }
      }
    }

    // Watch for settings changes
    watch(durationInSeconds, () => {
      if (!running.value) {
        timer.value = durationInSeconds.value
        store.timeRemaining = timer.value
      }
    })

    // Sync with store state
    watch(
      () => store.currentMode,
      (newMode) => {
        if (newMode !== mode.value) {
          mode.value = newMode
          reset()
        }
      },
    )

    onMounted(() => {
      // Load saved data
      store.loadFromLocalStorage()

      // Initialize timer
      reset()

      // Request notification permission
      if ('Notification' in window && store.settings.notifications) {
        Notification.requestPermission()
      }
    })

    onUnmounted(() => {
      stop()
    })

    return {
      store,
      modes,
      labelMap,
      mode,
      timer,
      running,
      formattedTime,
      progressPercentage,
      toggle,
      reset,
      switchMode,
      getColorName,
    }
  },
})
</script>

<style scoped>
/* Custom animations for smooth transitions */
.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Progress bar animation */
@keyframes progress {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}
</style>
