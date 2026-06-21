<template>
  <Teleport to="body">
    <Transition name="search-modal">
      <div
        v-if="open"
        class="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4"
        style="background: rgba(0,0,0,0.8); backdrop-filter: blur(8px)"
        @click.self="$emit('close')"
      >
        <div
          class="w-full max-w-2xl glass-strong rounded-sm overflow-hidden"
          style="border: 1px solid var(--color-border)"
        >
          <!-- Input -->
          <div class="flex items-center gap-4 px-6 py-4" style="border-bottom: 1px solid var(--color-border)">
            <Search class="w-5 h-5 flex-shrink-0" :style="{ color: 'var(--color-accent)' }" />
            <input
              ref="inputRef"
              v-model="query"
              type="text"
              :placeholder="$t('common.search') + '...'"
              class="flex-1 bg-transparent outline-none text-base"
              :style="{ color: 'var(--color-text-primary)' }"
              @keydown.escape="$emit('close')"
            />
            <button
              class="text-xs uppercase tracking-widest px-2 py-1 rounded"
              style="border: 1px solid var(--color-border); color: var(--color-text-muted)"
              @click="$emit('close')"
            >
              ESC
            </button>
          </div>

          <!-- Results -->
          <div class="max-h-96 overflow-y-auto">
            <template v-if="query.length > 0 && results.length > 0">
              <NuxtLink
                v-for="result in results"
                :key="result.path"
                :to="result.path"
                class="flex items-center gap-4 px-6 py-4 transition-all duration-200 hover:pl-8"
                style="border-bottom: 1px solid var(--color-border); color: var(--color-text-secondary)"
                @click="$emit('close')"
              >
                <component :is="result.icon" class="w-4 h-4 flex-shrink-0" :style="{ color: 'var(--color-accent)' }" />
                <div>
                  <p class="text-sm font-medium" :style="{ color: 'var(--color-text-primary)' }">{{ result.title }}</p>
                  <p class="text-xs mt-0.5">{{ result.category }}</p>
                </div>
                <ChevronRight class="w-4 h-4 ml-auto" />
              </NuxtLink>
            </template>
            <div
              v-else-if="query.length > 0"
              class="px-6 py-12 text-center"
              :style="{ color: 'var(--color-text-muted)' }"
            >
              <SearchX class="w-8 h-8 mx-auto mb-3 opacity-50" />
              <p class="text-sm">{{ $t('common.no_results') }}</p>
            </div>
            <div v-else class="px-6 py-8">
              <p class="text-xs uppercase tracking-widest mb-4" :style="{ color: 'var(--color-text-muted)' }">Quick Links</p>
              <div class="grid grid-cols-2 gap-2">
                <NuxtLink
                  v-for="link in quickLinks"
                  :key="link.path"
                  :to="link.path"
                  class="flex items-center gap-3 px-4 py-3 rounded-sm transition-all duration-200 hover:pl-5"
                  style="border: 1px solid var(--color-border); color: var(--color-text-secondary)"
                  @click="$emit('close')"
                >
                  <component :is="link.icon" class="w-4 h-4" :style="{ color: 'var(--color-accent)' }" />
                  <span class="text-sm font-heading uppercase tracking-wider">{{ link.label }}</span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import {
  Search,
  SearchX,
  ChevronRight,
  Home,
  Dumbbell,
  CreditCard,
  ShoppingBag,
  UserCheck,
  Apple,
  BookOpen,
} from 'lucide-vue-next'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()

const query = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

const allPages = [
  { title: 'Home', category: 'Page', path: '/', icon: Home },
  { title: 'Membership Plans', category: 'Page', path: '/membership', icon: CreditCard },
  { title: 'Classes', category: 'Page', path: '/classes', icon: Dumbbell },
  { title: 'Trainers', category: 'Page', path: '/trainers', icon: UserCheck },
  { title: 'Shop', category: 'E-Commerce', path: '/shop', icon: ShoppingBag },
  { title: 'Nutrition', category: 'Page', path: '/nutrition', icon: Apple },
  { title: 'Blog', category: 'Content', path: '/blog', icon: BookOpen },
]

const quickLinks = [
  { label: 'Classes', path: '/classes', icon: Dumbbell },
  { label: 'Membership', path: '/membership', icon: CreditCard },
  { label: 'Trainers', path: '/trainers', icon: UserCheck },
  { label: 'Shop', path: '/shop', icon: ShoppingBag },
]

const results = computed(() =>
  query.value.length < 2
    ? []
    : allPages.filter(
        (p) =>
          p.title.toLowerCase().includes(query.value.toLowerCase()) ||
          p.category.toLowerCase().includes(query.value.toLowerCase())
      )
)

watch(
  () => props.open,
  (val) => {
    if (val) {
      nextTick(() => inputRef.value?.focus())
      query.value = ''
    }
  }
)
</script>

<style scoped>
.search-modal-enter-active,
.search-modal-leave-active {
  transition: all 0.3s ease;
}
.search-modal-enter-from,
.search-modal-leave-to {
  opacity: 0;
}
.search-modal-enter-from .search-content,
.search-modal-leave-to .search-content {
  transform: translateY(-20px);
}
</style>
