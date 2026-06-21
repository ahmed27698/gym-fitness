<template>
  <section ref="sectionRef" class="py-28" style="background: var(--color-bg)">
    <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
      <div ref="headerRef" class="flex flex-col md:flex-row md:items-end justify-between mb-16">
        <div>
          <p class="section-subtitle mb-4">{{ $t('blog.subtitle') }}</p>
          <h2 class="section-title">{{ $t('blog.title') }}</h2>
        </div>
        <NuxtLink :to="localePath('/blog')" class="btn-outline mt-6 md:mt-0 self-start">
          {{ $t('blog.view_all') }}
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <NuxtLink
          v-for="(post, i) in posts"
          :key="post.id"
          :to="localePath(`/blog/${post.slug}`)"
          class="group card-glass rounded-sm overflow-hidden"
          :class="{ 'md:col-span-2 md:row-span-2': i === 0 }"
        >
          <!-- Image -->
          <div
            class="overflow-hidden"
            :style="{ aspectRatio: i === 0 ? '16/9' : '16/9' }"
          >
            <img
              :src="post.image"
              :alt="post.title"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          <!-- Content -->
          <div class="p-6">
            <div class="flex items-center gap-3 mb-3">
              <span
                class="text-xs font-heading font-semibold uppercase tracking-widest px-2 py-1 rounded-sm"
                style="background: var(--color-surface-raised); color: var(--color-accent)"
              >
                {{ post.category }}
              </span>
              <span class="text-xs" style="color: var(--color-text-muted)">
                {{ post.readTime }} {{ $t('blog.min_read') }}
              </span>
            </div>

            <h3
              class="font-heading font-bold uppercase tracking-wider mb-3 transition-colors duration-200 group-hover:text-accent"
              :class="i === 0 ? 'text-2xl' : 'text-base'"
              style="color: var(--color-text-primary)"
            >
              {{ post.title }}
            </h3>

            <p
              v-if="i === 0"
              class="text-sm leading-relaxed mb-4"
              style="color: var(--color-text-secondary)"
            >
              {{ post.excerpt }}
            </p>

            <!-- Author -->
            <div class="flex items-center gap-3">
              <img :src="post.authorImage" :alt="post.author" class="w-8 h-8 rounded-full object-cover" />
              <div>
                <p class="text-xs font-heading font-semibold uppercase" style="color: var(--color-text-primary)">
                  {{ post.author }}
                </p>
                <p class="text-xs" style="color: var(--color-text-muted)">{{ post.date }}</p>
              </div>
              <span
                class="ml-auto text-xs font-heading font-semibold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1"
                style="color: var(--color-accent)"
              >
                {{ $t('blog.read_more') }}
                <ArrowRight class="w-3 h-3" />
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import blogData from '~/data/blog.json'

const localePath = useLocalePath()
const { $gsap, $ScrollTrigger } = useNuxtApp()
const sectionRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)

const posts = blogData.slice(0, 3)

onMounted(() => {
  if (!$gsap || !$ScrollTrigger) return
  const gsap = $gsap as any

  gsap.fromTo(
    headerRef.value,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: { trigger: headerRef.value, start: 'top 80%' },
    }
  )

  gsap.fromTo(
    sectionRef.value?.querySelectorAll('.card-glass'),
    { opacity: 0, y: 60 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.value, start: 'top 70%' },
    }
  )
})
</script>
