<template>
  <div
    v-if="isLoading"
    class="fixed inset-0 flex flex-col items-center justify-center z-50 transition-opacity duration-700"
    :class="[homePageColor, { 'opacity-0 pointer-events-none': fadeOut }]"
  >
    <!-- Logo -->
    <div class="flex items-center justify-center mb-12">
      <img src="../assets/logo.svg" alt="Logo" class="w-32 h-32 animate-logo" />
    </div>

    <!-- Loading bar with percentage -->
    <div class="absolute bottom-12 w-2/3 max-w-md">
      <div class="h-[4px] bg-gray-200 rounded-full overflow-hidden">
        <div
          class="h-full bg-white rounded-full transition-all duration-100"
          :style="{ width: progress + '%' }"
        ></div>
      </div>
      <p class="text-center text-sm text-white mt-2 josefin-sans">{{ progress }}%</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { usePomoColor } from '@/functions/pomoColor'

const { getHomePageColor } = usePomoColor()
const homePageColor = computed(() => getHomePageColor())

const isLoading = ref(true)
const fadeOut = ref(false)
const progress = ref(0)

onMounted(() => {
  const interval = setInterval(() => {
    if (progress.value < 100) {
      progress.value += 2 // increment speed
    } else {
      clearInterval(interval)
      // trigger fade
      fadeOut.value = true
      setTimeout(() => {
        isLoading.value = false // remove from DOM
      }, 700) // matches transition duration
    }
  }, 60) // ~3s total
})
</script>

<style scoped>
@keyframes pulseLogo {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.9;
  }
}

.animate-logo {
  animation: pulseLogo 2s ease-in-out infinite;
}
</style>
