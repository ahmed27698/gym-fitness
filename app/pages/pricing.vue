<template>
  <div>
    <section class="pt-40 pb-20 relative overflow-hidden hero-grid" style="background: var(--color-bg)">
      <div class="absolute inset-0 opacity-10" style="background: radial-gradient(circle at 50% 50%, var(--color-accent-secondary), transparent 60%)" />
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12 text-center">
        <p class="section-subtitle mb-4">Transparent Pricing</p>
        <h1 class="section-title">{{ $t('membership.title') }}</h1>
      </div>
    </section>
    <SectionsMembershipPlansSection />
    <SectionsNewsletterSection />
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Pricing — APEX FITNESS' })
</script>
