<template>
  <section
    ref="sectionRef"
    class="py-24 relative overflow-hidden"
    style="background: var(--color-surface)"
  >
    <!-- Background decoration -->
    <div
      class="absolute inset-0 opacity-5"
      style="background: radial-gradient(circle at 50% 50%, var(--color-accent) 0%, transparent 70%)"
    />
    <div
      class="absolute top-0 left-0 right-0 h-[1px]"
      style="background: linear-gradient(90deg, transparent, var(--color-accent), transparent)"
    />

    <div class="max-w-2xl mx-auto px-4 text-center relative z-10">
      <div ref="contentRef">
        <Mail class="w-12 h-12 mx-auto mb-6" :style="{ color: 'var(--color-accent)' }" />
        <p class="section-subtitle mb-4">{{ $t('newsletter.subtitle') }}</p>
        <h2 class="section-title mb-6">{{ $t('newsletter.title') }}</h2>
        <p class="text-base mb-10" style="color: var(--color-text-secondary)">
          {{ $t('newsletter.description') }}
        </p>

        <!-- Form -->
        <div
          v-if="!subscribed"
          class="flex flex-col sm:flex-row gap-3"
        >
          <input
            v-model="email"
            type="email"
            :placeholder="$t('newsletter.placeholder')"
            class="flex-1 px-6 py-4 rounded-sm text-sm outline-none transition-all duration-300"
            style="
              background: var(--color-bg);
              border: 1px solid var(--color-border);
              color: var(--color-text-primary);
            "
            @keydown.enter="subscribe"
          />
          <button
            class="btn-primary px-8 py-4 whitespace-nowrap"
            :disabled="loading"
            @click="subscribe"
          >
            <span v-if="!loading" class="flex items-center gap-2">
              {{ $t('newsletter.subscribe') }}
              <ArrowRight class="w-4 h-4" />
            </span>
            <span v-else class="flex items-center gap-2">
              <Loader2 class="w-4 h-4 animate-spin" />
              Subscribing...
            </span>
          </button>
        </div>

        <div
          v-else
          class="flex items-center justify-center gap-3 py-4"
        >
          <CheckCircle2 class="w-6 h-6" :style="{ color: 'var(--color-accent)' }" />
          <p class="text-base font-heading font-semibold" :style="{ color: 'var(--color-accent)' }">
            {{ $t('newsletter.success') }}
          </p>
        </div>

        <p class="text-xs mt-4" style="color: var(--color-text-muted)">
          {{ $t('newsletter.privacy') }}
        </p>
      </div>
    </div>

    <div
      class="absolute bottom-0 left-0 right-0 h-[1px]"
      style="background: linear-gradient(90deg, transparent, var(--color-accent), transparent)"
    />
  </section>
</template>

<script setup lang="ts">
import { Mail, ArrowRight, Loader2, CheckCircle2 } from 'lucide-vue-next'

const { $gsap, $ScrollTrigger } = useNuxtApp()
const sectionRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)

const email = ref('')
const loading = ref(false)
const subscribed = ref(false)

const subscribe = async () => {
  if (!email.value || !email.value.includes('@')) return
  loading.value = true
  await new Promise((r) => setTimeout(r, 1200))
  loading.value = false
  subscribed.value = true
}

onMounted(() => {
  if (!$gsap || !$ScrollTrigger) return
  const gsap = $gsap as any

  gsap.fromTo(
    contentRef.value,
    { opacity: 0, y: 40, scale: 0.95 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.value, start: 'top 80%' },
    }
  )
})
</script>
