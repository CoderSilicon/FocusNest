<template>
  <div>
    <nav class="flex items-center justify-around gap-4 p-5 text-white lexend">
      <h1 class="font-bold text-3xl tracking-tight">FocusNest</h1>
      <ul class="flex gap-2 space-x-4 text-xl">
        <!-- Settings Trigger -->
        <li class="flex relative items-center gap-2 px-3 py-2 rounded-full transition-colors">
          <span
            class="flex text-center justify-center items-center gap-2 cursor-pointer"
            @click="toggleSMenu"
          >
            <Settings class="w-5 h-5" /> Settings
          </span>

          <!-- Updated Settings Modal -->
          <div
            v-if="isSMenuOpen"
            class="fixed inset-0 bg-black/70 backdrop-blur z-50 flex items-center justify-center p-6"
          >
            <div
              class="bg-zinc-900 text-white w-full max-w-xl rounded-2xl p-8 shadow-lg overflow-y-auto max-h-[90vh] relative"
            >
              <button
                @click="toggleSMenu"
                class="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                ✕
              </button>
              <h2 class="text-2xl font-semibold mb-6 text-center">Pomodoro Settings</h2>

              <!-- durations -->
              <section class="mb-6">
                <h3 class="text-lg font-medium mb-4">Durations</h3>
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div v-for="(label, key) in durationLabels" :key="key" class="space-y-2">
                    <label class="block">{{ label }}</label>
                    <div class="flex items-center gap-2">
                      <input
                        v-model="settings[key]"
                        type="number"
                        min="1"
                        class="w-20 px-2 py-1 bg-zinc-800 rounded border border-zinc-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <span class="text-gray-400">min</span>
                      <button
                        @click="randomizeDuration(key)"
                        class="text-gray-400 hover:text-white"
                      >
                        <Shuffle class="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <!-- Long Break Interval -->
              <section class="mb-6">
                <label class="block mb-2 text-sm">Long Break After</label>
                <div class="flex items-center gap-2">
                  <input
                    v-model="settings.longBreakInterval"
                    type="number"
                    min="2"
                    max="10"
                    class="w-20 px-2 py-1 bg-zinc-800 rounded border border-zinc-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <span class="text-gray-400">pomodoros</span>
                </div>
              </section>

              <!-- Toggles -->
              <section class="mb-6">
                <h3 class="text-lg font-medium mb-4">Features</h3>
                <div class="space-y-4 text-sm">
                  <div
                    v-for="(label, key) in featureLabels"
                    :key="key"
                    class="flex justify-between items-center"
                  >
                    <div class="flex items-center gap-2">
                      <component :is="featureIcons[key]" class="w-4 h-4 text-blue-400" />
                      <span>{{ label }}</span>
                    </div>
                    <label class="inline-flex items-center cursor-pointer">
                      <input type="checkbox" v-model="settings[key]" class="sr-only peer" />
                      <div
                        class="w-10 h-5 bg-zinc-600 peer-checked:bg-blue-500 rounded-full relative transition-all"
                      >
                        <div
                          class="absolute left-0.5 top-0.5 h-4 w-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"
                        />
                      </div>
                    </label>
                  </div>
                </div>
              </section>

              <!-- Buttons -->
              <div class="flex justify-end gap-3 pt-4 border-t border-zinc-700">
                <button
                  @click="randomizeAll"
                  class="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded text-sm"
                >
                  <Shuffle class="inline w-4 h-4 mr-1" /> Randomize
                </button>
                <button
                  @click="resetToDefaults"
                  class="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded text-sm"
                >
                  <RotateCcw class="inline w-4 h-4 mr-1" /> Reset
                </button>
                <button
                  @click="saveSettings"
                  class="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-sm text-black font-medium"
                >
                  <Save class="inline w-4 h-4 mr-1" /> Save
                </button>
              </div>
            </div>
          </div>
        </li>

        <!-- Shortcuts Trigger -->
        <li
          class="flex items-center gap-2 px-3 py-1 rounded-full transition-colors cursor-pointer"
          @click="toggleShortcuts"
        >
          <Keyboard class="w-5 h-5" />
          Shortcuts
        </li>
      </ul>
    </nav>

    <!-- Shortcuts Modal -->
    <div
      v-if="isShortcutsOpen"
      class="fixed inset-0 bg-black/70 backdrop-blur z-50 flex items-center justify-center p-6"
    >
      <div class="bg-zinc-900 text-white w-full max-w-md rounded-xl p-6 shadow-xl relative">
        <button
          @click="toggleShortcuts"
          class="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>
        <h2 class="text-xl font-semibold mb-4 text-center">Keyboard Shortcuts</h2>
        <ul class="text-sm space-y-2">
          <li><kbd class="bg-zinc-700 px-2 py-1 rounded">Space</kbd> — Start / Pause</li>
          <li><kbd class="bg-zinc-700 px-2 py-1 rounded">R</kbd> — Reset Timer</li>
          <li><kbd class="bg-zinc-700 px-2 py-1 rounded">S</kbd> — Open Settings</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Settings, Keyboard, Shuffle, Play, Timer, Bell, RotateCcw, Save } from 'lucide-vue-next'
