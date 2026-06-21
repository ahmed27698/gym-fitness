<template>
  <div>
    <SectionsHeroSection />
    <SectionsStatsSection />
    <SectionsFeaturedPrograms />
    <SectionsMembershipPlansSection />
    <SectionsWhyChooseUs />
    <SectionsFeaturedTrainers />
    <SectionsWorkoutCategories />
    <SectionsTestimonialsSection />
    <SectionsLatestBlog />
    <SectionsNewsletterSection />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useHead({
  title: 'APEX FITNESS — Premium Gym & Fitness',
  meta: [
    {
      name: 'description',
      content: 'Premium gym and fitness center with world-class trainers, state-of-the-art equipment, and personalized programs.',
    },
  ],
})
</script>
