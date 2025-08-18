<template>
  <div
    class="min-h-screen josefin-sans bg-gradient-to-br from-zinc-50 via-neutral-50 to-stone-50 flex flex-col items-center justify-center px-6 sm:px-12"
  >
    <!-- First Block -->
    <div
      class="flex flex-col sm:flex-row items-center gap-6 mb-20 text-center sm:text-left w-full max-w-5xl"
    >
      <!-- Left Shape -->
      <div
        class="w-20 h-20 rounded-full border-2 border-gray-400 flex items-center justify-center flex-shrink-0"
      >
        <span class="text-gray-600 text-sm">Complex</span>
      </div>

      <!-- Line -->
      <div class="hidden sm:block flex-1 h-[2px] bg-gray-300 animate-draw-line-x"></div>

      <!-- Text -->
      <div>
        <h1 class="text-3xl sm:text-5xl font-light text-gray-800 leading-tight">
          Our Goal is not to deliver
        </h1>
        <p class="text-gray-700 text-lg sm:text-2xl mt-2">
          <span class="font-bold tracking-wide text-2xl sm:text-3xl">Complex Apps</span>
          that must be learned <br class="hidden sm:block" />
          <span class="italic text-gray-500">before use</span>
        </p>
      </div>
    </div>

    <!-- Divider / transition line -->
    <div class="w-1 h-16 sm:w-px sm:h-24 bg-gray-300 animate-draw-line-y"></div>

    <!-- Second Block -->
    <div
      class="flex flex-col sm:flex-row-reverse items-center gap-6 mt-20 text-center sm:text-right w-full max-w-5xl"
    >
      <!-- Right Shape -->
      <div
        class="w-20 h-20 rounded-lg border-2 border-gray-400 flex items-center justify-center flex-shrink-0"
      >
        <span class="text-gray-600 text-sm">Simple</span>
      </div>

      <!-- Line -->
      <div class="hidden sm:block flex-1 h-[2px] bg-gray-300 animate-draw-line-x"></div>

      <!-- Text -->
      <div>
        <h1 class="text-3xl sm:text-5xl font-light text-gray-800 leading-tight">But to deliver</h1>
        <p class="text-gray-700 text-lg sm:text-2xl mt-2">
          <span class="font-bold tracking-wide text-2xl sm:text-3xl">Simple Solutions</span>
          that can be used <br class="hidden sm:block" />
          <span class="italic text-gray-500">before learning</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes drawX {
  from {
    transform: scaleX(0);
    opacity: 0;
  }
  to {
    transform: scaleX(1);
    opacity: 1;
  }
}
@keyframes drawY {
  from {
    transform: scaleY(0);
    opacity: 0;
  }
  to {
    transform: scaleY(1);
    opacity: 1;
  }
}

.animate-draw-line-x {
  transform-origin: left;
  animation: drawX 1.2s ease-out forwards;
}
.animate-draw-line-y {
  transform-origin: top;
  animation: drawY 1.2s ease-out forwards;
  animation-delay: 0.5s;
}
</style>
