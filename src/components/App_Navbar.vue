<template>
  <div>
    <!--  Made navbar responsive with smaller text and padding on mobile -->
    <nav
      class="flex items-center justify-between sm:justify-around gap-2 sm:gap-4 p-3 sm:p-5 text-white lexend"
    >
      <h1 class="font-bold text-2xl lg:text-3xl tracking-tight">FocusNest</h1>
      <ul class="flex gap-1 sm:gap-2 space-x-2 sm:space-x-4 text-sm sm:text-lg lg:text-xl">
        <!-- Settings Trigger -->
        <li
          class="flex relative items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 rounded-full transition-colors hover:bg-white/10"
        >
          <span
            class="flex text-center justify-center items-center gap-1 sm:gap-2 cursor-pointer text-xs sm:text-base"
            @click="toggleSMenu"
          >
            <Settings class="w-4 h-4 sm:w-5 sm:h-5" />
            <span class="hidden sm:inline">Settings</span>
          </span>

          <!--  Made settings modal responsive with better mobile sizing -->
          <div
            v-if="isSMenuOpen"
            class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-2 sm:p-4"
            @click.self="toggleSMenu"
          >
            <div
              class="bg-zinc-900 text-white w-full max-w-sm sm:max-w-md rounded-lg border border-zinc-700 max-h-[90vh] overflow-y-auto"
            >
              <!-- Header -->
              <div class="flex items-center justify-between p-3 sm:p-4 border-b border-zinc-700">
                <h2 class="text-base sm:text-lg font-medium">Settings</h2>
                <button @click="toggleSMenu" class="text-zinc-400 hover:text-white">
                  <X class="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              <div class="p-3 sm:p-4 space-y-3 sm:space-y-4">
                <!-- Durations -->
                <div class="space-y-2 sm:space-y-3">
                  <div
                    v-for="(label, key) in durationLabels"
                    :key="key"
                    class="flex items-center justify-between"
                  >
                    <label class="text-xs sm:text-sm text-zinc-300">{{ label }}</label>
                    <div class="flex items-center gap-1 sm:gap-2">
                      <input
                        v-model="settings[key]"
                        type="number"
                        min="1"
                        class="w-12 sm:w-16 px-1 sm:px-2 py-1 bg-zinc-800 border border-zinc-600 rounded text-center text-xs sm:text-sm"
                      />
                      <span class="text-xs text-zinc-500">min</span>
                    </div>
                  </div>
                </div>

                <!-- Long Break Interval -->
                <div class="flex items-center justify-between pt-2 border-t border-zinc-700">
                  <label class="text-xs sm:text-sm text-zinc-300">Long break after</label>
                  <div class="flex items-center gap-1 sm:gap-2">
                    <input
                      v-model="settings.longBreakInterval"
                      type="number"
                      min="2"
                      max="10"
                      class="w-12 sm:w-16 px-1 sm:px-2 py-1 bg-zinc-800 border border-zinc-600 rounded text-center text-xs sm:text-sm"
                    />
                    <span class="text-xs text-zinc-500">sessions</span>
                  </div>
                </div>

                <!-- Colors -->
                <div class="pt-2 border-t border-zinc-700">
                  <label class="text-xs sm:text-sm text-zinc-300 block mb-2">Theme</label>
                  <!--  Made color grid responsive with smaller swatches on mobile -->
                  <div class="grid grid-cols-6 sm:grid-cols-9 gap-1 sm:gap-2">
                    <div
                      v-for="color in availableColors"
                      :key="color.name"
                      @click="selectColor(color.class)"
                      :class="[
                        color.class,
                        'w-5 h-5 sm:w-6 sm:h-6 rounded cursor-pointer',
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
                    <label class="text-xs sm:text-sm text-zinc-300">{{ label }}</label>
                    <input
                      type="checkbox"
                      v-model="settings[key]"
                      class="w-3 h-3 sm:w-4 sm:h-4 bg-zinc-800 border-zinc-600 rounded focus:ring-zinc-900"
                    />
                  </div>
                </div>
              </div>

              <!-- Footer -->
              <div class="flex justify-between p-3 sm:p-4 border-t border-zinc-700">
                <button
                  @click="resetToDefaults"
                  class="text-xs sm:text-sm text-zinc-400 hover:text-white"
                >
                  Reset
                </button>
                <button
                  @click="saveSettings"
                  class="px-2 sm:px-3 py-1 text-white rounded text-xs sm:text-sm"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </li>

        <!-- Shortcuts Trigger -->
        <li
          class="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-full transition-colors cursor-pointer hover:bg-white/10"
          @click="toggleShortcuts"
        >
          <Keyboard class="w-4 h-4 sm:w-5 sm:h-5" />
          <span class="hidden sm:inline text-xs sm:text-base">Shortcuts</span>
        </li>
      </ul>
    </nav>

    <!--  Made shortcuts modal responsive with better mobile sizing -->
    <div
      v-if="isShortcutsOpen"
      class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 sm:p-6"
      @click.self="toggleShortcuts"
    >
      <div class="bg-zinc-900 text-white w-full max-w-xs rounded-lg border border-zinc-700">
        <div class="flex items-center justify-between p-3 sm:p-4 border-b border-zinc-700">
          <h2 class="text-base sm:text-lg font-medium">Shortcuts</h2>
          <button @click="toggleShortcuts" class="text-zinc-400 hover:text-white">
            <X class="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
        <div class="p-3 sm:p-4 space-y-2">
          <div class="flex justify-between text-xs sm:text-sm">
            <span class="text-zinc-300">Start/Pause</span>
            <kbd class="px-1 sm:px-2 py-1 bg-zinc-800 rounded text-xs">Space</kbd>
          </div>
          <div class="flex justify-between text-xs sm:text-sm">
            <span class="text-zinc-300">Reset</span>
            <kbd class="px-1 sm:px-2 py-1 bg-zinc-800 rounded text-xs">R</kbd>
          </div>
          <div class="flex justify-between text-xs sm:text-sm">
            <span class="text-zinc-300">Settings</span>
            <kbd class="px-1 sm:px-2 py-1 bg-zinc-800 rounded text-xs">S</kbd>
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
      { name: 'Amber', class: 'bg-[#D8A657]' }, // Muted gold
      { name: 'Blue', class: 'bg-[#4C8CA0]' }, // Cool soft blue
      { name: 'Green', class: 'bg-[#5A8F6B]' }, // Muted olive green
      { name: 'Red', class: 'bg-[#B5625C]' }, // Desaturated warm red
      { name: 'Purple', class: 'bg-[#7D6D94]' }, // Dusty lavender
      { name: 'Pink', class: 'bg-[#B28395]' }, // Vintage pink
      { name: 'Indigo', class: 'bg-[#586F90]' }, // Faded indigo
      { name: 'Orange', class: 'bg-[#C48C63]' }, // Soft clay orange
      { name: 'Teal', class: 'bg-[#518A89]' }, // Cool teal (Pomofocus vibe)
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
      enableTasks: 'Enable Tasks',
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
      toggleTask: store.toggleTask,
    }
  },
}
</script>
