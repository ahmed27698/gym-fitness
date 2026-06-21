<template>
  <div
    class="min-h-screen"
    :style="{ background: 'var(--color-bg)', color: 'var(--color-text-primary)' }"
    :dir="dir"
  >
    <LayoutCursorEffect />
    <LayoutTheNavbar />

    <main>
      <slot />
    </main>

    <LayoutTheFooter />
    <UiToastContainer />
  </div>
</template>

<script setup lang="ts">
const { initTheme } = useTheme()
const { locale } = useI18n()

const dir = computed(() => (locale.value === 'ar' ? 'rtl' : 'ltr'))

onMounted(() => {
  initTheme()
})

watch(locale, () => {
  document.documentElement.dir = locale.value === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.lang = locale.value
})
</script>
