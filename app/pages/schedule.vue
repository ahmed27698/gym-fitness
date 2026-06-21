<template>
  <div>
    <section class="pt-40 pb-20 relative overflow-hidden hero-grid" style="background: var(--color-bg)">
      <div class="absolute inset-0 opacity-10" style="background: radial-gradient(circle at 50% 50%, var(--color-accent), transparent 60%)" />
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12 text-center">
        <p class="section-subtitle mb-4">{{ $t('schedule.subtitle') }}</p>
        <h1 class="section-title">{{ $t('schedule.title') }}</h1>
      </div>
    </section>

    <section class="py-10" style="background: var(--color-bg)">
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
        <!-- Day Selector -->
        <div class="flex gap-2 mb-8 overflow-x-auto pb-2">
          <button
            v-for="day in days"
            :key="day.key"
            class="flex-shrink-0 px-6 py-3 rounded-sm text-sm font-heading font-semibold uppercase tracking-widest transition-all duration-200"
            :style="{
              background: activeDay === day.key ? 'var(--color-accent)' : 'var(--color-surface)',
              color: activeDay === day.key ? '#000' : 'var(--color-text-secondary)',
              border: '1px solid var(--color-border)',
            }"
            @click="activeDay = day.key"
          >
            {{ $t(`schedule.week_days.${day.key}`) }}
          </button>
        </div>

        <!-- Schedule Table -->
        <div class="overflow-x-auto">
          <div class="space-y-3 min-w-[600px]">
            <div
              v-for="entry in scheduleForDay"
              :key="`${entry.class.id}-${entry.time}`"
              class="card-glass rounded-sm flex items-center gap-6 p-4"
            >
              <div class="w-16 text-center flex-shrink-0">
                <span class="font-display text-2xl" :style="{ color: 'var(--color-accent)' }">{{ entry.time }}</span>
              </div>
              <div
                class="w-1 self-stretch rounded-full flex-shrink-0"
                :style="{ background: entry.class.color }"
              />
              <div class="flex-1">
                <h3 class="font-heading font-bold text-base uppercase tracking-wider" style="color: var(--color-text-primary)">{{ entry.class.name }}</h3>
                <div class="flex flex-wrap gap-4 mt-1">
                  <span class="text-xs flex items-center gap-1" style="color: var(--color-text-muted)">
                    <UserCheck class="w-3 h-3" />
                    {{ entry.class.trainer }}
                  </span>
                  <span class="text-xs flex items-center gap-1" style="color: var(--color-text-muted)">
                    <Clock class="w-3 h-3" />
                    {{ entry.class.duration }} min
                  </span>
                  <span class="text-xs font-heading uppercase tracking-wider px-2 py-0.5 rounded-sm" :style="{ background: entry.class.color + '22', color: entry.class.color }">
                    {{ entry.class.category }}
                  </span>
                </div>
              </div>
              <div class="text-right flex-shrink-0">
                <p class="text-xs mb-2" :style="{ color: entry.class.spotsLeft === 0 ? '#ff1744' : 'var(--color-text-muted)' }">
                  {{ entry.class.spotsLeft === 0 ? $t('schedule.full') : `${entry.class.spotsLeft} ${$t('schedule.spots_left')}` }}
                </p>
                <button
                  class="btn-primary text-xs px-4 py-2"
                  :disabled="entry.class.spotsLeft === 0"
                  :style="entry.class.spotsLeft === 0 ? { opacity: '0.5', cursor: 'not-allowed' } : {}"
                >
                  {{ $t('schedule.book_now') }}
                </button>
              </div>
            </div>

            <div v-if="scheduleForDay.length === 0" class="text-center py-16">
              <Calendar class="w-12 h-12 mx-auto mb-4 opacity-30" :style="{ color: 'var(--color-text-muted)' }" />
              <p class="text-sm" style="color: var(--color-text-muted)">No classes scheduled for this day</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { UserCheck, Clock, Calendar } from 'lucide-vue-next'
import classesData from '~/data/classes.json'

useHead({ title: 'Schedule — APEX FITNESS' })

const days = [
  { key: 'mon' }, { key: 'tue' }, { key: 'wed' },
  { key: 'thu' }, { key: 'fri' }, { key: 'sat' }, { key: 'sun' },
]

const activeDay = ref('mon')

const scheduleForDay = computed(() => {
  const entries: { class: typeof classesData[0]; time: string }[] = []
  classesData.forEach((cls) => {
    cls.schedule.forEach((s) => {
      if (s.day === activeDay.value) {
        entries.push({ class: cls, time: s.time })
      }
    })
  })
  return entries.sort((a, b) => a.time.localeCompare(b.time))
})
</script>
