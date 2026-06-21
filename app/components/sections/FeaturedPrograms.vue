<template>
  <section ref="sectionRef" class="py-28 relative" style="background: var(--color-bg)">
    <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
      <!-- Header -->
      <div ref="headerRef" class="text-center mb-16">
        <p class="section-subtitle mb-4">{{ $t('programs.subtitle') }}</p>
        <h2 class="section-title">{{ $t('programs.title') }}</h2>
      </div>

      <!-- Programs Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(program, i) in programs"
          :key="program.key"
          ref="cardRefs"
          class="group relative overflow-hidden rounded-sm card-glass cursor-pointer"
          style="aspect-ratio: 4/3"
          @mouseenter="hoveredIndex = i"
          @mouseleave="hoveredIndex = null"
        >
          <!-- Background Image -->
          <img
            :src="program.image"
            :alt="$t(`programs.${program.key}`)"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <!-- Overlay -->
          <div
            class="absolute inset-0 transition-all duration-500"
            :style="{
              background: `linear-gradient(to top, ${program.color}dd 0%, ${program.color}44 50%, transparent 100%)`,
              opacity: hoveredIndex === i ? 1 : 0.7,
            }"
          />
          <div
            class="absolute inset-0"
            style="background: linear-gradient(to top, var(--color-bg) 0%, transparent 60%)"
          />

          <!-- Content -->
          <div class="absolute bottom-0 left-0 right-0 p-6">
            <div
              class="w-12 h-12 rounded-sm flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
              :style="{ background: program.color + '33', border: `1px solid ${program.color}66` }"
            >
              <component :is="program.icon" class="w-6 h-6" :style="{ color: program.color }" />
            </div>
            <h3 class="font-heading font-bold text-xl uppercase tracking-wider mb-2" style="color: var(--color-text-primary)">
              {{ $t(`programs.${program.key}`) }}
            </h3>
            <p
              class="text-sm leading-relaxed transition-all duration-300 max-h-0 overflow-hidden group-hover:max-h-20"
              style="color: var(--color-text-secondary)"
            >
              {{ $t(`programs.${program.key}_desc`) }}
            </p>
            <div
              class="flex items-center gap-2 mt-4 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
            >
              <span class="text-xs uppercase tracking-widest font-heading font-semibold" :style="{ color: program.color }">
                {{ $t('programs.learn_more') }}
              </span>
              <ArrowRight class="w-4 h-4" :style="{ color: program.color }" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight, Dumbbell, Heart, Zap, Flame, Trophy, Apple } from 'lucide-vue-next'

const { $gsap, $ScrollTrigger } = useNuxtApp()
const sectionRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const hoveredIndex = ref<number | null>(null)

const programs = [
  {
    key: 'strength',
    icon: Dumbbell,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop',
    color: '#00d4ff',
  },
  {
    key: 'cardio',
    icon: Heart,
    image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=600&h=400&fit=crop',
    color: '#ff1744',
  },
  {
    key: 'hiit',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
    color: '#ff6d00',
  },
  {
    key: 'flexibility',
    icon: Trophy,
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop',
    color: '#9c27b0',
  },
  {
    key: 'sports',
    icon: Flame,
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&h=400&fit=crop',
    color: '#00e676',
  },
  {
    key: 'nutrition',
    icon: Apple,
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop',
    color: '#ffd700',
  },
]

onMounted(() => {
  if (!$gsap || !$ScrollTrigger) return
  const gsap = $gsap as any
  const ST = $ScrollTrigger as any

  gsap.fromTo(
    headerRef.value,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: headerRef.value,
        start: 'top 80%',
      },
    }
  )

  const cards = sectionRef.value?.querySelectorAll('.card-glass')
  if (cards) {
    gsap.fromTo(
      cards,
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top 70%',
        },
      }
    )
  }
})
</script>
