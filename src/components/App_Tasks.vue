<template>
  <div
    class="mt-6 sm:mt-9 max-w-sm sm:max-w-xl mx-auto px-2 sm:px-0"
    v-if="store.settings.enableTasks"
  >
    <!-- HEADER -->
    <div id="TASK_HEADER" class="relative">
      <div class="flex justify-between items-center">
        <h1 class="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 lexend text-white">Tasks</h1>
        <button class="text-white text-2xl sm:text-3xl font-bold" aria-label="Add Task">
          <LucideMenu />
        </button>
      </div>
      <div class="mb-4 sm:mb-6 rounded-full border border-slate-200" />
    </div>

    <!-- ADD TASK INPUT -->
    <div class="bg-white p-3 sm:p-4 my-2 rounded-2xl shadow-md w-full lexend" v-if="isAddMenu">
      <input
        v-model="newTask"
        type="text"
        placeholder="What are you working on?"
        class="w-full text-base sm:text-lg italic p-2 mb-4 sm:mb-6 rounded-lg focus:outline-none"
      />

      <div class="flex justify-end gap-3 sm:gap-4">
        <button
          class="text-gray-500 hover:text-gray-700 text-sm sm:text-base"
          @click="toggleAddMenu"
        >
          Cancel
        </button>
        <button
          class="bg-gray-800 text-white px-3 sm:px-5 py-2 rounded-lg hover:bg-gray-900 text-sm sm:text-base"
          @click="addTask"
        >
          Save
        </button>
      </div>
    </div>

    <!-- TASK LIST -->
    <div
      id="TASK_LIST"
      class="space-y-2 sm:space-y-3 h-40 sm:h-48 overflow-y-auto scrollbar-thin px-1 sm:px-2"
    >
      <!-- Task List -->
      <div
        v-for="(task, index) in tasks"
        :key="index"
        class="flex items-center justify-between bg-white rounded-xl p-3 sm:p-5"
      >
        <div class="flex items-center gap-2 sm:gap-3">
          <!-- Checkbox Button -->
          <button
            @click="toggleTask(index)"
            class="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center"
            :class="
              task.done
                ? 'bg-primary border-primary text-primary-foreground'
                : 'border-border hover:border-primary'
            "
          >
            <svg
              v-if="task.done"
              class="w-2 h-2 sm:w-3 sm:h-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>

          <!-- Task Text -->
          <span
            class="text-sm sm:text-base text-gray-800 lexend"
            :class="{ 'line-through text-gray-400': task.done }"
          >
            {{ task.text }}
          </span>
        </div>

        <!-- Delete Button -->
        <button
          @click="deleteTask(index)"
          aria-label="Delete Task"
          class="text-gray-400 hover:text-red-500 transition"
        >
          <LucideTrash2 class="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      <!-- Always visible Add Task Button -->
      <button
        class="w-full text-white border-2 border-dashed border-slate-200 rounded-xl py-2 sm:py-3 flex items-center justify-center gap-2 hover:text-slate-100 transition shadow-sm text-sm sm:text-base"
        @click="toggleAddMenu"
        v-if="!isAddMenu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 sm:h-5 sm:w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Add Task
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { LucideMenu, LucideTrash2 } from 'lucide-vue-next'
import { ref } from 'vue'
import { usePomodoroStore } from '@/stores/usePomodoroStore'

const isAddMenu = ref(false)

export default {
  name: 'AppTasks',
  components: {
    LucideTrash2,
    LucideMenu,
  },

  setup() {
    const store = usePomodoroStore()

    return {
      isAddMenu,
      store,
    }
  },

  data() {
    return {
      newTask: '',
      tasks: [] as { text: string; done: boolean }[],
    }
  },
  created() {
    // Load tasks from localStorage if available
    const savedTasks = localStorage.getItem('tasks')
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks)
    }
  },
  mounted() {
    const saved = localStorage.getItem('tasks')
    if (saved) {
      this.tasks = JSON.parse(saved)
    }
  },
  watch: {
    tasks: {
      deep: true,
      handler(newVal) {
        localStorage.setItem('tasks', JSON.stringify(newVal))
      },
    },
  },
  methods: {
    addTask() {
      const trimmed = this.newTask.trim()
      if (trimmed) {
        this.tasks.push({ text: trimmed, done: false })
        this.newTask = ''
      }
      this.toggleAddMenu()
    },

    toggleTask(index: number) {
      this.tasks[index].done = !this.tasks[index].done
    },
    deleteTask(index: number) {
      this.tasks.splice(index, 1)
    },
    toggleAddMenu() {
      isAddMenu.value = !isAddMenu.value
    },
  },
}
</script>

<style>
.scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: #6b7280 transparent;
}
</style>
