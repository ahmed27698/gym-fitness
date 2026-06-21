<template>
  <div>
    <section class="pt-40 pb-20 relative overflow-hidden hero-grid" style="background: var(--color-bg)">
      <div class="absolute inset-0 opacity-10" style="background: radial-gradient(circle at 40% 50%, var(--color-accent), transparent 60%)" />
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
        <p class="section-subtitle mb-4">{{ $t('careers.subtitle') }}</p>
        <h1 class="section-title mb-6">{{ $t('careers.title') }}</h1>
        <p class="text-lg max-w-2xl" style="color: var(--color-text-secondary)">{{ $t('careers.description') }}</p>
      </div>
    </section>

    <!-- Positions -->
    <section class="py-16" style="background: var(--color-bg)">
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
        <div class="space-y-6">
          <div
            v-for="job in jobs"
            :key="job.id"
            class="card-glass rounded-sm overflow-hidden"
          >
            <div class="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div class="flex flex-wrap gap-2 mb-2">
                  <span class="text-xs font-heading font-bold uppercase tracking-widest px-2 py-1 rounded-sm text-black" :style="{ background: 'var(--color-accent)' }">{{ job.type }}</span>
                  <span class="text-xs font-heading font-bold uppercase tracking-widest px-2 py-1 rounded-sm" style="background: var(--color-surface-raised); color: var(--color-text-muted)">{{ job.department }}</span>
                </div>
                <h3 class="font-heading font-bold text-xl uppercase tracking-wider" style="color: var(--color-text-primary)">{{ job.title }}</h3>
                <div class="flex flex-wrap gap-4 mt-2">
                  <span class="text-xs flex items-center gap-1" style="color: var(--color-text-muted)">
                    <MapPin class="w-3 h-3" />
                    {{ job.location }}
                  </span>
                  <span class="text-xs flex items-center gap-1" style="color: var(--color-text-muted)">
                    <DollarSign class="w-3 h-3" />
                    {{ job.salary }}
                  </span>
                </div>
              </div>
              <button
                class="btn-primary px-6 py-3 whitespace-nowrap"
                @click="selectedJob = job"
              >
                {{ $t('careers.apply') }}
              </button>
            </div>

            <!-- Description -->
            <div class="px-6 pb-6">
              <p class="text-sm mb-4" style="color: var(--color-text-secondary)">{{ job.description }}</p>
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <p class="text-xs font-heading font-bold uppercase tracking-widest mb-2" style="color: var(--color-accent)">Requirements</p>
                  <ul class="space-y-1">
                    <li v-for="req in job.requirements" :key="req" class="text-xs flex items-start gap-2" style="color: var(--color-text-muted)">
                      <CheckCircle2 class="w-3 h-3 flex-shrink-0 mt-0.5" :style="{ color: 'var(--color-accent)' }" />
                      {{ req }}
                    </li>
                  </ul>
                </div>
                <div>
                  <p class="text-xs font-heading font-bold uppercase tracking-widest mb-2" style="color: var(--color-accent)">Benefits</p>
                  <ul class="space-y-1">
                    <li v-for="b in job.benefits" :key="b" class="text-xs flex items-start gap-2" style="color: var(--color-text-muted)">
                      <Star class="w-3 h-3 flex-shrink-0 mt-0.5" :style="{ color: 'var(--color-accent)' }" />
                      {{ b }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Application Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="selectedJob"
          class="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style="background: rgba(0,0,0,0.8)"
          @click.self="selectedJob = null"
        >
          <div class="glass-strong rounded-sm p-8 max-w-lg w-full" style="border: 1px solid var(--color-border)">
            <div class="flex items-center justify-between mb-6">
              <h3 class="font-heading font-bold text-xl uppercase tracking-wider" style="color: var(--color-text-primary)">Apply: {{ selectedJob.title }}</h3>
              <button @click="selectedJob = null"><X class="w-5 h-5" :style="{ color: 'var(--color-text-muted)' }" /></button>
            </div>
            <div class="space-y-4">
              <input type="text" placeholder="Full Name" class="w-full px-4 py-3 rounded-sm text-sm outline-none" style="background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text-primary)" />
              <input type="email" placeholder="Email" class="w-full px-4 py-3 rounded-sm text-sm outline-none" style="background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text-primary)" />
              <textarea rows="4" placeholder="Cover Letter" class="w-full px-4 py-3 rounded-sm text-sm outline-none resize-none" style="background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text-primary)" />
              <button class="btn-primary w-full py-3" @click="selectedJob = null">Submit Application</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { MapPin, DollarSign, CheckCircle2, Star, X } from 'lucide-vue-next'
import careersData from '~/data/careers.json'

useHead({ title: 'Careers — APEX FITNESS' })

const jobs = careersData
const selectedJob = ref<typeof careersData[0] | null>(null)
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.3s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
</style>
