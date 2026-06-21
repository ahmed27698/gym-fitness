import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/image',
  ],

  css: ['~/assets/css/main.css'],

  i18n: {
    locales: [
      { code: 'en', name: 'English', iso: 'en-US', dir: 'ltr', file: 'en.json' },
      { code: 'ar', name: 'العربية', iso: 'ar-SA', dir: 'rtl', file: 'ar.json' },
    ],
    defaultLocale: 'en',
    langDir: 'locales/',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },

  image: {
    quality: 90,
    format: ['webp', 'jpg'],
  },

  app: {
    head: {
      title: 'APEX FITNESS — Premium Gym & Fitness',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Premium gym and fitness center with world-class trainers, state-of-the-art equipment, and personalized programs.' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Bebas+Neue&family=Rajdhani:wght@400;500;600;700&display=swap',
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/shop/1', '/shop/2', '/shop/3', '/shop/4',
        '/shop/5', '/shop/6', '/shop/7', '/shop/8',
        '/ar/shop/1', '/ar/shop/2', '/ar/shop/3', '/ar/shop/4',
        '/ar/shop/5', '/ar/shop/6', '/ar/shop/7', '/ar/shop/8',
      ],
    },
  },
})
