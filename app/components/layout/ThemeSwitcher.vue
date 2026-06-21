<template>
  <div class="relative" ref="containerRef">
    <button
      class="w-9 h-9 flex items-center justify-center rounded-sm transition-all duration-200 hover:scale-110"
      :style="{ color: 'var(--color-text-secondary)' }"
      @click="open = !open"
    >
      <Palette class="w-5 h-5" />
    </button>

    <Transition name="popup">
      <div
        v-if="open"
        class="absolute top-full right-0 mt-2 glass-strong rounded-sm overflow-hidden shadow-xl z-50"
        style="min-width: 160px; border: 1px solid var(--color-border)"
      >
        <div class="p-2">
          <p class="text-xs uppercase tracking-widest mb-2 px-2" style="color: var(--color-text-muted)">Theme</p>
          <button
            v-for="t in themes"
            :key="t"
            class="w-full flex items-center gap-3 px-3 py-2 rounded-sm text-sm font-heading font-medium uppercase tracking-wider transition-all duration-200 hover:pl-4"
            :class="theme === t ? 'text-accent' : ''"
            :style="{ color: theme === t ? 'var(--color-accent)' : 'var(--color-text-secondary)' }"
            @click="selectTheme(t)"
          >
            <span
              class="w-4 h-4 rounded-full border-2 flex-shrink-0"
              :style="{
                background: themeColors[t],
                borderColor: theme === t ? 'var(--color-text-primary)' : 'transparent'
              }"
            />
            {{ themeLabels[t] }}
            <CheckCircle2 v-if="theme === t" class="w-3 h-3 ml-auto" :style="{ color: 'var(--color-accent)' }" />
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { Palette, CheckCircle2 } from 'lucide-vue-next'
import type { Theme } from '~/composables/useTheme'

const { theme, themes, setTheme } = useTheme()
const open = ref(false)
const containerRef = ref<HTMLElement | null>(null)

const themeColors: Record<Theme, string> = {
  dark: '#00d4ff',
  light: '#0066ff',
  neon: '#ff00ff',
  gold: '#ffd700',
  crimson: '#ff1744',
  emerald: '#00e676',
}

const themeLabels: Record<Theme, string> = {
  dark: 'Dark',
  light: 'Light',
  neon: 'Neon',
  gold: 'Gold',
  crimson: 'Crimson',
  emerald: 'Emerald',
}

const selectTheme = (t: Theme) => {
  setTheme(t)
  open.value = false
}

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
