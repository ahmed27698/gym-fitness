<template>
  <div>
    <section class="pt-40 pb-20 relative overflow-hidden hero-grid" style="background: var(--color-bg)">
      <div class="absolute inset-0 opacity-10" style="background: radial-gradient(circle at 60% 50%, var(--color-accent), transparent 60%)" />
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
        <p class="section-subtitle mb-4">{{ $t('nutrition.subtitle') }}</p>
        <h1 class="section-title mb-6">{{ $t('nutrition.title') }}</h1>
        <p class="text-lg max-w-2xl" style="color: var(--color-text-secondary)">
          Optimize your performance with science-backed nutrition strategies, personalized meal plans, and expert guidance from our registered dietitians.
        </p>
      </div>
    </section>

    <!-- Nutrition Services -->
    <section class="py-20" style="background: var(--color-surface)">
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="service in services" :key="service.title" class="card-glass rounded-sm p-8">
            <component :is="service.icon" class="w-10 h-10 mb-6" :style="{ color: 'var(--color-accent)' }" />
            <h3 class="font-heading font-bold text-xl uppercase tracking-wider mb-4" style="color: var(--color-text-primary)">{{ service.title }}</h3>
            <p class="text-sm leading-relaxed" style="color: var(--color-text-muted)">{{ service.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Meal Plan Preview -->
    <section class="py-20" style="background: var(--color-bg)">
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
        <div class="text-center mb-16">
          <p class="section-subtitle mb-4">Sample Meal Plans</p>
          <h2 class="section-title">Fuel Like a Champion</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="meal in mealPlans" :key="meal.name" class="card-glass rounded-sm overflow-hidden">
            <div class="overflow-hidden" style="aspect-ratio: 1">
              <img :src="meal.image" :alt="meal.name" class="w-full h-full object-cover" />
            </div>
            <div class="p-4">
              <h3 class="font-heading font-bold text-sm uppercase tracking-wider mb-1" style="color: var(--color-text-primary)">{{ meal.name }}</h3>
              <div class="flex gap-3 mt-2">
                <span class="text-xs px-2 py-1 rounded-sm" style="background: var(--color-surface-raised); color: var(--color-accent)">{{ meal.calories }} cal</span>
                <span class="text-xs px-2 py-1 rounded-sm" style="background: var(--color-surface-raised); color: var(--color-text-muted)">{{ meal.protein }}g protein</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <SectionsNewsletterSection />
  </div>
</template>

<script setup lang="ts">
import { Apple, BarChart2, Users } from 'lucide-vue-next'

useHead({ title: 'Nutrition — APEX FITNESS' })

const services = [
  { title: 'Personalized Meal Plans', icon: Apple, desc: 'Custom meal plans designed by our registered dietitians based on your goals, preferences, and lifestyle.' },
  { title: 'Macro Tracking', icon: BarChart2, desc: 'Learn to optimize your protein, carbs, and fat intake for maximum performance and body composition.' },
  { title: 'Group Workshops', icon: Users, desc: 'Regular nutrition workshops and seminars covering sports nutrition, supplements, and healthy eating habits.' },
]

const mealPlans = [
  { name: 'Performance Breakfast', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=400&fit=crop', calories: 620, protein: 45 },
  { name: 'Power Lunch', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=400&fit=crop', calories: 780, protein: 55 },
  { name: 'Recovery Dinner', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop', calories: 680, protein: 48 },
  { name: 'Post-Workout Snack', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop', calories: 280, protein: 30 },
]
</script>
