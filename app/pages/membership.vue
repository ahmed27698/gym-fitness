<template>
  <div>
    <!-- Hero -->
    <section class="pt-40 pb-20 relative overflow-hidden hero-grid" style="background: var(--color-bg)">
      <div class="absolute inset-0 opacity-10" style="background: radial-gradient(circle at 70% 50%, var(--color-accent-secondary), transparent 60%)" />
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12 text-center">
        <p class="section-subtitle mb-4">{{ $t('membership.subtitle') }}</p>
        <h1 class="section-title mb-6">{{ $t('membership.title') }}</h1>
        <p class="text-lg max-w-2xl mx-auto" style="color: var(--color-text-secondary)">
          Choose the plan that fits your goals and lifestyle. Every plan includes access to our premium facilities and world-class coaching team.
        </p>
      </div>
    </section>

    <SectionsMembershipPlansSection />

    <!-- Features Grid -->
    <section class="py-20" style="background: var(--color-surface)">
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
        <div class="text-center mb-16">
          <h2 class="section-title">What's Included</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="feature in includedFeatures" :key="feature.title" class="card-glass rounded-sm p-6 text-center">
            <component :is="feature.icon" class="w-8 h-8 mx-auto mb-4" :style="{ color: 'var(--color-accent)' }" />
            <h3 class="font-heading font-bold text-base uppercase tracking-wider mb-2" style="color: var(--color-text-primary)">{{ feature.title }}</h3>
            <p class="text-sm" style="color: var(--color-text-muted)">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <SectionsNewsletterSection />
  </div>
</template>

<script setup lang="ts">
import { Dumbbell, Users, Apple, Activity, Wifi, Lock } from 'lucide-vue-next'

useHead({ title: 'Membership — APEX FITNESS' })

const includedFeatures = [
  { title: 'State-of-Art Equipment', icon: Dumbbell, desc: '200+ pieces of premium equipment from top brands' },
  { title: 'Expert Community', icon: Users, desc: 'Join 15,000+ motivated members on their fitness journey' },
  { title: 'Nutrition Support', icon: Apple, desc: 'Access to dietitians and nutrition resources' },
  { title: 'Progress Tracking', icon: Activity, desc: 'Advanced tracking tools and body composition analysis' },
  { title: 'Digital Access', icon: Wifi, desc: 'Full mobile app access with workout libraries' },
  { title: 'Secure Access', icon: Lock, desc: '24/7 key fob entry for eligible memberships' },
]
</script>
