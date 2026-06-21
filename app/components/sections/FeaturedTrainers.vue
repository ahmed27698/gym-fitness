<template>
  <section ref="sectionRef" class="py-28" style="background: var(--color-bg)">
    <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
      <!-- Header -->
      <div ref="headerRef" class="flex flex-col md:flex-row md:items-end justify-between mb-16">
        <div>
          <p class="section-subtitle mb-4">{{ $t('trainers.subtitle') }}</p>
          <h2 class="section-title">{{ $t('trainers.title') }}</h2>
        </div>
        <NuxtLink
          :to="localePath('/trainers')"
          class="btn-outline mt-6 md:mt-0 self-start md:self-auto"
        >
          {{ $t('trainers.view_all') }}
        </NuxtLink>
      </div>

      <!-- Trainers Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(trainer, i) in featuredTrainers"
          :key="trainer.id"
          class="group relative overflow-hidden rounded-sm card-glass"
        >
          <!-- Image -->
          <div class="relative overflow-hidden" style="aspect-ratio: 3/4">
            <img
              :src="trainer.image"
              :alt="trainer.name"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div
              class="absolute inset-0"
              style="background: linear-gradient(to top, var(--color-bg) 30%, transparent 70%)"
            />

            <!-- Overlay on hover -->
            <div
              class="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
              style="background: rgba(0,0,0,0.5); backdrop-filter: blur(8px)"
            >
              <NuxtLink
                :to="localePath('/personal-training')"
                class="btn-primary text-sm px-6 py-2"
              >
                {{ $t('trainers.book_session') }}
              </NuxtLink>
              <div class="flex gap-3">
                <a
                  v-for="s in socialIcons"
                  :key="s.label"
                  href="#"
                  class="w-9 h-9 glass rounded-sm flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style="color: var(--color-text-primary)"
                >
                  <component :is="s.icon" class="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <!-- Info -->
          <div class="p-6">
            <h3 class="font-heading font-bold text-xl uppercase tracking-wider mb-1" style="color: var(--color-text-primary)">
              {{ trainer.name }}
            </h3>
            <p class="text-sm font-heading uppercase tracking-widest mb-4" style="color: var(--color-accent)">
              {{ trainer.title }}
            </p>

            <!-- Stats Row -->
            <div class="flex gap-4">
              <div class="flex flex-col">
                <span class="font-display text-2xl" style="color: var(--color-accent)">{{ trainer.experience }}</span>
                <span class="text-xs uppercase tracking-wider" style="color: var(--color-text-muted)">{{ $t('trainers.years') }}</span>
              </div>
              <div class="w-[1px]" style="background: var(--color-border)" />
              <div class="flex flex-col">
                <span class="font-display text-2xl" style="color: var(--color-accent)">{{ trainer.clients }}+</span>
                <span class="text-xs uppercase tracking-wider" style="color: var(--color-text-muted)">{{ $t('trainers.clients') }}</span>
              </div>
              <div class="w-[1px]" style="background: var(--color-border)" />
              <div class="flex flex-col">
                <span class="font-display text-2xl" style="color: var(--color-accent)">{{ trainer.rating }}</span>
                <span class="text-xs uppercase tracking-wider" style="color: var(--color-text-muted)">Rating</span>
              </div>
            </div>

            <!-- Certifications -->
            <div class="flex flex-wrap gap-2 mt-4">
              <span
                v-for="cert in trainer.certifications.slice(0, 3)"
                :key="cert"
                class="text-xs px-2 py-1 rounded-sm font-heading uppercase tracking-wider"
                style="background: var(--color-surface-raised); color: var(--color-text-muted); border: 1px solid var(--color-border)"
              >
                {{ cert }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Instagram, Twitter, Youtube } from 'lucide-vue-next'
import trainersData from '~/data/trainers.json'

const localePath = useLocalePath()
const { $gsap, $ScrollTrigger } = useNuxtApp()
const sectionRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)

const featuredTrainers = trainersData.filter((t) => t.featured)

const socialIcons = [
  { label: 'Instagram', icon: Instagram },
  { label: 'Twitter', icon: Twitter },
  { label: 'YouTube', icon: Youtube },
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
    sectionRef.value?.querySelectorAll('.card-glass'),
    { opacity: 0, y: 60, scale: 0.95 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.value, start: 'top 70%' },
    }
  )
})
</script>
