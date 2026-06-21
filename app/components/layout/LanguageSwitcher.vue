<template>
  <div class="relative" ref="containerRef">
    <button
      class="w-9 h-9 flex items-center justify-center rounded-sm transition-all duration-200 hover:scale-110 font-heading text-xs font-bold uppercase"
      :style="{ color: 'var(--color-text-secondary)' }"
      @click="open = !open"
    >
      {{ locale === 'ar' ? 'AR' : 'EN' }}
    </button>

    <Transition name="popup">
      <div
        v-if="open"
        class="absolute top-full right-0 mt-2 glass-strong rounded-sm overflow-hidden shadow-xl z-50"
        style="min-width: 140px; border: 1px solid var(--color-border)"
      >
        <div class="p-2">
          <NuxtLink
            v-for="loc in locales"
            :key="loc.code"
            :to="switchLocalePath(loc.code)"
            class="w-full flex items-center gap-3 px-3 py-2 rounded-sm text-sm font-heading font-medium uppercase tracking-wider transition-all duration-200 hover:pl-4"
            :style="{ color: locale === loc.code ? 'var(--color-accent)' : 'var(--color-text-secondary)' }"
            @click="open = false"
          >
            <Languages class="w-4 h-4 flex-shrink-0" />
            {{ loc.name }}
            <CheckCircle2 v-if="locale === loc.code" class="w-3 h-3 ml-auto" :style="{ color: 'var(--color-accent)' }" />
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { Languages, CheckCircle2 } from 'lucide-vue-next'

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const open = ref(false)
const containerRef = ref<HTMLElement | null>(null)

onClickOutside(containerRef, () => {
  open.value = false
})
</script>

<style scoped>
.popup-enter-active,
.popup-leave-active {
  transition: all 0.2s ease;
}
.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}
</style>
