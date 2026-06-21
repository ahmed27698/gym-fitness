<template>
  <section ref="sectionRef" class="py-24 relative overflow-hidden" style="background: var(--color-surface)">
    <!-- Accent line -->
    <div class="absolute top-0 left-0 right-0 h-[1px]" style="background: linear-gradient(90deg, transparent, var(--color-accent), transparent)" />

    <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        <div
          v-for="(stat, i) in stats"
          :key="stat.key"
          ref="statRefs"
          class="flex flex-col items-center text-center group"
        >
          <div
            class="w-14 h-14 rounded-sm flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
            style="background: var(--color-surface-raised); border: 1px solid var(--color-border)"
          >
            <component :is="stat.icon" class="w-6 h-6" :style="{ color: 'var(--color-accent)' }" />
          </div>
          <span
            class="font-display text-4xl md:text-5xl mb-2 counter"
            :style="{ color: 'var(--color-accent)' }"
            :data-target="stat.value"
            :data-suffix="stat.suffix"
          >
            0{{ stat.suffix }}
          </span>
          <span class="text-xs uppercase tracking-widest" style="color: var(--color-text-muted)">
            {{ $t(`stats.${stat.key}`) }}
          </span>
        </div>
      </div>
    </div>

    <div class="absolute bottom-0 left-0 right-0 h-[1px]" style="background: linear-gradient(90deg, transparent, var(--color-accent), transparent)" />
  </section>
</template>

<script setup lang="ts">
import {
  Users,
  UserCheck,
  CalendarCheck,
  TrendingUp,
  Trophy,
  Award,
} from 'lucide-vue-next'

const { $gsap, $ScrollTrigger } = useNuxtApp()
const sectionRef = ref<HTMLElement | null>(null)

const stats = [
  { key: 'members', value: 15000, suffix: '+', icon: Users },
  { key: 'trainers', value: 80, suffix: '+', icon: UserCheck },
  { key: 'classes', value: 200, suffix: '+', icon: CalendarCheck },
  { key: 'transformations', value: 5000, suffix: '+', icon: TrendingUp },
  { key: 'years', value: 10, suffix: '', icon: Trophy },
  { key: 'awards', value: 24, suffix: '', icon: Award },
]

const animateCounter = (el: HTMLElement, target: number, suffix: string) => {
  const gsap = $gsap as any
  const obj = { value: 0 }
  gsap.to(obj, {
    value: target,
    duration: 2,
    ease: 'power2.out',
    onUpdate: () => {
      el.textContent = Math.round(obj.value).toLocaleString() + suffix
    },
  })
}

onMounted(() => {
  if (!$gsap || !$ScrollTrigger) return
  const gsap = $gsap as any
  const ST = $ScrollTrigger as any

  const counters = sectionRef.value?.querySelectorAll('.counter')

  ST.create({
    trigger: sectionRef.value,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      counters?.forEach((counter) => {
        const el = counter as HTMLElement
        const target = parseInt(el.dataset.target || '0')
        const suffix = el.dataset.suffix || ''
        animateCounter(el, target, suffix)
      })

      gsap.fromTo(
        sectionRef.value?.querySelectorAll('.group'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out' }
      )
    },
  })
})
</script>
