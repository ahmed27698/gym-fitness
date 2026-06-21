<template>
  <nav
    ref="navRef"
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      scrolled ? 'glass-strong shadow-lg' : 'bg-transparent',
    ]"
  >
    <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <NuxtLink :to="localePath('/')" class="flex items-center gap-3 group">
          <div class="relative">
            <div
              class="w-10 h-10 rounded-sm flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style="background: var(--color-accent)"
            >
              <Zap class="w-6 h-6 text-black" />
            </div>
            <div
              class="absolute inset-0 rounded-sm blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300"
              style="background: var(--color-accent)"
            />
          </div>
          <span class="font-display text-2xl tracking-widest" style="color: var(--color-text-primary)">
            APEX
          </span>
        </NuxtLink>

        <!-- Desktop Nav -->
        <div class="hidden lg:flex items-center gap-1">
          <template v-for="link in navLinks" :key="link.key">
            <div v-if="link.children" class="relative group">
              <button
                class="flex items-center gap-1 px-4 py-2 text-sm font-heading font-medium uppercase tracking-wider transition-all duration-200 rounded-sm hover:text-accent"
                :style="{ color: 'var(--color-text-secondary)' }"
              >
                {{ $t(link.label) }}
                <ChevronDown class="w-3 h-3 transition-transform group-hover:rotate-180" />
              </button>
              <div
                class="absolute top-full left-0 mt-2 w-52 glass-strong rounded-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 overflow-hidden"
              >
                <NuxtLink
                  v-for="child in link.children"
                  :key="child.key"
                  :to="localePath(child.to)"
                  class="flex items-center gap-2 px-4 py-3 text-sm font-heading uppercase tracking-wider transition-all duration-200 hover:pl-6"
                  :style="{ color: 'var(--color-text-secondary)' }"
                  style="border-bottom: 1px solid var(--color-border)"
                  active-class="text-accent"
                >
                  <component :is="child.icon" class="w-4 h-4" />
                  {{ $t(child.label) }}
                </NuxtLink>
              </div>
            </div>
            <NuxtLink
              v-else
              :to="localePath(link.to!)"
              class="px-4 py-2 text-sm font-heading font-medium uppercase tracking-wider transition-all duration-200 rounded-sm relative group"
              :style="{ color: 'var(--color-text-secondary)' }"
              active-class="!text-accent"
            >
              {{ $t(link.label) }}
              <span
                class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] group-hover:w-4/5 transition-all duration-300"
                :style="{ background: 'var(--color-accent)' }"
              />
            </NuxtLink>
          </template>
        </div>

        <!-- Right Actions -->
        <div class="flex items-center gap-3">
          <!-- Search -->
          <button
            class="w-9 h-9 flex items-center justify-center rounded-sm transition-all duration-200 hover:scale-110"
            :style="{ color: 'var(--color-text-secondary)' }"
            @click="searchOpen = true"
          >
            <Search class="w-5 h-5" />
          </button>

          <!-- Language Switcher -->
          <LayoutLanguageSwitcher />

          <!-- Theme Switcher -->
          <LayoutThemeSwitcher />

          <!-- Cart -->
          <NuxtLink
            :to="localePath('/shop/cart')"
            class="relative w-9 h-9 flex items-center justify-center rounded-sm transition-all duration-200 hover:scale-110"
            :style="{ color: 'var(--color-text-secondary)' }"
          >
            <ShoppingBag class="w-5 h-5" />
            <span
              v-if="cartCount > 0"
              class="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs font-bold flex items-center justify-center text-black"
              :style="{ background: 'var(--color-accent)' }"
            >{{ cartCount }}</span>
          </NuxtLink>

          <!-- CTA Button -->
          <NuxtLink
            :to="localePath('/membership')"
            class="hidden md:flex btn-primary text-sm px-6 py-2"
          >
            {{ $t('hero.cta_primary') }}
          </NuxtLink>

          <!-- Mobile Menu Toggle -->
          <button
            class="lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px]"
            :style="{ color: 'var(--color-text-primary)' }"
            @click="mobileOpen = !mobileOpen"
          >
            <span
              :class="['block h-[2px] w-6 transition-all duration-300', mobileOpen ? 'rotate-45 translate-y-[7px]' : '']"
              :style="{ background: 'var(--color-text-primary)' }"
            />
            <span
              :class="['block h-[2px] w-6 transition-all duration-300', mobileOpen ? 'opacity-0' : '']"
              :style="{ background: 'var(--color-text-primary)' }"
            />
            <span
              :class="['block h-[2px] w-6 transition-all duration-300', mobileOpen ? '-rotate-45 -translate-y-[7px]' : '']"
              :style="{ background: 'var(--color-text-primary)' }"
            />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition name="slide-down">
      <div
        v-if="mobileOpen"
        class="lg:hidden glass-strong border-t"
        :style="{ borderColor: 'var(--color-border)' }"
      >
        <div class="max-w-screen-2xl mx-auto px-4 py-6 flex flex-col gap-2">
          <template v-for="link in allMobileLinks" :key="link.key">
            <NuxtLink
              :to="localePath(link.to!)"
              class="flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-heading font-medium uppercase tracking-wider transition-all duration-200"
              :style="{ color: 'var(--color-text-secondary)' }"
              active-class="!text-accent"
              style="border: 1px solid var(--color-border)"
              @click="mobileOpen = false"
            >
              <component :is="link.icon" class="w-4 h-4" />
              {{ $t(link.label) }}
            </NuxtLink>
          </template>
          <NuxtLink
            :to="localePath('/membership')"
            class="btn-primary text-center mt-4"
            @click="mobileOpen = false"
          >
            {{ $t('hero.cta_primary') }}
          </NuxtLink>
        </div>
      </div>
    </Transition>

    <!-- Search Modal -->
    <UiSearchModal :open="searchOpen" @close="searchOpen = false" />
  </nav>
