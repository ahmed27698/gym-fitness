<template>
  <div>
    <!-- Hero -->
    <section class="pt-40 pb-20 relative overflow-hidden hero-grid" style="background: var(--color-bg)">
      <div class="absolute inset-0 opacity-10" style="background: radial-gradient(circle at 50% 50%, var(--color-accent), transparent 60%)" />
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12 text-center">
        <p class="section-subtitle mb-4">{{ $t('categories.subtitle') }}</p>
        <h1 class="section-title">{{ $t('nav.classes') }}</h1>
      </div>
    </section>

    <!-- Filter Bar -->
    <section class="py-8 sticky top-20 z-10 glass-strong" style="border-bottom: 1px solid var(--color-border)">
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
        <div class="flex flex-wrap gap-3 items-center justify-between">
          <div class="flex flex-wrap gap-2">
            <button
              v-for="cat in ['All', ...categories]"
              :key="cat"
              class="px-4 py-2 text-xs font-heading font-semibold uppercase tracking-widest rounded-sm transition-all duration-200"
              :style="{
                background: activeCategory === cat ? 'var(--color-accent)' : 'var(--color-surface)',
                color: activeCategory === cat ? '#000' : 'var(--color-text-secondary)',
                border: '1px solid var(--color-border)',
              }"
              @click="activeCategory = cat"
            >
              {{ cat }}
            </button>
          </div>
          <div class="flex items-center gap-2">
            <Filter class="w-4 h-4" :style="{ color: 'var(--color-text-muted)' }" />
            <span class="text-sm" style="color: var(--color-text-muted)">{{ filteredClasses.length }} classes</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Classes Grid -->
    <section class="py-16" style="background: var(--color-bg)">
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="cls in filteredClasses"
            :key="cls.id"
            class="group card-glass rounded-sm overflow-hidden"
          >
            <!-- Image -->
            <div class="relative overflow-hidden" style="aspect-ratio: 16/9">
              <img
                :src="cls.image"
                :alt="cls.name"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div class="absolute inset-0" style="background: linear-gradient(to top, var(--color-bg) 0%, transparent 60%)" />

              <!-- Badges -->
              <div class="absolute top-3 left-3 flex gap-2">
                <span
                  class="text-xs font-heading font-bold uppercase tracking-widest px-2 py-1 rounded-sm"
                  :style="{ background: cls.color + '33', color: cls.color, border: `1px solid ${cls.color}66` }"
                >
                  {{ cls.category }}
                </span>
                <span
                  v-if="cls.spotsLeft === 0"
                  class="text-xs font-heading font-bold uppercase tracking-widest px-2 py-1 rounded-sm"
                  style="background: rgba(255,23,68,0.3); color: #ff1744; border: 1px solid rgba(255,23,68,0.5)"
                >
                  {{ $t('schedule.full') }}
                </span>
              </div>
            </div>

            <!-- Content -->
            <div class="p-6">
              <h3 class="font-heading font-bold text-xl uppercase tracking-wider mb-1" style="color: var(--color-text-primary)">
                {{ cls.name }}
              </h3>
              <p class="text-sm mb-4" style="color: var(--color-text-muted)">{{ cls.description }}</p>

              <div class="flex flex-wrap gap-4 mb-4">
                <div class="flex items-center gap-2">
                  <UserCheck class="w-4 h-4" :style="{ color: 'var(--color-accent)' }" />
                  <span class="text-xs" style="color: var(--color-text-secondary)">{{ cls.trainer }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <Clock class="w-4 h-4" :style="{ color: 'var(--color-accent)' }" />
                  <span class="text-xs" style="color: var(--color-text-secondary)">{{ cls.duration }} min</span>
                </div>
                <div class="flex items-center gap-2">
                  <BarChart2 class="w-4 h-4" :style="{ color: 'var(--color-accent)' }" />
                  <span class="text-xs" style="color: var(--color-text-secondary)">{{ cls.level }}</span>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <span class="text-xs" style="color: var(--color-text-muted)">
                    {{ cls.spotsLeft > 0 ? `${cls.spotsLeft} ${$t('schedule.spots_left')}` : $t('schedule.full') }}
                  </span>
                </div>
                <button
                  class="btn-primary text-xs px-5 py-2"
                  :disabled="cls.spotsLeft === 0"
                  :style="cls.spotsLeft === 0 ? { opacity: '0.5', cursor: 'not-allowed' } : {}"
                >
                  {{ $t('schedule.book_now') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Filter, UserCheck, Clock, BarChart2 } from 'lucide-vue-next'
import classesData from '~/data/classes.json'

useHead({ title: 'Classes — APEX FITNESS' })

const activeCategory = ref('All')
const categories = [...new Set(classesData.map((c) => c.category))]

const filteredClasses = computed(() =>
  activeCategory.value === 'All'
    ? classesData
    : classesData.filter((c) => c.category === activeCategory.value)
)
</script>
