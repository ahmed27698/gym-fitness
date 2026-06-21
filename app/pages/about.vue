<template>
  <div>
    <!-- Page Hero -->
    <section class="pt-40 pb-20 relative overflow-hidden hero-grid" style="background: var(--color-bg)">
      <div class="absolute inset-0 opacity-10" style="background: radial-gradient(circle at 30% 50%, var(--color-accent), transparent 60%)" />
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
        <p class="section-subtitle mb-4">{{ $t('about.subtitle') }}</p>
        <h1 class="section-title mb-6">{{ $t('about.title') }}</h1>
        <p class="text-lg max-w-2xl" style="color: var(--color-text-secondary)">{{ $t('about.description') }}</p>
      </div>
    </section>

    <!-- Mission, Vision, Values -->
    <section class="py-20" style="background: var(--color-surface)">
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="item in mvv"
            :key="item.title"
            class="card-glass rounded-sm p-8 text-center"
          >
            <div
              class="w-16 h-16 rounded-sm flex items-center justify-center mx-auto mb-6"
              style="background: var(--color-surface-raised)"
            >
              <component :is="item.icon" class="w-8 h-8" :style="{ color: 'var(--color-accent)' }" />
            </div>
            <h3 class="font-heading font-bold text-xl uppercase tracking-wider mb-4" style="color: var(--color-text-primary)">
              {{ $t(item.title) }}
            </h3>
            <p class="text-sm leading-relaxed" style="color: var(--color-text-muted)">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Story Timeline -->
    <section class="py-20" style="background: var(--color-bg)">
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
        <div class="text-center mb-16">
          <p class="section-subtitle mb-4">{{ $t('about.history') }}</p>
          <h2 class="section-title">{{ $t('about.founded') }} 2015</h2>
        </div>
        <div class="relative">
          <div class="absolute left-1/2 top-0 bottom-0 w-[1px] hidden md:block" style="background: var(--color-border)" />
          <div class="space-y-12">
            <div
              v-for="(milestone, i) in milestones"
              :key="milestone.year"
              class="grid md:grid-cols-2 gap-8 items-center"
              :class="i % 2 === 0 ? '' : 'md:flex-row-reverse'"
            >
              <div :class="i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:order-2 md:pl-12'">
                <div class="card-glass rounded-sm p-6">
                  <span class="font-display text-4xl" style="color: var(--color-accent)">{{ milestone.year }}</span>
                  <h3 class="font-heading font-bold text-lg uppercase tracking-wider my-2" style="color: var(--color-text-primary)">{{ milestone.title }}</h3>
                  <p class="text-sm" style="color: var(--color-text-muted)">{{ milestone.desc }}</p>
                </div>
              </div>
              <div :class="i % 2 === 0 ? 'hidden md:block' : 'hidden md:block md:order-1'" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-20" style="background: var(--color-bg-secondary)">
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
        <div class="text-center mb-16">
          <p class="section-subtitle mb-4">{{ $t('about.team') }}</p>
          <h2 class="section-title">Leadership Team</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="member in team" :key="member.name" class="group card-glass rounded-sm overflow-hidden text-center">
            <div class="overflow-hidden" style="aspect-ratio: 1">
              <img :src="member.image" :alt="member.name" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div class="p-5">
              <h3 class="font-heading font-bold text-base uppercase tracking-wider mb-1" style="color: var(--color-text-primary)">{{ member.name }}</h3>
              <p class="text-xs font-heading uppercase tracking-widest" style="color: var(--color-accent)">{{ member.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Target, Eye, Heart } from 'lucide-vue-next'

useHead({ title: 'About — APEX FITNESS' })

const mvv = [
  {
    title: 'about.mission',
    icon: Target,
    desc: 'To empower every individual to achieve their peak physical and mental performance through world-class training, nutrition science, and unwavering support.',
  },
  {
    title: 'about.vision',
    icon: Eye,
    desc: 'To become the global standard for premium fitness, inspiring millions to transform their lives and redefine what is humanly possible.',
  },
  {
    title: 'about.values',
    icon: Heart,
    desc: 'Excellence, integrity, innovation, community, and a relentless commitment to results. We hold ourselves to the highest standards in everything we do.',
  },
]

const milestones = [
  { year: '2015', title: 'Founded', desc: 'APEX Fitness opened its first location in Dubai with 5 trainers and a vision to revolutionize premium fitness.' },
  { year: '2017', title: 'Rapid Expansion', desc: 'Expanded to 3 locations and launched the APEX personal training certification program.' },
  { year: '2019', title: 'Digital Platform', desc: 'Launched the APEX mobile app, bringing premium fitness coaching to members worldwide.' },
  { year: '2021', title: 'Awards & Recognition', desc: 'Named the #1 premium fitness brand in the Middle East by FitBusiness Magazine.' },
  { year: '2023', title: 'Global Reach', desc: 'Opened locations in London, New York, and Singapore, becoming a truly global fitness brand.' },
  { year: '2025', title: 'APEX 2.0', desc: 'Launched our revolutionary AI-powered personalized training platform and nutrition system.' },
]

const team = [
  { name: 'James Wright', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop' },
  { name: 'Lisa Park', role: 'COO', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop' },
  { name: 'Marcus Stone', role: 'Head of Training', image: 'https://images.unsplash.com/photo-1567515004624-219c11d31f2e?w=300&h=300&fit=crop' },
  { name: 'Priya Sharma', role: 'Head of Nutrition', image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=300&h=300&fit=crop' },
]
</script>
