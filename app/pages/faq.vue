<template>
  <div>
    <section class="pt-40 pb-20 relative overflow-hidden hero-grid" style="background: var(--color-bg)">
      <div class="absolute inset-0 opacity-10" style="background: radial-gradient(circle at 50% 50%, var(--color-accent), transparent 60%)" />
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12 text-center">
        <p class="section-subtitle mb-4">{{ $t('faq.subtitle') }}</p>
        <h1 class="section-title">{{ $t('faq.title') }}</h1>
      </div>
    </section>

    <section class="py-16" style="background: var(--color-bg)">
      <div class="max-w-3xl mx-auto px-4">
        <!-- Category Filter -->
        <div class="flex flex-wrap gap-2 mb-10 justify-center">
          <button
            v-for="cat in ['all', ...categories]"
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

        <!-- Accordion -->
        <div class="space-y-3">
          <div
            v-for="item in filteredFaq"
            :key="item.id"
            class="card-glass rounded-sm overflow-hidden"
          >
            <button
              class="w-full flex items-center justify-between px-6 py-5 text-left"
              @click="toggle(item.id)"
            >
              <span class="font-heading font-semibold text-base uppercase tracking-wide pr-4" style="color: var(--color-text-primary)">
                {{ item.question }}
              </span>
              <ChevronDown
                class="w-5 h-5 flex-shrink-0 transition-transform duration-300"
                :class="{ 'rotate-180': openId === item.id }"
                :style="{ color: 'var(--color-accent)' }"
              />
            </button>

            <Transition name="accordion">
              <div v-if="openId === item.id" class="px-6 pb-5">
                <div class="h-[1px] mb-4" style="background: var(--color-border)" />
                <p class="text-sm leading-relaxed" style="color: var(--color-text-secondary)">
                  {{ item.answer }}
                </p>
              </div>
            </Transition>
          </div>
        </div>

        <!-- CTA -->
        <div class="text-center mt-12">
          <p class="text-sm mb-4" style="color: var(--color-text-muted)">{{ $t('faq.more_questions') }}</p>
          <NuxtLink :to="localePath('/contact')" class="btn-primary">{{ $t('faq.contact_us') }}</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'
import faqData from '~/data/faq.json'

useHead({ title: 'FAQ — APEX FITNESS' })
const localePath = useLocalePath()

const openId = ref<number | null>(null)
const activeCategory = ref('all')

const categories = [...new Set(faqData.map((f) => f.category))]

const filteredFaq = computed(() =>
  activeCategory.value === 'all'
    ? faqData
    : faqData.filter((f) => f.category === activeCategory.value)
)

const toggle = (id: number) => {
  openId.value = openId.value === id ? null : id
}
</script>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}
.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}
.accordion-enter-to,
.accordion-leave-from {
  max-height: 500px;
  opacity: 1;
}
</style>
