<template>
  <div v-if="post">
    <!-- Hero -->
    <section class="pt-40 pb-0 relative overflow-hidden" style="background: var(--color-bg)">
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
        <!-- Breadcrumb -->
        <div class="flex items-center gap-2 text-xs mb-8" style="color: var(--color-text-muted)">
          <NuxtLink :to="localePath('/')" style="color: var(--color-text-muted)">Home</NuxtLink>
          <ChevronRight class="w-3 h-3" />
          <NuxtLink :to="localePath('/blog')" style="color: var(--color-text-muted)">Blog</NuxtLink>
          <ChevronRight class="w-3 h-3" />
          <span :style="{ color: 'var(--color-accent)' }">{{ post.category }}</span>
        </div>

        <div class="max-w-4xl">
          <span class="text-xs font-heading font-semibold uppercase tracking-widest px-3 py-1 rounded-sm mb-4 inline-block" style="background: var(--color-surface); color: var(--color-accent)">
            {{ post.category }}
          </span>
          <h1 class="font-display text-4xl md:text-6xl uppercase tracking-wide mb-6" style="color: var(--color-text-primary)">
            {{ post.title }}
          </h1>

          <div class="flex flex-wrap items-center gap-6 mb-8">
            <div class="flex items-center gap-3">
              <img :src="post.authorImage" :alt="post.author" class="w-10 h-10 rounded-full object-cover" style="border: 2px solid var(--color-accent)" />
              <div>
                <p class="text-sm font-heading font-semibold uppercase" style="color: var(--color-text-primary)">{{ post.author }}</p>
                <p class="text-xs" style="color: var(--color-text-muted)">{{ post.date }}</p>
              </div>
            </div>
            <div class="flex items-center gap-2" style="color: var(--color-text-muted)">
              <Clock class="w-4 h-4" />
              <span class="text-xs">{{ post.readTime }} min read</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Image -->
    <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12 mb-16">
      <img :src="post.image" :alt="post.title" class="w-full rounded-sm object-cover" style="max-height: 500px" />
    </div>

    <!-- Content -->
    <section class="pb-20" style="background: var(--color-bg)">
      <div class="max-w-3xl mx-auto px-4 md:px-8">
        <div
          class="prose prose-lg max-w-none"
          style="color: var(--color-text-secondary)"
        >
          <p class="text-xl leading-relaxed mb-8 font-medium" :style="{ color: 'var(--color-text-primary)' }">
            {{ post.excerpt }}
          </p>
          <p class="text-base leading-loose mb-6">{{ post.content }}</p>
          <p class="text-base leading-loose mb-6">
            The key to any successful fitness program is consistency and progressive overload. Whether you're focusing on strength training, cardiovascular conditioning, or flexibility work, the principles remain the same: start where you are, progress systematically, and recover adequately between sessions.
          </p>
          <h2 class="font-heading font-bold text-2xl uppercase tracking-wider mt-10 mb-6" :style="{ color: 'var(--color-text-primary)' }">Key Principles</h2>
          <ul class="space-y-4">
            <li v-for="(tag, i) in post.tags" :key="tag" class="flex items-start gap-3">
              <span class="w-6 h-6 rounded-sm flex items-center justify-center flex-shrink-0 text-xs font-bold text-black mt-0.5" :style="{ background: 'var(--color-accent)' }">{{ i + 1 }}</span>
              <span class="text-base capitalize">{{ tag.replace('-', ' ') }} — a fundamental aspect of optimal performance and body composition.</span>
            </li>
          </ul>
        </div>

        <!-- Tags -->
        <div class="mt-12 pt-8" style="border-top: 1px solid var(--color-border)">
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="text-xs px-3 py-1 rounded-sm font-heading uppercase tracking-wider"
              style="background: var(--color-surface-raised); color: var(--color-text-muted); border: 1px solid var(--color-border)"
            >
              #{{ tag }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Posts -->
    <section class="py-16" style="background: var(--color-bg-secondary)">
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
        <h2 class="font-heading font-bold text-2xl uppercase tracking-wider mb-8" style="color: var(--color-text-primary)">Related Articles</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <NuxtLink
            v-for="related in relatedPosts"
            :key="related.id"
            :to="localePath(`/blog/${related.slug}`)"
            class="group card-glass rounded-sm overflow-hidden"
          >
            <div class="overflow-hidden" style="aspect-ratio: 16/9">
              <img :src="related.image" :alt="related.title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div class="p-5">
              <span class="text-xs font-heading uppercase tracking-widest" style="color: var(--color-accent)">{{ related.category }}</span>
              <h3 class="font-heading font-bold text-base uppercase tracking-wider mt-2 group-hover:text-accent transition-colors" style="color: var(--color-text-primary)">{{ related.title }}</h3>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>

  <div v-else class="pt-40 text-center py-20">
    <p style="color: var(--color-text-muted)">Post not found</p>
    <NuxtLink :to="localePath('/blog')" class="btn-primary mt-4 inline-block">Back to Blog</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ChevronRight, Clock } from 'lucide-vue-next'
import blogData from '~/data/blog.json'

const localePath = useLocalePath()
const route = useRoute()

const post = computed(() => blogData.find((p) => p.slug === route.params.slug))
const relatedPosts = computed(() => blogData.filter((p) => p.slug !== route.params.slug).slice(0, 3))

useHead(() => ({
  title: post.value ? `${post.value.title} — APEX FITNESS` : 'Blog — APEX FITNESS',
}))
</script>
