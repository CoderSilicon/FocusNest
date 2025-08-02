<template>
  <div :class="[homePageColor, 'min-h-screen transition-colors duration-500']">
    <AppNavbar />
    <main class="container mx-auto px-4 py-8">
      <AppPomodoro />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppNavbar from '@/components/App_Navbar.vue'
import AppPomodoro from '@/components/App_Pomodoro.vue'
import { usePomoColor } from '@/functions/pomoColor'

const { getHomePageColor } = usePomoColor()

// Reactive home page color based on theme store
const homePageColor = computed(() => getHomePageColor())
</script>
