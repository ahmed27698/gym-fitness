<template>
  <section ref="sectionRef" class="py-28" style="background: var(--color-bg-secondary)">
    <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
      <div ref="headerRef" class="text-center mb-16">
        <p class="section-subtitle mb-4">{{ $t('categories.subtitle') }}</p>
        <h2 class="section-title">{{ $t('categories.title') }}</h2>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <NuxtLink
          v-for="(cat, i) in categories"
          :key="cat.key"
          :to="localePath('/classes')"
          class="group relative overflow-hidden rounded-sm flex flex-col items-center justify-end p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02]"
          style="aspect-ratio: 3/4; border: 1px solid var(--color-border)"
        >
          <!-- Background -->
          <img
            :src="cat.image"
            :alt="$t(`categories.${cat.key}`)"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60"
          />
          <div
            class="absolute inset-0 transition-all duration-300"
            :style="{
              background: `linear-gradient(to top, ${cat.color}ee 0%, ${cat.color}44 40%, transparent 70%)`,
            }"
          />

          <!-- Icon -->
          <div
            class="absolute top-4 left-4 w-10 h-10 rounded-sm flex items-center justify-center transition-all duration-300 group-hover:scale-125"
            :style="{ background: cat.color + '33', border: `1px solid ${cat.color}66` }"
          >
            <component :is="cat.icon" class="w-5 h-5" :style="{ color: cat.color }" />
          </div>

          <!-- Label -->
          <div class="relative z-10 text-center">
            <h3 class="font-display text-xl uppercase tracking-widest text-white mb-2">
              {{ $t(`categories.${cat.key}`) }}
            </h3>
            <div
              class="flex items-center justify-center gap-1 text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
              :style="{ color: cat.color }"
            >
              {{ $t('categories.explore') }}
              <ArrowRight class="w-3 h-3" />
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Dumbbell, Heart, Lotus, Swords, Flame, Bike, PersonStanding, Waves, ArrowRight } from 'lucide-vue-next'

const localePath = useLocalePath()
const { $gsap, $ScrollTrigger } = useNuxtApp()
const sectionRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)

const categories = [
  { key: 'strength', icon: Dumbbell, color: '#00d4ff', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=400&fit=crop' },
  { key: 'cardio', icon: Heart, color: '#ff1744', image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=300&h=400&fit=crop' },
  { key: 'yoga', icon: PersonStanding, color: '#9c27b0', image: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=300&h=400&fit=crop' },
  { key: 'boxing', icon: Swords, color: '#ff6d00', image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=300&h=400&fit=crop' },
  { key: 'crossfit', icon: Flame, color: '#ff1744', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop' },
  { key: 'cycling', icon: Bike, color: '#ffd700', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=400&fit=crop' },
  { key: 'pilates', icon: PersonStanding, color: '#00e676', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&h=400&fit=crop' },
  { key: 'swimming', icon: Waves, color: '#00bcd4', image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=300&h=400&fit=crop' },
]

onMounted(() => {
  if (!$gsap || !$ScrollTrigger) return
  const gsap = $gsap as any

  gsap.fromTo(
    headerRef.value,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: { trigger: headerRef.value, start: 'top 80%' },
    }
  )

  gsap.fromTo(
    sectionRef.value?.querySelectorAll('.grid > a'),
    { opacity: 0, y: 50, scale: 0.9 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.value, start: 'top 70%' },
    }
  )
})
</script>
