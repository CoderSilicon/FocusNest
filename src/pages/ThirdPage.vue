<template>
  <div
    class="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-50 via-neutral-50 to-stone-50 text-gray-800 p-6 josefin-sans"
  >
    <!-- Background Minimal Shapes -->
    <div class="absolute inset-0 -z-10 overflow-hidden">
      <!-- Circle -->
      <div
        class="absolute top-1/4 left-1/4 w-64 h-64 rounded-full border border-gray-200 opacity-40 animate-float-slow"
      ></div>

      <!-- Line -->
      <div
        class="absolute bottom-1/3 right-1/4 w-72 h-[1px] bg-gray-300 opacity-30 rotate-12 animate-float"
      ></div>

      <!-- Small Circle -->
      <div
        class="absolute top-2/3 left-1/3 w-20 h-20 rounded-full border border-gray-300 opacity-30 animate-float-reverse"
      ></div>
    </div>

    <!-- Quote Section -->
    <blockquote class="text-center max-w-3xl px-4">
      <p class="text-3xl md:text-5xl font-light leading-relaxed tracking-wide">
        "Simplicity is the ultimate sophistication."
      </p>
      <footer class="mt-6 text-lg text-gray-500">— Leonardo da Vinci</footer>
    </blockquote>

    <!-- Divider Line -->
    <div class="w-24 h-[2px] bg-gray-300 rounded-full mt-10"></div>

    <!-- Sub Text -->
    <p class="text-center text-lg md:text-xl text-gray-600 mt-8 max-w-lg leading-relaxed">
      We have served our purpose. May this solution bring clarity, focus, and progress to you. ✨
    </p>
  </div>
</template>

<style scoped>
/* Gentle fade-in effect */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

blockquote p,
blockquote footer,
.w-24,
p {
  animation: fadeInUp 1s ease forwards;
}

blockquote footer {
  animation-delay: 0.3s;
}
.w-24 {
  animation-delay: 0.6s;
}
p {
  animation-delay: 0.9s;
}

/* Floating minimal shapes */
@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-12px) rotate(2deg);
  }
}

@keyframes floatSlow {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-20px) scale(1.05);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
.animate-float-reverse {
  animation: float 7s ease-in-out infinite reverse;
}
.animate-float-slow {
  animation: floatSlow 10s ease-in-out infinite;
}
</style>
