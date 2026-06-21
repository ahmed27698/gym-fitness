<template>
  <div>
    <section class="pt-40 pb-20 relative overflow-hidden hero-grid" style="background: var(--color-bg)">
      <div class="absolute inset-0 opacity-10" style="background: radial-gradient(circle at 50% 50%, var(--color-accent), transparent 60%)" />
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12 text-center">
        <p class="section-subtitle mb-4">{{ $t('blog.subtitle') }}</p>
        <h1 class="section-title">{{ $t('blog.title') }}</h1>
      </div>
    </section>

    <!-- Filter -->
    <section class="py-8" style="background: var(--color-surface); border-bottom: 1px solid var(--color-border)">
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12 flex flex-wrap gap-3">
        <button
          v-for="cat in ['All', ...categories]"
          :key="cat"
          class="px-4 py-2 text-xs font-heading font-semibold uppercase tracking-widest rounded-sm transition-all duration-200"
          :style="{
            background: activeCategory === cat ? 'var(--color-accent)' : 'var(--color-surface-raised)',
            color: activeCategory === cat ? '#000' : 'var(--color-text-secondary)',
            border: '1px solid var(--color-border)',
          }"
          @click="activeCategory = cat"
        >
          {{ cat }}
        </button>
      </div>
    </section>

    <section class="py-16" style="background: var(--color-bg)">
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink
            v-for="post in filteredPosts"
            :key="post.id"
            :to="localePath(`/blog/${post.slug}`)"
            class="group card-glass rounded-sm overflow-hidden"
          >
            <div class="overflow-hidden" style="aspect-ratio: 16/9">
              <img :src="post.image" :alt="post.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div class="p-6">
              <div class="flex items-center gap-3 mb-3">
                <span class="text-xs font-heading font-semibold uppercase tracking-widest px-2 py-1 rounded-sm" style="background: var(--color-surface-raised); color: var(--color-accent)">{{ post.category }}</span>
                <span class="text-xs" style="color: var(--color-text-muted)">{{ post.readTime }} min read</span>
              </div>
              <h2 class="font-heading font-bold text-lg uppercase tracking-wider mb-2 group-hover:text-accent transition-colors duration-200" style="color: var(--color-text-primary)">{{ post.title }}</h2>
              <p class="text-sm leading-relaxed mb-4" style="color: var(--color-text-muted)">{{ post.excerpt }}</p>
              <div class="flex items-center gap-3">
                <img :src="post.authorImage" :alt="post.author" class="w-8 h-8 rounded-full object-cover" />
                <div>
                  <p class="text-xs font-heading font-semibold uppercase" style="color: var(--color-text-primary)">{{ post.author }}</p>
                  <p class="text-xs" style="color: var(--color-text-muted)">{{ post.date }}</p>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import blogData from '~/data/blog.json'

useHead({ title: 'Blog — APEX FITNESS' })
const localePath = useLocalePath()

const activeCategory = ref('All')
const categories = [...new Set(blogData.map((p) => p.category))]

const filteredPosts = computed(() =>
  activeCategory.value === 'All'
    ? blogData
    : blogData.filter((p) => p.category === activeCategory.value)
)
</script>
