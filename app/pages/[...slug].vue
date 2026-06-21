<template>
  <div class="min-h-screen flex items-center justify-center relative overflow-hidden" style="background: var(--color-bg)">
    <!-- Background -->
    <div class="absolute inset-0 hero-grid" />
    <div class="absolute inset-0 opacity-10" style="background: radial-gradient(circle at 50% 50%, var(--color-accent), transparent 60%)" />

    <div class="relative text-center px-4">
      <div
        ref="numberRef"
        class="font-display text-[200px] md:text-[300px] leading-none select-none"
        style="
          background: linear-gradient(135deg, var(--color-accent), var(--color-accent-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          opacity: 0.2;
        "
      >
        {{ $t('error.title') }}
      </div>
      <div class="mt-[-60px] md:mt-[-100px] relative z-10">
        <h1 class="font-display text-4xl md:text-6xl uppercase mb-4" style="color: var(--color-text-primary)">
          {{ $t('error.subtitle') }}
        </h1>
        <p class="text-base max-w-md mx-auto mb-10" style="color: var(--color-text-secondary)">
          {{ $t('error.description') }}
        </p>
        <div class="flex flex-wrap gap-4 justify-center">
          <NuxtLink :to="localePath('/')" class="btn-primary">
            <span class="flex items-center gap-2">
              <Home class="w-4 h-4" />
              {{ $t('error.go_home') }}
            </span>
          </NuxtLink>
          <button class="btn-outline" @click="$router.back()">
            <span class="flex items-center gap-2">
              <ArrowLeft class="w-4 h-4" />
              {{ $t('error.go_back') }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Home, ArrowLeft } from 'lucide-vue-next'

const localePath = useLocalePath()

useHead({ title: '404 Not Found — APEX FITNESS' })
</script>
