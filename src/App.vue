<template>
  <div id="app" class="bg-[#0b0b0b] h-screen">
    <AppNavbar />
    <AppPomodoro />
  </div>
</template>

<script lang="ts">
export default {
  name: 'App',
  components: {
    AppNavbar,
    AppPomodoro,
  },
}
import AppNavbar from './components/App_Navbar.vue'
import AppPomodoro from './components/App_Pomodoro.vue'
</script>
