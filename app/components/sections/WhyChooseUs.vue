<template>
  <section ref="sectionRef" class="py-28" style="background: var(--color-bg-secondary)">
    <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <!-- Left: Content -->
        <div>
          <p ref="subtitleRef" class="section-subtitle mb-4">{{ $t('why_us.subtitle') }}</p>
          <h2 ref="titleRef" class="section-title mb-8">{{ $t('why_us.title') }}</h2>
          <div class="grid grid-cols-1 gap-6">
            <div
              v-for="(feature, i) in features"
              :key="feature.key"
              ref="featureRefs"
              class="flex gap-4 group"
            >
              <div
                class="w-12 h-12 flex-shrink-0 rounded-sm flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                :style="{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }"
              >
                <component :is="feature.icon" class="w-5 h-5" :style="{ color: 'var(--color-accent)' }" />
              </div>
              <div>
                <h3 class="font-heading font-semibold text-base uppercase tracking-wider mb-1" style="color: var(--color-text-primary)">
                  {{ $t(`why_us.${feature.key}`) }}
                </h3>
                <p class="text-sm leading-relaxed" style="color: var(--color-text-muted)">
                  {{ $t(`why_us.${feature.key}_desc`) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Image Grid -->
        <div ref="imageGridRef" class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-4">
            <div class="rounded-sm overflow-hidden" style="aspect-ratio: 3/4">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=500&fit=crop"
                alt="Gym"
                class="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
            <div
              class="rounded-sm p-6 flex flex-col gap-2"
              style="background: var(--color-surface); border: 1px solid var(--color-border)"
            >
              <span class="font-display text-4xl" style="color: var(--color-accent)">90</span>
              <span class="text-xs uppercase tracking-widest" style="color: var(--color-text-muted)">Day Results Guarantee</span>
            </div>
          </div>
          <div class="flex flex-col gap-4 mt-8">
            <div
              class="rounded-sm p-6 flex flex-col gap-2"
              style="background: var(--color-accent); border: 1px solid var(--color-border)"
            >
              <span class="font-display text-4xl text-black">24/7</span>
              <span class="text-xs uppercase tracking-widest text-black opacity-70">Access</span>
            </div>
            <div class="rounded-sm overflow-hidden" style="aspect-ratio: 3/4">
              <img
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=500&fit=crop"
                alt="Training"
                class="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Dumbbell, UserCheck, Users, FlaskConical, Apple, Trophy } from 'lucide-vue-next'

const { $gsap, $ScrollTrigger } = useNuxtApp()
const sectionRef = ref<HTMLElement | null>(null)
const subtitleRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const imageGridRef = ref<HTMLElement | null>(null)

const features = [
  { key: 'equipment', icon: Dumbbell },
  { key: 'trainers', icon: UserCheck },
  { key: 'community', icon: Users },
  { key: 'science', icon: FlaskConical },
  { key: 'nutrition_support', icon: Apple },
  { key: 'results', icon: Trophy },
]

onMounted(() => {
  if (!$gsap || !$ScrollTrigger) return
  const gsap = $gsap as any

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top 70%',
    },
  })

  tl.fromTo(
    [subtitleRef.value, titleRef.value],
    { opacity: 0, x: -40 },
    { opacity: 1, x: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' }
  )
    .fromTo(
      sectionRef.value?.querySelectorAll('.flex.gap-4.group'),
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
      '-=0.3'
    )
    .fromTo(
      imageGridRef.value,
      { opacity: 0, x: 60, scale: 0.95 },
      { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.8'
    )
})
</script>
