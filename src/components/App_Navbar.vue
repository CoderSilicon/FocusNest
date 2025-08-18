<template>
  <div>
    <!--  Made navbar responsive with smaller text and padding on mobile -->
    <nav
      class="flex items-center justify-between sm:justify-around gap-2 sm:gap-4 p-3 sm:p-5 text-white lexend"
    >
      <div class="flex justify-center items-center gap-1">
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="32.000000pt"
          height="32.000000pt"
          viewBox="0 0 500.000000 500.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)"
            fill="#ffffff"
            stroke="none"
          >
            <path
              d="M3020 4384 c-100 -17 -145 -31 -220 -66 -144 -69 -277 -219 -331
-375 -29 -84 -41 -229 -30 -343 6 -52 9 -95 7 -97 -1 -1 -13 23 -26 55 -57
142 -183 319 -292 412 -184 157 -347 223 -553 223 -206 0 -350 -56 -481 -187
-135 -136 -198 -279 -198 -456 -1 -118 14 -180 70 -297 79 -165 219 -281 413
-344 51 -16 114 -32 138 -36 59 -8 37 -19 -52 -26 -210 -18 -455 -128 -619
-277 -153 -141 -246 -354 -246 -563 0 -377 351 -687 722 -637 245 34 392 140
547 395 24 39 41 61 38 50 -27 -99 -39 -195 -40 -315 0 -350 145 -635 400
-785 118 -69 216 -98 338 -98 190 -1 331 57 466 192 133 132 189 268 189 457
0 191 -67 344 -230 518 l-55 60 40 -24 c180 -105 300 -150 468 -174 136 -21
212 -20 323 3 265 55 492 250 567 486 29 92 30 279 3 370 -33 112 -92 208
-171 284 -88 84 -153 122 -260 157 -188 60 -317 43 -615 -83 -8 -4 15 19 52
51 193 166 337 424 369 663 20 152 -5 295 -78 443 -83 168 -229 291 -403 340
-74 20 -201 33 -250 24z m-47 -955 c93 -31 159 -86 196 -161 91 -184 48 -374
-120 -539 l-77 -76 51 14 c32 9 83 13 132 11 68 -4 90 -9 144 -38 113 -60 173
-165 173 -301 1 -96 -30 -169 -100 -237 -116 -113 -278 -144 -447 -87 -58 20
-118 49 -157 77 -36 25 -35 15 7 -51 65 -102 71 -225 15 -337 -99 -201 -362
-250 -530 -98 -136 123 -174 282 -124 524 l7 35 -41 -51 c-78 -96 -175 -140
-298 -132 -134 9 -248 92 -294 216 -30 79 -25 193 13 275 68 150 263 264 457
268 l45 1 -46 16 c-138 51 -217 137 -249 269 -33 144 49 306 188 371 50 24 69
27 157 27 86 0 108 -4 155 -26 102 -48 198 -146 250 -257 17 -34 30 -69 30
-77 0 -8 4 -15 9 -15 4 0 11 31 13 68 9 118 71 224 165 279 96 56 177 65 276
32z"
            />
            <path
              d="M2385 2832 c-28 -10 -65 -28 -83 -41 l-33 -23 25 -27 c14 -15 26 -35
26 -44 0 -25 -33 -21 -60 8 -18 20 -26 22 -37 13 -24 -20 -63 -106 -69 -152
l-7 -45 44 -3 c31 -2 44 -7 44 -18 0 -10 -13 -16 -42 -18 -38 -3 -43 -6 -43
-27 0 -33 36 -128 62 -160 l21 -26 26 25 c15 14 35 26 44 26 25 0 21 -33 -8
-60 -20 -18 -22 -26 -13 -37 20 -24 106 -63 152 -69 l45 -7 3 44 c2 31 7 44
18 44 11 0 16 -13 18 -44 l3 -44 45 7 c46 6 132 45 152 69 9 11 7 19 -13 37
-29 27 -33 60 -8 60 9 0 29 -12 44 -26 l27 -26 26 38 c29 45 56 116 56 150 0
20 -6 23 -42 26 -30 2 -43 8 -43 18 0 10 13 16 43 18 36 3 42 6 42 26 0 34
-27 105 -56 150 l-26 38 -27 -26 c-53 -51 -86 -18 -35 35 l26 27 -40 27 c-40
27 -120 55 -154 55 -15 0 -18 -8 -18 -45 0 -38 -3 -45 -20 -45 -17 0 -20 7
-20 45 0 40 -2 45 -22 45 -13 -1 -46 -8 -73 -18z m133 -233 l3 -84 50 -51 c35
-35 48 -55 43 -67 -10 -27 -25 -20 -81 35 l-53 52 0 96 c0 53 3 100 7 104 19
18 28 -8 31 -85z"
            />
          </g>
        </svg>

        <h1 class="font-bold text-2xl lg:text-3xl tracking-tight josefin-sans hidden sm:inline">
          Fleuris
        </h1>
      </div>
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
