<template>
  <div>
    <nav class="flex items-center justify-around gap-4 p-5 text-white lexend">
      <h1 class="font-bold text-3xl tracking-tight">FocusNest</h1>
      <ul class="flex gap-2 space-x-4 text-xl">
        <!-- Settings Trigger -->
        <li
          class="flex relative items-center gap-2 px-3 py-2 rounded-full transition-colors hover:bg-white/10"
        >
          <span
            class="flex text-center justify-center items-center gap-2 cursor-pointer"
            @click="toggleSMenu"
          >
            <Settings class="w-5 h-5" /> Settings
          </span>

          <!-- Minimal Settings Modal -->
          <div
            v-if="isSMenuOpen"
            class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            @click.self="toggleSMenu"
          >
            <div class="bg-zinc-900 text-white w-full max-w-md rounded-lg border border-zinc-700">
              <!-- Header -->
              <div class="flex items-center justify-between p-4 border-b border-zinc-700">
                <h2 class="text-lg font-medium">Settings</h2>
                <button @click="toggleSMenu" class="text-zinc-400 hover:text-white">
                  <X class="w-5 h-5" />
                </button>
              </div>

              <div class="p-4 space-y-4">
                <!-- Durations -->
                <div class="space-y-3">
                  <div
                    v-for="(label, key) in durationLabels"
                    :key="key"
                    class="flex items-center justify-between"
                  >
                    <label class="text-sm text-zinc-300">{{ label }}</label>
                    <div class="flex items-center gap-2">
                      <input
                        v-model="settings[key]"
                        type="number"
                        min="1"
                        class="w-16 px-2 py-1 bg-zinc-800 border border-zinc-600 rounded text-center text-sm"
                      />
                      <span class="text-xs text-zinc-500">min</span>
                    </div>
                  </div>
                </div>

                <!-- Long Break Interval -->
                <div class="flex items-center justify-between pt-2 border-t border-zinc-700">
                  <label class="text-sm text-zinc-300">Long break after</label>
                  <div class="flex items-center gap-2">
                    <input
                      v-model="settings.longBreakInterval"
                      type="number"
                      min="2"
                      max="10"
                      class="w-16 px-2 py-1 bg-zinc-800 border border-zinc-600 rounded text-center text-sm"
                    />
                    <span class="text-xs text-zinc-500">sessions</span>
                  </div>
                </div>

                <!-- Colors -->
                <div class="pt-2 border-t border-zinc-700">
                  <label class="text-sm text-zinc-300 block mb-2">Theme</label>
                  <div class="grid grid-cols-9 gap-2">
                    <div
                      v-for="color in availableColors"
                      :key="color.name"
                      @click="selectColor(color.class)"
                      :class="[
                        color.class,
                        'w-6 h-6 rounded cursor-pointer',
                        themeStore.color === color.class ? 'ring-1 ring-white' : '',
                      ]"
                    ></div>
                  </div>
                </div>

                <!-- Features -->
                <div class="pt-2 border-t border-zinc-700 space-y-2">
                  <div
                    v-for="(label, key) in featureLabels"
                    :key="key"
                    class="flex items-center justify-between"
                  >
                    <label class="text-sm text-zinc-300">{{ label }}</label>
                    <input
                      type="checkbox"
                      v-model="settings[key]"
                      class="w-4 h-4 bg-zinc-800 border-zinc-600 rounded focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <!-- Footer -->
              <div class="flex justify-between p-4 border-t border-zinc-700">
                <button @click="resetToDefaults" class="text-sm text-zinc-400 hover:text-white">
                  Reset
                </button>
                <button
                  @click="saveSettings"
                  class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </li>

        <!-- Shortcuts Trigger -->
        <li
          class="flex items-center gap-2 px-3 py-1 rounded-full transition-colors cursor-pointer hover:bg-white/10"
          @click="toggleShortcuts"
        >
          <Keyboard class="w-5 h-5" />
          Shortcuts
        </li>
      </ul>
    </nav>

    <!-- Minimal Shortcuts Modal -->
    <div
      v-if="isShortcutsOpen"
      class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"
      @click.self="toggleShortcuts"
    >
      <div class="bg-zinc-900 text-white w-full max-w-xs rounded-lg border border-zinc-700">
        <div class="flex items-center justify-between p-4 border-b border-zinc-700">
          <h2 class="text-lg font-medium">Shortcuts</h2>
          <button @click="toggleShortcuts" class="text-zinc-400 hover:text-white">
            <X class="w-5 h-5" />
          </button>
        </div>
        <div class="p-4 space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-zinc-300">Start/Pause</span>
            <kbd class="px-2 py-1 bg-zinc-800 rounded text-xs">Space</kbd>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-zinc-300">Reset</span>
            <kbd class="px-2 py-1 bg-zinc-800 rounded text-xs">R</kbd>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-zinc-300">Settings</span>
            <kbd class="px-2 py-1 bg-zinc-800 rounded text-xs">S</kbd>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Settings, Keyboard, X } from 'lucide-vue-next'
import { ref, reactive, watch } from 'vue'
import { usePomodoroStore } from '@/stores/usePomodoroStore'
import { useThemeStore } from '@/stores/ThemePatcher'

export default {
  components: {
    Settings,
    Keyboard,
    X,
  },
  setup() {
    const isSMenuOpen = ref(false)
    const store = usePomodoroStore()
    const themeStore = useThemeStore()
    const isShortcutsOpen = ref(false)

    const settings = reactive({ ...store.settings })

    const availableColors = [
      { name: 'Amber', class: 'bg-amber-400' },
      { name: 'Blue', class: 'bg-blue-400' },
      { name: 'Green', class: 'bg-green-400' },
      { name: 'Red', class: 'bg-red-400' },
      { name: 'Purple', class: 'bg-purple-400' },
      { name: 'Pink', class: 'bg-pink-400' },
      { name: 'Indigo', class: 'bg-indigo-400' },
      { name: 'Orange', class: 'bg-orange-400' },
      { name: 'Teal', class: 'bg-teal-400' },
    ]

    const selectColor = (colorClass: string) => {
      themeStore.setColor(colorClass)
    }

    watch(isSMenuOpen, (newValue) => {
      if (newValue) {
        Object.assign(settings, store.settings)
      }
    })

    const toggleSMenu = () => {
      isSMenuOpen.value = !isSMenuOpen.value
    }

    const toggleShortcuts = () => {
      isShortcutsOpen.value = !isShortcutsOpen.value
    }

    const resetToDefaults = () => {
      store.resetSettingsToDefaults()
      Object.assign(settings, store.settings)
    }

    const saveSettings = () => {
      store.updateSettings(settings)
      toggleSMenu()
    }

    const durationLabels = {
      pomodoroDuration: 'Focus',
      shortBreakDuration: 'Short Break',
      longBreakDuration: 'Long Break',
    }

    const featureLabels = {
      autoStartBreaks: 'Auto-start breaks',
      autoStartPomodoros: 'Auto-start sessions',
      notifications: 'Notifications',
    }

    return {
      isSMenuOpen,
      settings,
      toggleSMenu,
      resetToDefaults,
      saveSettings,
      durationLabels,
      featureLabels,
      isShortcutsOpen,
      toggleShortcuts,
      themeStore,
      availableColors,
      selectColor,
    }
  },
}
</script>
