<template>
  <section ref="sectionRef" class="py-28 relative overflow-hidden" style="background: var(--color-bg)">
    <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
      <!-- Header -->
      <div ref="headerRef" class="text-center mb-16">
        <p class="section-subtitle mb-4">{{ $t('testimonials.subtitle') }}</p>
        <h2 class="section-title">{{ $t('testimonials.title') }}</h2>
      </div>

      <!-- Testimonials Slider -->
      <div class="relative">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="testimonial in testimonials"
            :key="testimonial.id"
            class="group card-glass rounded-sm p-8 relative overflow-hidden"
          >
            <!-- Quote icon -->
            <div
              class="absolute top-6 right-6 font-display text-8xl leading-none opacity-10"
              :style="{ color: 'var(--color-accent)' }"
            >
              "
            </div>

            <!-- Stars -->
            <div class="flex gap-1 mb-6">
              <Star
                v-for="i in 5"
                :key="i"
                class="w-4 h-4"
                :style="{ color: i <= testimonial.rating ? '#ffd700' : 'var(--color-border)', fill: i <= testimonial.rating ? '#ffd700' : 'none' }"
              />
            </div>

            <!-- Quote -->
            <p class="text-sm leading-relaxed mb-6" style="color: var(--color-text-secondary)">
              "{{ testimonial.quote }}"
            </p>

            <!-- Author -->
            <div class="flex items-center gap-4">
              <img
                :src="testimonial.beforeImage"
                :alt="testimonial.name"
                class="w-12 h-12 rounded-full object-cover"
                style="border: 2px solid var(--color-accent)"
              />
              <div>
                <p class="font-heading font-semibold text-sm uppercase tracking-wider" style="color: var(--color-text-primary)">
                  {{ testimonial.name }}
                </p>
                <p class="text-xs" style="color: var(--color-text-muted)">
                  {{ testimonial.occupation }}
                </p>
              </div>
              <div class="ml-auto text-right">
                <p class="font-display text-xl" style="color: var(--color-accent)">-{{ testimonial.weightLost }}lbs</p>
                <p class="text-xs" style="color: var(--color-text-muted)">in {{ testimonial.duration }} months</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Before/After Highlight -->
      <div ref="beforeAfterRef" class="mt-20">
        <div class="text-center mb-10">
          <p class="section-subtitle mb-4">Transformation Results</p>
          <h3 class="font-display text-4xl md:text-6xl uppercase">Real Transformations</h3>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div
            v-for="t in testimonials.slice(0, 2)"
            :key="`ba-${t.id}`"
            class="card-glass rounded-sm overflow-hidden"
          >
            <div class="grid grid-cols-2">
              <div class="relative">
                <img :src="t.beforeImage" :alt="`${t.name} before`" class="w-full h-64 object-cover" />
                <div class="absolute top-3 left-3 text-xs font-heading font-bold uppercase tracking-widest px-2 py-1 rounded-sm" style="background: rgba(0,0,0,0.7); color: var(--color-text-muted)">Before</div>
              </div>
              <div class="relative">
                <img :src="t.afterImage" :alt="`${t.name} after`" class="w-full h-64 object-cover" />
                <div class="absolute top-3 left-3 text-xs font-heading font-bold uppercase tracking-widest px-2 py-1 rounded-sm text-black" :style="{ background: 'var(--color-accent)' }">After</div>
              </div>
            </div>
            <div class="p-6 flex items-center justify-between">
              <div>
                <p class="font-heading font-semibold text-base uppercase tracking-wider" style="color: var(--color-text-primary)">{{ t.name }}</p>
                <p class="text-sm" style="color: var(--color-text-muted)">{{ t.program }}</p>
              </div>
              <div class="text-right">
                <p class="font-display text-3xl" style="color: var(--color-accent)">-{{ t.weightLost }}lbs</p>
                <p class="text-xs" style="color: var(--color-text-muted)">{{ t.duration }} months</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Star } from 'lucide-vue-next'
import testimonialsData from '~/data/testimonials.json'

const { $gsap, $ScrollTrigger } = useNuxtApp()
const sectionRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const beforeAfterRef = ref<HTMLElement | null>(null)

const testimonials = testimonialsData.slice(0, 3)

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
    sectionRef.value?.querySelectorAll('.card-glass'),
    { opacity: 0, y: 50 },
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
