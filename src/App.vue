<template>
  <AppLoader />
  <div id="MAIN" :class="[homePageColor, 'min-h-screen transition-colors duration-500']">
    <AppNavbar />
    <main class="container mx-auto px-4 py-8">
      <AppPomodoro />
      <AppTasks />
    </main>
  </div>
  <div id="PAGES">
    <Hero />
    <Second />
    <Third />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppLoader from '@/components/App_Loader.vue'
import Hero from '@/pages/HeroPage.vue'
import Second from '@/pages/SecondPage.vue'
import Third from '@/pages/ThirdPage.vue'
import Footer from '@/pages/FooterSection.vue'
import AppNavbar from '@/components/App_Navbar.vue'
import AppPomodoro from '@/components/App_Pomodoro.vue'
import AppTasks from '@/components/App_Tasks.vue'
import { usePomoColor } from '@/functions/pomoColor'

const { getHomePageColor } = usePomoColor()

// Reactive home page color based on theme store
const homePageColor = computed(() => getHomePageColor())
</script>
