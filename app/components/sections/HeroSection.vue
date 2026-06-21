<template>
  <section
    ref="heroRef"
    class="relative min-h-screen flex items-center overflow-hidden hero-grid"
    style="background: var(--color-bg)"
  >
    <!-- Background Gradient Orbs -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        ref="orb1Ref"
        class="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
        style="background: var(--color-accent); top: -100px; left: -100px"
      />
      <div
        ref="orb2Ref"
        class="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-15"
        style="background: var(--color-accent-secondary); bottom: -100px; right: -100px"
      />
    </div>

    <!-- Video/Image Background -->
    <div class="absolute inset-0 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=1080&fit=crop"
        alt="Hero"
        class="w-full h-full object-cover opacity-10"
      />
      <div
        class="absolute inset-0"
        style="background: linear-gradient(to right, var(--color-bg) 40%, transparent 100%)"
      />
    </div>

    <!-- Content -->
    <div class="relative max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12 pt-32 pb-20">
      <div class="max-w-4xl">
        <!-- Tagline -->
        <div ref="taglineRef" class="flex items-center gap-4 mb-6">
          <div class="h-[1px] w-12" style="background: var(--color-accent)" />
          <span
            class="font-heading text-sm uppercase tracking-[0.3em] font-semibold"
            style="color: var(--color-accent)"
          >
            {{ $t('hero.subtitle') }}
          </span>
        </div>

        <!-- Main Headline -->
        <h1
          ref="headlineRef"
          class="font-display text-7xl md:text-9xl lg:text-[140px] uppercase leading-[0.9] mb-8 overflow-hidden"
          style="color: var(--color-text-primary)"
        >
          <span class="block overflow-hidden">
            <span ref="line1Ref" class="block">FORGE</span>
          </span>
          <span class="block overflow-hidden">
            <span ref="line2Ref" class="block gradient-text">YOUR</span>
          </span>
          <span class="block overflow-hidden">
            <span ref="line3Ref" class="block">LEGACY</span>
          </span>
        </h1>

        <!-- Description -->
        <p
          ref="descRef"
          class="text-lg md:text-xl max-w-xl leading-relaxed mb-10"
          style="color: var(--color-text-secondary)"
        >
          {{ $t('hero.description') }}
        </p>

        <!-- CTAs -->
        <div ref="ctaRef" class="flex flex-wrap gap-4 mb-16">
          <NuxtLink :to="localePath('/membership')" class="btn-primary text-base px-10 py-4">
            <span class="flex items-center gap-2">
              {{ $t('hero.cta_primary') }}
              <ArrowRight class="w-4 h-4" />
            </span>
          </NuxtLink>
          <NuxtLink :to="localePath('/classes')" class="btn-outline text-base px-10 py-4">
            {{ $t('hero.cta_secondary') }}
          </NuxtLink>
        </div>

        <!-- Stats -->
        <div ref="statsRef" class="flex flex-wrap gap-8 md:gap-12">
          <div
            v-for="stat in stats"
            :key="stat.key"
            class="flex flex-col"
          >
            <span
              class="font-display text-4xl md:text-5xl"
              :style="{ color: 'var(--color-accent)' }"
            >
              {{ stat.value }}
            </span>
            <span class="text-xs uppercase tracking-widest mt-1" style="color: var(--color-text-muted)">
              {{ $t(`hero.${stat.key}`) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div
        ref="scrollRef"
        class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span class="text-xs uppercase tracking-[0.3em]" style="color: var(--color-text-muted)">
          {{ $t('hero.scroll_down') }}
        </span>
        <div
          class="w-[1px] h-12 relative overflow-hidden"
          style="background: var(--color-border)"
        >
          <div
            class="absolute top-0 w-full h-1/2"
            style="background: var(--color-accent); animation: scroll-line 2s ease-in-out infinite"
          />
        </div>
        <ChevronDown class="w-4 h-4 animate-bounce" style="color: var(--color-accent)" />
      </div>
    </div>

    <!-- Right Side Floating Element -->
    <div
      ref="floatingRef"
      class="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4 items-center"
    >
      <div class="w-[1px] h-24" style="background: var(--color-border)" />
      <span
        class="text-xs uppercase tracking-[0.4em] -rotate-90 whitespace-nowrap"
        style="color: var(--color-text-muted)"
      >
        PREMIUM FITNESS
      </span>
      <div class="w-[1px] h-24" style="background: var(--color-border)" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight, ChevronDown } from 'lucide-vue-next'

const localePath = useLocalePath()
const { $gsap, $ScrollTrigger } = useNuxtApp()

const heroRef = ref<HTMLElement | null>(null)
const orb1Ref = ref<HTMLElement | null>(null)
const orb2Ref = ref<HTMLElement | null>(null)
const taglineRef = ref<HTMLElement | null>(null)
const headlineRef = ref<HTMLElement | null>(null)
const line1Ref = ref<HTMLElement | null>(null)
const line2Ref = ref<HTMLElement | null>(null)
const line3Ref = ref<HTMLElement | null>(null)
const descRef = ref<HTMLElement | null>(null)
const ctaRef = ref<HTMLElement | null>(null)
const statsRef = ref<HTMLElement | null>(null)
const scrollRef = ref<HTMLElement | null>(null)
const floatingRef = ref<HTMLElement | null>(null)

const stats = [
  { key: 'stat_members', value: '15K+' },
  { key: 'stat_trainers', value: '80+' },
  { key: 'stat_programs', value: '50+' },
  { key: 'stat_locations', value: '12' },
]

onMounted(() => {
  if (!$gsap) return

  const gsap = $gsap as any

  // Orb animation
  gsap.to(orb1Ref.value, {
    x: 50,
    y: 30,
    duration: 8,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  })

  gsap.to(orb2Ref.value, {
    x: -40,
    y: -50,
    duration: 10,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  })

  // Entrance timeline
  const tl = gsap.timeline({ delay: 0.2 })

  tl.fromTo(
    taglineRef.value,
    { opacity: 0, x: -30 },
    { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }
  )
    .fromTo(
      [line1Ref.value, line2Ref.value, line3Ref.value],
      { y: '110%' },
      { y: '0%', duration: 0.8, stagger: 0.1, ease: 'power4.out' },
      '-=0.3'
    )
    .fromTo(
      descRef.value,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo(
      ctaRef.value,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
      '-=0.3'
    )
    .fromTo(
      statsRef.value?.children ? Array.from(statsRef.value.children) : [],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power3.out' },
      '-=0.2'
    )

  // Floating element
  if (floatingRef.value) {
    gsap.fromTo(
      floatingRef.value,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.8, delay: 1, ease: 'power3.out' }
    )
  }

  // Parallax on scroll
  if ($ScrollTrigger) {
    const ST = $ScrollTrigger as any
    ST.create({
      trigger: heroRef.value,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self: any) => {
        if (headlineRef.value) {
          gsap.set(headlineRef.value, { y: self.progress * 100 })
        }
      },
    })
  }
})
</script>

<style scoped>
@keyframes scroll-line {
  0% { transform: translateY(-100%) }
  100% { transform: translateY(200%) }
}
</style>
