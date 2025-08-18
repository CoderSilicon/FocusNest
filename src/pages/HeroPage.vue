<template>
  <div
    class="min-h-screen bg-gradient-to-br from-zinc-50 via-neutral-50 to-stone-50 flex items-center justify-center px-6 overflow-hidden relative josefin-sans"
  >
    <div
      class="absolute inset-0 opacity-30 transition-all duration-1000 ease-out"
      :style="{
        background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0,0,0,0.02) 0%, transparent 50%)`,
      }"
    />

    <div class="absolute inset-0 pointer-events-none">
      <div
        class="absolute w-96 h-96 border border-neutral-200/30 rounded-full transition-transform duration-[3000ms] ease-out"
        :style="{
          top: '10%',
          right: '15%',
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px) rotate(${mousePosition.x * 0.1}deg)`,
        }"
      />
      <div
        class="absolute w-64 h-64 border border-neutral-200/20 rounded-full transition-transform duration-[4000ms] ease-out"
        :style="{
          bottom: '20%',
          left: '10%',
          transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px) rotate(${mousePosition.x * -0.08}deg)`,
        }"
      />
    </div>

    <div class="max-w-5xl w-full relative z-10">
      <div
        :class="`space-y-12 transition-all duration-1500 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`"
      >
        <div class="space-y-4 group">
          <div class="relative">
            <h1
              class="text-[clamp(4rem,12vw,10rem)] font-extralight tracking-[-0.02em] text-neutral-900 leading-[0.85] select-none"
            >
              Fleuris
            </h1>
            <div
              class="absolute inset-0 text-[clamp(4rem,12vw,10rem)] font-extralight tracking-[-0.02em] text-neutral-900/5 leading-[0.85] blur-sm -z-10"
            >
              Fleuris
            </div>
          </div>

          <div class="relative ml-2">
            <div
              class="w-32 h-[1px] bg-gradient-to-r from-neutral-400 via-neutral-300 to-transparent opacity-60 transition-all duration-700 group-hover:w-40 group-hover:opacity-80"
            ></div>
            <div
              class="absolute top-0 left-0 w-8 h-[1px] bg-neutral-600 transition-all duration-1000 group-hover:w-16"
            ></div>
          </div>
        </div>

        <div
          :class="`space-y-10 ml-2 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`"
        >
          <div class="space-y-1">
            <p
              class="text-[clamp(1.5rem,4vw,2.5rem)] text-neutral-500 font-light leading-tight tracking-wide"
            >
              is an attempt to make
            </p>
            <div
              class="w-6 h-[0.5px] bg-neutral-300 ml-1 transition-all duration-500 hover:w-12"
            ></div>
          </div>

          <div class="space-y-4 group/feature">
            <div class="relative">
              <h2
                class="text-[clamp(3rem,8vw,6rem)] font-extralight tracking-[-0.01em] text-neutral-900 leading-[0.9] transition-all duration-300 group-hover/feature:tracking-[-0.02em]"
              >
                Time Management
              </h2>
              <div
                class="absolute inset-0 text-[clamp(3rem,8vw,6rem)] font-extralight tracking-[-0.01em] text-neutral-900/3 leading-[0.9] blur-[1px] -z-10"
              >
                Time Management
              </div>
            </div>

            <div class="flex items-center space-x-3 ml-1">
              <div
                class="w-20 h-[1px] bg-gradient-to-r from-neutral-400 to-transparent transition-all duration-500 group-hover/feature:w-28"
              ></div>
              <div
                class="w-1 h-1 bg-neutral-400 rounded-full transition-all duration-300 group-hover/feature:scale-125"
              ></div>
              <div
                class="w-8 h-[0.5px] bg-neutral-300 transition-all duration-500 group-hover/feature:w-12"
              ></div>
            </div>
          </div>

          <div class="space-y-2">
            <p
              class="text-[clamp(1.5rem,4vw,2.5rem)] text-neutral-500 font-light leading-tight tracking-wide"
            >
              easier for students.
            </p>
            <div
              class="w-4 h-[0.5px] bg-neutral-300 ml-1 transition-all duration-700 hover:w-8"
            ></div>
          </div>
        </div>

        <div
          :class="`pt-16 ml-2 transition-all duration-1200 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`"
        >
          <div
            class="group/cta flex items-center space-x-6 text-neutral-400 hover:text-neutral-600 transition-all duration-500 cursor-pointer"
          >
            <div class="flex items-center space-x-4">
              <div
                class="w-12 h-[1px] bg-gradient-to-r from-neutral-400 to-neutral-300 transition-all duration-500 group-hover/cta:w-16 group-hover/cta:from-neutral-600"
              ></div>
              <div
                class="w-1.5 h-1.5 bg-neutral-400 rounded-full transition-all duration-300 group-hover/cta:scale-125 group-hover/cta:bg-neutral-600"
              ></div>
              <div
                class="w-8 h-[0.5px] bg-neutral-300 transition-all duration-500 group-hover/cta:w-12"
              ></div>
            </div>
            <span
              class="text-sm font-light tracking-[0.2em] uppercase transition-all duration-300 group-hover/cta:tracking-[0.25em]"
            >
              without any hassle
            </span>
          </div>
        </div>
      </div>

      <div
        class="absolute top-1/4 right-1/6 w-[1px] h-40 bg-gradient-to-b from-transparent via-neutral-300/40 to-transparent rotate-12 hidden lg:block transition-transform duration-[2000ms] ease-out"
        :style="{ transform: `rotate(12deg) translateY(${mousePosition.y * 0.05}px)` }"
      ></div>
      <div
        class="absolute bottom-1/3 left-1/5 w-[0.5px] h-32 bg-gradient-to-t from-transparent via-neutral-300/30 to-transparent -rotate-12 hidden lg:block transition-transform duration-[2500ms] ease-out"
        :style="{ transform: `rotate(-12deg) translateY(${mousePosition.y * -0.03}px)` }"
      ></div>

      <div
        class="absolute top-1/3 left-1/3 w-1 h-1 bg-neutral-400/60 rounded-full hidden xl:block transition-transform duration-[1800ms] ease-out"
        :style="{
          transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
        }"
      ></div>
      <div
        class="absolute bottom-1/2 right-1/3 w-0.5 h-0.5 bg-neutral-300/80 rounded-full hidden xl:block transition-transform duration-[2200ms] ease-out"
        :style="{
          transform: `translate(${mousePosition.x * -0.008}px, ${mousePosition.y * -0.008}px)`,
        }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const mousePosition = ref({ x: 0, y: 0 })
const isLoaded = ref(false)

const handleMouseMove = (e: MouseEvent) => {
  mousePosition.value = {
    x: (e.clientX / window.innerWidth) * 100,
    y: (e.clientY / window.innerHeight) * 100,
  }
}

onMounted(() => {
  isLoaded.value = true
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>
