<template>
  <footer
    class="w-full border-t border-gray-200 bg-gradient-to-br from-zinc-50 via-neutral-50 to-stone-50 text-gray-800 px-6 py-10 josefin-sans"
  >
    <div class="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <!-- Logo + Name -->
      <div class="flex items-center gap-4">
        <img src="../assets/logo.svg" alt="App Logo" class="w-12 h-12 invert" />
        <span class="text-2xl md:text-3xl font-semibold tracking-wide">Fleuris</span>
      </div>

      <!-- Creator & Copyright -->
      <div class="text-center md:text-right text-sm text-gray-500 space-y-1">
        <p>Crafted with ❤️ by <span class="font-medium text-gray-700">CoderSilicon</span></p>
        <p class="text-xs">© {{ new Date().getFullYear() }} FocusNest. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Subtle fade in */
footer {
  animation: fadeIn 1s ease forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