import { ref, reactive, watch } from 'vue'
import { usePomodoroStore } from '@/stores/usePomodoroStore' // Import the Pinia store

export default {
  components: {
    Settings,
    Keyboard,
    Shuffle,

    Play,
    Timer,
    Bell,
    RotateCcw,
    Save,
  },
  setup() {
    const isSMenuOpen = ref(false)
    const store = usePomodoroStore() // Initialize the store
    const isShortcutsOpen = ref(false)

    // Initialize local settings with current store settings
    const settings = reactive({ ...store.settings })

    // Watch for changes in isSMenuOpen to sync settings when modal opens
    watch(isSMenuOpen, (newValue) => {
      if (newValue) {
        // When the menu opens, ensure local settings reflect the store's current state
        Object.assign(settings, store.settings)
      }
    })

    const toggleSMenu = () => {
      isSMenuOpen.value = !isSMenuOpen.value
    }

    const toggleShortcuts = () => {
      isShortcutsOpen.value = !isShortcutsOpen.value
    }

    const randomizeDuration = (type: string) => {
      switch (type) {
        case 'pomodoro':
          settings.pomodoroDuration = Math.floor(Math.random() * 35) + 15 // 15-50 minutes
          break
        case 'shortBreak':
          settings.shortBreakDuration = Math.floor(Math.random() * 10) + 3 // 3-12 minutes
          break
        case 'longBreak':
          settings.longBreakDuration = Math.floor(Math.random() * 25) + 15 // 15-40 minutes
          break
      }
      // Note: Changes from randomizeDuration are not immediately pushed to the store.
      // They will be saved when saveSettings is called.
    }

    const randomizeAll = () => {
      store.randomizeSettings() // Use the store's action to randomize
      Object.assign(settings, store.settings) // Update local settings from the store
    }

    const resetToDefaults = () => {
      store.resetSettingsToDefaults() // Use the store's action to reset
      Object.assign(settings, store.settings) // Update local settings from the store
    }

    const saveSettings = () => {
      store.updateSettings(settings) // Save the local settings to the store
      console.log('Settings saved:', settings)
      alert('Settings saved successfully!')
      toggleSMenu() // Close the menu after saving
    }

    const durationLabels = {
      pomodoroDuration: 'Pomodoro',
      shortBreakDuration: 'Short Break',
      longBreakDuration: 'Long Break',
    }

    const featureLabels = {
      autoStartBreaks: 'Auto Start Breaks',
      autoStartPomodoros: 'Auto Start Pomodoros',
      notifications: 'Notifications',
    }

    const featureIcons = {
      autoStartBreaks: Play,
      autoStartPomodoros: Timer,
      notifications: Bell,
    }

    return {
      isSMenuOpen,
      settings,
      toggleSMenu,
      randomizeDuration,
      randomizeAll,
      resetToDefaults,
      saveSettings,
      durationLabels,
      featureLabels,
      featureIcons,
      isShortcutsOpen,
      toggleShortcuts,
    }
  },
}
</script>
