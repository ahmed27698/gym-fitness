<template>
  <section ref="sectionRef" class="py-28" style="background: var(--color-bg-secondary)">
    <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
      <!-- Header -->
      <div ref="headerRef" class="text-center mb-16">
        <p class="section-subtitle mb-4">{{ $t('membership.subtitle') }}</p>
        <h2 class="section-title mb-6">{{ $t('membership.title') }}</h2>

        <!-- Toggle -->
        <div class="inline-flex items-center gap-4 p-1 rounded-sm" style="background: var(--color-surface); border: 1px solid var(--color-border)">
          <button
            :class="['px-6 py-2 text-sm font-heading font-semibold uppercase tracking-widest rounded-sm transition-all duration-300', !yearly ? 'text-black' : '']"
            :style="{ background: !yearly ? 'var(--color-accent)' : 'transparent', color: !yearly ? '#000' : 'var(--color-text-muted)' }"
            @click="yearly = false"
          >
            Monthly
          </button>
          <button
            :class="['px-6 py-2 text-sm font-heading font-semibold uppercase tracking-widest rounded-sm transition-all duration-300']"
            :style="{ background: yearly ? 'var(--color-accent)' : 'transparent', color: yearly ? '#000' : 'var(--color-text-muted)' }"
            @click="yearly = true"
          >
            Yearly <span class="text-xs opacity-70">(Save 20%)</span>
          </button>
        </div>
      </div>

      <!-- Plans -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <div
          v-for="(plan, i) in plans"
          :key="plan.id"
          class="relative rounded-sm overflow-hidden transition-all duration-500 hover:translate-y-[-8px]"
          :style="{
            background: 'var(--color-surface)',
            border: plan.popular ? `2px solid ${plan.color}` : '1px solid var(--color-border)',
            boxShadow: plan.popular ? `0 0 40px ${plan.color}30` : 'none',
          }"
        >
          <!-- Popular badge -->
          <div
            v-if="plan.popular"
            class="absolute top-4 right-4 text-xs font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-sm text-black"
            :style="{ background: plan.color }"
          >
            {{ $t('membership.popular') }}
          </div>

          <!-- Accent line -->
          <div class="h-1" :style="{ background: plan.color }" />

          <div class="p-8">
            <!-- Plan name -->
            <h3 class="font-display text-3xl uppercase mb-2" style="color: var(--color-text-primary)">
              {{ plan.name }}
            </h3>
            <p class="text-sm mb-6" style="color: var(--color-text-muted)">{{ plan.description }}</p>

            <!-- Price -->
            <div class="flex items-end gap-2 mb-8">
              <span class="font-display text-6xl" :style="{ color: plan.color }">
                ${{ yearly ? plan.yearlyPrice : plan.monthlyPrice }}
              </span>
              <span class="text-sm pb-2" style="color: var(--color-text-muted)">
                {{ yearly ? $t('membership.per_year') : $t('membership.per_month') }}
              </span>
            </div>

            <!-- CTA -->
            <button
              class="w-full py-4 rounded-sm font-heading font-semibold uppercase tracking-widest text-sm transition-all duration-300 mb-8 hover:scale-105"
              :style="{
                background: plan.popular ? plan.color : 'transparent',
                color: plan.popular ? '#000' : plan.color,
                border: `1px solid ${plan.color}`,
              }"
              :class="{ 'hover:shadow-glow': plan.popular }"
            >
              {{ $t('membership.get_started') }}
            </button>

            <!-- Features -->
            <ul class="space-y-3">
              <li
                v-for="feature in plan.features"
                :key="feature.text"
                class="flex items-center gap-3 text-sm"
                :style="{ color: feature.included ? 'var(--color-text-secondary)' : 'var(--color-text-muted)' }"
              >
                <CheckCircle2
                  v-if="feature.included"
                  class="w-4 h-4 flex-shrink-0"
                  :style="{ color: plan.color }"
                />
                <XCircle
                  v-else
                  class="w-4 h-4 flex-shrink-0 opacity-30"
                />
                <span :class="{ 'line-through opacity-40': !feature.included }">
                  {{ feature.text }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { CheckCircle2, XCircle } from 'lucide-vue-next'
import pricingData from '~/data/pricing.json'

const { $gsap, $ScrollTrigger } = useNuxtApp()
const sectionRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)

const yearly = ref(false)
const plans = pricingData.plans

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
    sectionRef.value?.querySelectorAll('.grid > div'),
    { opacity: 0, y: 60 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.value, start: 'top 70%' },
    }
  )
})
</script>
