<template>
  <div>
    <!-- Hero -->
    <section class="pt-40 pb-20 relative overflow-hidden hero-grid" style="background: var(--color-bg)">
      <div class="absolute inset-0 opacity-10" style="background: radial-gradient(circle at 60% 50%, var(--color-accent-secondary), transparent 60%)" />
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12 text-center">
        <p class="section-subtitle mb-4">{{ $t('trainers.subtitle') }}</p>
        <h1 class="section-title">{{ $t('trainers.title') }}</h1>
      </div>
    </section>

    <!-- Trainers -->
    <section class="py-16" style="background: var(--color-bg)">
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="trainer in trainers"
            :key="trainer.id"
            class="group card-glass rounded-sm overflow-hidden"
          >
            <div class="relative overflow-hidden" style="aspect-ratio: 3/4">
              <img
                :src="trainer.image"
                :alt="trainer.name"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div class="absolute inset-0" style="background: linear-gradient(to top, var(--color-bg) 30%, transparent 70%)" />

              <!-- Overlay -->
              <div
                class="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                style="background: rgba(0,0,0,0.5); backdrop-filter: blur(4px)"
              >
                <p class="text-sm px-6 text-center mb-4" style="color: var(--color-text-secondary)">{{ trainer.bio }}</p>
                <button class="btn-primary text-xs px-6 py-2">{{ $t('trainers.book_session') }}</button>
              </div>
            </div>

            <div class="p-6">
              <h3 class="font-heading font-bold text-xl uppercase tracking-wider mb-1" style="color: var(--color-text-primary)">
                {{ trainer.name }}
              </h3>
              <p class="text-sm font-heading uppercase tracking-widest mb-2" style="color: var(--color-accent)">
                {{ trainer.title }}
              </p>
              <p class="text-xs mb-4" style="color: var(--color-text-muted)">{{ trainer.specialty }}</p>

              <!-- Stats -->
              <div class="grid grid-cols-3 gap-4 mb-4">
                <div class="text-center">
                  <div class="font-display text-2xl" style="color: var(--color-accent)">{{ trainer.experience }}</div>
                  <div class="text-xs" style="color: var(--color-text-muted)">Years</div>
                </div>
                <div class="text-center">
                  <div class="font-display text-2xl" style="color: var(--color-accent)">{{ trainer.clients }}+</div>
                  <div class="text-xs" style="color: var(--color-text-muted)">Clients</div>
                </div>
                <div class="text-center">
                  <div class="font-display text-2xl" style="color: var(--color-accent)">{{ trainer.rating }}</div>
                  <div class="text-xs" style="color: var(--color-text-muted)">Rating</div>
                </div>
              </div>

              <div class="flex flex-wrap gap-2">
                <span
                  v-for="cert in trainer.certifications"
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

    <SectionsNewsletterSection />
  </div>
</template>

<script setup lang="ts">
import trainersData from '~/data/trainers.json'

useHead({ title: 'Trainers — APEX FITNESS' })

const trainers = trainersData
</script>
