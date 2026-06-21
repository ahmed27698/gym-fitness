<template>
  <div>
    <section class="pt-40 pb-20 relative overflow-hidden hero-grid" style="background: var(--color-bg)">
      <div class="absolute inset-0 opacity-10" style="background: radial-gradient(circle at 50% 50%, var(--color-accent), transparent 60%)" />
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12 text-center">
        <p class="section-subtitle mb-4">{{ $t('gallery.subtitle') }}</p>
        <h1 class="section-title">{{ $t('gallery.title') }}</h1>
      </div>
    </section>

    <!-- Filter -->
    <section class="py-8" style="background: var(--color-surface); border-bottom: 1px solid var(--color-border)">
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12 flex flex-wrap gap-3 justify-center">
        <button
          v-for="cat in ['All', 'Gym', 'Training', 'Classes', 'Events', 'Members']"
          :key="cat"
          class="px-4 py-2 text-xs font-heading font-semibold uppercase tracking-widest rounded-sm transition-all duration-200"
          :style="{
            background: activeFilter === cat ? 'var(--color-accent)' : 'var(--color-surface-raised)',
            color: activeFilter === cat ? '#000' : 'var(--color-text-secondary)',
            border: '1px solid var(--color-border)',
          }"
          @click="activeFilter = cat"
        >
          {{ cat }}
        </button>
      </div>
    </section>

    <!-- Masonry Grid -->
    <section class="py-10" style="background: var(--color-bg)">
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
        <div class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          <div
            v-for="(img, i) in galleryImages"
            :key="i"
            class="group break-inside-avoid relative overflow-hidden rounded-sm cursor-pointer"
            @click="lightboxIndex = i"
          >
            <img
              :src="img.url"
              :alt="img.caption"
              class="w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div
              class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
              style="background: rgba(0,0,0,0.5)"
            >
              <ZoomIn class="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="lightbox">
        <div
          v-if="lightboxIndex !== null"
          class="fixed inset-0 z-[999] flex items-center justify-center p-4"
          style="background: rgba(0,0,0,0.95)"
          @click.self="lightboxIndex = null"
        >
          <button
            class="absolute top-4 right-4 w-10 h-10 rounded-sm flex items-center justify-center"
            style="background: var(--color-surface)"
            @click="lightboxIndex = null"
          >
            <X class="w-5 h-5 text-white" />
          </button>
          <img
            :src="galleryImages[lightboxIndex]?.url"
            :alt="galleryImages[lightboxIndex]?.caption"
            class="max-w-full max-h-[90vh] object-contain rounded-sm"
          />
          <button
            class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-sm flex items-center justify-center"
            style="background: var(--color-surface)"
            @click="prev"
          >
            <ChevronLeft class="w-5 h-5 text-white" />
          </button>
          <button
            class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-sm flex items-center justify-center"
            style="background: var(--color-surface)"
            @click="next"
          >
            <ChevronRight class="w-5 h-5 text-white" />
          </button>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-vue-next'

useHead({ title: 'Gallery — APEX FITNESS' })

const activeFilter = ref('All')
const lightboxIndex = ref<number | null>(null)

const galleryImages = [
  { url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&fit=crop', caption: 'Weight Room', category: 'Gym' },
  { url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&fit=crop', caption: 'Training Session', category: 'Training' },
  { url: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=600&fit=crop', caption: 'HIIT Class', category: 'Classes' },
  { url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&fit=crop', caption: 'Yoga Session', category: 'Classes' },
  { url: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&fit=crop', caption: 'Boxing Training', category: 'Training' },
  { url: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&fit=crop', caption: 'Cardio Zone', category: 'Gym' },
  { url: 'https://images.unsplash.com/photo-1567515004624-219c11d31f2e?w=600&fit=crop', caption: 'Personal Training', category: 'Training' },
  { url: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=600&fit=crop', caption: 'Group Class', category: 'Classes' },
  { url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&fit=crop', caption: 'Cycling Class', category: 'Classes' },
  { url: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&fit=crop', caption: 'Nutrition Consultation', category: 'Members' },
  { url: 'https://images.unsplash.com/photo-1503235930437-8c6293ba41f5?w=600&fit=crop', caption: 'Events', category: 'Events' },
  { url: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&fit=crop', caption: 'Community Event', category: 'Events' },
]

const prev = () => {
  if (lightboxIndex.value !== null) {
    lightboxIndex.value = (lightboxIndex.value - 1 + galleryImages.length) % galleryImages.length
  }
}

const next = () => {
  if (lightboxIndex.value !== null) {
    lightboxIndex.value = (lightboxIndex.value + 1) % galleryImages.length
  }
}
</script>

<style scoped>
.lightbox-enter-active, .lightbox-leave-active { transition: opacity 0.3s ease; }
.lightbox-enter-from, .lightbox-leave-to { opacity: 0; }
</style>
