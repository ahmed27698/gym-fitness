<template>
  <footer style="background: var(--color-bg-secondary); border-top: 1px solid var(--color-border)">
    <!-- Top Marquee -->
    <div class="py-4 overflow-hidden" style="border-bottom: 1px solid var(--color-border)">
      <div class="flex gap-12 animate-marquee whitespace-nowrap">
        <template v-for="i in 3" :key="i">
          <span
            v-for="item in marqueeItems"
            :key="`${i}-${item}`"
            class="font-display text-xl uppercase tracking-widest mx-6 flex items-center gap-4"
            style="color: var(--color-text-muted)"
          >
            <Zap class="w-4 h-4" :style="{ color: 'var(--color-accent)' }" />
            {{ item }}
          </span>
        </template>
      </div>
    </div>

    <!-- Main Footer -->
    <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        <!-- Brand -->
        <div class="lg:col-span-2">
          <NuxtLink :to="localePath('/')" class="flex items-center gap-3 mb-6">
            <div
              class="w-10 h-10 rounded-sm flex items-center justify-center"
              style="background: var(--color-accent)"
            >
              <Zap class="w-6 h-6 text-black" />
            </div>
            <span class="font-display text-2xl tracking-widest" style="color: var(--color-text-primary)">APEX</span>
          </NuxtLink>
          <p class="text-sm leading-relaxed mb-6 max-w-xs" style="color: var(--color-text-muted)">
            {{ $t('footer.tagline') }}
          </p>

          <!-- Social Links -->
          <div class="flex gap-3">
            <a
              v-for="social in socialLinks"
              :key="social.label"
              href="#"
              class="w-10 h-10 glass rounded-sm flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-accent"
              :style="{ color: 'var(--color-text-secondary)' }"
            >
              <component :is="social.icon" class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-heading font-semibold uppercase tracking-widest text-sm mb-6" style="color: var(--color-accent)">
            {{ $t('footer.quick_links') }}
          </h4>
          <ul class="space-y-3">
            <li v-for="link in quickLinks" :key="link.key">
              <NuxtLink
                :to="localePath(link.to)"
                class="text-sm flex items-center gap-2 transition-all duration-200 hover:pl-2 group"
                :style="{ color: 'var(--color-text-muted)' }"
              >
                <ChevronRight
                  class="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all"
                  :style="{ color: 'var(--color-accent)' }"
                />
                {{ $t(link.label) }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Services -->
        <div>
          <h4 class="font-heading font-semibold uppercase tracking-widest text-sm mb-6" style="color: var(--color-accent)">
            {{ $t('footer.services') }}
          </h4>
          <ul class="space-y-3">
            <li v-for="link in serviceLinks" :key="link.key">
              <NuxtLink
                :to="localePath(link.to)"
                class="text-sm flex items-center gap-2 transition-all duration-200 hover:pl-2 group"
                :style="{ color: 'var(--color-text-muted)' }"
              >
                <ChevronRight
                  class="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all"
                  :style="{ color: 'var(--color-accent)' }"
                />
                {{ $t(link.label) }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div>
          <h4 class="font-heading font-semibold uppercase tracking-widest text-sm mb-6" style="color: var(--color-accent)">
            {{ $t('footer.newsletter_footer') }}
          </h4>
          <p class="text-sm mb-4" style="color: var(--color-text-muted)">
            {{ $t('footer.newsletter_desc') }}
          </p>
          <div class="flex flex-col gap-2">
            <input
              v-model="email"
              type="email"
              :placeholder="$t('newsletter.placeholder')"
              class="w-full px-4 py-3 text-sm rounded-sm outline-none transition-all duration-300 focus:border-accent"
              style="
                background: var(--color-surface);
                border: 1px solid var(--color-border);
                color: var(--color-text-primary);
              "
            />
            <button
              class="btn-primary w-full text-sm py-3"
              @click="subscribe"
            >
              {{ $t('newsletter.subscribe') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div
      class="border-t px-4 md:px-8 lg:px-12 py-6"
      style="border-color: var(--color-border)"
    >
      <div class="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-xs" style="color: var(--color-text-muted)">
          © {{ new Date().getFullYear() }} APEX FITNESS. {{ $t('footer.rights') }}
        </p>
        <div class="flex gap-6">
          <NuxtLink
            v-for="link in legalLinks"
            :key="link.label"
            :to="localePath(link.to)"
            class="text-xs transition-colors duration-200"
            :style="{ color: 'var(--color-text-muted)' }"
          >
            {{ $t(link.label) }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Zap, ChevronRight, Instagram, Twitter, Youtube, Facebook, Linkedin } from 'lucide-vue-next'

const localePath = useLocalePath()
const { success } = useToast()

const email = ref('')

const marqueeItems = [
  'STRENGTH', 'CARDIO', 'HIIT', 'YOGA', 'BOXING', 'CYCLING', 'PILATES', 'NUTRITION',
]

const socialLinks = [
  { label: 'Instagram', icon: Instagram },
  { label: 'Twitter', icon: Twitter },
  { label: 'YouTube', icon: Youtube },
  { label: 'Facebook', icon: Facebook },
  { label: 'LinkedIn', icon: Linkedin },
]

const quickLinks = [
  { key: 'home', label: 'nav.home', to: '/' },
  { key: 'about', label: 'nav.about', to: '/about' },
  { key: 'membership', label: 'nav.membership', to: '/membership' },
  { key: 'blog', label: 'nav.blog', to: '/blog' },
  { key: 'contact', label: 'nav.contact', to: '/contact' },
  { key: 'careers', label: 'nav.careers', to: '/careers' },
]

const serviceLinks = [
  { key: 'training', label: 'nav.training', to: '/personal-training' },
  { key: 'classes', label: 'nav.classes', to: '/classes' },
  { key: 'nutrition', label: 'nav.nutrition', to: '/nutrition' },
  { key: 'shop', label: 'nav.shop', to: '/shop' },
  { key: 'schedule', label: 'nav.schedule', to: '/schedule' },
  { key: 'bmi', label: 'nav.bmi', to: '/bmi-calculator' },
]

const legalLinks = [
  { label: 'footer.privacy', to: '/privacy' },
  { label: 'footer.terms', to: '/terms' },
  { label: 'footer.cookies', to: '/cookies' },
]

const subscribe = () => {
  if (email.value) {
    success('Successfully subscribed to newsletter!')
    email.value = ''
  }
}
</script>
