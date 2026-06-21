<template>
  <div>
    <section class="pt-40 pb-20 relative overflow-hidden hero-grid" style="background: var(--color-bg)">
      <div class="absolute inset-0 opacity-10" style="background: radial-gradient(circle at 40% 50%, var(--color-accent), transparent 60%)" />
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
        <p class="section-subtitle mb-4">Elite Coaching</p>
        <h1 class="section-title mb-6">{{ $t('nav.training') }}</h1>
        <p class="text-lg max-w-2xl" style="color: var(--color-text-secondary)">
          Experience one-on-one coaching with our certified elite trainers, each session designed specifically for your goals and fitness level.
        </p>
        <div class="flex gap-4 mt-8">
          <NuxtLink :to="localePath('/trainers')" class="btn-primary">Meet Our Trainers</NuxtLink>
          <NuxtLink :to="localePath('/contact')" class="btn-outline">Book Consultation</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Process -->
    <section class="py-20" style="background: var(--color-surface)">
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
        <div class="text-center mb-16">
          <h2 class="section-title">How It Works</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div v-for="(step, i) in steps" :key="step.title" class="text-center relative">
            <div class="w-16 h-16 rounded-sm flex items-center justify-center mx-auto mb-6 font-display text-2xl text-black" :style="{ background: 'var(--color-accent)' }">{{ i + 1 }}</div>
            <h3 class="font-heading font-bold text-base uppercase tracking-wider mb-2" style="color: var(--color-text-primary)">{{ step.title }}</h3>
            <p class="text-sm" style="color: var(--color-text-muted)">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <SectionsFeaturedTrainers />
    <SectionsNewsletterSection />
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
useHead({ title: 'Personal Training — APEX FITNESS' })

const steps = [
  { title: 'Consultation', desc: 'Free 30-minute consultation to discuss your goals, history, and current fitness level.' },
  { title: 'Assessment', desc: 'Comprehensive fitness assessment including strength, mobility, and body composition analysis.' },
  { title: 'Program Design', desc: 'Your trainer creates a custom periodized program tailored specifically to your goals.' },
  { title: 'Train & Progress', desc: 'Regular sessions with ongoing adjustments to keep you progressing toward your goals.' },
]
</script>