</template>

<script setup lang="ts">
import {
  Zap,
  Search,
  ShoppingBag,
  ChevronDown,
  Home,
  Users,
  CreditCard,
  Dumbbell,
  Calendar,
  UserCheck,
  ShoppingCart,
  Apple,
  BookOpen,
  Image,
  MessageCircle,
  HelpCircle,
  Mail,
  Activity,
  Briefcase,
  Star,
} from 'lucide-vue-next'

const localePath = useLocalePath()
const { cartCount, loadCart } = useCart()

const scrolled = ref(false)
const mobileOpen = ref(false)
const searchOpen = ref(false)

const navLinks = [
  { key: 'home', label: 'nav.home', to: '/', icon: Home },
  { key: 'about', label: 'nav.about', to: '/about', icon: Users },
  {
    key: 'fitness',
    label: 'nav.classes',
    children: [
      { key: 'classes', label: 'nav.classes', to: '/classes', icon: Dumbbell },
      { key: 'trainers', label: 'nav.trainers', to: '/trainers', icon: UserCheck },
      { key: 'training', label: 'nav.training', to: '/personal-training', icon: Activity },
      { key: 'schedule', label: 'nav.schedule', to: '/schedule', icon: Calendar },
      { key: 'nutrition', label: 'nav.nutrition', to: '/nutrition', icon: Apple },
    ],
  },
  { key: 'membership', label: 'nav.membership', to: '/membership', icon: CreditCard },
  { key: 'shop', label: 'nav.shop', to: '/shop', icon: ShoppingCart },
  {
    key: 'more',
    label: 'nav.blog',
    children: [
      { key: 'blog', label: 'nav.blog', to: '/blog', icon: BookOpen },
      { key: 'gallery', label: 'nav.gallery', to: '/gallery', icon: Image },
      { key: 'testimonials', label: 'nav.testimonials', to: '/testimonials', icon: Star },
      { key: 'faq', label: 'nav.faq', to: '/faq', icon: HelpCircle },
      { key: 'careers', label: 'nav.careers', to: '/careers', icon: Briefcase },
    ],
  },
  { key: 'contact', label: 'nav.contact', to: '/contact', icon: Mail },
]

const allMobileLinks = [
  { key: 'home', label: 'nav.home', to: '/', icon: Home },
  { key: 'about', label: 'nav.about', to: '/about', icon: Users },
  { key: 'membership', label: 'nav.membership', to: '/membership', icon: CreditCard },
  { key: 'classes', label: 'nav.classes', to: '/classes', icon: Dumbbell },
  { key: 'trainers', label: 'nav.trainers', to: '/trainers', icon: UserCheck },
  { key: 'schedule', label: 'nav.schedule', to: '/schedule', icon: Calendar },
  { key: 'shop', label: 'nav.shop', to: '/shop', icon: ShoppingCart },
  { key: 'nutrition', label: 'nav.nutrition', to: '/nutrition', icon: Apple },
  { key: 'blog', label: 'nav.blog', to: '/blog', icon: BookOpen },
  { key: 'gallery', label: 'nav.gallery', to: '/gallery', icon: Image },
  { key: 'contact', label: 'nav.contact', to: '/contact', icon: Mail },
  { key: 'bmi', label: 'nav.bmi', to: '/bmi-calculator', icon: Activity },
]

onMounted(() => {
  loadCart()
  window.addEventListener('scroll', () => {
    scrolled.value = window.scrollY > 50
  })
})
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.text-accent {
  color: var(--color-accent) !important;
}
</style>
