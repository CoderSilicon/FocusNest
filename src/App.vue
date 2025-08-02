<template>
  <div id="app" class="bg-zinc-950 h-screen">
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
